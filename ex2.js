// 무지향성 무가중치 그래프
class Graph1 {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = [];
  }
  addEdge(vertex1, vertex2) {
    this.edges[vertex1].push(vertex2);
    this.edges[vertex2].push(vertex1);
  }
}
// 지향성 무가중치 그래프
class Graph2 {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = [];
  }
  addEdge(vertex1, vertex2) {
    this.edges[vertex1].push(vertex2);
  }
}
// 무지향성 가중치 그래프
class UndirectedGraph {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = {};
  }
  addEdge(vertex1, vertex2, weight = 0) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }
  bfs(vertex) {
    const queue = [vertex];
    const visited = {};
    while (queue.length) {
      const currentNode = queue.shift();
      if (!visited[currentNode]) {
        visited[currentNode] = true;
        console.log(currentNode);
        for (let adj in this.edges[currentNode]) {
          queue.push(adj);
        }
      }
    }
  }
  dfs(vertex) {
    const dfsHelper = (vertex, visited) => {
      visited[vertex] = true;
      console.log(vertex);
      for (let adj in this.edges[vertex]) {
        if (!visited[adj]) dfsHelper(adj, visited);
      }
    };
    dfsHelper(vertex, {});
  }
  Dijkstra(start) {
    const extractMin = (Q, dist) => {
      let minDistNode = null,
        minDist = Infinity;
      for (let node in Q) {
        if (dist[node] <= minDist) {
          minDist = dist[node];
          minDistNode = node;
        }
      }
      return minDistNode;
    };
    const Q = { ...this.edges },
      dist = {};
    for (let vertex in this.edges) {
      dist[vertex] = Infinity;
    }
    dist[start] = 0;
    while (Object.keys(Q).length !== 0) {
      const u = extractMin(Q, dist);
      delete Q[u];
      for (let adj in this.edges[u]) {
        const alt = dist[u] + this.edges[u][adj];
        if (alt < dist[adj]) dist[adj] = alt;
      }
    }
    return dist;
  }
  Prim(vertex) {
    const copy = JSON.parse(JSON.stringify(this.edges));
    const obj = Object.keys(this.edges).reduce((acc, cur) => {
      acc[cur] = {};
      return acc;
    }, {});
    const visited = Object.keys(this.edges).reduce((acc, cur) => {
      acc[cur] = false;
      return acc;
    }, {});
    let minNodeFrom = vertex,
      minNodeTo = null,
      min = Infinity;
    for (let adj in copy[vertex]) {
      if (copy[vertex][adj] < min) {
        minNodeTo = +adj;
        min = +copy[vertex][adj];
      }
    }
    visited[minNodeFrom] = true;
    visited[minNodeTo] = true;
    obj[minNodeFrom][minNodeTo] = min;
    obj[minNodeTo][minNodeFrom] = min;
    delete copy[minNodeFrom][minNodeTo];
    delete copy[minNodeTo][minNodeFrom];
    for (let i = 1; i < Object.keys(this.edges).length - 1; i++) {
      let minNodeFrom = null,
        minNodeTo = null,
        min = Infinity;
      const arr = [];
      Object.keys(obj).forEach((v) => {
        if (Object.keys(obj[v]).length !== 0) arr.push(v);
      });
      arr.forEach((v) => {
        for (let adj in copy[v]) {
          if (!visited[adj] && copy[v][adj] < min) {
            minNodeFrom = +v;
            minNodeTo = +adj;
            min = +copy[v][adj];
          }
        }
      });
      visited[minNodeFrom] = true;
      visited[minNodeTo] = true;
      obj[minNodeFrom][minNodeTo] = min;
      obj[minNodeTo][minNodeFrom] = min;
      delete copy[minNodeFrom][minNodeTo];
      delete copy[minNodeTo][minNodeFrom];
    }
    return obj;
  }
  // floydWarshallAlgorithm() {
  //   let dist = {};
  //   for (let i = 0; i < Object.keys(this.edges).length; i++) {
  //     dist[this.edges[i]] = {};
  //     // For existing edges assign the dist to be same as weight
  //     this.edges[this.edges[i]].forEach(
  //       (e) => (dist[this.edges[i]][e.node] = e.weight)
  //     );
  //     this.edges.forEach((n) => {
  //       // For all other nodes assign it to infinity
  //       if (dist[this.edges[i]][n] == undefined)
  //         dist[this.edges[i]][n] = Infinity;
  //       // For self edge assign dist to be 0
  //       if (this.edges[i] === n) dist[this.edges[i]][n] = 0;
  //     });
  //   }
  //   this.edges.forEach((i) => {
  //     this.edges.forEach((j) => {
  //       this.edges.forEach((k) => {
  //         // Check if going from i to k then from k to j is better
  //         // than directly going from i to j. If yes then update
  //         // i to j value to the new value
  //         if (dist[i][k] + dist[k][j] < dist[i][j])
  //           dist[i][j] = dist[i][k] + dist[k][j];
  //       });
  //     });
  //   });
  //   return dist;
  // }
}
// 지향성 가중치 그래프
class DirectedGraph {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = {};
  }
  addEdge(vertex1, vertex2, weight = 0) {
    this.edges[vertex1][vertex2] = weight;
  }
  bfs(vertex) {
    const queue = [vertex];
    const visited = {};
    while (queue.length) {
      const currentNode = queue.shift();
      if (!visited[currentNode]) {
        visited[currentNode] = true;
        console.log(currentNode);
        for (let adj in this.edges[currentNode]) {
          queue.push(adj);
        }
      }
    }
  }
  dfs(vertex) {
    const dfsHelper = (vertex, visited) => {
      visited[vertex] = true;
      console.log(vertex);
      for (let adj in this.edges[vertex]) {
        if (!visited[adj]) dfsHelper(adj, visited);
      }
    };
    dfsHelper(vertex, {});
  }
  Dijkstra(start) {
    const extractMin = (Q, dist) => {
      let minDistNode = null,
        minDist = Infinity;
      for (let node in Q) {
        if (dist[node] <= minDist) {
          minDist = dist[node];
          minDistNode = node;
        }
      }
      return minDistNode;
    };
    const Q = { ...this.edges },
      dist = {};
    for (let vertex in this.edges) {
      dist[vertex] = Infinity;
    }
    dist[start] = 0;
    while (Object.keys(Q).length !== 0) {
      const u = extractMin(Q, dist);
      delete Q[u];
      for (let adj in this.edges[u]) {
        const alt = dist[u] + this.edges[u][adj];
        if (alt < dist[adj]) dist[adj] = alt;
      }
    }
    return dist;
  }
  Prim(vertex) {
    const copy = JSON.parse(JSON.stringify(this.edges));
    const obj = Object.keys(this.edges).reduce((acc, cur) => {
      acc[cur] = {};
      return acc;
    }, {});
    const visited = Object.keys(this.edges).reduce((acc, cur) => {
      acc[cur] = false;
      return acc;
    }, {});
    let minNodeFrom = vertex,
      minNodeTo = null,
      min = Infinity;
    for (let adj in copy[vertex]) {
      if (copy[vertex][adj] < min) {
        minNodeTo = +adj;
        min = +copy[vertex][adj];
      }
    }
    visited[minNodeFrom] = true;
    visited[minNodeTo] = true;
    obj[minNodeFrom][minNodeTo] = min;
    delete copy[minNodeFrom][minNodeTo];
    for (let i = 1; i < Object.keys(this.edges).length - 1; i++) {
      let minNodeFrom = null,
        minNodeTo = null,
        min = Infinity;
      const arr = [];
      Object.keys(obj).forEach((v) => {
        if (Object.keys(obj[v]).length !== 0) arr.push(v);
      });
      arr.forEach((v) => {
        for (let adj in copy[v]) {
          if (!visited[adj] && copy[v][adj] < min) {
            minNodeFrom = +v;
            minNodeTo = +adj;
            min = +copy[v][adj];
          }
        }
      });
      visited[minNodeFrom] = true;
      visited[minNodeTo] = true;
      obj[minNodeFrom][minNodeTo] = min;
      delete copy[minNodeFrom][minNodeTo];
    }
    return obj;
  }
}

const undigraph = new UndirectedGraph();
undigraph.addVertex(1);
undigraph.addVertex(2);
undigraph.addVertex(3);
undigraph.addVertex(4);
undigraph.addVertex(5);
undigraph.addVertex(6);
undigraph.addEdge(1, 2, 1);
undigraph.addEdge(2, 5, 2);
undigraph.addEdge(1, 3, 3);
undigraph.addEdge(2, 3, 4);
undigraph.addEdge(2, 4, 5);
undigraph.addEdge(3, 4, 6);
undigraph.addEdge(3, 6, 7);
// console.log(undigraph);
// undigraph.bfs(1);
// undigraph.dfs(1);
// console.log(undigraph.Dijkstra(1));
// console.log(undigraph.Prim(1));
console.log(undigraph.floydWarshallAlgorithm());

class Kruskal {
  // [[0,1,1],[0,2,2]] 형태의 2차원 배열. 중복x (0과 1 연결, 2는 weight)
  // 크루스칼은 우선순위큐를 이용하지 않으면 위의 그래프 즉 객체안에 객체가 있는 형태에서 구현하기 어렵다.
  // 아래와 같은 형태로 변환 후 이용하자.
  // const arr=[]
  // for(let i in a){
  //     for(let j in a[i]){
  //         arr.push([i,j,a[i][j]])
  //     }
  // }
  constructor(n, graph) {
    this.n = n;
    this.graph = graph.sort((a, b) => a - b);
  }
  findMST() {
    const getParent = (parent, v) => {
      if (parent[v] === v) return v;
      return getParent(parent, parent[v]);
    };
    const unionParent = (parent, a, b) => {
      a = getParent(parent, a);
      b = getParent(parent, b);
      a < b ? (parent[b] = a) : (parent[a] = b);
    };
    const findParent = (parent, a, b) => {
      return getParent(parent, a) === getParent(parent, b);
    };
    const arr = [];
    const parent = [...new Set(this.graph.map((v) => [v[0], v[1]]).flat())];
    let i = 0;
    while (arr.length !== this.n - 1) {
      if (!findParent(parent, this.graph[i][0], this.graph[i][1])) {
        unionParent(parent, this.graph[i][0], this.graph[i][1]);
        arr.push(this.graph[i]);
      }
      i++;
    }
    return arr;
  }
}
const kruskal = new Kruskal(4, [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
]);
// console.log(kruskal.findMST());

// ex1
// 2차원 배열 => 무지향성 무가중치 그래프
(function () {
  const edge = [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ];
  // edgd의 vertex가 1,2,3,4처럼 나올때 복잡도 줄여서 만드는 법
  const graph = Array(6)
    .fill()
    .reduce((acc, cur, idx) => {
      acc[idx + 1] = [];
      return acc;
    }, {});
  edge.forEach(([from, to]) => {
    graph[from].push(to);
    graph[to].push(from);
  });
  console.log(graph);

  // edge의 vertex가 임의로 나오는 경우.
  const graph2 = edge.reduce((acc, [from, to]) => {
    acc[from] = (acc[from] || []).concat(to);
    acc[to] = (acc[to] || []).concat(from);
    return acc;
  }, {});
  console.log(graph2);
});
// ();
