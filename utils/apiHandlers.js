import { apiGet, apiPost } from "@/utils/requestApi";

const body = {
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
  provision_key: process.env.NEXT_PUBLIC_PROVISION_KEY,
  authenticated_userid: process.env.NEXT_PUBLIC_AUTHENTICATED_USERID,
};

export function getCheck(phoneNo) {
  return apiGet("/transvisionplus/ctc/allo/member/check", { phoneNo });
}
export function getToken() {
  return apiPost("/transvisionplus/oauth2/token", body);
}

export function getProducts() {
  return apiGet("/transvisionplus/product");
}
export function apiPackageRecommendation() {
  return apiGet("/transvisionplus/product/package/recommendation");
}
export function apiDetailProduct(id) {
  return apiGet("/transvisionplus/product/detail", { id });
}
export function apiDetailPackage(id) {
  return apiPost("/transvisionplus/product/package/detail", { id });
}
export function apiPackageSearch(keyword, productId = null) {
  return apiPost("/transvisionplus/product/package/search", {
    keyword,
    [productId ? "productId" : "ProductId"]: productId,
  });
}

export function apiProvince() {
  return apiGet("/transvisionplus/site-jne/province");
}
export function apiCity(province) {
  return apiGet("/transvisionplus/site-jne/city", { province });
}
export function apiDistrict(province, city) {
  return apiGet("/transvisionplus/site-jne/district", { province, city });
}
export function apiSubDistrict(province, city, district) {
  return apiGet("/transvisionplus/site-jne/subdistrict", {
    province,
    city,
    district,
  });
}
export function apiZipCode(province, city, district, subdistrict) {
  return apiGet("/transvisionplus/site-jne/zipcode", {
    province,
    city,
    district,
    subdistrict,
  });
}

export function apiCourier() {
  return apiGet("/transvisionplus/courier");
}
export function apiCourierRate(email, customer_address_id, courier, weight) {
  return apiPost("/transvisionplus/courier/rate", {
    email,
    customer_address_id,
    courier,
    weight,
  });
}

export function apiCustomerDetail(email) {
  return apiPost("/transvisionplus/customer/detail", { email });
}
export function apiNewAddress(
  email,
  customer_address_id,
  customer_address,
  customer_subdistrict,
  customer_district,
  customer_city,
  customer_province,
  customer_zipcode,
  customer_street,
  address_category,
  main_address,
  receiver_fullname,
  receiver_phone_number
) {
  return apiPost("/transvisionplus/customer/address/save", {
    email,
    customer_address_id,
    customer_address,
    customer_subdistrict,
    customer_district,
    customer_city,
    customer_province,
    customer_zipcode,
    customer_street,
    address_category,
    main_address,
    receiver_fullname,
    receiver_phone_number,
  });
}
export function apiRemoveAddress(email, customer_address_id) {
  return apiPost("/transvisionplus/customer/address/delete", {
    email,
    customer_address_id,
  });
}

export function apiPaymentMethod() {
  return apiGet("/transvisionplus/order/payment-method");
}
export function apiTransactionHistory(page, email, end_date, start_date) {
  return apiPost("/transvisionplus/order/transaction-history", {
    page,
    email,
    end_date,
    start_date,
  });
}
export function apiHistoryDetailXstream(email, transaction_id) {
  return apiPost("/transvisionplus/xstream/transaction-history/detail", {
    email,
    transaction_id,
  });
}
export function apiTransactionTracking(email, transaction_id) {
  return apiPost("/transvisionplus/xstream/transaction-tracking", {
    email,
    transaction_id,
  });
}

export function apiReviewTransaction(
  PackageId,
  TransactionId,
  Star,
  Description
) {
  return apiPost("/transvisionplus/review/save", {
    PackageId,
    TransactionId,
    Star,
    Description,
  });
}

export function apiXstreamInvoice(PaymentCode) {
  return apiPost("/transvisionplus/xstream/invoice", { PaymentCode });
}
export function apiPaymentInquiry(body) {
  return apiPost("/transvisionplus/payment/inquiry", body);
}
export function apiCreateOrderXstream(body) {
  return apiPost("/transvisionplus/xstream/order", body);
}
export function apiCheckOrder(order_id) {
  return apiGet("/transvisionplus/payment/check", { order_id });
}
export function apiXstreamAccountInfo(email) {
  return apiGet("/transvisionplus/xstream/account-info", { email });
}
export function apiXstreamActivation(body) {
  return apiPost("/transvisionplus/xstream/activation", body);
}
export function apiMinipackPackage(package_id) {
  return apiGet("/transvisionplus/minipack", { package_id });
}
export function apiCreateOrderMinipack(body) {
  return apiPost("/transvisionplus/minipack/order", body);
}
export function apiMinipackVoucherActivation(body) {
  return apiPost("/transvisionplus/minipack/activation", body);
}
export function apiMinipackVoucher(body) {
  return apiPost("/transvisionplus/minipack/activation", body);
}
export function apiXstreamReprocess(body) {
  return apiPost("/transvisionplus/minipack/activation", body);
}

export async function getSampleTodo() {
  const data = await apiGet("https://jsonplaceholder.typicode.com/todos/1");
  return data;
}
