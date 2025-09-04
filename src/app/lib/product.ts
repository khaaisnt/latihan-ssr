import axiosInstance from './axiosInstance';
import { ProductsResponse, Product } from '../types/product.type';

export const productService = {
  // GET all products
  getProducts: async (limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
    try {
      const response = await axiosInstance.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      throw new Error(error.message || 'Failed to fetch products');
    }
  },

  // GET single product
  getProduct: async (id: string): Promise<Product> => {
    try {
      const response = await axiosInstance.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw new Error(error.message || 'Failed to fetch product');
    }
  },

  // POST create product
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await axiosInstance.post<Product>('/products/add', product);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create product:', error);
      throw new Error(error.message || 'Failed to create product');
    }
  },

  // PUT update product
  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    try {
      const response = await axiosInstance.put<Product>(`/products/${id}`, product);
      return response.data;
    } catch (error: any) {
      console.error(`Failed to update product ${id}:`, error);
      throw new Error(error.message || 'Failed to update product');
    }
  },

  // DELETE product
  deleteProduct: async (id: string): Promise<Product> => {
    try {
      const response = await axiosInstance.delete<Product>(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Failed to delete product ${id}:`, error);
      throw new Error(error.message || 'Failed to delete product');
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    try {
      const response = await axiosInstance.get<ProductsResponse>(`/products/search?q=${query}`);
      return response.data;
    } catch (error: any) {
      console.error('Failed to search products:', error);
      throw new Error(error.message || 'Failed to search products');
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<ProductsResponse> => {
    try {
      const response = await axiosInstance.get<ProductsResponse>(`/products/category/${category}`);
      return response.data;
    } catch (error: any) {
      console.error(`Failed to fetch products by category ${category}:`, error);
      throw new Error(error.message || 'Failed to fetch products by category');
    }
  }
};