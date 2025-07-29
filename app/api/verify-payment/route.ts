import {type NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {reference, provider} = await request.json();

    if (!reference || !provider) {
      return NextResponse.json(
        {success: false, error: 'Missing reference or provider'},
        {status: 400}
      );
    }

    let verificationResult = false;

    if (provider === 'paystack') {
      verificationResult = await verifyPaystackPayment(reference);
    } else if (provider === 'opay') {
      verificationResult = await verifyOpayPayment(reference);
    } else {
      return NextResponse.json(
        {success: false, error: 'Unsupported payment provider'},
        {status: 400}
      );
    }

    return NextResponse.json({success: verificationResult});
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({success: false, error: 'Payment verification failed'}, {status: 500});
  }
}

async function verifyPaystackPayment(reference: string): Promise<boolean> {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      throw new Error('Paystack secret key not configured');
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.status === true && data.data.status === 'success';
  } catch (error) {
    console.error('Paystack verification error:', error);
    return false;
  }
}

async function verifyOpayPayment(reference: string): Promise<boolean> {
  try {
    const secretKey = process.env.OPAY_SECRET_KEY;
    const merchantId = process.env.OPAY_MERCHANT_ID;

    if (!secretKey || !merchantId) {
      throw new Error('OPay credentials not configured');
    }

    const response = await fetch('https://sandboxapi.opaycheckout.com/api/v3/cashier/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secretKey}`,
        MerchantId: merchantId,
      },
      body: JSON.stringify({
        orderNo: reference,
      }),
    });

    const data = await response.json();
    return data.code === '00000' && data.data.status === 'SUCCESS';
  } catch (error) {
    console.error('OPay verification error:', error);
    return false;
  }
}
