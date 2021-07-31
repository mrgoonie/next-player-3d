import CONFIG from "web.config";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const ShareRedirectPage = ({ title, description, imageUrl, children }) => {
  const router = useRouter();

  useEffect(() => {
    // redirect to the main website?
    router.push("/");
  });

  return (
    <>
      <Head>
        <meta property="og:title" content={title || CONFIG.site.title} />
        <meta property="og:description" content={description || CONFIG.site.description} />
        <meta property="og:url" content={CONFIG.getBasePath() + router.asPath} />
        <meta property="og:image" content={imageUrl || `${CONFIG.getBasePath()}/share.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content={CONFIG.site.type} />
        <meta property="fb:app_id" content={CONFIG.NEXT_PUBLIC_FB_APP_ID} />
      </Head>

      <img draggable={false} src={data.image_url} style={{ display: "none" }} />

      {children}
    </>
  );
};

export default ShareRedirectPage;
