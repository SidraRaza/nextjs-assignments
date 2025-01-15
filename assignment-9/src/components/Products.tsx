import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

async function fetchProductList() {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
}

export default async function ProductList() {
  let products: Product[] = [];
  try {
    products = await fetchProductList();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Discover the Latest Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-red-500">
            No products available. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const maxDescriptionLength = 100;
  const description =
    product.description.length > maxDescriptionLength
      ? product.description.substring(0, maxDescriptionLength) + "..."
      : product.description;

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 group">
      <Link href={`./products/${product.id}`} className="block relative">
        <Image
          src={product.image}
          alt={product.title}
          width={350}
          height={450}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-lg font-semibold text-white">{product.title}</p>
        </div>
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-100 truncate mb-2">
          {product.title}
        </h2>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-green-400">${product.price.toFixed(2)}</p>
          <div className="flex items-center text-yellow-400">
            <span className="text-sm font-medium mr-1">{product.rating.rate}</span>
            <span>&#9733;</span>
          </div>
        </div>
      </div>
      <Link
        href={`./products/${product.id}`}
        className="block w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-center py-3 rounded-b-lg font-medium hover:scale-105 transition-transform duration-300"
      >
        View Details
      </Link>
    </div>
  );
}
