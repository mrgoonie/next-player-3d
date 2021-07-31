export default class ComponentDetail {

    /**
     * @param {{
     * name: string,
     * desc: string,
     * tags: string[],
     * components:any,
     * code: string
    * }} props 

     */
    constructor(props) {
        props = props || {};
        this.props = props;

        this.tags = props.tags.map((item) => {
            if (item) return item.toLowerCase();
        })
        this.desc = props.desc;
        this.components = props.components;
        this.code = props.code;
        this.name = props.name;
    }


}