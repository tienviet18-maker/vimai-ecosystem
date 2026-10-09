import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminTable } from "@/components/admin/AdminTable";
import { ReviewActions } from "@/components/admin/ReviewActions";
import { getAllReviews } from "@/lib/reviews";

export const runtime = "edge";

export default async function AdminReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const reviews = await getAllReviews();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("reviews")}</h1>
      <AdminTable
        columns={[t("fieldName"), t("status"), t("colBody"), ""]}
        empty={t("empty")}
        rows={reviews.map((review) => [
          review.display_name,
          review.status,
          review.body,
          <ReviewActions key={review.id} review={review} />,
        ])}
      />
    </div>
  );
}
