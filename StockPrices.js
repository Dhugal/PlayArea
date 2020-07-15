const input1 = [7,1,5,3,6,4];
const input2 = [7,1,5,0,6,4];
const input3 = [0,48,10,21,9,9,8,21,55];

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
    if(maxProfit > 0) {
        prices[bestBuyDay] = "%c" + prices[bestBuyDay];
        prices[sellDay] += "%c";
        console.log("Given " + prices + " you should Buy on Day: " + bestBuyDay + " and Sell on Day: " + sellDay + " producing a Profit of: " + maxProfit, "color: green;", "color: reset;");
    }
    else {
        console.log("Given " + prices + " no profit can be made");
    }
    return maxProfit;
};


console.log(GetMaxProfit(input1));
console.log(GetMaxProfit(input2));
console.log(GetMaxProfit(input3));