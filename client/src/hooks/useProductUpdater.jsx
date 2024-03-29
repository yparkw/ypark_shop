import { productImageRegisterFn, productUpdateFn } from "../api";

export default function useProductUpdater() {
  const updateProduct = async (productInfo, thumbImage) => {
    try {
      // 이미지 업로드 로직
      const imageFormData = new FormData();
      // thumbImage.forEach((image, index) => {
      //   imageFormData.append(`thumb_images[${index}]`, image);
      // });
      console.log('productInfo', productInfo, thumbImage);
      

      imageFormData.append('image', thumbImage[0]);
      console.log('image', imageFormData.get('image'))

      const imageUploadResponse = await productImageRegisterFn(imageFormData);

      if (imageUploadResponse.status === 201) {
        // 상품 등록 로직
        console.log('url', imageUploadResponse.data.url);
        const fullImageUrl = imageUploadResponse.data.url;
        const updatedProductInfo = {
          ...productInfo,
          image_url: fullImageUrl,
        };

        const productUpdateResponse = await productUpdateFn(updatedProductInfo);

        console.log("Image Upload Response:", imageUploadResponse);
        console.log("Product Register Response:", productUpdateResponse);
        
        if (productUpdateResponse.status === 200) {
          return true;
        }
      }
    } catch (error) {
      console.error("An error occurred during the registration process", error);
      return false;
    }
  };
  return {
    updateProduct
  };
}