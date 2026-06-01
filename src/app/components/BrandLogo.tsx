import type { SiteContent } from "@shared/siteContent";

type Brand = SiteContent["brand"];

export function BrandLogo({
  brand,
  showName = true,
  nameClassName = "text-2xl font-semibold",
}: {
  brand: Brand;
  showName?: boolean;
  nameClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {brand.logoUrl ? (
        <img
          src={brand.logoUrl}
          alt={`${brand.name} logo`}
          className="h-10 w-auto object-contain"
        />
      ) : (
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0">
          <span className="text-white text-xl font-bold">{brand.logoLetter}</span>
        </div>
      )}
      {showName && <span className={nameClassName}>{brand.name}</span>}
    </div>
  );
}
