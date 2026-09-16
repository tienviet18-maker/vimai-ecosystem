import { Link } from "@/lib/i18n/navigation";

export default function NotFound() {
  return (
    <div className="container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
      <Link href="/" className="mt-6 text-sm font-medium text-primary">
        Back to home
      </Link>
    </div>
  );
}
