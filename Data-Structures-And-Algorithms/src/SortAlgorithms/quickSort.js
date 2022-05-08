import { swap } from "../utils.js";

// 快排
function quickSort(arr) {
    debugger;
    const len = arr.length;
    if (len <= 1) return arr;
    let pivotIndex = Math.floor(len / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        if (elem < pivot) {
            left.push(elem);
        } else if (elem > pivot) {
            right.push(elem);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

console.log(quickSort2([2, 3, 9, 4, 1, 5]));

// 数据结构与算法中快排的解法
function quickSort2(arr) {
    return quick(arr, 0, arr.length - 1);
}

function quick(arr, left, right) {
    let index;
    if (arr.length > 1) {
        index = partition(arr, left, right);
        if (left < index - 1) {
            quick(arr, left, index - 1);
        }
        if (index > right) {
            quick(arr, index, right);
        }
    }
    return arr;
}

function partition(arr, left, right) {
    const pivot = arr[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return i;
}
