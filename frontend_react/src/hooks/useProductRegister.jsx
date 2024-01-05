import { productImageRegisterFn, productRegisterFn } from "../api";

export default function useProductRegister() {
  const postProduct = async (productInfo, thumbImage) => {
    try {
      // 이미지 업로드 로직
      const imageFormData = new FormData();
      // thumbImage.forEach((image, index) => {
      //   imageFormData.append(`thumb_images[${index}]`, image);
      // });

      imageFormData.append('thumb_images', thumbImage);

      const imageUploadResponse = await productImageRegisterFn(imageFormData);

      if (imageUploadResponse.status === 200) {
        // 상품 등록 로직
        const updatedProductInfo = {
          ...productInfo,
          thumb_image_url: imageUploadResponse.data.url,
        };

        const productRegisterResponse = await productRegisterFn(updatedProductInfo);

        console.log("Image Upload Response:", imageUploadResponse);
        console.log("Product Register Response:", productRegisterResponse);
        
        if (productRegisterResponse.status === 200) {
          return true;
        }
      }
    } catch (error) {
      console.error("An error occurred during the registration process", error);
      return false;
    }
  };
  return {
    postProduct
  };
}