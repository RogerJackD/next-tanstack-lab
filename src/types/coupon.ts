export type CouponType = 'percentage' | 'fixed_amount' | 'free_shipping' | 'buy_x_get_y';
export type CouponStatus = 'active' | 'inactive' | 'expired' | 'depleted';

export interface CouponUsageLimit {
    maxUses: number;
    maxUsesPerUser: number;
    currentUses: number;
}

export interface CouponConditions {
    minOrderAmount?: number;
    maxOrderAmount?: number;
    applicableProducts?: string[];
    applicableCategories?: string[];
    excludedProducts?: string[];
    excludedCategories?: string[];
    firstPurchaseOnly: boolean;
    requiresAccount: boolean;
}

export interface CouponDiscount {
    type: CouponType;
    value: number;
    maxDiscount?: number;
    buyQuantity?: number;
    getQuantity?: number;
}

export interface Coupon {
    id: string;
    code: string;
    name: string;
    description?: string;
    discount: CouponDiscount;
    conditions: CouponConditions;
    usageLimit: CouponUsageLimit;
    status: CouponStatus;
    startsAt: Date;
    expiresAt: Date;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CouponApplication {
    couponId: string;
    code: string;
    discountAmount: number;
    isValid: boolean;
    invalidReason?: string;
}
