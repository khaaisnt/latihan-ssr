import ProductsTable from "./components/ProductsTable";
import { productService } from "@/app/lib/product";

interface ProductsTablePageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
  };
}

export default async function ProductsTablePage({
  searchParams,
}: ProductsTablePageProps) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");

  const skip = (page - 1) * limit;

  let productsData;

  try {
    if (searchParams.search) {
      productsData = await productService.searchProducts(searchParams.search);
    } else if (searchParams.category) {
      productsData = await productService.getProductsByCategory(
        searchParams.category
      );
    } else {
      productsData = await productService.getProducts(limit, skip);
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductsTable
          products={productsData.products}
          total={productsData.total}
          currentPage={page}
          itemsPerPage={limit}
          searchParams={searchParams}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
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

export const metadata = {
  title: "Latihan SSR - Products Table",
  description: "View all products in a structured table format",
};
