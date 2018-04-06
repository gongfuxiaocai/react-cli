import allData from './allData.js';

const IndustryData = transformIndustryData(allData);

export default IndustryData;

function transformIndustryData(allData) {
    var level1 = [],
        level2 = [],
        level3 = [],
        finalData = [];

    setIndustryData(allData);

    setChildren(level3, level2, level1);

    // console.log('最终数据', finalData);

    function setIndustryData(theData, level) {
        level = level || 1;
        const len = theData.length;
        const theArr = theData.slice(0);
        const level_Arr = [];
        const level_index = [];

        for (let i = 0; i < len; i++) {
            let loop_count = 0;
            for (let j = 0; j < len; j++) {
                if ((theData[i].parentIndustry !== theData[j].industryId) && (i !== j)) { // 不是任何人的 children，即没有父级，即第一级
                    loop_count++;
                    if (loop_count === len - 1) {
                        level_Arr.push(theData[i]);
                        level_index.push(i);
                    }
                }
            }
        }

        const newArr = [];
        let counter = 0;
        for (let k = 0; k < level_index.length; k++) {
            newArr.push(theData[level_index[k]]);
            theArr.splice(level_index[k] - counter, 1);
            counter++;
        }

        if (level === 1) {
            level1 = newArr;
        } else if (level === 2) {
            level2 = newArr;
        } else if (level === 3) {
            level3 = newArr;
            return;
        }
        level++;
        setIndustryData(theArr, level);
    }

    function setChildren(childArr, parentArr, TopParentArr, level) {
        level = level || 2; // 2:把第三级组装到第二级   1:把第二级组装到第一级
        const newArr = [];
        for (let i = 0; i < parentArr.length; i++) {
            let obj;
            if (level === 2) {
                obj = {
                    industryId: parentArr[i].industryId,
                    parentIndustry: parentArr[i].parentIndustry,
                    industryName: parentArr[i].industryName
                };
            } else if (level === 1) {
                obj = {
                    id: parentArr[i].industryId,
                    name: parentArr[i].industryName
                };
            }
            // console.log(parentArr[i]);
            let loop_count = 0;
            for (let j = 0; j < childArr.length; j++) {
                if (parentArr[i].industryId === childArr[j].parentIndustry) {
                    const arr = [];
                    const o = {
                        id: childArr[j].industryId,
                        name: childArr[j].industryName
                    };
                    if (level === 1) {
                        o.children = childArr[j].children;
                        if (childArr[j].children) { // 第二级有子集
                            o.children = childArr[j].children;
                        } else { // 第二级没有子集
                            o.children = [{id: childArr[j].industryId, name: childArr[j].industryName}];
                        }
                    }
                    arr.push(o);
                    if (obj.children) {
                        obj.children = obj.children.concat(arr);
                    } else {
                        obj.children = arr;
                    }
                } else {
                    loop_count ++;
                    if(level === 1 && loop_count === childArr.length) { // 第一级没有任何子集
                        obj.children = [{
                            id: parentArr[i].industryId,
                            name: parentArr[i].industryName,
                            children: [{
                                id: parentArr[i].industryId,
                                name: parentArr[i].industryName
                            }]
                        }]
                    }
                }
            }
            newArr.push(obj);
        }
        if (TopParentArr) {
            setChildren(newArr, TopParentArr, undefined, 1);
        } else {
            finalData = newArr;
        }
    }

    return finalData;
}