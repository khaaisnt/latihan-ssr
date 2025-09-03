import { getProduct } from '@/app/lib/api';
import EditProductForm from '../../components/EditProductForm';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  // Fetch product data di server side
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
}