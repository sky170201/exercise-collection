export class LRUCache {
    constructor(max) {
        if (typeof max !== 'number' || max < 0) {
            throw new TypeError('max必须是一个非负数')
        }
        this.max = max
        this.cache = new Map()
    }

    get (key) {
        if (!this.cache.has(key)) return 'noCache'
        const result = this.cache.get(key)
        // 根据expires 判断过期时间
        if ((Date.now() - result.initDate) >= result.expires) {
            // 缓存的值已过期
            this.cache.delete(key)
            // throw new TypeError("缓存的值已过期")
            return 'expired'
        } else {
            // 将当前的缓存值移动到最常用的位置(也就是最后的位置，一次交替替换)
            this.cache.delete(key)
            this.cache.set(key, result)
            return result
        }
    }

    set (key, value, expires = 5000) { // 默认值保鲜5s
        if (this.cache.has(key)) {
            // 有值则先删再添(更新值的新鲜度)
            this.cache.delete(key)
        } else if (this.cache.size >= this.max) {
            // 缓存已满，则删除第一个值(即最少使用到的值)
            // this.cache.keys()返回一个生成器，调用next() 返回第一个{ value, done}, 取出第一个key删除
            this.cache.delete(this.cache.keys().next().value)
        }
        const cacheValue = {
            value,
            expires,
            initDate: Date.now()
        }
        this.cache.set(key, cacheValue)
    }
}