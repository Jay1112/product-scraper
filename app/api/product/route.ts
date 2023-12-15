import { NextResponse } from 'next/server';
import pMap from 'p-map';
import cheerio from 'cheerio-httpcli';
 
type ResponseData = {
  message: string
}
 
export function GET() {
  return NextResponse.json("test",{status : 200});
}

export async function POST(req : any,res  :any){
  let payload = await req.json();
  if (!payload.urls) {
    return NextResponse.json({ 
      success : false,
      message : 'Invalid Request', 
      data    : null
    },{ status : 400 });
  }

  const urls = payload.urls.split(',');

  let responseData = [];

  const concurrency = 5; // Set the number of concurrent requests

  try {
    const finalData = await pMap(
      urls,
      async (url) => {
        const { $ } = await cheerio.fetch(`https://www.amazon.in/dp/${url}`);
            const Seller_1 = $("#merchant-info > .a-link-normal").text();
            const SL_1 = $("#corePriceDisplay_desktop_feature_div > .a-section.a-spacing-none.aok-align-center > .a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay");
            let realPrice = '';
            $(SL_1).each((index, element) => {
                const price = $(element).text();
                const priceArr = price.split('₹');
                realPrice = priceArr.length > 1 ? priceArr[1] : '-';
            });
            const Deal_Text = $("#dealBadgeSupportingText > span").eq(0).text();
            const SL_2 = $("#mbc-price-1").text().trim();
            const Seller_2 = $("#mbc-sold-by-1 > .a-size-small.mbcMerchantName").text().trim();
            const SL_3 = $("#mbc-price-2").text().trim();
            const Seller_3 = $("#mbc-sold-by-2 > .a-size-small.mbcMerchantName").text().trim();
        
            const data = {
                Seller_1,
                SL_1 : realPrice,
                Deal_Text,
                Seller_2,
                SL_2,
                Seller_3,
                SL_3
            };
        
            return {
                success : true,
                ...data,
            };
      },
      { concurrency } // Pass the concurrency limit to pMap
    );

    responseData = finalData.filter((data) => data !== undefined);

    return NextResponse.json({ 
      success : true,
      message: 'Data Extracted Successfully',
      data    : responseData
    },{ status : 200 });

  } catch (err  :any) {
    NextResponse.json({
      success: false,
      message: err.message,
      data: null,
    },{ status : 400 });
  }
}