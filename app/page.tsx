"use client";

import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import ProductList from "@/components/Product/ProductList";

export default function Home() {
  const [productText, setProductText] = useState("");
  const [fetchData,setFetchData] = useState(false);

  function onDataChanged(value: string) {
    setProductText(value);
  }

  function onSubmitButtonClicked(){
    setFetchData(true);
  }

  function onResetButtonClicked(){
    setFetchData(false);
    setProductText('');
  }

  return (
    <div
      className="
        w-screen 
        h-screen 
        border-2 
        overflow-y-scroll
        flex
        flex-col
        items-center
        justify-start
      "
    >
      {/* Header  */}
      <div
        className="
          flex-ratio-5
          w-full
          flex
          flex-col
          items-start
          justify-start
        "
      >
        <Header text="Product Scraper" />
        <button
        onClick={onResetButtonClicked}
          type="submit"
          className={`
            m-2 
            inline-flex 
            items-center 
            text-xl 
            px-3 
            py-2 
            font-medium 
            text-center 
            text-white 
            bg-green-500
            focus:ring-green-200
            hover:bg-green-300 
            rounded 
            focus:ring-4 
        `}
      >
        Reset
      </button>
      </div>
      {/* Header  */}
      <div
        className="
          flex-ratio-10
          w-full
          flex
          items-start
          justify-start
        "
      >
        <Input
          label="Product ID(s)"
          value={productText}
          type="text"
          actionButtonDisabled={productText?.length > 0 ? false : true}
          required={true}
          onAction={onDataChanged}
          onSubmit={onSubmitButtonClicked}
        />
      </div>
      {/* List  */}
      <div
        className={`
          flex-ratio-85
          my-2
          w-full
          flex
          flex-col
          items-center
          justify-start
          overflow-scroll
        `}
      >
      
        {
          fetchData &&
          <ProductList productText={productText}/>
        }
      </div>
    </div>
  );
}
