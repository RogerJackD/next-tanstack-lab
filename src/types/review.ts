export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export interface ReviewAuthor {
    id: string;
    name: string;
    avatar?: string;
    isVerifiedPurchase: boolean;
}

export interface ReviewMedia {
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
}

export interface ReviewHelpfulness {
    helpful: number;
    notHelpful: number;
    total: number;
}

export interface ReviewResponse {
    id: string;
    authorName: string;
    authorRole: 'seller' | 'support' | 'admin';
    content: string;
    createdAt: Date;
}

export interface Review {
    id: string;
    productId: string;
    orderId?: string;
    author: ReviewAuthor;
    rating: number;
    title: string;
    content: string;
    pros?: string[];
    cons?: string[];
    media: ReviewMedia[];
    status: ReviewStatus;
    helpfulness: ReviewHelpfulness;
    response?: ReviewResponse;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewSummary {
    productId: string;
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
}
