export const port = '3333';
export const http = `http://localhost:${port}`;

//category {
export const GetCategories = `${http}/category/categories`
export const DELCategories = `${http}/category/category`
export const PUTCategories = `${http}/category/category`
export const POSTAddCategories = `${http}/category/admin/category`
// } category


// color {
export const GetColors = `${http}/color`;
// } color


// size {
export const GetSizes = `${http}/size`;
// } size

// Product_size_color {
export const GetProduct_Size_Color = `${http}/product-size-color`;
export const POSTProduct_Size_Color = `${http}/product-size-color`;
export const PUTProduct_Size_Color = `${http}/product-size-color`;
// } Product_size_color