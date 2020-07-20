
class MemoTable {
    constructor(vertices) {

        // Set up the table of vertices.
        this.S = { name: "S", cost: 0, visited: false, via: null };
        this.table = [this.S];
        for(var vertex of vertices) {
            this.table.push({ name: vertex, cost: Number.POSITIVE_INFINITY, via: null });
        }
    };

    getEntry(vertex) {
        return this.table.find(entry => entry.name === vertex);
    };

    // Get a list of vertices which have not been visited yet.
    getCandidateVertices() {
        return this.table.filter(entry => {
                return !entry.visited;
        });
    };

    // Get the next vertex (first not visited - lowest score).
    nextVertext() {
        let candidates = this.getCandidateVertices();
        if(candidates.length === 0) {
            return null;
        }
        // Find the lowest cost candidate.
        return candidates.reduce((prev, curr) => {
            return prev.cost < curr.cost ? prev : curr;
        });
    };

    setCurrentCost(vertex, cost, via) {
        let entry = this.getEntry(vertex);
        if(entry) {
            entry.cost = cost;
            entry.via = via;
        }
    };

    setVisited(vertex) {
        let entry = this.getEntry(vertex);
        if(entry) {
            entry.visited = true;
        }
    };

    getCost(vertex) {
        let entry = this.getEntry(vertex);
        if(entry) {
            return entry.cost;
        }
        return null;
    };

    logResults() {
        console.log("--------------- RESULTS ---------------")
        this.table.map(entry => {

            // Walk back through the path and push it onto a stack so we can write it out in order.
            let pathStack = [];
            let via = entry.via;
            while(via) {
                pathStack.push(via);
                via = memo.getEntry(via).via;
            }
            let path = "";
            while(pathStack.length > 0) {
                if(path.length > 0) {
                    path+=" -> ";
                }
                path+=pathStack.pop();
            }

            console.log(`vertex ${entry.name} - cost: ${entry.cost} via ${path}`);
        });
        console.log("--------------------------------------")
    }
};


var vertices = ["A","B","C","D","E"];
var graph = [
    {from: "S", to: "A", cost: 4 },
    {from: "S", to: "E", cost: 2 },
    {from: "A", to: "D", cost: 3 },
    {from: "A", to: "C", cost: 6 },
    {from: "A", to: "B", cost: 5 },
    {from: "B", to: "A", cost: 3 },
    {from: "C", to: "B", cost: 1 },
    {from: "D", to: "C", cost: 3 },
    {from: "D", to: "A", cost: 1 },
    {from: "E", to: "D", cost: 1 }
];

const memo = new MemoTable(vertices);

const evaluate = vertex => {

    const edges = graph.filter(path => {
        return path.from === vertex.name;
    });

    for(edge of edges) {
        const currentVertexCost = memo.getCost(edge.from);
        const toVertextCost = memo.getCost(edge.to);
        const tentativeCost = currentVertexCost + edge.cost;

        if(tentativeCost < toVertextCost) {
            memo.setCurrentCost(edge.to, tentativeCost, edge.from);
        };
    };
    memo.setVisited(vertex.name);

    const next = memo.nextVertext();
    if(next) evaluate(next);
};

evaluate(memo.S);
memo.logResults();

// Example output:
// --------------- RESULTS ---------------
// vertex S - cost: 0 via 
// vertex A - cost: 4 via S
// vertex B - cost: 7 via S -> E -> D -> C
// vertex C - cost: 6 via S -> E -> D
// vertex D - cost: 3 via S -> E
// vertex E - cost: 2 via S
// --------------------------------------