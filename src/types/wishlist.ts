export type WishlistVisibility = 'private' | 'public' | 'shared';
export type WishlistItemPriority = 'low' | 'medium' | 'high' | 'must_have';

export interface WishlistItemPriceAlert {
    enabled: boolean;
    targetPrice: number;
    alertTriggered: boolean;
    triggeredAt?: Date;
}

export interface WishlistItem {
    id: string;
    productId: string;
    productTitle: string;
    productImage: string;
    productPrice: number;
    priority: WishlistItemPriority;
    notes?: string;
    priceAlert: WishlistItemPriceAlert;
    addedAt: Date;
}

export interface WishlistCollaborator {
    userId: string;
    name: string;
    avatar?: string;
    canEdit: boolean;
    addedAt: Date;
}

export interface Wishlist {
    id: string;
    userId: string;
    name: string;
    description?: string;
    visibility: WishlistVisibility;
    items: WishlistItem[];
    collaborators: WishlistCollaborator[];
    isDefault: boolean;
    shareToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface WishlistSummary {
    id: string;
    name: string;
    itemCount: number;
    totalValue: number;
    visibility: WishlistVisibility;
}
