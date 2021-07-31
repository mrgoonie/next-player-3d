import CONFIG from "web.config";
import framework from "diginext.json";

const asset = (src) => {
  // console.log(CONFIG.NEXT_PUBLIC_CDN_BASE_PATH);
  // console.log(framework);

  // let isEnabledCDN = false;
  // if (CONFIG.environment == "production") {
  //   isEnabledCDN = framework.cdn.prod;
  // } else if (CONFIG.environment == "staging") {
  //   isEnabledCDN = framework.cdn.staging;
  // } else if (CONFIG.environment == "development") {
  //   isEnabledCDN = framework.cdn.dev;
  // } else {
  //   isEnabledCDN = false;
  // }
  let env = CONFIG.environment;
  if (CONFIG.environment == "production") env = "prod";
  if (CONFIG.environment == "development") env = "dev";
  const isEnabledCDN = framework.cdn[env];

  let isEnableBasePath = false;
  if (isEnabledCDN == false && CONFIG.NEXT_PUBLIC_BASE_PATH) {
    isEnableBasePath = true;
  }

  if (isEnabledCDN) {
    return CONFIG.NEXT_PUBLIC_CDN_BASE_PATH + "/public" + src;
  } else {
    if (isEnableBasePath) {
      return "/" + CONFIG.NEXT_PUBLIC_BASE_PATH + src;
    } else {
      return src;
    }
  }
};

export default asset;
