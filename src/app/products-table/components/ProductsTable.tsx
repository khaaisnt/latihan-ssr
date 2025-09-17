"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Product } from "@/app/types/product.type";
import Pagination from "@/components/molecules/pagination";

interface ProductsTableProps {
  products: Product[];
  total: number;
  currentPage: number;
  itemsPerPage: number;
  searchParams: {
    search?: string;
    category?: string;
  };
}

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export default function ProductsTable({
  products,
  total,
  currentPage,
  itemsPerPage,
  searchParams,
}: ProductsTableProps) {
  const router = useRouter();
  const params = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.search || "",
    itemsPerPage: itemsPerPage,
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const updateURL = (newParams: Record<string, string | number>) => {
    const currentParams = new URLSearchParams(params.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        currentParams.set(key, value.toString());
      } else {
        currentParams.delete(key);
      }
    });

    router.push(`/products-table?${currentParams.toString()}`);
  };

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    if (key === "search") {
      return;
    }

    if (key === "itemsPerPage") {
      updateURL({ limit: value, page: 1 });
      return;
    }

    updateURL({ [key]: value });
  };

  const handlePageChange = (newPage: number) => {
    updateURL({ page: newPage });
  };

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      updateURL({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch]);

  const totalPages = Math.ceil(total / filters.itemsPerPage);

  const getRowNumber = (index: number) => {
    return (currentPage - 1) * filters.itemsPerPage + index + 1;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products Table</h1>
        <div className="text-sm text-gray-500">Total: {total} products</div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <input
            type="text"
            placeholder="Search by title, brand, or category..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Items Per Page */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Items per page
          </label>
          <select
            value={filters.itemsPerPage}
            onChange={(e) =>
              handleFilterChange("itemsPerPage", parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getRowNumber(index)}
                  </div>
                </td>

                {/* Product Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2 text-wrap">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Brand */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {product.brand}
                  </span>
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {product.category}
                  </span>
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-600">
                    ${product.price}
                  </div>
                  {product.discountPercentage > 0 && (
                    <div className="text-xs text-red-600">
                      {product.discountPercentage}% off
                    </div>
                  )}
                </td>

                {/* Stock */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 50
                        ? "bg-green-100 text-green-800"
                        : product.stock > 10
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </td>

                {/* Rating */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock > 0 ? "Active" : "Out of Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 text-sm">
            Try adjusting your search filters
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={total}
        itemsPerPage={filters.itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}