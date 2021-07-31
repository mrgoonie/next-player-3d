import StringExtra from "./StringExtra";

export default class GenerateString {

    static textLowCase = "abcdefghijklmnopqrstuvwxyz";
    static numeric = '0123456789';
    static punctuation = '!@#$%^&*()_+~|}{[];?><,./-=';

    static allCharacter = `đĐaáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệoóòỏõọôốồổỗộơớờởỡợiíìỉĩịuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢIÍÌỈĨỊUÚÙỦŨỤƯỨỪỬỮỰYÝỲ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_\`abcdefghijklmnopqrstuvwxyz{|}`;


    /**
     * allCharacter = `đĐaáàảãạăắằẳẵặâấầẩẫậeéèẻẽẹêếềểễệoóòỏõọôốồổỗộơớờởỡợiíìỉĩịuúùủũụưứừửữựyýỳỷỹỵAÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬEÉÈẺẼẸÊẾỀỂỄỆOÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢIÍÌỈĨỊUÚÙỦŨỤƯỨỪỬỮỰYÝỲ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_\`abcdefghijklmnopqrstuvwxyz{|}`;
     * @param {number} length 
     * @returns {string}
     */
    static randAllCharacterByLength(length) {
        return this.randStringByLength(length, GenerateString.allCharacter);
    }

    /**
     * @param {number} length 
     * @param {string} str 
     * @returns {string}
     */
    static randStringByLength(length, str = GenerateString.textLowCase) {
        if (StringExtra.isEmpty(str)) return "";

        let result = '';

        for (let i = 0; i < length; i++) {
            result += str.charAt(Math.floor(Math.random() * str.length));
        }
        return result;
    }



}