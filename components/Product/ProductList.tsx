'use client';

import ProductItem, { ProductItemView } from "./ProductItem";

interface ProductListProps {
    responseData? : any
}
const ProductList : React.FC<ProductListProps> = ({
    responseData
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
          responseData?.data?.map((item:ProductItemView,index:number)=>{
            return(
                <ProductItem key={index} itemData={item} />
            )
          })
        }
      </div>
    );
}

export default ProductList;