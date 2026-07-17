export default function Newsletter() {
  return (
    <section className="bg-pink-50 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">

        <h2 className="text-4xl font-bold text-gray-900">
          Stay Beautiful ✨
        </h2>

        <p className="mt-4 text-gray-600">
          Subscribe to receive exclusive offers, beauty tips and updates from
          Beauté-Beauté.
        </p>

        <form className="mt-10 flex flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-full border border-pink-200 px-6 py-4 outline-none focus:border-pink-400"
          />

          <button
            type="submit"
            className="rounded-full bg-pink-500 px-8 py-4 font-medium text-white transition hover:bg-pink-600"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
}