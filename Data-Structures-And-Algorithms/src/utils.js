// 将key转化为字符串
export function defaultToString(item) {
    if (item === null) {
        return "NULL";
    } else if (item === undefined) {
        return "UNDEFINED";
    } else if (typeof item === "string" || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}

// 交换数组中的两个值
export function swap(arr, a, b) {
    // 经典方式
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    // ES6的方式
    // [arr[b], arr[a]] = [arr[a], arr[b]];
}
