import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Login Disek Cak!</h1>
      <Link href={"/login"} className="mt-6">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 animate-bounce cursor-pointer">
          Klik Aku!
        </button>
      </Link>
    </div>
  );
}
