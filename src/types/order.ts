export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    subtotal: number;
}

export interface ShippingInfo {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    carrier: string;
    trackingNumber?: string;
    estimatedDelivery?: Date;
}

export interface PaymentInfo {
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
    paidAt?: Date;
}

export interface Order {
    id: string;
    userId: string;
    orderNumber: string;
    items: OrderItem[];
    status: OrderStatus;
    shipping: ShippingInfo;
    payment: PaymentInfo;
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
