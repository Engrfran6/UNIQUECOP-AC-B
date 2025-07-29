import type {Order} from '@/lib/orders';

export const generateReceiptHTML = (order: Order): string => {
  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Receipt - ${order.id}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #fefefe;
          color: #333;
        }
        .receipt-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #8B7355;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .company-name {
          font-size: 36px;
          font-weight: bold;
          color: #8B7355;
          margin-bottom: 5px;
        }
        .receipt-title {
          font-size: 24px;
          color: #333;
          margin-bottom: 10px;
        }
        .order-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .info-section {
          flex: 1;
        }
        .info-title {
          font-weight: bold;
          color: #8B7355;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .info-content {
          line-height: 1.6;
          color: #666;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        .items-table th {
          background-color: #f8f6f3;
          color: #8B7355;
          padding: 15px;
          text-align: left;
          border-bottom: 2px solid #8B7355;
        }
        .items-table td {
          padding: 15px;
          border-bottom: 1px solid #eee;
        }
        .item-image {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
        }
        .totals-section {
          margin-top: 30px;
          border-top: 2px solid #8B7355;
          padding-top: 20px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .total-row.final {
          font-size: 18px;
          font-weight: bold;
          color: #8B7355;
          border-top: 1px solid #eee;
          padding-top: 10px;
          margin-top: 15px;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #999;
          font-size: 14px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          background-color: #8B7355;
          color: white;
        }
        @media print {
          .receipt-container {
            box-shadow: none;
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        <div class="header">
          <div class="company-name">Uniquecop AC&B</div>
          <div class="receipt-title">Order Receipt</div>
          <div>Order #${order.id}</div>
        </div>

        <div class="order-info">
          <div class="info-section">
            <div class="info-title">Order Details</div>
            <div class="info-content">
              <div>Date: ${formatDate(order.createdAt)}</div>
              <div>Status: <span class="status-badge">${order.status}</span></div>
              ${order.paymentReference ? `<div>Payment Ref: ${order.paymentReference}</div>` : ''}
              ${order.trackingNumber ? `<div>Tracking: ${order.trackingNumber}</div>` : ''}
            </div>
          </div>

          <div class="info-section">
            <div class="info-title">Shipping Address</div>
            <div class="info-content">
              <div>${order.shippingInfo.firstName} ${order.shippingInfo.lastName}</div>
              <div>${order.shippingInfo.address}</div>
              <div>${order.shippingInfo.city}, ${order.shippingInfo.state} ${
    order.shippingInfo.zipCode
  }</div>
              <div>${order.shippingInfo.country}</div>
              <div>Phone: ${order.shippingInfo.phone}</div>
              <div>Email: ${order.shippingInfo.email}</div>
            </div>
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items
              .map(
                (item) => `
              <tr>
                <td>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${item.image}" alt="${item.name}" class="item-image" />
                    <div>
                      <div style="font-weight: bold;">${item.name}</div>
                      <div style="color: #666; font-size: 14px;">${'item?.category'}</div>
                    </div>
                  </div>
                </td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div class="totals-section">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>$${order.subtotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>${order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div class="total-row">
            <span>Tax:</span>
            <span>$${order.tax.toFixed(2)}</span>
          </div>
          <div class="total-row final">
            <span>Total:</span>
            <span>$${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for your order!</p>
          <p>For questions about your order, please contact us at support@uniquecop.com</p>
          <p>www.uniquecop.com | 1-800-UNIQUECOP</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const downloadReceipt = (order: Order) => {
  const html = generateReceiptHTML(order);
  const blob = new Blob([html], {type: 'text/html'});
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `uniquecop-receipt-${order.id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
