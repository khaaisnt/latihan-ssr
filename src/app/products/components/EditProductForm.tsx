'use client';

import { useRouter } from 'next/navigation';
import { updateProduct } from '@/app/lib/api';
import ProductForm from './ProductForm';
import { Product, ProductFormValues } from '@/app/types/product.type'; 
import { showSuccessToast, showErrorToast, showLoadingToast, dismissToast } from '@/app/lib/toast';

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();

  const initialValues: ProductFormValues = {
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
    category: product.category,
  };

  const handleSubmit = async (values: ProductFormValues) => {
    const toastId = showLoadingToast('Updating product...');

    try {
      await updateProduct(product.id.toString(), values);
      dismissToast(toastId);
      showSuccessToast('Product updated successfully!');
      router.push('/products');
      router.refresh();
    } catch (error) {
      dismissToast(toastId);
      showErrorToast('Failed to update product');
      console.error('Failed to update product:', error);
    }
  };

  return (
    <ProductForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isEditing={true}
    />
  );
}