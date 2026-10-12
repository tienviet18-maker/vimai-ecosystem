import { ChevronRight } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";

/** Visible breadcrumb trail. The last item is the current page (not a link). */
export function Breadcrumbs({
  items,
  label,
}: {
  items: Array<{ name: string; href: string }>;
  label: string;
}) {
  return (
    <nav aria-label={label} className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-slate-700">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-primary">
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
