import {
  Award,
  Truck,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Carefully selected beauty products from trusted brands.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery to your doorstep.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Shop with confidence using secure payment methods.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Care",
    description: "We're always here to help before and after your purchase.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Beauté-Beauté?
          </h2>

          <p className="mt-4 text-gray-500">
            Beauty shopping made simple, elegant and reliable.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-pink-100 bg-[#FFF8F5] p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <Icon className="text-pink-500" size={30} />
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}