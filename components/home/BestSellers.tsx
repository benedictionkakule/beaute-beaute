import ProductCard from "../ui/ProductCard";
import SectionTitle from "../ui/SectionTitle";
import { products } from "@/data/products";

export default function BestSellers() {
  return (
    <section className="bg-[#FFF8F5] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          title="Best Sellers"
          subtitle="Customer favorites you'll love."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

         {products.map((product) => (
  <ProductCard
  key={product.id}
  id={product.id}
  name={product.name}
  description={product.description}
  price={product.price}
  image={product.image}
/>
))}
        </div>

      </div>
    </section>
  );
}