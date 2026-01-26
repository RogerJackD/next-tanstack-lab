'use client'
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-users";
import { useCounterStore } from "@/stores/counterStore";
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

  const { count, increment, decrement, reset} = useCounterStore();

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

        <br />
        <br />

      <div>
        {count}
      </div>

      <Button onClick={increment}>
        +1
      </Button>
      <Button onClick={decrement}>
        -1
      </Button><Button onClick={reset}>
        reset 
      </Button>
    </div>
  );
}
