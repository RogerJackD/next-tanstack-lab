import { Product } from "@/types/product"


export const ProductService = {
    async getAllProducts(): Promise<Product[]>{
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if( !response.ok ) {
            let errorMessage = `Error ${response.status}: ${response.statusText}`;
            
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData;

            } catch {
               console.log("error unexpected, check servers logs");
            }

            throw new Error(errorMessage);
        };

        return await response.json();

    },
    async CreateProduct(productData: Product): Promise<Product[]>{
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        if( !response.ok ) {
            let errorMessage = `Error ${response.status}: ${response.statusText}`;
            
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData;

            } catch {
               console.log("error unexpected, check servers logs");
            }

            throw new Error(errorMessage);
        };

        return await response.json();

    }

};