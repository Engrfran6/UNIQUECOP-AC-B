import {db} from "@/lib/firebase";
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
} from "firebase/firestore";
import {Order, OrderTimelineEvent} from "./types";
import {getStatusDescription} from "./utils";

// Create a new order
export async function createOrder(
  orderData: Omit<Order, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const ordersCollection = collection(db, "orders");

    const order: Omit<Order, "id" | "method"> = {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      timeline: [
        {
          status: "ordered",
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          description: "Order placed successfully",
        },
      ],
    };

    const docRef = await addDoc(ordersCollection, order);

    // Update the order with its ID
    await updateDoc(docRef, {id: docRef.id});

    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}

// Get order by ID
export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const orderDoc = doc(db, "orders", orderId);
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
    console.error("Error getting order:", error);
    throw new Error("Failed to get order");
  }
}

// Get orders for a specific user
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, where("userId", "==", userId), orderBy("createdAt", "desc"));

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
    console.error("Error getting user orders:", error);
    throw new Error("Failed to get user orders");
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
  trackingNumber?: string
): Promise<void> {
  try {
    const orderDoc = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderDoc);

    if (!orderSnap.exists()) {
      throw new Error("Order not found");
    }

    const currentOrder = orderSnap.data() as Order;
    const currentTimeline = currentOrder.timeline || [];

    // Add new timeline event
    const newTimelineEvent: OrderTimelineEvent = {
      status,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
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
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}
