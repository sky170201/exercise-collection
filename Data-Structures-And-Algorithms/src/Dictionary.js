import { defaultToString } from "./utils.js";

export default class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    // 检测一个键是否存在于字典中
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null; // undefined
    }
    // 设置键和值
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    // 删除一个值
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    // 检索一个值
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    // 返回table的value
    keyValues() {
        return Object.values(this.table);
    }
    // 返回所有原始值,注意此处需要返回所有原始key
    keys() {
        return this.keyValues.map((valuePair) => valuePair.key);
    }
    // 返回所有value
    values() {
        return this.keyValues.map((valuePair) => valuePair.value);
    }
    // 遍历的方法
    forEach(callback) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            let result = callback(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }
    // 返回字典中的值的个数
    size() {
        return Object.keys(this.table).length;
    }
    // 是否为空
    isEmpty() {
        return this.size() === 0;
    }
    // 清空字典内容
    clean() {
        this.table = {};
    }
    // toString
    toString() {
        if (this.isEmpty()) {
            return "";
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString}, ${valuePairs[i].toString()}`;
        }
        return objString;
    }
}

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

// 使用字典存储电子邮件地址簿
// let dic = new Dictionary();
// dic.set("candy", "candy@163.com");
// dic.set("tom", "tom@163.com");
// dic.set("lala", "lala@163.com");

// console.log(dic.get("candy"));
// console.log(dic.keyValues());
// console.log(dic.toString());
// dic.forEach((key, value) => {
//     console.log(key, value);
// });
