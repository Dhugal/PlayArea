const path = 1;
const wall = 0;
const S = "S";
const F = "F";

const maze1 = [
    [ 0, 0, 0, 0, 1, F, 1, 1 ],
    [ 1, 0, 0, 0, 1, 0, 0, 1 ],
    [ 1, 0, 1, 0, 1, 0, 0, 1 ],
    [ 1, 0, 1, 0, 1, 1, 1, 1 ],
    [ 1, 0, 1, 0, 0, 1, 0, 1 ],
    [ S, 1, 1, 1, 1, 1, 0, 0 ]
];

const maze2Unsolvable = [
    [ 0, 0, 0, 0, 0, F, 0, 1 ],
    [ 1, 0, 0, 0, 1, 0, 0, 1 ],
    [ 1, 0, 1, 0, 1, 0, 0, 1 ],
    [ 1, 0, 1, 0, 1, 1, 1, 1 ],
    [ 1, 0, 1, 0, 0, 1, 0, 1 ],
    [ S, 1, 1, 1, 1, 1, 0, 0 ]
];


class node {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.path = [];
    };
    getHash() {
        return this.x + "-" + this.y;
    }
    isFinish(maze){
        return maze[this.x][this.y] === F;
    };
    validNode(maze, visited, node) {
        return !(node.x < 0 || node.x >= maze.length || node.y < 0 || node.y >= maze[node.x].length) && maze[node.x][node.y] !== wall && !visited[node.getHash()];
    };
    getNeighbors(maze, visited) {
        let neighbours = [];
        let up = new node(this.x - 1, this.y);
        if(this.validNode(maze, visited, up)) {
            neighbours.push(up);
        }
        let right = new node(this.x, this.y + 1);
        if(this.validNode(maze, visited, right)) {
            neighbours.push(right);
        }
        let down = new node(this.x + 1, this.y);
        if(this.validNode(maze, visited, down)) {
            neighbours.push(down);
        }
        let left = new node(this.x, this.y - 1);
        if(this.validNode(maze, visited, left)) {
            neighbours.push(left);
        }
        return neighbours;
    }
}

const traverseMazeDFSRecursive = (maze, startX, startY) => {
    let visited = {};
    let currentNode = new node(startX, startY)
    currentNode.path = [currentNode.getHash()];
    return DFSRecursive(maze, visited, currentNode, currentNode.path);
};

// Asking for a Stack overflow... :)
const DFSRecursive = (maze, visited, currentNode) => {
    visited[currentNode.getHash()] = true;
    if(currentNode.isFinish(maze)) {
        printMaze(maze, visited, currentNode);
        console.log("Finished DFS Recursive Path: " + currentNode.path.length + " step(s) - " + currentNode.path);
        return true;
    }
    let neighbors = currentNode.getNeighbors(maze, visited);
    for(let i=0; i<neighbors.length; i++) {
        let nextNode = neighbors[i];
        nextNode.path =  [...currentNode.path,nextNode.getHash()];
        var result = DFSRecursive(maze, visited, nextNode, nextNode.path);
        if(result) {
            return result;
        }
    }
    return false;
};


const traverseMazeDFSStack = (maze, startX, startY) => {
    let visited = {};
    let currentNode = new node(startX, startY)
    currentNode.path = [currentNode.getHash()];
    return DFSStack(maze, visited, currentNode);
};

const DFSStack = (maze, visited, currentNode) => {
    var stack = [currentNode];
    while(stack.length > 0) {
        currentNode = stack.pop();
        visited[currentNode.getHash()] = true;
        currentNode.path.push(currentNode.getHash());
        if(currentNode.isFinish(maze)) {
            console.log("Finished DFS Stack Path: " + currentNode.path.length + " step(s) - " + currentNode.path);
            printMaze(maze, visited, currentNode, currentNode.path);
            return true;
        }
        let neighbors = currentNode.getNeighbors(maze, visited).reverse();
        neighbors.map((item) => {
            item.path = [...currentNode.path];
        });
        stack.push(...neighbors);
    }
    return false;
};


const BFSQueue = (maze, visited, currentNode) => {
    var queue = [currentNode];
    while(queue.length > 0)
    {
        currentNode = queue.shift();
        currentNode.path.push(currentNode.getHash());
        visited[currentNode.getHash()] = true;
        if(currentNode.isFinish(maze)) {
            console.log("Finished BFS Queue Path: " + currentNode.path.length + " step(s) - " + currentNode.path);
            printMaze(maze, visited, currentNode, currentNode.path);
            return true;
        }
        let neighbors = currentNode.getNeighbors(maze, visited);
        neighbors.map((item) => {
            item.path = [...currentNode.path];
        });
        queue.push(...neighbors);
    }
    return false;
};

const traverseMazeBFS = (maze, startX, startY) => {
    let visited = {};
    let currentNode = new node(startX, startY)
    return BFSQueue(maze, visited, currentNode);
};

const printMaze = (maze, visited, currentNode) =>
{
    let finished = currentNode.isFinish(maze);
    for(let x=0;x<maze.length;x++){
        let row = maze[x];
        let out = "";
        let args = [];

        for(let y=0;y<row.length; y++) {
            let n = new node(x, y);
            let onPath = currentNode.path.includes(n.getHash());
            if(onPath) {
                out += "%c"
                args.push("color: green;")
            }
            if(currentNode.getHash() === n.getHash()) {
                if(finished) {
                    out += "Y ";
                }
                else {
                    out += "* ";
                }
            }
            else if(visited[n.getHash()]) {
                if(!onPath) {
                    out += "%c"
                    args.push("color: red;")
                }
                out += "# ";
                if(!onPath) {
                    args.push("color: reset;")
                    out += "%c"
                }
            }
            else {
                out += row[y] + " ";
            }
            if(onPath) {
                out += "%c"
                args.push("color: reset;");
            }
        }
        args.unshift(out);
        console.log.apply(console, args);
    }
    if(finished) {
        console.log("************** %cFinish Located%c ******************", "color: green;", "color: reset;");
    }
}

console.log("----------------------------------------------------");
console.log("Traverse Maze Recursive:")
console.log(traverseMazeDFSRecursive(maze1, 5, 0 ));
console.log("");
console.log("");
console.log("----------------------------------------------------");
console.log("Traverse Maze DFS Stack:")
console.log(traverseMazeDFSStack(maze1, 5, 0 ));
console.log("");
console.log("");
console.log("----------------------------------------------------");
console.log("Traverse Maze BFS Stack - finds shortest path:")
console.log(traverseMazeBFS(maze1, 5, 0 ));


console.log("----------------------------------------------------");
console.log("Traverse Maze Recursive:")
console.log(traverseMazeDFSRecursive(maze2Unsolvable, 5, 0 ));
console.log("");
console.log("");
console.log("----------------------------------------------------");
console.log("Traverse Maze DFS Stack:")
console.log(traverseMazeDFSStack(maze2Unsolvable, 5, 0 ));
console.log("");
console.log("");
console.log("----------------------------------------------------");
console.log("Traverse Maze BFS Stack - finds shortest path:")
console.log(traverseMazeBFS(maze2Unsolvable, 5, 0 ));
