export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface ProductCreateDto {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}