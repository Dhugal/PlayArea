const image = [
    [ 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 2, 2, 0, 0 ],
    [ 0, 0, 2, 2, 0, 0 ],
    [ 2, 2, 2, 2, 2, 2 ]
];


const boundaryCheckAndColourCheck = function(image, x, y, startColour) {
    return !(x < 0 || x >= image.length || y < 0 || y >= image[x].length) && image[x][y] === startColour;
};

const getNeigbours = (image, x, y, colour) => {
    let neighbors = [];
    if(boundaryCheckAndColourCheck(image, x + 1, y, colour)) 
        neighbors.push({x: x + 1, y });
    
    if(boundaryCheckAndColourCheck(image, x - 1, y, colour)) 
        neighbors.push({x: x - 1, y });

    if(boundaryCheckAndColourCheck(image, x, y + 1, colour)) 
        neighbors.push({x: x, y: y + 1 });

    if(boundaryCheckAndColourCheck(image, x, y - 1, colour)) 
        neighbors.push({x: x, y: y - 1});

    return neighbors;
}

const floodFillRecursive = function(image, x, y, newColour) 
{
    if(!image || image.length === 0 || image[x][y] === newColour) {
        return image;
    }

    // Get the colour the we're starting with.
    const colour = image[x][y];
    fillRecursive(image, x, y, colour, newColour);

    return image;
};

const fillRecursive = function(image, x, y, colour, newColour) {
    if(x < 0 || x >= image.length || y < 0 || y >= image[x].length || image[x][y] != colour) {
        return;
    }
    image[x][y] = newColour;
    var neighbors = getNeigbours(image, x, y, colour)
    neighbors.map((item) => { fillRecursive(image, item.x, item.y, colour, newColour) });
};

const floodFillStack = function(image, x, y, newColour) 
{
    if(!image || image.length === 0 || image[x][y] === newColour) {
        return image;
    }

    // Get the colour the we're starting with.
    const colour = image[x][y];
    var stack = [];
    stack.push({x, y});
    while(stack.length > 0) {
        var current = stack.pop();
        image[current.x][current.y] = newColour;
        var neighbors = getNeigbours(image, current.x, current.y, colour)
        neighbors.map((item) => { stack.push(item) });
    }
    return image;
}
var i=0;
for(i=0; i<image.length;i++) {
    console.log(image[i]);
}
floodFillRecursive(image, 3, 3, 3);
//floodFillStack(image, 3, 3, 3);
console.log("-----------------------");
for(i=0; i<image.length;i++) {
    console.log(image[i]);
}
console.log("-----------------------");