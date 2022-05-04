export class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 向队列中添加元素
    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 从队列中移除元素,遵从先进先出的原则
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++; // 最小值++
        return result;
    }
    // 是否为空，差值
    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
    // 个数
    size() {
        return this.count - this.lowestCount;
    }
    // 查看队列头元素
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    // 清空队列
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return "";
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString += `${objString}, ${this.items[i]}`;
        }
        return objString;
    }
}

// let queue = new Queue();
// queue.enqueue("candy");
// queue.enqueue("tom");
// queue.enqueue("lala");
// console.log(queue.dequeue());
