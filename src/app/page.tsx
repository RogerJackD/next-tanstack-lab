'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProducts } from "@/hooks/use-users";
import { useCounterStore } from "@/stores/counterStore";
import Image from "next/image";
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

      <div>
        <Table>
          <TableCaption>
            Total {products.length} Productos
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="w-25">Imagen</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="group hover:bg-muted/50 transition-colors duration-200"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground py-4">
                    #{product.id}
                  </TableCell>
                  <TableCell className="font-semibold text-sm py-4">
                    {product.title}
                  </TableCell>
                  <TableCell className="max-w-md py-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className="inline-flex items-center justify-center font-semibold text-sm tabular-nums">
                      ${product.price.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
