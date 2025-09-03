'use client';

import { useRouter } from 'next/navigation';
import { createProduct } from '@/app/lib/api'; 
import ProductForm from '../components/ProductForm';
import { ProductFormValues } from '@/app/types/product.type';

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await createProduct(values);
      router.push('/products');
      router.refresh();
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Failed to create product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}