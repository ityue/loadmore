/*
 * @Author: renqingyue 
 * @Date: 2019-06-13 11:44:10 
 * @Last Modified by: renqingyue
 * @Last Modified time: 2019-06-13 15:27:49
 */

// 添加css
export function addStyleNode (cssText) {
    const styleNode = document.createElement('style')
    styleNode.appendChild(document.createTextNode(cssText))
    document.getElementsByTagName('head')[0].appendChild(styleNode)
}
// 添加html DOM
export function addDomNode (domInnerHtml, box, dom='div') {
    const loadDomBox = document.createElement(dom)
    loadDomBox.innerHTML = domInnerHtml
    box.appendChild(loadDomBox)
}

//  设置css样式
export function setStyles (els, cssObj) {
    var assign = function(target, varArgs) {
        // .length of function is 2
        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object')
        }
    
        var to = Object(target)
    
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index]
    
            if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey]
                    }
                }
            }
        }
        return to
    }
    if ('transform' in cssObj) {
        cssObj['webkitTransform'] = cssObj['transform']
    }
    if ('transition' in cssObj) {
        cssObj['webkitTransition'] = cssObj['transition']
    }
    els.forEach(el => el && assign(el.style, cssObj))
}

