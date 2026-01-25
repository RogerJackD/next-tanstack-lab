'use client'
import { useProducts } from "@/hooks/use-users";
// import { ProductService } from "@/services/product.service";
// import { Product } from "@/types/product";
// import { useEffect, useState } from "react";

export default function Home() {

  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {

  //   const handleFetchProducts = async () => {
  //     const data = await ProductService.getAllProducts();
  //     setProducts(data);
  //   };
  //   handleFetchProducts();
  // }, []);

  const {data: products = [], isLoading } = useProducts();

  if( isLoading ) return <div>Cargamdo...</div>;

  return (
    <div>
      <h1 className="text-center">Welcome to My Next.js App</h1>
      <div>
        {
          products.map((product)=> (
            <p className="text-2xl border-2 rounded-2xl text-center font-black bg-gray-50 shadow-2xl" key={product.id}>{product.title}</p>
          ))
        }
      </div>
    </div>
  );
}
