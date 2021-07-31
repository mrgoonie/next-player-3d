import AnotherCube from "modules/test/AnotherCube";
import BitmapFont from "plugins/three/BitmapFont";
/**
 * new DynamicClass('ClassNeme');
 * new DynamicClass('ClassNeme', props);
 */
class DynamicClass {
    constructor(className, opts) {
        const found = DynamicClass.list.find((item) => {
            if (item.name == className)
                return item.con;
        })
        if (found)
            return new found(opts);
            
        
        return null;
    }


    static list = [
        { name: "BitmapFont", con: BitmapFont },
        { name: "AnotherCube", con: AnotherCube },      
        
    ]

   
}

export default DynamicClass;

