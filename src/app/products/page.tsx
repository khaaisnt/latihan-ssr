import { getProducts } from '../lib/api';
import ProductList from './components/ProductList';
import Link from 'next/link';

export default async function ProductsPage() {
  // Fetch data di server side
  const data = await getProducts();
  const products = data.products;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/products/create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Add New Product
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  );
}

// Optional: Generate metadata
export const metadata = {
  title: 'Products - DummyJSON',
  description: 'List of products from DummyJSON API',
};