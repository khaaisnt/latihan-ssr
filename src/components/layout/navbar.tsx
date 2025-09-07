"use client";

import { showErrorToast, showSuccessToast } from "@/app/lib/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const removeClientCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      removeClientCookie("accessToken");
      removeClientCookie("refreshToken");

      localStorage.removeItem("user");

      showSuccessToast("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      showErrorToast("Failed to logout");
    }
  };

  return (
    <div className="w-full bg-sky-600 text-white p-4 flex justify-between">
      <div className="flex items-center gap-10">
        <h1 className="text-lg font-bold">Madura Central Store</h1>
        <div className="text-sm font-medium">
          <Link href="/products" className="hover:underline">
            Products List
          </Link>
          <span className="mx-2">|</span>
          <Link href="/products-table" className="hover:underline">
            Products Table
          </Link>
        </div>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded-sm hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
