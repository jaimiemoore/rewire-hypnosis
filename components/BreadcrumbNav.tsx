"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface BreadcrumbItem {
  name: string;
  path: string;
}

export default function BreadcrumbNav() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const items: BreadcrumbItem[] = [{ name: "Home", path: "/" }];

    if (pathname === "/") return items;

    const segments = pathname.split("/").filter(Boolean);

    segments.forEach((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");

      // Format the segment name
      const name = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      items.push({ name, path });
    });

    return items;
  }, [pathname]);

  return (
    <nav className="bg-white border-b border-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center py-4 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={item.path} className="flex items-center">
                {index === 0 ? (
                  <Link
                    href={item.path}
                    className="text-sage hover:text-sage/80 transition-colors flex items-center gap-1"
                    aria-label="Home"
                  >
                    <Home className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-sage/40 mx-2" />
                    {isLast ? (
                      <span className="text-gray-soft font-medium">{item.name}</span>
                    ) : (
                      <Link
                        href={item.path}
                        className="text-sage hover:text-sage/80 transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": `https://rewirehypnosis.ca${item.path}`
            }))
          })
        }}
      />
    </nav>
  );
}
