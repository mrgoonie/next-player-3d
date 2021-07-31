import renderHTML from "react-render-html";
import CONFIG from "web.config";

const scriptContent = `
<script type="text/javascript" id="">
!function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}},s=["addRecord","blockEvents","fetchServerCookie","fetchGlobalID","fetchUserSegments","resetUUID","ready","setSignedMode","setAnonymousMode","set","trackEvent","trackPageview","trackClicks","unblockEvents"],n=0;n<s.length;n++){var c=s[n];e[t].prototype[c]=r(c)}var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/2.3/td.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}}("Treasure",this);

var td=new Treasure({
  host:"tokyo.in.treasuredata.com",
  writeKey:"161/b431f78f66f4861fd3e5556ceef19852142d986f",
  database:"ymvn_log",
  startInSignedMode:!0,
  sscDomain: "${CONFIG.NEXT_PUBLIC_BASE_URL}",
  sscServer: 'ssc.yamaha-motor.com.vn',
  useServerSideCookie: true
});

td.set("$global","td_global_id","td_global_id");


// Call SSC feature

function fireEvents () {
  td.trackClicks();
  td.trackPageview("ymvn_web_log");
}

var successCallbackSSC = function (serverSideId) {
  console.log("[successCallbackSSC]", serverSideId);
  td.set('$global', { td_ssc_id: serverSideId });
  fireEvents();
};

var errorCallbackSSC = function (error) {
  console.log("[errorCallbackSSC] ", error);
  // Track events, even if the server-side cookie does not work
  fireEvents();
};

td.fetchServerCookie(successCallbackSSC, errorCallbackSSC);

// [Trying] call Global feature
var successCallbackGlobalId = function (globalId) {
  console.log("[fetchGlobalID ss]", globalId);
  td.set('$global', { td_global_id: globalId });
  fireEvents();
};

var errorCallbackGlobalId = function (error) {
  console.log("[fetchGlobalID err] ", error);
  // Track events, even if the global id does not work
  fireEvents();
};

td.fetchGlobalID(successCallbackGlobalId, errorCallbackGlobalId);

</script>
`;

const TreasureScript = () => {
  // ================
  // !!! IMPORTANT !!!
  // MUST USE <div> INSTEAD OF FRAGMENT <> DUE TO RENDERING ERROR
  // ================
  return <div>{renderHTML(scriptContent)}</div>;
};

TreasureScript.getTDServerSideCookieId = () => {
  /**
   * USAGE
   * const tdSscId = TreasureScript.getTDServerSideCookieId(); console.log("TreasureData server side cookie is: ", tdSscId);
   */

  try {
    if (typeof window == "undefined") return "null";
    if (!window.td) return "null";
    if (!window.td.get) return "cannot load tracking script!";
    if (typeof window != "undefined" && window.td) {
      const globalInfo = window.td.get("$global");
      return globalInfo.td_ssc_id || "null";
    } else {
      console.log("[getTDServerSideCookieId] window || window.td is not defined");
      return "null";
    }
  } catch (e) {
    return "error";
  }
};

TreasureScript.getTDGlobalId = () => {
  return new Promise((resolve, reject) => {
    /**
     * USAGE
     * TreasureScript.getTDGlobalId()
     *  .then(async(globalId) => console.log("TreasureData globalId is: ", globalId.toString()))
     *  .catch(async(error) => console.warn("cannot get TDGlobalId:", error))
     * 
     * OR WITH "async/await" METHOD
     * 
     * const globalId = await TreasureScript.getTDGlobalId();
     */

    if (typeof window == "undefined") reject("null");
    if (!window.td) reject("null");
    if (!window.td.fetchGlobalID) reject("null");
    if (typeof window.td._fetchGlobalID == "object") reject("cannot load tracking script!");

    window.td.fetchGlobalID(
      (globalId) => {
        resolve(globalId);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

TreasureScript.getTDClientId = () => {
  /**
   * USAGE
   * const tdClient = TreasureScript.getTDClientId(); console.log("TreasureData clientId is: ", tdClient);
   */
  if (typeof window != "undefined" && window.td && window.td.client) {
    const track = window.td.client.track || {};
    const values = track.values || {};
    return values.td_client_id() || "_";
  } else return "null";
};

export default TreasureScript;
