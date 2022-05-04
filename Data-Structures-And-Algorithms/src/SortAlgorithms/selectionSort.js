import { swap } from "../utils.js";

let arr = [2, 3, 6, 4, 8, 5];
function selectionSort(arr) {
    let { length } = arr;
    let indexMin;
    for (let i = 0; i < length - 1; i++) {
        indexMin = i;
        for (let j = i; j < length; j++) {
            if (arr[indexMin] - arr[j] > 0) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            swap(arr, i, indexMin);
        }
    }
    return arr;
}

console.log(selectionSort(arr));

// 总结：每次迭代找出从j开始的最小值，然后跟i的位置替换，即选择排序
// 复杂度同样是O(n²)，需要嵌套两个循环
