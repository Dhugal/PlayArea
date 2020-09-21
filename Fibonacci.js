// Recursive with no cache - ouch.
// Time Complexity:     O(2^n) - We calculate each number repeatadly... (E.G. getNthFibBasicRecursive(5) calls getNthFibBasicRecursive(4) and getNthFibBasicRecursive(3), then getNthFibBasicRecursive(4) also calls getNthFibBasicRecursive(3) etc.).
// Space Complexity:    O(n)   - No result caching but call stack will contain a frame per item (E.G getNthFibBasicRecursive(3) will call getNthFibBasicRecursive(2) and getNthFibBasicRecursive(1) etc.)
function getNthFibBasicRecursive(n) {
    if(n === 1) {
        return 0;
    }
    if(n === 2) {
       return 1;
    }
    return getNthFibBasicRecursive(n - 1) + getNthFibBasicRecursive(n - 2);
}

// Cache / Memoize results to prevent repeated calculations.
// Time Complexity:     O(n) - We only calculate each number in the sequence once and cache the result.
// Space Complexity:    O(n) - We store the result of each prior calculation.
const cache = {};
function getNthFibWithMemoization(n) {
  	if(!cache.hasOwnProperty(n)) {
        if(n <= 2)
        {
            cache[n]  = n - 1;
        }
        else {
            cache[n] = getNthFibWithMemoization(n - 1) + getNthFibWithMemoization(n - 2);
        }
    }
    return cache[n];
}

// Time Complexity:     O(n) 
// Space Complexity:    O(1) - we only store the last two calculations, requiring a constant amount of space.
function getNthFibWithFixedStorage(n) {
	let lastTwo = [0, 1];
	if(n === 1) {
		return lastTwo[0];
	}
	let counter = 2;
	while(counter < n){
		let next = lastTwo[0] + lastTwo[1];
		lastTwo[0] = lastTwo[1];
		lastTwo[1] = next;
		counter++;
	}
	return lastTwo[1];
}

for(var i=1; i<=10; i++) {
    console.log(`Fib(${i}):`);
    console.log("   getNthFibBasicRecursive: " + getNthFibBasicRecursive(i));
    console.log("   getNthFibWithMemoization: " + getNthFibWithMemoization(i));
    console.log("   getNthFibWithFixedStorage: " + getNthFibWithFixedStorage(i));
}
