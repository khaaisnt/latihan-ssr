'use client';

import { useRouter } from 'next/navigation';
import { productService } from '@/app/lib/product';
import ProductForm from '../components/ProductForm';
import { ProductFormValues } from '@/app/types/product.type';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast';

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await productService.createProduct(values);
      showSuccessToast('Product created successfully!');
      router.push('/products');
      router.refresh();
    } catch (error: any) {
      showErrorToast(error.message || 'Failed to create product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}