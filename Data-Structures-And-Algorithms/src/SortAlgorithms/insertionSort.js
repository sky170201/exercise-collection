let arr = [3, 5, 1, 4, 2];

function insertionSort(arr) {
    let { length } = arr;
    let temp;
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = arr[i]; // 记录下这个值，因为后面遍历时会被替换掉
        while (j > 0 && arr[j - 1] - temp > 0) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}

console.log(insertionSort(arr));

// 小结：外层循环，依次取值记录temp
// while循环依次比对j以内的值，将值移动到正确的位置上
