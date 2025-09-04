"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Product } from "@/app/types/product.type";
import Link from "next/link";
import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/app/lib/toast";
import { deleteProduct } from "@/app/lib/api";

interface ProductsListProps {
  products: Product[];
  total: number;
  currentPage: number;
  limit: number;
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
  };
}

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
  { value: "smartphones", label: "Smartphones" },
  { value: "laptops", label: "Laptops" },
  { value: "fragrances", label: "Fragrances" },
  { value: "skincare", label: "Skincare" },
  { value: "groceries", label: "Groceries" },
  { value: "home-decoration", label: "Home Decoration" },
];

const LIMIT_OPTIONS = [10, 20, 30, 50];

export default function ProductsList({
  products,
  total,
  currentPage,
  limit,
  searchParams,
}: ProductsListProps) {
  const router = useRouter();
  const params = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.search || "",
    category: searchParams.category || "",
    limit: parseInt(searchParams.limit || "10"),
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const toastId = showLoadingToast("Deleting product...");

    try {
      await deleteProduct(id.toString());
      dismissToast(toastId);
      showSuccessToast("Product deleted successfully!");
      router.refresh(); // Refresh the page to get updated data
    } catch (error) {
      dismissToast(toastId);
      showErrorToast("Failed to delete product");
      console.error("Failed to delete product:", error);
    }
  };

  const debouncedSearch = useDebounce(filters.search, 500);

  const updateURL = (newParams: Record<string, string>) => {
    const currentParams = new URLSearchParams(params.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });

    router.push(`/products?${currentParams.toString()}`);
  };

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    if (key === "search") {
      return;
    }

    updateURL({ [key]: value.toString(), page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateURL({ page: newPage.toString() });
  };

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      updateURL({ search: debouncedSearch, page: "1" });
    }
  }, [debouncedSearch]);

  const totalPages = Math.ceil(total / limit);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 border rounded ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    );

    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <Link
            href="/products/create"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add New Product
          </Link>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Show Entries */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show entries
            </label>
            <select
              value={filters.limit}
              onChange={(e) =>
                handleFilterChange("limit", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LIMIT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="text-sm text-red-600 line-through">
                      $
                      {(
                        product.price /
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock} in stock
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {product.brand}
                  </span>
                  <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/products/edit/${product.id}`}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 px-3 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-gray-700">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, total)} of {total} products
            </div>

            <div className="flex space-x-2">{renderPagination()}</div>
          </div>
        )}

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
