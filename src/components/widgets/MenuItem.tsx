export default function MenuItem({
  title,
  icon,
  href,
}: {
  title: string;
  icon: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <a
        href={href}
        className="flex flex-col items-center justify-center space-y-3 rounded-xl border bg-white p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <img src={icon} alt={title} className="h-20 w-20" />
      </a>
      <p className="font-bold text-gray-800">{title}</p>
    </div>
  );
}
