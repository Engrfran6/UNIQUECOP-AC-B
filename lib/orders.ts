import {db} from '@/lib/firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type ShippingMethod = 'standard' | 'express' | 'overnight';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id?: string;
  userId: string | null;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: {
    type: 'card' | 'bank_transfer';
    provider: 'paystack' | 'opay';
  };
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  orderNotes?: string;
  // method: ShippingMethod;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentReference?: string;
  trackingNumber?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  timeline?: OrderTimelineEvent[];
}

export interface OrderTimelineEvent {
  status: string;
  date: string;
  time: string;
  description?: string;
}

// Create a new order
export async function createOrder(
  orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const ordersCollection = collection(db, 'orders');

    const order: Omit<Order, 'id'> = {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      timeline: [
        {
          status: 'ordered',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
          description: 'Order placed successfully',
        },
      ],
    };

    const docRef = await addDoc(ordersCollection, order);

    // Update the order with its ID
    await updateDoc(docRef, {id: docRef.id});

    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}

// Get order by ID
export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const orderDoc = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderDoc);

    if (orderSnap.exists()) {
      const data = orderSnap.data();
      return {
        id: orderSnap.id,
        ...data,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as Order;
    }

    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw new Error('Failed to get order');
  }
}

// Get orders for a specific user
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersCollection = collection(db, 'orders');
    const q = query(ordersCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as Order);
    });

    return orders;
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw new Error('Failed to get user orders');
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  trackingNumber?: string
): Promise<void> {
  try {
    const orderDoc = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderDoc);

    if (!orderSnap.exists()) {
      throw new Error('Order not found');
    }

    const currentOrder = orderSnap.data() as Order;
    const currentTimeline = currentOrder.timeline || [];

    // Add new timeline event
    const newTimelineEvent: OrderTimelineEvent = {
      status,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      description: getStatusDescription(status),
    };

    const updateData: Partial<Order> = {
      status,
      updatedAt: Timestamp.now(),
      timeline: [...currentTimeline, newTimelineEvent],
    };

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }

    await updateDoc(orderDoc, updateData);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
}

// Get status description for timeline
function getStatusDescription(status: Order['status']): string {
  const descriptions = {
    pending: 'Order is pending payment confirmation',
    processing: 'Order is being prepared for shipment',
    shipped: 'Order has been shipped and is on its way',
    delivered: 'Order has been delivered successfully',
    cancelled: 'Order has been cancelled',
  };

  return descriptions[status] || `Order status updated to ${status}`;
}

// Generate order number
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  return `ORD-${year}-${timestamp}`;
}

// Calculate order totals
export function calculateOrderTotals(items: OrderItem[], shippingCost = 8.99) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 75 ? 0 : shippingCost;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}
