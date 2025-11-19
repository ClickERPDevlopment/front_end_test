// Meta.tsx
import React from "react";
import { Helmet } from "react-helmet";

interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  image?: string; // For Open Graph image
}

const Meta: React.FC<MetaProps> = ({ title, description, keywords, canonicalUrl, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
};

export default Meta;
