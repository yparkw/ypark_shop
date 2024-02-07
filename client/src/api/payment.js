/* eslint-disable no-unused-vars */

export const paymentClickHandler = (data, productInfo, mode, onSuccess, onFailure) => {
  const IMP = window.IMP;
  IMP.init("imp77252484");
  
  const reqPayment = (res) => {
    if (res.success) {
      // const body = {
      //   buyerAddress : res.buyer_addr,
      //   buyerName : res.buyer_name,
      //   buyerTel : res.buyer_tel,
      //   buyerPostcode : res.buyer_postcode,
      //   merchantUid : res.merchant_uid,
      //   products : productInfo.map(v => {
      //     return {
      //       "productId" : mode === 'cart' ? v.productId : v.product_id,
      //       "quantity" : mode === 'cart' ? 1 : v.quantity,
      //       "productName": mode === 'cart' ? v.name : v.name,
      //       "price" : mode === 'cart' ? v.price : v.totalPrice,
      //       "size" : mode === 'cart' ? v.size : v.size,
      //       "color" : mode === 'cart' ? v.color : v.color
      //     }
      //   })
      // }

      // orderMethod(body);
      onSuccess(res);

    }else {
      onFailure(res.error_msg);
    }
  };
  
  IMP.request_pay(data, reqPayment)
};