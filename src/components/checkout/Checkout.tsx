"use client"
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, ShoppingBag, Minus, Plus, Trash2, CreditCard, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/cart-context';

// Types
interface CartItem {
  course_id: string;
  title: string;
  price: number;
  discount: number;
  quantity: number;
  image?: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  notes: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface PaymentData {
  amount: string;
  currency: string;
  description: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;
  billing_zip: string;
  return_url: string;
  callback_url: string;
}

interface PaymentResponse {
  success: boolean;
  payment_url?: string;
  transaction_ref?: string;
  error?: string;
}

interface TransactionResponse {
  success: boolean;
  data?: any;
  error?: string;
}



// Constants
const API_BASE_URL = 'http://127.0.0.1:8000/api';
const TAX_RATE = 0.1;
const RETURN_URL = 'http://localhost:3000/payment/success';

// API Service Class
class PaymentApiService {
  static async createPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data: PaymentResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment creation failed');
      }

      return data;
    } catch (error) {
      console.error('Payment API Error:', error);
      throw error;
    }
  }

  static async getTransaction(transactionRef: string): Promise<TransactionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/transaction/${transactionRef}/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data: TransactionResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch transaction');
      }

      return data;
    } catch (error) {
      console.error('Transaction fetch error:', error);
      throw error;
    }
  }
}

// Utility Functions
const formatPaymentData = (userInfo: UserInfo, cartItems: CartItem[]): PaymentData => {
  const subtotal = calculateSubtotal(cartItems);
  const tax = subtotal * TAX_RATE;
  const totalAmount = subtotal + tax;

  const description = cartItems.length === 1 
    ? `Payment for: ${cartItems[0]?.title || 'Course'}`
    : `Payment for ${cartItems.length} courses`;

  return {
    amount: totalAmount.toFixed(2),
    currency: 'EGP',
    description,
    customer_name: `${userInfo.firstName} ${userInfo.lastName}`,
    customer_email: userInfo.email,
    customer_phone: userInfo.phone,
    billing_address: userInfo.address,
    billing_city: userInfo.city,
    billing_state: userInfo.state,
    billing_country: 'EG',
    billing_zip: userInfo.zipCode,
    return_url: RETURN_URL,
    callback_url: `${API_BASE_URL}/payment/callback/`,
  };
};

const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((sum, item) => {
    const discountedPrice = Number(item.price) - Number(item.discount);
    return sum + (discountedPrice * item.quantity);
  }, 0);
};

const validateForm = (userInfo: UserInfo): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!userInfo.firstName.trim()) errors.firstName = 'First name is required';
  if (!userInfo.lastName.trim()) errors.lastName = 'Last name is required';
  if (!userInfo.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
    errors.email = 'Email is invalid';
  }
  if (!userInfo.phone.trim()) errors.phone = 'Phone number is required';
  if (!userInfo.address.trim()) errors.address = 'Address is required';
  if (!userInfo.city.trim()) errors.city = 'City is required';
  if (!userInfo.state.trim()) errors.state = 'State is required';
  if (!userInfo.zipCode.trim()) errors.zipCode = 'ZIP code is required';

  return errors;
};

// Components
const LoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[#0b000f] py-8">
    <div className="max-w-6xl mx-auto p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-purple-900/30 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-purple-900/30 rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-32 bg-purple-900/30 rounded-xl"></div>
            <div className="h-32 bg-purple-900/30 rounded-xl"></div>
          </div>
          <div className="h-64 bg-purple-900/30 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);

const EmptyCart: React.FC = () => (
  <div className="min-h-screen bg-[#0b000f] py-8">
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-16 w-16 text-purple-400/60 mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-white">Your cart is empty</h3>
        <p className="text-purple-200/70 mb-6">Add some courses to your cart to proceed with checkout.</p>
        <button 
          onClick={() => window.history.back()}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg shadow-purple-600/25"
        >
          Browse Courses
        </button>
      </div>
    </div>
  </div>
);

interface PaymentErrorAlertProps {
  error: string;
}

const PaymentErrorAlert: React.FC<PaymentErrorAlertProps> = ({ error }) => (
  <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl flex items-start space-x-3">
    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
    <div>
      <h4 className="text-red-300 font-medium">Payment Error</h4>
      <p className="text-red-200/80 text-sm mt-1">{error}</p>
    </div>
  </div>
);

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon
}) => (
  <div>
    <label className="block text-sm font-medium text-purple-200 mb-2">
      {icon && <span className="inline mr-2">{icon}</span>}
      {label} {required && '*'}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 bg-purple-950/40 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 transition-all duration-200 ${
        error ? 'border-red-400/60' : 'border-purple-700/50 hover:border-purple-600/60'
      }`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3
}) => (
  <div>
    <label className="block text-sm font-medium text-purple-200 mb-2">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-4 py-3 bg-purple-950/40 border border-purple-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 hover:border-purple-600/60 transition-all duration-200"
      placeholder={placeholder}
    />
  </div>
);

interface PersonalInfoSectionProps {
  userInfo: UserInfo;
  onInputChange: (field: keyof UserInfo, value: string) => void;
  errors: ValidationErrors;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  userInfo,
  onInputChange,
  errors
}) => (
  <div className="bg-gradient-to-br from-purple-950/50 to-purple-900/30 backdrop-blur-sm p-6 rounded-xl border border-purple-800/30 shadow-xl">
    <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
      <User className="mr-3 h-6 w-6 text-purple-400" />
      Personal Information
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="First Name"
        value={userInfo.firstName}
        onChange={(value) => onInputChange('firstName', value)}
        placeholder="Enter your first name"
        required
        error={errors.firstName}
      />
      
      <InputField
        label="Last Name"
        value={userInfo.lastName}
        onChange={(value) => onInputChange('lastName', value)}
        placeholder="Enter your last name"
        required
        error={errors.lastName}
      />
    </div>

    <div className="mt-6">
      <InputField
        label="Email Address"
        type="email"
        value={userInfo.email}
        onChange={(value) => onInputChange('email', value)}
        placeholder="your.email@example.com"
        required
        error={errors.email}
        icon={<Mail className="h-4 w-4" />}
      />
    </div>

    <div className="mt-6">
      <InputField
        label="Phone Number"
        type="tel"
        value={userInfo.phone}
        onChange={(value) => onInputChange('phone', value)}
        placeholder="+1 (555) 123-4567"
        required
        error={errors.phone}
        icon={<Phone className="h-4 w-4" />}
      />
    </div>
  </div>
);

interface AddressInfoSectionProps {
  userInfo: UserInfo;
  onInputChange: (field: keyof UserInfo, value: string) => void;
  errors: ValidationErrors;
}

const AddressInfoSection: React.FC<AddressInfoSectionProps> = ({
  userInfo,
  onInputChange,
  errors
}) => (
  <div className="bg-gradient-to-br from-purple-950/50 to-purple-900/30 backdrop-blur-sm p-6 rounded-xl border border-purple-800/30 shadow-xl">
    <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
      <MapPin className="mr-3 h-6 w-6 text-purple-400" />
      Address Information
    </h3>

    <div className="space-y-6">
      <InputField
        label="Street Address"
        value={userInfo.address}
        onChange={(value) => onInputChange('address', value)}
        placeholder="123 Main Street"
        required
        error={errors.address}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputField
          label="City"
          value={userInfo.city}
          onChange={(value) => onInputChange('city', value)}
          placeholder="New York"
          required
          error={errors.city}
        />
        
        <InputField
          label="State"
          value={userInfo.state}
          onChange={(value) => onInputChange('state', value)}
          placeholder="NY"
          required
          error={errors.state}
        />
        
        <InputField
          label="ZIP Code"
          value={userInfo.zipCode}
          onChange={(value) => onInputChange('zipCode', value)}
          placeholder="10001"
          required
          error={errors.zipCode}
        />
      </div>

      <TextAreaField
        label="Additional Notes (Optional)"
        value={userInfo.notes}
        onChange={(value) => onInputChange('notes', value)}
        placeholder="Any special instructions or notes..."
      />
    </div>
  </div>
);

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (courseId: string, quantity: number) => void;
  onRemove: (courseId: string) => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  onUpdateQuantity,
  onRemove
}) => {
  const discountedPrice = Number(item.price) - Number(item.discount);
  
  return (
    <div className="flex items-start space-x-4 p-4 bg-purple-900/30 rounded-xl border border-purple-800/20">
      <img 
        src={item.image || 'https://via.placeholder.com/60x60'} 
        alt={item.title}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-white mb-1">{item.title}</h4>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-semibold text-white">
            ${discountedPrice.toFixed(2)}
          </span>
          {item.discount > 0 && (
            <span className="text-sm text-purple-300/60 line-through">
              ${item.price}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.course_id, item.quantity - 1)}
            className="p-1 rounded-md hover:bg-purple-800/50 text-purple-300 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium px-2 text-white">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.course_id, item.quantity + 1)}
            className="p-1 rounded-md hover:bg-purple-800/50 text-purple-300 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => onRemove(item.course_id)}
            className="p-1 rounded-md hover:bg-red-900/50 text-red-400 ml-auto transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
  isProcessing: boolean;
  onUpdateQuantity: (courseId: string, quantity: number) => void;
  onRemoveItem: (courseId: string) => void;
  onSubmitOrder: () => void;
  transactionRef: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  subtotal,
  tax,
  total,
  itemCount,
  isProcessing,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
  transactionRef
}) => (
  <div className="bg-gradient-to-br from-purple-950/60 to-purple-900/40 backdrop-blur-sm p-6 rounded-xl border border-purple-800/30 shadow-xl sticky top-6">
    <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
      <ShoppingBag className="mr-3 h-6 w-6 text-purple-400" />
      Order Summary
    </h3>
    
    <div className="space-y-4 mb-6">
      {cartItems.map((item) => (
        <CartItemComponent
          key={item.course_id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemoveItem}
        />
      ))}
    </div>

    <div className="border-t border-purple-800/30 pt-4 space-y-3">
      <div className="flex justify-between text-sm text-purple-200/70">
        <span>Subtotal ({itemCount} items)</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-purple-200/70">
        <span>Tax (10%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg font-semibold text-white border-t border-purple-800/30 pt-3">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>

    <button
      onClick={onSubmitOrder}
      disabled={isProcessing || cartItems.length === 0}
      className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg shadow-purple-600/25"
    >
      {isProcessing ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating Payment...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-5 w-5" />
          Complete Payment (${total.toFixed(2)})
        </>
      )}
    </button>

    {transactionRef && (
      <div className="mt-4 p-3 bg-purple-900/40 rounded-lg">
        <p className="text-xs text-purple-300/70">
          Transaction Ref: {transactionRef}
        </p>
      </div>
    )}
  </div>
);

// Main Component
const Checkout: React.FC = () => {
  const { 
    cartItems,  
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getItemCount, 
    isLoaded 
  } = useCart() as any ;

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const [transactionRef, setTransactionRef] = useState<string>('');
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handleInputChange = (field: keyof UserInfo, value: string): void => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (paymentError) {
      setPaymentError('');
    }
  };

  const handleSubmitOrder = async (): Promise<void> => {
    const validationErrors = validateForm(userInfo);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsProcessing(true);
    setPaymentError('');
    
    try {
      const paymentData = formatPaymentData(userInfo, cartItems);
      
      console.log('Sending payment data:', paymentData);
      
      const response = await PaymentApiService.createPayment(paymentData);
      
      if (response.success && response.payment_url) {
        if (response.transaction_ref) {
          setTransactionRef(response.transaction_ref);
        }
        
        console.log('Payment created successfully:', {
          transaction_ref: response.transaction_ref,
          payment_url: response.payment_url
        });
        
        window.location.href = response.payment_url;
      } else {
        throw new Error(response.error || 'Failed to create payment');
      }
      
    } catch (error) {
      console.error('Payment creation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process payment. Please try again.';
      setPaymentError(errorMessage);
      setIsProcessing(false);
    }
  };

  if (!isLoaded) {
    return <LoadingSkeleton />;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-[#0b000f] py-8">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-purple-200/70">Complete your information to place your order</p>
        </div>

        {paymentError && <PaymentErrorAlert error={paymentError} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PersonalInfoSection
              userInfo={userInfo}
              onInputChange={handleInputChange}
              errors={errors}
            />
            
            <AddressInfoSection
              userInfo={userInfo}
              onInputChange={handleInputChange}
              errors={errors}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              tax={tax}
              total={total}
              itemCount={getItemCount()}
              isProcessing={isProcessing}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onSubmitOrder={handleSubmitOrder}
              transactionRef={transactionRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;