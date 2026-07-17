import Newsletter from "@/components/home/Newsletter";
import Button from "../ui/Button";
export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#FBE7EC] to-[#FFF8F5] py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">

        <h2 className="text-4xl md:text-6xl font-semibold text-[#2B2B2B] leading-tight">
          Soft Beauty,<br />Every Day Glow 
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Discover skincare and beauty essentials designed to bring out your natural glow.
        </p>

        <div className="mt-8">
  <Button>Shop Now</Button>
</div>

      </div>
    </section>
  );
}