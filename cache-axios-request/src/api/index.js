import axios from 'axios'
import { LRUCache } from '@/utils'
import md5 from 'md5';

const cache = new LRUCache(5)

const instance = axios.create({
    baseURL: 'http://localhost:9000',
    timeout: 30000
})

const needCacheUrl = [
    {
        method: 'get',
        url: '/home'
    }
]

function checkNeedCacheUrl (m, u) {
    return needCacheUrl.find(({method, url}) => method === m && (url === u))
}

instance.interceptors.request.use((config) => {
    return config
}, err => {
    console.log(err)
})

instance.interceptors.response.use((response) => {
    const { method, url } = response.config
    const isNeedCache = checkNeedCacheUrl(method, url)
    if (isNeedCache) {
        let hashKey = md5({method, url})
        cache.set(hashKey, response.data)
    }
    return response.data
}, err => {
    console.log(err)
})

function request ({url, method, ...res}) {
    const isNeedCache = checkNeedCacheUrl(method, url)
    if (isNeedCache) {
        const hashKey = md5({method, url})
        const cacheResult = cache.get(hashKey)
        if ( cacheResult !== 'noCache' && cacheResult !== 'expired') {
            return cacheResult
        }
    }
    instance({method, url, ...res})
}

export default request