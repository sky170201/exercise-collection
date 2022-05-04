// 栈的实现，特点先进后出

// 基于数组实现的栈
export class StackArray {
    constructor() {
        this.items = [];
    }
    // 添加的方法
    push(element) {
        this.items.push(element);
    }
    // 从栈移除栈顶元素
    pop() {
        return this.items.pop();
    }
    // 查看栈顶元素
    peek() {
        return this.items[this.items.length - 1];
    }
    // 检查栈是否为空
    isEmpty() {
        return this.items.length === 0;
    }
    // 栈的数量
    size() {
        return this.items.length;
    }
    // 清空栈元素
    clear() {
        this.items = [];
    }
}

// 创建一个基于js对象的Stack类
export class Stack {
    constructor() {
        this.items = {};
        this.count = 0;
    }
    // 添加的方法
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 从栈移除栈顶元素
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 查看栈顶元素
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    // 检查栈是否为空
    isEmpty() {
        return this.count === 0;
    }
    // 栈的数量
    size() {
        return this.count;
    }
    // 清空栈元素
    clear() {
        this.items = {};
        this.count = 0;
    }
    // 数组结构中可以调用数组的toString方法 所以不需要实现
    toString() {
        if (this.isEmpty()) {
            return "";
        }
        let objString = `${this.item[0]}`;
        for (let i = 1; i < this.count; i++) {
            objString = `${objString}, ${this.item[i]}`;
        }
        return objString;
    }
}
