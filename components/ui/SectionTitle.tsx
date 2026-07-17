type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-semibold text-[#2B2B2B] md:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}