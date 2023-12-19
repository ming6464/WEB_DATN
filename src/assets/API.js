const port = '3333';
//export const http = `http://localhost:${port}`;
export const http = `http://13.239.10.85:3333`;

//customer
export const GETCustomer = `${http}/customer`
export const GETOrdersByIDCustomer = `${http}/order/admin`
export const GETCustomerByid = (id) => `${http}/customer/:id`
//customer

//category {
export const GETCategories = `${http}/category/categories`
export const DELCategories = `${http}/category/category`
export const PUTCategories = `${http}/category/category`
export const POSTAddCategories = `${http}/category/admin/category`
// } category


//product {
export const GETProducts = `${http}/product`;
export const GETProductsAdmin = `${http}/product/admin`;
export const POSTProduct = `${http}/product`;
export const GETProduct = `${http}/product`;
export const PUTProduct = `${http}/product`;
export const DELProduct = `${http}/product`;
export const PUTRestoreProduct = `${http}/product/admin/restore`;

// sale {

// } Sale
export const PUTSale = `${http}/product/sale`;

// filter {

// } Filter
export const GETFilter = `${http}/product/filter`;
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

//account {
export const GETAccounts = `${http}/admin`;
export const GETAccount = `${http}/admin`;
export const POSTAccount = `${http}/admin/signup`;
export const PUTAccount = `${http}/admin`;
export const DELAccount = `${http}/admin`;
export const PUTRestoreAccount = `${http}/admin/restore`;
export const SignIn = `${http}/admin/signin`;
// } account


// statistics{
export const statistics = `${http}/statistics`;
// } statistics


// Order {
export const GETOrders = `${http}/order`;
export const PUTStatusOrder = `${http}/order/status-order`;
export const GETDetailOrder = `${http}/order/admin/`;

// } order