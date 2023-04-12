export const baseUrl="http://localhost:3001";

// products
export const allProducts="/products/all";

export const latestProducts="/products/latest";

export const getOneProduct="/products/get/one";

export const updateOneProduct="/products/update/one";

export const addOneProduct="/products/add/one";

export const getProductsFromMerchant="/products/get/own_by_merchant";

export const deleteOneProduct="/products/delete/one";


//users
export const getOneUser="/users/info/one";

export const registerOneUser="/users/register/one";

export const userLogin="/users/login";

export const updateOneUser="/users/update/one";

export const updateOneShoppingCart="/users/update/shoppingcart/one";

export const fetchOneShoppingCart="/users/get/shoppingcart/one";


//orders
export const addOneOrder="/orders/add/one";

export const getOrdersFromOneUser="/orders/get/all/oneUser";


//transaction
export const addOneTransaction="/transaction/add/one";

export const getOneTranscationFromOneOrder="/transaction/get/one/fromOneOrder";

export const getTranscationFromSameOrder="/transaction/get/one/fromSameOrder";

export const getTranscationFromSameMerchant="/transaction/get/one/fromSameMerchant";

export const updateOneTransaction="/transaction/update/one";
