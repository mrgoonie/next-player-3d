import Axios from "axios";
import CONFIG from "web.config";
const FormData = require("form-data");

export class UploadAdapter {
    constructor(user, loader) {
        this.user = user;
        this.loader = loader;
    }
  
    async upload() {
        var data = new FormData();
        await this.loader.file.then(file => data.append(`file`, file));
        return new Promise((resolve, reject) => {
            Axios({
                url: `${CONFIG.NEXT_PUBLIC_API_BASE_PATH}/api/v1/admin/ckeditors/single`,
                method: 'POST',
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${this.user.token}`,
                }
            }).then(res => {
                var resData = res.data;
                resData.default = resData.url;
                resolve(resData);
            }).catch(error => {
                reject(error);
            });
        });
    }
  
    abort() {

    }
}
