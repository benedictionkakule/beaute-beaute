import SectionTitle from "../ui/SectionTitle";
import CategoryCard from "../ui/CategoryCard";
import { categories } from "../../data/categories";

export default function Categories() {
  return (
    <section className="bg-[#FFF8F5] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Shop by Category"
          subtitle="Find everything you need to complete your beauty routine."
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}