import { productService } from '@/app/lib/product';
import EditProductForm from '../../components/EditProductForm';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  try {
    const product = await productService.getProduct(params.id);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
          <EditProductForm product={product} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">Error</h2>
          <p>Product not found or failed to load.</p>
        </div>
      </div>
    );
  }
}