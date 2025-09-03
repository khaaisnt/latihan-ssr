'use client';

import { useRouter } from 'next/navigation';
import { createProduct } from '@/app/lib/api';
import ProductForm from '../components/ProductForm';
import { ProductFormValues } from '@/app/types/product.type'; 
import { showSuccessToast, showErrorToast, showLoadingToast, dismissToast } from '@/app/lib/toast';

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (values: ProductFormValues) => {
    const toastId = showLoadingToast('Creating product...');

    try {
      await createProduct(values);
      dismissToast(toastId);
      showSuccessToast('Product created successfully!');
      router.push('/products');
      router.refresh();
    } catch (error) {
      dismissToast(toastId);
      showErrorToast('Failed to create product');
      console.error('Failed to create product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}