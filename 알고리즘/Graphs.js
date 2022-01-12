// 그래프는 네트워크 구조를 추상화한 모델로, 간선(edge)으로 연결된 노드(node)(정점(vertex))의 집합이다.
class Graph {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = {};
  }
  removeVertex(vertex) {
    for (let adjacentVertex in this.edges[vertex]) {
      this.removeEdge(adjacentVertex, vertex);
    }
    delete this.edges[vertex];
  }
  // breadth-first search
  bfs(vertex) {
    let queue = [vertex];
    let visited = {};
    while (queue.length) {
      vertex = queue.shift();
      if (!visited[vertex]) {
        visited[vertex] = true;
        console.log(vertex);
        for (let adjacentVertex in this.edges[vertex]) {
          queue.push(adjacentVertex);
        }
      }
    }
  }
  // depth-first seaarch
  dfs(vertex) {
    const dfsHelper = (vertex, visited) => {
      visited[vertex] = true;
      console.log(vertex);
      for (let adjacentVertex in this.edges[vertex]) {
        if (!visited[adjacentVertex]) dfsHelper(adjacentVertex, visited);
      }
    };
    var visited = {};
    dfsHelper(vertex, visited);
  }
  // 다익스트라 알고리즘
  Dijkstra(start) {
    const copyEdges = () => {
      let Q = {};
      for (let vertex in this.edges) {
        Q[vertex] = this.edges[vertex];
      }
      return Q;
    };
    const makeInfinity = () => {
      let dist = {};
      for (let vertex in this.edges) {
        dist[vertex] = Infinity;
      }
      return dist;
    };
    const findMin = (Q, dist) => {
      let minDist = Infinity,
        nodeMinDist = null;
      for (let node in Q) {
        if (dist[node] <= minDist) {
          minDist = dist[node];
          nodeMinDist = node;
        }
      }
      return nodeMinDist;
    };
    let Q = copyEdges(),
      dist = makeInfinity();
    dist[start] = 0;
    while (Object.keys(Q).length !== 0) {
      let min = findMin(Q, dist);
      delete Q[min];
      for (let edge in this.edges[min]) {
        let alt = dist[min] + this.edges[min][edge];
        if (alt < dist[edge]) dist[edge] = alt;
      }
    }
    return dist;
  }
  // 크루스칼 알고리즘
}

// 무지향성 가중치 그래프
class UndirectedGraph extends Graph {
  constructor() {
    super();
  }
  addEdge(vertex1, vertex2, weight) {
    if (!weight) weight = 0; // 가중치가 없다면 weight를 빼고 0으로 대체
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight; // 지향성이라면 제거
  }
  removeEdge(vertex1, vertex2) {
    if (this.edges[vertex1] && this.edges[vertex1][vertex2])
      delete this.edges[vertex1][vertex2];
    // 지향성이라면 아래는 제거
    if (this.edges[vertex2] && this.edges[vertex2][vertex1])
      delete this.edges[vertex2][vertex1];
  }
}
var undigraph1 = new UndirectedGraph();
undigraph1.addVertex(1);
undigraph1.addVertex(2);
undigraph1.addEdge(1, 2, 1);
console.log(undigraph1.edges); // 1: {2: 0},  2: {1: 0}
undigraph1.addVertex(3);
undigraph1.addVertex(4);
undigraph1.addVertex(5);
undigraph1.addEdge(2, 3, 8);
undigraph1.addEdge(3, 4, 10);
undigraph1.addEdge(4, 5, 100);
undigraph1.addEdge(1, 5, 88);
undigraph1.removeVertex(5);
undigraph1.removeVertex(1);
undigraph1.removeEdge(2, 3);
console.log(undigraph1.edges);

var undigraph2 = new UndirectedGraph();
undigraph2.addVertex(1);
undigraph2.addVertex(2);
undigraph2.addVertex(3);
undigraph2.addVertex(4);
undigraph2.addVertex(5);
undigraph2.addEdge(1, 2);
undigraph2.addEdge(1, 5);
undigraph2.addEdge(2, 3);
undigraph2.addEdge(3, 4);
undigraph2.addEdge(4, 5);
undigraph2.bfs(1);
undigraph2.dfs(1);

// 지향성 가중치 그래프
class DirectedGraph extends Graph {
  constructor() {
    super();
  }
  addEdge(vertex1, vertex2, weight) {
    if (!weight) weight = 0; // 가중치가 없다면 weight를 빼고 0으로 대체
    this.edges[vertex1][vertex2] = weight;
  }
  removeEdge(vertex1, vertex2) {
    if (this.edges[vertex1] && this.edges[vertex1][vertex2])
      delete this.edges[vertex1][vertex2];
  }
}
var digraph1 = new DirectedGraph();
digraph1.addVertex('A');
digraph1.addVertex('B');
digraph1.addVertex('C');
digraph1.addEdge('A', 'B', 1);
digraph1.addEdge('B', 'C', 2);
digraph1.addEdge('C', 'A', 3);
console.log(digraph1.edges);
