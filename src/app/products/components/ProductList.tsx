'use client';

import { Product } from '@/app/types/product.type';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/app/lib/api';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(id.toString());
      alert('Product deleted successfully!');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl font-bold text-green-600">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500">
                {product.stock} in stock
              </span>
            </div>
            <div className="flex items-center mb-3">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600">
                {product.rating}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600">{product.brand}</span>
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/products/edit/${product.id}`}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 px-4 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}