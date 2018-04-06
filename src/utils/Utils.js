
export default class Utils {
    /**
     * static关键字 静态方法，调用方式 e.g: Utils.findArray(data,{value: 'test'})
     * 查找数组，返回匹配到的第一个index
     *
     * @param array 被查找的数组
     * @param feature 查找特征 或者为一个具体值，用于匹配数组遍历的值，或者为一个对象，表明所有希望被匹配的key-value  eg: {username: 'admin'}
     * @param all boolean 希望命中feature全部特征或者只需命中一个特征，默认true
     * @return 数组下标  查找不到返回-1
     *
     */
    static findArray=(array, feature, all = true)=>{
        for(let index in array){
            let cur = array[index];
            if(feature instanceof Object){
                let allRight = true;
                for(let key in feature){
                    let value = feature[key];
                    if(cur[key] == value && !all) return index;
                    if(all && cur[key] != value){
                        allRight = false;
                        break;
                    }
                }
                if(allRight) return index;
            }else{
                if(cur == feature){
                    return index;
                }
            }
        }
        return -1;
    }

    //数组去重 ['a','b','c','a']
    static arrayUnique=(arr)=>{
        let res =[];
    　　let json = {};
    　　for(let i=0;i<arr.length;i++){
    　　　　if(!json[arr[i]]){
    　　　　　　res.push(arr[i]);

    　　　　　　json[arr[i]] = 1;
    　　　　}
    　　}
    　　return res;
    }

    //深拷贝
    static deepCopy=(obj)=>{
         var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = Utils.deepCopy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = Utils.deepCopy(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    //对输入数字的整数部分插入千位分隔符
    static format(num) {
        const arr = String(num).split(".");
        const re = /(-?\d+)(\d{3})/;
        while (re.test(arr[0])) {
            arr[0] = arr[0].replace(re, "$1,$2")
        }
        let numf = arr[0];
        for (let i = 1; i < arr.length; i++) {
            numf += "." + arr[i];
        }
        return numf;
    }

    //过滤掉数字的千位分隔符
    static unformat(numf) {
        const arr = String(numf).split(",");
        const num = arr.join("");
        return num;
    }

    //判断字节范围
    static calculateByteLength = ( str, min, max ) => {
        let byteLength = 0, strLength = str.length;
        for( let i = 0; i < strLength; i ++ ) {
            if( str.charCodeAt( i ) > 255 ){
                byteLength += 2;
            } else {
                byteLength ++;
            }
        }
        if( byteLength < min ) {
            return "min";
        } else if( byteLength > max ) {
            return "max";
        }
    };
};
