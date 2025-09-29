export const BASE_URL = 'http://localhost:8080/api/v1.0'
const CLOUDINARY_NAME = 'djfje4rmj'

const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  GET_USER_INFO: '/profile',

  GET_ALL_CATEGORIES: '/category',
  ADD_CATEGOTY: '/category',
  UPDATE_CATEGORY: (categoryId) => `/category/${categoryId}`,
  CATEGORY_BY_TYPE: (type) => `/category/${type}`,

  // income
  GET_ALL_INCOMES: '/incomes',
  ADD_INCOMES: '/incomes',
  DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,

  // expense
  GET_ALL_EXPENSES: '/expenses',
  ADD_EXPENSES: '/expenses',
  DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,

  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
}

export { API_ENDPOINTS }
