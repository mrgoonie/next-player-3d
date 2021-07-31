import Head from "next/head";
import Header from "../element/Header";
import Footer from "../element/Footer";
import CONFIG from "web.config";
import { useRouter } from "next/router";
import AdminGlobalStyle from "../../dashkit/style/DashkitGlobalStyle";

const AdminSidebarPage = ({ pageName, children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {CONFIG.site.title} | {pageName || "Trang quản trị"}
        </title>

        <meta name="description" content={CONFIG.site.description}></meta>
        <link href={asset("/dashkit/fonts/cerebrisans/cerebrisans.css")} rel="stylesheet" />
        <link
          rel="shortcut icon"
          href={asset("favicon.ico")}
        />

        {/* <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/railscasts.css" /> */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.2.0/styles/dracula.min.css"
        />
        {/* <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" /> */}
      </Head>

      <AdminGlobalStyle />

      {children}
    </>
  );
};

export default AdminSidebarPage;
