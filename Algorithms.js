const list = [23, 4, 42, 15, 16, 8];

const bubbleSort = (list) => {

    var doItAgain = false;
    const limit = list.length;
    const defaultNextVal = Number.POSITIVE_INFINITY;

    for (var i = 0; i < limit; i++) {
        let thisValue = list[i];
        let nextValue = i + 1 < limit ? list[i + 1] : defaultNextVal;

        // compare values.
        if(nextValue < thisValue) {
            list[i] = nextValue;
            list[i+1] = thisValue;
            console.log(`Swapping ${thisValue} with ${nextValue}`);
            // We moved something - repeate the process.
            doItAgain = true;
        }
    }
    if(doItAgain) {
        bubbleSort(list);
    }
};

bubbleSort(list);
console.log(list);


const mergeSort = (list) => {
    // if there's only ine item in the list return.
    // Recursion check.
    if(list.length <= 1) {
        return list;
    }

    // Cut the list in half.
    const middle = list.length / 2;
    const left = list.slice(0, middle);
    const right = list. slice(middle, list.length);

    return merge(mergeSort(right), mergeSort(left));
};

const merge = (left, right) => {
    var result = [];
    // if the left and right lists both have elements run a comparison.
    while(left.length || right.length) {
        // if there are items in both sides.
        if(left.length && right.length) {
            // if the first item on the left is less than the right...
            if(left[0] < right[0]) {
                // take the first item on the left.
                result.push(left.shift());
            }
            else{
                // take the first item on the right.
                result.push(right.shift());
            }
        }
        else if(left.length) {
            result.push(left.shift());
        }
        else {
            result.push(right.shift());
        }
    }
    return result;
};

const mergeSortList = [6,7,3,8,2,5,4,1];

var resultList = mergeSort(mergeSortList);
console.log(resultList);

const quickSortList = [23,4,42,8,16,15];

const quickSort = (list) => {

    if (list.length < 2) {
        return list;
    }

    var left = [], right = [];

    const pivot = list.length -1;
    const pivotValue = list[pivot];

    // remove the pivot from the list as we don't want to compare it.
    list = list.slice(0, pivot);
    // loop the list, comparing the partition values.
    for(var item of list) {
        item < pivotValue ? left.push(item) : right.push(item);
    }
    // recursively move through left/right lists.
    return quickSort(left).concat([pivotValue], quickSort(right));
};

resultList = quickSort(quickSortList);
console.log(resultList);


const selectionSort = (list) => {

    for(var i = 0; i < list.length; i++) {
        var currentMinIndex = 0;
        for(var x = currentMinIndex + 1; x < list.length; x++){
            if(list[x] < list[currentMinIndex]) {
                currentMinIndex = x;
            }
        }
        if(currentMinIndex != i) {
            var oldMinValue = list[i];
            list[currentMinIndex] = oldMinValue;
        }
    }

    return list;
};


resultList = selectionSort(quickSortList);
console.log(resultList);


const binarySearchList = [4,8,15,16,20,21,23,42,52,62,72];

const binarySearch = (list, lookFor) => {
    // define range.
    var min=0; max = list.length;
    var middle;
    while(min <= max) {
        middle = Math.floor((min + max) / 2);
        if(list[middle] == lookFor) {
            return middle;
        }
        else {
            list[middle] < lookFor ? min=middle : max=middle;
            if(min === 0 && max === 0) {
                return -1;
            }
        }
    }
    return -1;
};

console.log(binarySearch(binarySearchList,3));
console.log(binarySearch(binarySearchList,23));

class BinaryNode {

    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    IsLeaf() {
        return this.left === null && this.right === null;
    }

};

class DFS {
    Traverse(node) {
        let stack = [];
        let thisNode = null;
        stack.push(node);
        while(stack.length > 0) {
            thisNode = stack.pop();
            console.log(thisNode.value);
            if(thisNode.right) {
                stack.push(thisNode.right);
            }
            if(thisNode.left) {
                stack.push(thisNode.left);
            }
        }
    }
};


class BFS {
    Traverse(node) {
        let queue = [];
        let thisNode = null;
        queue.push(node);
        while(queue.length > 0) {
            thisNode = queue.shift();
            console.log(thisNode.value);
            if(thisNode.left) {
                queue.push(thisNode.left);
            }
            if(thisNode.right) {
                queue.push(thisNode.right);
            }
        }
    }
};

var rootNode = new BinaryNode(0);
rootNode.left = new BinaryNode(1);
rootNode.right = new BinaryNode(2);
rootNode.left.left = new BinaryNode(3);
rootNode.left.right = new BinaryNode(4);
rootNode.right.left = new BinaryNode(5);
rootNode.right.right = new BinaryNode(6);

console.log(rootNode.IsLeaf());
console.log(rootNode.left.left.IsLeaf());


console.log("Depth First Search:");
var dfsSearch = new DFS();
dfsSearch.Traverse(rootNode);

console.log("Breadth First Search:");
var bfsSearch = new BFS();
bfsSearch.Traverse(rootNode);
