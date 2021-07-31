
export const ENVIRONMENT_DATA = {
  PRODUCTION: "production",
  STAGING: "staging",
  DEVELOPMENT: "development",
  CANARY: "canary",
}

const CONFIG = {
  environment: process.env.NEXT_PUBLIC_ENV || "development",
  site: {
    title: "Player3D",
    description: "",
    type: "game"
  },
  links: {
    facebookPage: "",
  },
  dateFormat: "yyyy-MM-dd HH:mm:ss",
  // these variables can be exposed to front-end:
  NEXT_PUBLIC_FB_APP_ID: process.env.NEXT_PUBLIC_FB_APP_ID || "798567341082244",  // Nuviworld
  NEXT_PUBLIC_ZALO_APP_ID: process.env.NEXT_PUBLIC_ZALO_APP_ID || "235306270046264853",  // Nuviworld
  NEXT_PUBLIC_ZALO_APP_SECRET: process.env.NEXT_PUBLIC_ZALO_APP_SECRET || "RaMFR366Qo1lO9I8C4fB",  // Nuviworld
  NEXT_PUBLIC_ZALO_OA_ID: process.env.NEXT_PUBLIC_ZALO_OA_ID || "1855585019278219844",
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "164894140632-84k6s669mpf1ndi15ajedmlr1lfd5gjj.apps.googleusercontent.com",
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "ziWJXHFQMeHXCYqgtqAi9LNo",
  NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY || "6LeJgmgaAAAAAKcmDn5lstcT3S5AshYB29pRz3zs",
  // NEXT_PUBLIC_API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH || "http://192.168.1.65",
  NEXT_PUBLIC_API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH || "https://dev2.digitop.vn/nuviworld-web/backend",
  NEXT_PUBLIC_CDN_BASE_PATH: process.env.NEXT_PUBLIC_CDN_BASE_PATH || "",
  NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN || "",
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
  NEXT_PUBLIC_SOCKET_HOST: process.env.NEXT_PUBLIC_SOCKET_HOST || "",
  NEXT_PUBLIC_IGNORE_CHECK_ARENA: process.env.NEXT_PUBLIC_IGNORE_CHECK_ARENA || false,
  // some secret keys which won't be exposed to front-end:
  SOME_SECRET_KEY: process.env.SOME_SECRET_KEY || "",
  IRON_SESSION_NAME: "MYADMINCMSCOOKIE",
  IRON_SESSION_SECRET: process.env.IRON_SESSION_SECRET || "",
  getBasePath: () => {
    return CONFIG.NEXT_PUBLIC_BASE_PATH ? "/" + CONFIG.NEXT_PUBLIC_BASE_PATH : "";
  },
  getBaseUrl: () => CONFIG.NEXT_PUBLIC_BASE_URL ? CONFIG.NEXT_PUBLIC_BASE_URL : "",
  path: (path) => {
    return CONFIG.getBasePath() + path;
  },
};


if (typeof window != "undefined") {
  window.__config__ = CONFIG;
  // console.log(CONFIG);
} else {
  // console.log(CONFIG);
}

export default CONFIG;
