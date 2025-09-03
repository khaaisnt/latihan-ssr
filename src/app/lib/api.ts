import axios from 'axios';
import { Product, ProductsResponse } from '../types/product.type';

const API_BASE_URL = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// GET all products
export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>('/products');
  return response.data;
};

// GET single product
export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// POST create product
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.post<Product>('/products/add', product);
  return response.data;
};

// PUT update product
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, product);
  return response.data;
};

// DELETE product
export const deleteProduct = async (id: string): Promise<Product> => {
  const response = await api.delete<Product>(`/products/${id}`);
  return response.data;
};