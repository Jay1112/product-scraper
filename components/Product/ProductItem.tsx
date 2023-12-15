'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface ProductItemView {
    Seller_1 : string,
    SL_1 : string,
    Deal_Text : string,
    Seller_2 : string,
    SL_2 : string,
    Seller_3 : string,
    SL_3 : string,
}

interface ProductItemProps {
    itemData? : ProductItemView
}

const  ProductItem : React.FC<ProductItemProps> = ({
    itemData
}) => {

    console.log(itemData);

    const styleObj = {
        boxShadow : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }

    return (
    <div className="p-2 rounded-lg w-full md:w-2/5 mx-2 my-4 flex flex-col md:flex-row justify-center items-stretch" style={styleObj}>
        {/* <div className="p-2 flex flex-col items-center justify-around my-2">
            <Image src={itemData?.image || ''} width={250} height={250} alt={"product"} />
            <span className="cursor-pointer bg-rose-500 text-white p-4 font-semibold rounded">
                <Link target="_blank" href={`https://www.amazon.in/dp/${itemData?.productKey}`} >
                    {itemData?.productKey}
                </Link>
            </span>
        </div> */}
        <div className="p-2 flex-1 ">
            {/* <div className="pr-2 w-full flex items-center justify-center my-2 px-2">
                <p className="text-justify font-semibold">{itemData?.title}</p>
            </div> */}
            <div className="pr-2 w-full flex items-center justify-center my-2 px-2">
                <p className="w-full text-left font-semibold">Deal : <span className="font-normal">{itemData?.Deal_Text}</span></p>
            </div>
            <div className="w-full flex items-center justify-center px-2">
                <div className="w-4/5 flex flex-col items-center justify-center my-2">
                    <p className="w-full text-left font-semibold">Main Merchant</p>
                    <p className="w-full text-left font-normal">{itemData?.Seller_1}</p>
                </div>
                <div className="w-4/5 flex flex-col items-center justify-center my-2">
                    <p className="w-full text-left font-semibold">Main Price</p>
                    <p className="w-full text-left font-normal">{itemData?.SL_1}</p>
                </div>
            </div>
            <div className="w-full flex items-center justify-center px-2">
                <div className="w-4/5 flex flex-col items-center justify-center my-2">
                    <p className="w-full text-left font-semibold">Seller-1</p>
                    <p className="w-full text-left font-normal">{itemData?.Seller_2}</p>
                </div>
                <div className="w-4/5 flex flex-col items-center justify-center my-2">
                    <p className="w-full text-left font-semibold">Seller-1 Price</p>
                    <p className="w-full text-left font-normal">{itemData?.SL_2}</p>
                </div>
            </div>
            <div className="w-full flex items-center justify-center px-2">
                <div className="w-4/5 flex flex-col items-center justify-center my-2">
                    <p className="w-full text-left font-semibold">Seller-2</p>
                    <p className="w-full text-left font-normal">{itemData?.Seller_3}</p>
                </div>
                <div className="w-4/5 flex flex-col items-center justify-center my-2">
                    <p className="w-full text-left font-semibold">Seller-2 Price</p>
                    <p className="w-full text-left font-normal">{itemData?.SL_3}</p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ProductItem;