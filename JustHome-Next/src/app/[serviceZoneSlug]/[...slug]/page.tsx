import { notFound } from "next/navigation";
import { CategoryPageView } from "@/components/services/category-page-view";
import { SubCategoryPageView } from "@/components/services/subcategory-page-view";
import { ServiceTypePageView } from "@/components/services/servicetype-page-view";
import { ServiceDetailPageView } from "@/components/services/service-detail-page-view";

interface PageProps {
  params: Promise<{
    serviceZoneSlug: string;
    slug: string[];
  }>;
}

export default async function CatchAllServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { serviceZoneSlug, slug } = resolvedParams;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const length = slug.length;

  if (length === 1) {
    return <CategoryPageView serviceZoneSlug={serviceZoneSlug} categorySlug={slug[0]} />;
  }

  if (length === 2) {
    return (
      <SubCategoryPageView
        serviceZoneSlug={serviceZoneSlug}
        categorySlug={slug[0]}
        subCategorySlug={slug[1]}
      />
    );
  }

  if (length === 3) {
    return (
      <ServiceTypePageView
        serviceZoneSlug={serviceZoneSlug}
        categorySlug={slug[0]}
        subCategorySlug={slug[1]}
        serviceTypeSlug={slug[2]}
      />
    );
  }

  if (length === 4) {
    return (
      <ServiceDetailPageView
        serviceZoneSlug={serviceZoneSlug}
        categorySlug={slug[0]}
        subCategorySlug={slug[1]}
        serviceTypeSlug={slug[2]}
        serviceSlug={slug[3]}
      />
    );
  }

  notFound();
}
