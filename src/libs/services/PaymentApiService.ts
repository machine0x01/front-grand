// PaymentApiService.ts
// This service handles payment creation and redirection to external payment providers

export interface PaymentOrderData {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  order: {
    items: Array<{
      course_id: string;
      title: string;
      price: number;
      discount: number;
      instructor: string;
      thumbnail?: string;
      quantity: number;
    }>;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    itemCount: number;
  };
}

// API expects this format
export interface PaymentApiRequest {
  amount: number;
  description: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;
  billing_zip: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  error?: string;
  orderId?: string;
}

class PaymentApiService {
  private baseUrl: string;

  constructor() {
    // Replace with your actual payment API endpoint
    this.baseUrl = process.env.NEXT_PUBLIC_PAYMENT_API_URL || 'http://127.0.0.1:8000';
  }

  /**
   * Creates a payment session and returns the payment URL
   * @param orderData - The order data including customer info and cart items
   * @returns Promise<PaymentResponse> - Payment response with URL or error
   */
  async createPayment(orderData: PaymentOrderData): Promise<PaymentResponse> {
    try {
      // Transform the order data to match API expectations
      const paymentRequest: PaymentApiRequest = {
        amount: orderData.order.total,
        description: this.generateOrderDescription(orderData.order.items),
        customer_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
        customer_email: orderData.customer.email,
        customer_phone: orderData.customer.phone,
        billing_address: orderData.customer.address,
        billing_city: orderData.customer.city,
        billing_state: orderData.customer.state,
        billing_country: orderData.customer.country,
        billing_zip: orderData.customer.zipCode,
      };

      const response = await fetch(`${this.baseUrl}/api/payment/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any required authentication headers
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(paymentRequest),
      });

      if (!response.ok) {
        throw new Error(`Payment creation failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        paymentUrl: data.paymentUrl,
        orderId: data.orderId,
      };
    } catch (error) {
      console.error('Payment creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment creation failed',
      };
    }
  }

  /**
   * Verifies payment status after redirect
   * @param orderId - The order ID to verify
   * @returns Promise<PaymentResponse> - Payment verification result
   */
  async verifyPayment(orderId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/payments/verify/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any required authentication headers
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Payment verification failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: data.status === 'completed',
        orderId: data.orderId,
        error: data.status !== 'completed' ? 'Payment not completed' : undefined,
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed',
      };
    }
  }

  /**
   * Handles payment webhook notifications
   * @param webhookData - Webhook data from payment provider
   * @returns Promise<boolean> - Whether webhook was processed successfully
   */
  async handleWebhook(webhookData: any): Promise<boolean> {
    try {
      // Process webhook data from your payment provider
      // This is where you would update order status, send confirmation emails, etc.
      
      console.log('Processing webhook:', webhookData);
      
      // Example webhook processing:
      // - Verify webhook signature
      // - Update order status in database
      // - Send confirmation email
      // - Clear cart if payment successful
      
      return true;
    } catch (error) {
      console.error('Webhook processing error:', error);
      return false;
    }
  }

  /**
   * Generates a description for the order based on cart items
   * @param items - Array of cart items
   * @returns string - Order description
   */
  private generateOrderDescription(items: Array<{
    course_id: string;
    title: string;
    price: number;
    discount: number;
    instructor: string;
    thumbnail?: string;
    quantity: number;
  }>): string {
    if (items.length === 0) return "Course purchase";
    
    if (items.length === 1) {
      return `Course: ${items[0]?.title || 'Unknown Course'}`;
    }
    
    const courseNames = items.map(item => item.title || 'Unknown Course').join(", ");
    return `Courses: ${courseNames}`;
  }

  /**
   * Gets payment configuration (for different payment providers)
   * @returns Payment configuration object
   */
  getPaymentConfig() {
    return {
      // Stripe configuration
      stripe: {
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        // Add other Stripe-specific config
      },
      // PayPal configuration
      paypal: {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        // Add other PayPal-specific config
      },
      // Add other payment providers as needed
    };
  }
}

// Export singleton instance
export const paymentApiService = new PaymentApiService();

// Example usage in checkout form:
/*
import { paymentApiService } from '@/libs/services/PaymentApiService';

const handleProceedToPayment = async (orderData) => {
  try {
    const paymentResponse = await paymentApiService.createPayment(orderData);
    
    if (paymentResponse.success && paymentResponse.paymentUrl) {
      // Redirect to payment provider
      window.location.href = paymentResponse.paymentUrl;
    } else {
      alert('Failed to create payment: ' + paymentResponse.error);
    }
  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment creation failed. Please try again.');
  }
};
*/ 