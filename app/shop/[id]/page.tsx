import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { products } from "@/data/products";
import AddToCartButton from "@/components/ui/AddToCartButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">

      <div className="grid gap-12 lg:grid-cols-2">

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-pink-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>


        {/* Product Information */}
        <div className="flex flex-col justify-center">

          <p className="text-sm font-semibold uppercase tracking-wide text-pink-500">
            {product.category}
          </p>


          <h1 className="mt-3 text-4xl font-bold text-gray-900">
            {product.name}
          </h1>


          {/* Rating */}
          <div className="mt-4 flex items-center gap-1">

            {[...Array(product.rating)].map((_, index) => (
              <Star
                key={index}
                size={18}
                fill="currentColor"
                className="text-yellow-500"
              />
            ))}

            <span className="ml-2 text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>

          </div>


          {/* Price */}
          <p className="mt-6 text-3xl font-bold text-pink-500">
            ${product.price.toFixed(2)}
          </p>


          {/* Description */}
          <p className="mt-6 leading-7 text-gray-600">
            {product.details}
          </p>


          {/* Stock */}
          <p className="mt-6 font-medium text-green-600">
            ✓ {product.stock}
          </p>


          {/* Cart Button */}
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

        </div>

      </div>

    </main>
  );
}