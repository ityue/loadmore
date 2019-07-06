/*
 * @Author: renqingyue 
 * @Date: 2018-02-08 14:49:58 
 * @Last Modified by: renqingyue
 * @Last Modified time: 2019-07-06 15:14:48
 * 加载更多~
 */

import eventbus from './eventbus.js'
import throttle from './throttle.js'
import { addDomNode, addStyleNode } from './utils.js'


class loadMoreClass {
    constructor () {
        // this.settings = loadMoreClass.defaultOptions
        this.settings = loadMoreClass.defaultOptions
        this.init()
    }
    init () {
        // this.toLoadFn()
        if (document.documentElement) {
            document.documentElement.style.height = '100%'
        }
        // 监听加载开关
        eventbus.on('isLoadLock', (type) => {
            if (!type) {
                this.settings.lock = true
            } else {
                this.settings.lock = false
            }
        })
        // 监听不显示文案
        eventbus.on('HideAddLoadingDom', (type) => {
            this.addLoadingDom()
        })
        // 一页时为没有更多
        if (this.settings.pageCount == 1) {
            this.isLoadDom(true)
            this.settings.lock = false
        }
    }
    /**
     * 设置加载的内容
     * @param {Number} pageCount      总页数
     * @param {Number} page           当前页
     * @param {Function} ajaxFN       加载时的调取接口，获取数据
     * @param {Number} dataPageNum    当前页返回的条数
     * @param {Number} toLoadNum      num满足条件可加载数 默认为20
     */
    setOptions (options) {
        this.settings = !!options ? Object.assign({}, loadMoreClass.defaultOptions, options) : defaultOptions
        this.addLoadingDom()
    }
    /**
     * 调用加载更多方法
     */
    toLoadFn () {
        this.loadMoreFn = this.loadMoreFn.bind(this)
        // 节流处理
        document.removeEventListener('scroll', throttle(this.loadMoreFn, this.settings.throttleTime), false)
        document.addEventListener('scroll', throttle(this.loadMoreFn, this.settings.throttleTime), false)
    }
    /**
     * 加载更多是否到底可执行
     */
    loadMoreFn () {
        const dataDpr = document.documentElement.getAttribute('data-dpr') || 1
        const toLoadHeight = this.settings.toLoadHeight * dataDpr
        const rectHeight = this.settings.rectHeightDom.getBoundingClientRect().height
        if (!this.settings.lock) {
            return
        } else {
            if (Math.abs((rectHeight - window.scrollY) - this.settings.offsetHeight) < toLoadHeight) {
                this.settings.lock = false
                if (this.loadDownFn) {
                    this.loadDownFn()
                }
            } 
        }
    }
    /**
     * 加载更多 逻辑判断是否满足条件
     */
    loadDownFn () {
        const params = this.settings
        if (params.pageCount && params.page && params.ajaxFN) {
            if (params.pageCount > params.page) {
                // console.log('loadmore')
                this.isLoadDom()
                params.page++
                const pageNew = params.page
                // resolve(pageNew)
                setTimeout(function () {
                    params.ajaxFN(pageNew)
                    if (params.lockTime){
                        setTimeout( () => {
                            params.lock = true
                        }, params.lockTime)
                    }
                }, 0)
            } else {
                // console.log('no_more')
                this.isLoadDom(true)
                this.settings.lock = false
            }
        } else if (params.page && params.dataPageNum && params.ajaxFN) {
            if (params.dataPageNum >= params.toLoadNum) {
                this.isLoadDom()
                params.page++
                var pageNew = params.page
                setTimeout(function () {
                    params.ajaxFN(pageNew)
                    if (params.lockTime){
                        setTimeout(() => {
                            params.lock = true
                        }, params.lockTime)
                    }
                }, 0)
            } else {
                this.isLoadDom(true)
                this.settings.lock = false
            }
        } else {
            console.warn("_- -!___参数不全____，缺少必要参数params.pageCount && params.page && params.ajaxFN 或 params.page && params.dataPageNum && params.ajaxFN, > <你也可以请自行加判断逻辑啊（参数为addDomFn）")
            params.addDomFn(params)
        }
    }
    /**
     * 动态添加加载更多DOM
     */
    addLoadingDom () {
        // this.loadMoreFn()
        const isMoreShowZ = document.querySelector('.isMoreShowZ')
        const isNoMoreShowZ = document.querySelector('.isNoMoreShowZ')
        if (!isMoreShowZ) {
            const loadDom = 
            `<div class="tip-no-more isMoreShowZ" style="display: none; ;text-align: center;margin: .6rem auto;color: #999;font-size: 0.28rem;">
                <em class="icon-load"></em>${this.settings.loadText}
            </div>`;
            addDomNode(loadDom, this.settings.appendHTMLNode)
        } else {
            isMoreShowZ.style.display = 'none'
        }
        if (!isNoMoreShowZ) {
            const noMoreDom = `<div class="tip-no-more isNoMoreShowZ" style="display: none;text-align: center;margin: .6rem auto;color: #999;font-size: 0.28rem;">${this.settings.noMoreText}</div>`;
            addDomNode(noMoreDom, this.settings.appendHTMLNode)
        } else {
            isNoMoreShowZ.style.display = 'none'
        }
    }
    /**
     * 是否显示加载的dom结构
     * @param {Boolean} isNoMore     是否还有更多数据  默认为false。显示加载中
     * @param {String} loadText      加载的文案       默认文案为 '加载中'
     * @param {String} noMoreText    没有更多文案     默认文案为 '没有更多内容'
     */
    isLoadDom (isNoMore) {
        const isMoreShowZ = document.querySelector('.isMoreShowZ')
        const isNoMoreShowZ = document.querySelector('.isNoMoreShowZ')
        if (isMoreShowZ && isNoMoreShowZ) {
            if (isNoMore) {
                isNoMoreShowZ.style.display = 'block'
                isMoreShowZ.style.display = 'none'
            } else {
                isMoreShowZ.style.display = 'block'
                isNoMoreShowZ.style.display = 'none'
            }
        } 
    }
}
loadMoreClass.defaultOptions = {
    // 总页数
    pageCount: '',
    // 加载时的调取接口，获取数据
    ajaxFN: '',
    // 滚动的开关，防止连续加载
    lock: true,
    // 函数节流时间
    throttleTime: 30,
    // 离滚动点距离
    toLoadHeight: 150,

    // 加载时传的参数
    // 当前页
    page: 1,
    // num满足条件可加载数
    toLoadNum: 20,
    // 加载后多少秒打开开关让页面可继续加载-，防止没加载完数据加载下一页
    lockTime: 0,
    // 要滚动区域,默认body
    rectHeightDom: document.body,
    // 要再页面中加入加载中，没有更多的dom
    appendHTMLNode: document.body,
    // 可见区域高度
    offsetHeight: document.documentElement.offsetHeight || 0,
    // 加载文案
    loadText: '加载中',
    // 没有更多文案
    noMoreText: '没有更多内容',
    /**
     * 留下个口，里面自己写判断加载条件和加载方法
     */
    addDomFn: function () {
    },
}

module.exports = new loadMoreClass()



