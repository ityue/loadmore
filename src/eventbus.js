/**
 * Minimal polyfill of Map
 */
class Map {
    get (key) {
        return this[key]
    }
    set (key, value) {
        this[key] = value
    }
    has (key) {
        if (this[key]) {
            return true
        } else {
            return false
        }
    }
    delete (key) {
        delete this[key]
    }
}
class EventBus {
    constructor() {
        if(!window['__eventBusgetInstance']){
            window['__eventBusgetInstance'] = this;
            this.cid = 0;
            this.msgMap = new Map();
        }
    }
    getInstance() {
        return window['__eventBusgetInstance'];
    }
    getCid() {
        this.getInstance().cid++;
        return this.getInstance().cid;
    }
    emitDOM (msg ,data = "", canBubble = false, canCancel = false, dom = window) {
        const event = document.createEvent('HTMLEvents');
        event.data = data;
        event.initEvent(msg,canBubble, canCancel);
        dom.dispatchEvent(event);
    }
    emit(msg, data, instance) {
        if(this.getInstance().msgMap.has(msg)){
            this.getInstance().msgMap.get(msg).forEach((cb) => {
                if(instance && cb.instance){
                    if(cb.instance === instance){
                        if(cb.__once && !cb.__emitted){
                            cb.__emitted = true
                            cb(data)
                        } else if (!cb.__once && !cb.__emitted) {
                            cb(data)
                        }
                    }
                }else{
                    if(cb.__once && !cb.__emitted){
                        cb.__emitted = true
                        cb(data)
                    } else if (!cb.__once && !cb.__emitted) {
                        cb(data)
                    }
                }
            });
        }
    }
    on(msg, cb, instance, name) {
        if(!cb)cb = new Function;
        cb.cid = this.getCid();
        cb.nid = name;
        cb.instance = instance;
        if(!this.getInstance().msgMap.has(msg)){
            this.getInstance().msgMap.set(msg,[cb]);
        }else{
            this.getInstance().msgMap.get(msg).push(cb);
        }
    }
    only (msg, cb, instance, name) {
        if(this.getInstance().msgMap.has(msg)){
            this.getInstance().msgMap.delete(msg);
        }
        this.on(msg, cb, instance, name);
    }
    once (msg, cb, instance, name) {
        cb.__once = true
        cb.__emitted = false
        this.on(msg, cb, instance, name)
    }
    off(msg, cb) {
        if(this.getInstance().msgMap.has(msg)) {
            let cbSet = this.getInstance().msgMap.get(msg);
            if(!!cb && typeof cb === 'function') {
                cbSet.forEach((_cb, index) => {
                    if(!!cb.cid && cb.cid === _cb.cid){
                        cbSet.splice(index,index);
                    }
                });
            }else if(!!cb && typeof cb === 'string'){
                let name = cb;
                //name
                cbSet.forEach((_cb, index) => {
                    if(name === _cb.nid){
                        cbSet.splice(index,index);
                    }
                });
            }else{
                this.getInstance().msgMap.delete(msg);
            }
        }
    }
}
export {Map}
export default new EventBus;

