'use client';

import { useRouter } from 'next/navigation';
import { updateProduct } from '@/app/lib/api';
import ProductForm from './ProductForm';
import { Product, ProductFormValues } from '@/app/types/product.type';

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
      await updateProduct(product.id.toString(), values);
      router.push('/products');
      router.refresh();
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product');
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