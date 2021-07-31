import renderHTML from "react-render-html";

const scriptContent = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P3Z7CL7');</script>
<!-- End Google Tag Manager -->
`;

const noscriptContent = `
<!-- Google Tag Manager (noscript) -->
<iframe
  src="https://www.googletagmanager.com/ns.html?id=GTM-P3Z7CL7"
  height="0"
  width="0"
  style="display:none;visibility:hidden"
></iframe>
<!-- End Google Tag Manager (noscript) -->
`;

const GaTrackingScript = () => {
  return renderHTML(scriptContent);
};

export const GaTrackingNoscript = () => {
  return <noscript>{renderHTML(noscriptContent)}</noscript>;
};

export default GaTrackingScript;
