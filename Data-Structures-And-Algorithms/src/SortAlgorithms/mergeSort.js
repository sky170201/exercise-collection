function mergeSort(arr) {
    if (arr.length > 1) {
        const { length } = arr;
        const middle = Math.floor(length / 2);
        const left = mergeSort(arr.slice(0, middle));
        const right = mergeSort(arr.slice(middle));
        arr = merge(left, right);
    }
    return arr;
}

function merge(left, right) {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
        result.push(left[i] - right[j] < 0 ? left[i++] : right[j++]);
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

let arr = [8, 3, 6, 4, 7, 5, 2, 1];
console.log(mergeSort(arr));

// 分割成一个个最小的单元，数组长度1
// 再两两比对，重新添加进一个新的数组中
