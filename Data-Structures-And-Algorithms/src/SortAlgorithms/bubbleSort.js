import { swap } from "../utils.js";

let arr = [2, 3, 6, 4, 8, 5];
// 冒泡排序
function bubbleSort(arr) {
    let { length } = arr;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (arr[j] - arr[j + 1] > 0) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}

// 改进后的冒泡排序
function modifiedBubbleSort(arr) {
    let { length } = arr;
    for (let i = 0; i < length; i++) {
        let len = length - 1 - i; // 内循环减去外循环中已跑过的轮数，也就是最大值已经放到最后了
        for (let j = 0; j < len; j++) {
            if (arr[j] - arr[j + 1] > 0) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}

console.log(modifiedBubbleSort(arr));

// 总结：冒泡排序算法的复杂度是O(n²)，不推荐使用
