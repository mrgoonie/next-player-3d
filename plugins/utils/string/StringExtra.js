export default class StringExtra {

    /**
     * 
     * @param {string} item 
     * @return {boolean}
     */
    static isEmpty(item) {
        return item === null || item.match(/^ *$/) !== null;
    }
    /**
     * 
     * @param {string} text 
     * @param {string} str1 
     * @param {string} str2 
     */
    static getBetween(text, str1, str2 = "") {

        if (text.indexOf(str1) <= -1) return "";

        const firstIndex = text.indexOf(str1) + str1.length;
        const secondIndex = str2 ? text.indexOf(str2, firstIndex) : text.length;
        return text.substring(firstIndex, secondIndex)
    }

    /**
     * 
     * @param {string} item 
     * @return {string}
     */
    static replaceAt(item) {
        return item.substr(0, index) + replacement + item.substr(index + replacement.length);
    }
}
