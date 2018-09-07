/**
 * 根据父类型获取树形结构的子列表
 *
 * @param {any} parentType   "GT-CASH-XXX"
 * @param {any} tree
 */
function getChildListFromTree(parentType, tree) {
    let childList = [];
    const ptArr = parentType.split('-');
    // ['GT', 'CASH']   ['GT']
    if (ptArr.length > 1) {
        childList = ptArr.reduce((total, next) => {
            let child = {};
            if (typeof total === 'string') {
                child = tree.find(value => {
                    return value.k === total;
                }) || {};
                if (child.childList && child.childList.length > 0) {
                    child = child.childList.find(value => {
                        return value.k === next || value.key === next;
                    }) || {};
                }
            } else {
                child = total.find(value => {
                    return value.k === next || value.key === next;
                }) || {};
            }
            return child.childList;
        }) || [];
    } else if (ptArr.length === 1) {
        const child = tree.find(value => {
            return value.k === ptArr[0] || value.key === ptArr[0];
        }) || {};
        childList = child.childList;
    }
    return childList;
}


function firstUpperCase (str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

function generateId() {
  return (Math.floor(1e16 * Math.random()).toString(16) + Math.floor(1e16 * Math.random()).toString(16) + '0000000000').slice(0, 24); // eslint-disable-line prefer-template
}


/* eslint-disable */
export {
    generateId,
    firstUpperCase,
    getChildListFromTree,
};