'use client';

import { useRouter } from 'next/navigation';
import { productService } from '@/app/lib/product';
import ProductForm from './ProductForm';
import { Product, ProductFormValues } from '@/app/types/product.type';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast';

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
    try {
      await productService.updateProduct(product.id.toString(), values);
      showSuccessToast('Product updated successfully!');
      router.push('/products');
      router.refresh();
    } catch (error: any) {
      showErrorToast(error.message || 'Failed to update product');
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