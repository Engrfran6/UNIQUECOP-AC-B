interface PaymentData {
  amount: number;
  email: string;
  paymentMethod: {
    type: 'card' | 'bank_transfer';
    provider: 'paystack' | 'opay';
  };
  orderData: any;
}

interface PaymentResult {
  success: boolean;
  reference?: string;
  error?: string;
}

// Paystack payment processing
async function processPaystackPayment(data: PaymentData): Promise<PaymentResult> {
  try {
    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!paystackPublicKey) {
      throw new Error('Paystack public key not configured');
    }

    // Load Paystack script if not already loaded
    if (!window.PaystackPop) {
      await loadPaystackScript();
    }

    return new Promise((resolve) => {
      const handler = window.PaystackPop.setup({
        key: paystackPublicKey,
        email: data.email,
        amount: Math.round(data.amount * 100), // Convert to kobo
        currency: 'NGN',
        channels: data.paymentMethod.type === 'card' ? ['card'] : ['bank'],
        callback: (response: any) => {
          resolve({
            success: true,
            reference: response.reference,
          });
        },
        onClose: () => {
          resolve({
            success: false,
            error: 'Payment was cancelled',
          });
        },
      });

      handler.openIframe();
    });
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// OPay payment processing
async function processOpayPayment(data: PaymentData): Promise<PaymentResult> {
  try {
    const opayPublicKey = process.env.NEXT_PUBLIC_OPAY_PUBLIC_KEY;

    if (!opayPublicKey) {
      throw new Error('OPay public key not configured');
    }

    // Load OPay script if not already loaded
    if (!window.OPay) {
      await loadOpayScript();
    }

    return new Promise((resolve) => {
      const handler = window.OPay.setup({
        key: opayPublicKey,
        email: data.email,
        amount: Math.round(data.amount * 100), // Convert to kobo
        currency: 'NGN',
        channels: data.paymentMethod.type === 'card' ? ['card'] : ['bank_transfer'],
        callback: (response: any) => {
          resolve({
            success: true,
            reference: response.reference,
          });
        },
        onClose: () => {
          resolve({
            success: false,
            error: 'Payment was cancelled',
          });
        },
      });

      handler.openIframe();
    });
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Load Paystack script dynamically
function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('paystack-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-script';
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.head.appendChild(script);
  });
}

// Load OPay script dynamically
function loadOpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('opay-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'opay-script';
    script.src = 'https://sandboxapi.opaycheckout.com/v3/opay-checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load OPay script'));
    document.head.appendChild(script);
  });
}

// Main payment processing function
export async function processPayment(data: PaymentData): Promise<PaymentResult> {
  try {
    if (data.paymentMethod.provider === 'paystack') {
      return await processPaystackPayment(data);
    } else if (data.paymentMethod.provider === 'opay') {
      return await processOpayPayment(data);
    } else {
      throw new Error('Unsupported payment provider');
    }
  } catch (error: any) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error.message || 'Payment processing failed',
    };
  }
}

// Verify payment on the server side
export async function verifyPayments(
  reference: string,
  provider: 'paystack' | 'opay'
): Promise<boolean> {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({reference, provider}),
    });

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
}

// Extend Window interface for payment scripts
declare global {
  interface Window {
    PaystackPop: any;
    OPay: any;
  }
}
