import StringExtra from "./string/StringExtra";

export default class UrlUtils {


  static getUrlParams(parameter, staticURL, decode) {
    staticURL = (staticURL == undefined) ? window.location : staticURL;
    var currLocation = (staticURL.length) ? staticURL : window.location.search;

    if (currLocation.split("?").length < 2)
      return "";

    var parArr = currLocation.split("?")[1].split("&"),
      returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
      var parr = parArr[i].split("=");
      if (parr[0] == parameter) {
        return (decode) ? decodeURIComponent(parr[1]) : parr[1];
        returnBool = true;
      } else {
        returnBool = false;
      }
    }

    if (!returnBool) return false;
  }



  /**
 * 
 * @return {string}
 */
  static decode(uri) {
    return decodeURIComponent(uri);
  }

  /**
 * 
 * @return {string}
 */
  static encode(uri) {
    return encodeURIComponent(uri);
  }


  /**
 * 
 * @param {string} url 
 * @return {string}
 */
  static getFileNameWithoutExtension(url) {
    url = this.decode(url);
    if (url) {
      var m = url.toString().match(/.*\/(.+?)\./);
      if (m && m.length > 1) {
        return m[1];
      }

      if (!StringExtra.isEmpty(url)) {
        return url.split('.').shift();
      }
    }
    return "";
  }

  /**
  * 
  * @param {string} url 
  * @return {string}
  */
  static getFileNameWithExtension(url) {
    url = this.decode(url);
    if (url) {
      var m = url.toString().match(/.*\/(.*)$/);
      
      if (m && m.length > 1) {
        return m[1].split('/').pop().split('?')[0];
      }

      if (!StringExtra.isEmpty(url)) {
        return url;
      }
    }
    return "";
  }

  /**
   * 
   * @param {string} url 
   * @return {string}
   */
  static getFileExtension(url) {
    return this.getFileNameWithExtension(url).split('.').pop();
  }
}

