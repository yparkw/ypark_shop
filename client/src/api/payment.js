/* eslint-disable no-unused-vars */

export const paymentClickHandler = (data, productInfo, mode, onSuccess, onFailure) => {
  const IMP = window.IMP;
  IMP.init("imp64353736");
  
  const reqPayment = (res) => {
    if (res.success) {

      onSuccess(res);

    }else {
      onFailure(res.error_msg);
    }
  };
  
  IMP.request_pay(data, reqPayment)
};