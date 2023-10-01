'use client';

import ProductItem from "./ProductItem";

interface ProductListProps {
    productText? : string
}
const ProductList : React.FC<ProductListProps> = ({
    productText
}) => {

    return (
        <div className={
            `
              w-full 
              p-4 
              flex 
              flex-col
              items-center
              justify-start
              md:justify-around
              md:flex-row
              md:flex-wrap
              overflow-scroll
            `
          }
      >
        {
          productText?.split(',')?.map((item:string,index:number)=>{
            return(
                <ProductItem key={index} productKey={item} />
            )
          })
        }
      </div>
    );
}

export default ProductList;