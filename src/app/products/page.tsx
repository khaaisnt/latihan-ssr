import ProductsList from './components/ProductList';
import { productService } from '@/app/lib/product';
import { getServerCookie } from '@/app/helper/serverCookies';

interface ProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const token = await getServerCookie('accessToken');
  
  if (!token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <h2 className="font-bold">Authentication Required</h2>
          <p>Please login to access products page.</p>
        </div>
      </div>
    );
  }

  const page = parseInt(searchParams.page || '1');
  const limit = parseInt(searchParams.limit || '10');
  const skip = (page - 1) * limit;
  
  let productsData;

  try {
    if (searchParams.search) {
      productsData = await productService.searchProducts(searchParams.search);
    } else if (searchParams.category) {
      productsData = await productService.getProductsByCategory(searchParams.category);
    } else {
      productsData = await productService.getProducts(limit, skip);
    }

    return (
      <ProductsList
        products={productsData.products}
        total={productsData.total}
        currentPage={page}
        limit={limit}
        searchParams={searchParams}
      />
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="font-bold">Error</h2>
          <p>Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }
}