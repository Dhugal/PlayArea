const input1 = [7,1,5,3,6,4];
const input2 = [7,1,5,0,6,4];
const input3 = [10,21,9,9,8,21,55,0,20];

const GetMaxProfit = (prices) => {
    if(prices === null || prices.length <= 1) {
        return 0;
    }

    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxProfit = 0;
    let lastBuyDay = null;
    let sellDay = null;

    for(let i = 0; i < prices.length; i++) {
        if(prices[i] < minPrice) {
            minPrice = prices[i];
            lastBuyDay = i;
        }
        else if(prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
            bestBuyDay = lastBuyDay;
            sellDay = i;
        }
    }
    console.log("Buy Day: " + bestBuyDay + ", Sell Day: " + sellDay + ", Max Profit: " + maxProfit);
    return maxProfit;
};



console.log(GetMaxProfit(input1));
console.log(GetMaxProfit(input2));
console.log(GetMaxProfit(input3));