import { SEO_DEFAULTS } from "./defaults";

export function generateAppMetadata({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return {
    title: title || SEO_DEFAULTS.defaultTitle,
    description: description || SEO_DEFAULTS.defaultDescription,
    openGraph: {
      title,
      description,
      images: image ? [image] : [],
    },
  };
}
