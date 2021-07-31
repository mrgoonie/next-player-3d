import TBrowser from "plugins/teexii/TBrowser";
import CONFIG, { ENVIRONMENT_DATA } from "web.config";

export const ConfigLive = {
  consoleHandle: (showCredit = true) => {
    if (IsProd()) {
      console.clear();
      if (showCredit) TBrowser.showCredit();
      TBrowser.removeConsole();
    }
  },
};

export const IsDev = function () {
  return CONFIG.environment == ENVIRONMENT_DATA.DEVELOPMENT;
};

export const IsStag = function () {
  return CONFIG.environment == ENVIRONMENT_DATA.STAGING;
};

export const IsProd = function () {
  return CONFIG.environment == ENVIRONMENT_DATA.PRODUCTION;
};


export const IsCanary = function () {
  return CONFIG.environment == ENVIRONMENT_DATA.CANARY;
};

