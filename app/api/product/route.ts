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
        const title = $('#productTitle').text().trim();
        let mainPrice = '';
        let mainPriceDiv = $('#corePriceDisplay_desktop_feature_div > .a-section.a-spacing-none.aok-align-center > .a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > .a-offscreen');
        if(typeof mainPriceDiv === 'object' &&
            mainPriceDiv.hasOwnProperty('0'))
        {
            mainPrice = mainPriceDiv['0']?.children?.at(0)?.data || '' ;
        }
        const image = $('#landingImage').attr('src');
        const dealText = $("#dealBadgeSupportContent_feature_div > span > .a-size-base.dealBadgeSupportingText.a-text-bold").text();
        const mainMerchant = $("#merchant-info > .a-link-normal > span").eq(0).text();
        const seller1Price = $("#mbc-price-1").text();
        const seller1Name = $('#mbc-sold-by-1 > .a-size-small.mbcMerchantName').text();
        const seller2Price = $("#mbc-price-2").text();
        const seller2Name = $('#mbc-sold-by-2 > .a-size-small.mbcMerchantName').text();
        const seller3Price = $("#mbc-price-3").text();
        const seller3Name = $('#mbc-sold-by-3 > .a-size-small.mbcMerchantName').text();
        const availability = $('#availability > span').text().trim();

        const data = {
          title,
          mainPrice,
          image,
          dealText,
          availability,
          mainMerchant,
          seller1Name,
          seller1Price,
          seller2Name,
          seller2Price,
          seller3Name,
          seller3Price,
        };

        return {
          ...data,
          productKey: url,
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