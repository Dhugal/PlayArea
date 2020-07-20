const input1 = [7,1,5,3,6,4];
const input2 = [7,1,5,0,6,4];
const input3 = [0,48,10,21,9,9,8,21,55];
const input4 = [0,0,0];
const input5 = [10,5,0];

const GetMaxProfitAndBuySellDays = (prices) => {
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

console.log(GetMaxProfitAndBuySellDays(input1));
console.log(GetMaxProfitAndBuySellDays(input2));
console.log(GetMaxProfitAndBuySellDays(input3));
console.log(GetMaxProfitAndBuySellDays(input4));
console.log(GetMaxProfitAndBuySellDays(input5));

var GetMaxProfitOnly = function(prices) {
    let minPrice = Number.MAX_SAFE_INTEGER, maxProfit = 0, diff = null, price = null;
    for(let i = 0; i < prices.length; i++) {
        price = prices[i];
        if(price < minPrice) {
            minPrice = price;
        }
        else if((diff = price - minPrice) > maxProfit) {
            maxProfit = diff;
        }
    }
    return maxProfit;
};

console.log(GetMaxProfitOnly(input1));
console.log(GetMaxProfitOnly(input2));
console.log(GetMaxProfitOnly(input3));
console.log(GetMaxProfitOnly(input4));
console.log(GetMaxProfitOnly(input5));
