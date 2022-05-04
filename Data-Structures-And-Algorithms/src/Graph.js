import Dictionary from "./Dictionary.js";
import { Queue } from "./Queue.js";
import { Stack } from "./Stack.js";

export class Graph {
    // isDirected默认图是无向的
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = []; // 用数组存储图中所有顶点的名字
        this.adjList = new Dictionary(); // 存储邻接表
    }
    // 添加一个新的顶点
    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }
    // 添加顶点之间的边
    addEdge(v, w) {
        if (!this.adjList.get(v)) {
            this.addVertex(v);
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w);
        }
        // 如果只是有向的 只需要添加一条v -> w的边即可
        this.adjList.get(v).push(w);
        // 如果是无向的，则需要再添加一条w -> v的边
        if (!this.isDirected) {
            this.adjList.get(w).push(v);
        }
    }
    // 返回顶点列表
    getVertices() {
        return this.vertices;
    }
    // 返回邻接表
    getAdjList() {
        return this.adjList;
    }
    // 输入图
    toString() {
        let s = "";
        this.vertices.forEach((item) => {
            s += `${item} -> `;
            let neighbors = this.adjList.get(item);
            neighbors.forEach((neighbor) => {
                s += `${neighbor} `;
            });
            s += "\n";
        });
        return s;
    }
}

const graph = new Graph();
const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
myVertices.forEach((item) => {
    graph.addVertex(item);
});

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

// console.log(graph);
// console.log(graph.getAdjList());
// console.log(graph.toString());

// 图的遍历
// 深度优先搜索 栈    将顶点存入栈，顶点是沿着路径被探索的，存在新的相邻顶点就去访问
// 广度优先搜索 队列  将顶点存入队列，最先入队列的顶点先被探索

/**
 * 当要标记已经访问果的顶点时，我们用三种颜色来反映他们的状态
 *
 * 白色：表示该顶点还没被访问
 * 灰色：表示该顶点被访问过，但并未被探索过
 * 黑色：表示该顶点被访问过且被完全探索过
 */

// Colors变量
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2,
};

const initializeColor = (vertices) => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

// 广度优先搜索,从指定的第一个顶点开始遍历图，先访问其所有的邻点，先宽后深的访问顶点
export const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices(); // 顶点列表
    const adjList = graph.getAdjList(); // 顶点间的边
    const color = initializeColor(vertices);
    const queue = new Queue();
    // console.log(startVertex, color, queue);
    queue.enqueue(startVertex);
    while (!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                queue.enqueue(w);
            }
        }
        color[u] = Colors.BLACK;
        if (callback) callback(u);
    }
};

const printVertex = (value) => console.log(`Visited vertext: ${value}`);
// breadthFirstSearch(graph, myVertices[0], printVertex);

/**
A -> B C D 
B -> A E F 
C -> A D G 
D -> A C G H 
E -> B I 
F -> B 
G -> C D 
H -> D 
I -> E 
 */
// 改进BFS广度优先搜索，寻找最短路径
const BFS = (graph, startVertex, callback) => {
    const vertices = graph.getVertices(); // 顶点列表
    const adjList = graph.getAdjList(); // 顶点间的边
    const color = initializeColor(vertices);
    const queue = new Queue();
    const distances = {}; // 表示距离
    const predecessors = {}; // 表示前溯点
    queue.enqueue(startVertex); // 第一个开始入栈

    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0; // 初始化所有顶点的距离为0
        predecessors[vertices[i]] = null; // 初始化所有的顶点的前溯点为null
    }

    while (!queue.isEmpty()) {
        const u = queue.dequeue(); // 栈先进先出，弹出第一个值u，如A
        const neighbors = adjList.get(u); // 找出u顶点的相邻点，如B C D
        color[u] = Colors.GREY; // 设置为已为探索访问
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]; // 循环这个顶点的相邻点
            // 如果是未访问的
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY; // 则记录为已访问
                distances[w] = distances[u] + 1; // 计算每个顶点的距离，当前相邻点的距离等于当前顶点的距离+1
                predecessors[w] = u; // 记录前溯点
                queue.enqueue(w); // 此处将其他顶点依次入栈
            }
        }
        color[u] = Colors.BLACK;
    }
    return {
        distances,
        predecessors,
    };
};

const shortestPathA = BFS(graph, myVertices[0]);
const fromVertex = myVertices[0]; // 取第一个顶点
for (let i = 1; i < myVertices.length; i++) {
    const toVertex = myVertices[i]; // 从第二个顶点开始
    const path = new Stack(); // 初始化一个栈结构
    // 如果v 不等于第一个顶点，v沿着predecessors父子关系往上找
    for (
        let v = toVertex;
        v !== fromVertex;
        v = shortestPathA.predecessors[v]
    ) {
        path.push(v); // 推入栈中
    }
    path.push(fromVertex); // 再讲第一个顶点推入栈中
    let s = path.pop(); // 取出最后一个
    while (!path.isEmpty()) {
        s += " - " + path.pop(); // 拼接
    }
    // console.log(s);
}

// 深度优先搜索，会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径，先深度后广度
const depthFirstSearch = (graph, callback) => {
    const vertices = graph.getVertices(); // 取出所有顶点
    const adjList = graph.getAdjList(); // 取出所有顶点对应的相邻点
    const color = initializeColor(vertices);
    for (let i = 0; i < vertices.length; i++) {
        // 如果当前顶点没有被访问过，则开始访问
        if (color[vertices[i]] === Colors.WHITE) {
            depthFirstSearchVisitor(vertices[i], color, adjList, callback);
        }
    }
};

const depthFirstSearchVisitor = (u, color, adjList, callback) => {
    color[u] = Colors.GREY; // 将当前顶点标记为已访问
    if (callback) callback(u); // 打印值
    const neighbors = adjList.get(u); // 取出当前顶点对应的相邻点
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]; // 依次取出相邻点
        // 如果相邻点没有被访问过
        if (color[w] === Colors.WHITE) {
            depthFirstSearchVisitor(w, color, adjList, callback); // 递归访问该相邻点
        }
    }
    color[u] = Colors.BLACK; // 直到当前顶点的所有相邻点都已访问完了，再将当前顶点标记为已访问且已探索
};

// depthFirstSearch(graph, printVertex);

// 改进DFS，构建有根树的一个集合以及一组源顶点（根）
export const DFS = (graph) => {
    const vertices = graph.getVertices(); // 取出所有顶点
    const adjList = graph.getAdjList(); // 取出所有顶点对应的相邻点
    const color = initializeColor(vertices);
    const d = {};
    const f = {};
    const p = {};
    const time = { count: 0 };
    for (let i = 0; i < vertices.length; i++) {
        d[vertices[i]] = 0;
        f[vertices[i]] = 0;
        p[vertices[i]] = null;
    }
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, d, f, p, time, adjList);
        }
    }

    return {
        discovery: d,
        finished: f,
        predecessors: p,
    };
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY;
    d[u] = ++time.count;
    const neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === Colors.WHITE) {
            p[w] = u;
            DFSVisit(w, color, d, f, p, time, adjList);
        }
    }
    color[u] = Colors.BLACK;
    f[u] = ++time.count;
};

// 拓扑排序 有向无环图
const graph2 = new Graph(true);
const myVertices2 = ["A", "B", "C", "D", "E", "F"];
myVertices2.forEach((item) => {
    graph2.addVertex(item);
});

graph2.addEdge("A", "C");
graph2.addEdge("A", "D");
graph2.addEdge("B", "D");
graph2.addEdge("B", "E");
graph2.addEdge("C", "F");
graph2.addEdge("F", "E");
const result = DFS(graph2);
// console.log(result);
