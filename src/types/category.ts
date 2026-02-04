export type CategoryStatus = 'active' | 'inactive' | 'archived';

export interface CategoryMetadata {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
}

export interface CategoryImage {
    url: string;
    alt: string;
    width: number;
    height: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
    children?: Category[];
    image?: CategoryImage;
    icon?: string;
    status: CategoryStatus;
    sortOrder: number;
    productCount: number;
    metadata: CategoryMetadata;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryTree extends Category {
    level: number;
    path: string[];
    isLeaf: boolean;
}
