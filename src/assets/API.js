export const port = '3333';
export const http = `http://localhost:${port}`;



//category {
export const GETCategories = `${http}/category/categories`
export const DELCategories = `${http}/category/category`
export const PUTCategories = `${http}/category/category`
export const POSTAddCategories = `${http}/category/admin/category`
// } category


//product {
export const GETProducts = `${http}/product`;
export const POSTProduct = `${http}/product`;
export const GETProduct = `${http}/product`;
export const PUTProduct = `${http}/product`;
export const DELProduct = `${http}/product`;
// } product


// color {
export const GETColors = `${http}/color`;
// } color


// size {
export const GETSizes = `${http}/size`;
// } size

// Product_size_color {
export const GETProduct_Size_Color = `${http}/product-size-color`;
export const POSTProduct_Size_Color = `${http}/product-size-color`;
export const PUTProduct_Size_Color = `${http}/product-size-color`;
// } Product_size_color