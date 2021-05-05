// 1 신규 아이디 추천
// https://programmers.co.kr/learn/courses/30/lessons/72410
// 정규식만 안다면 쉬운문제. 모른다면 조금 귀찮은 문제일수도..
function solution(new_id) {
  new_id =
    new_id
      .toLowerCase()
      .replace(/[^a-z0-9-_.]/g, '')
      .replace(/\.{2,}/g, '.')
      .replace(/^\./, '')
      .replace(/\.$/, '') || 'a';
  new_id = new_id.substring(0, 15).replace(/\.$/, '');
  while (new_id.length < 3) new_id += new_id[new_id.length - 1];
  return new_id;
}

// 2 메뉴 리뉴얼
// https://programmers.co.kr/learn/courses/30/lessons/72411
// combination 함수만드는게 거의 90퍼
// 해시테이블(객체) 이용. Object.entries 알면 더 쉽게 풀 수 있다.
const getCombinations = (arr, selectNumber) => {
  if (selectNumber === 1) return arr.map((v) => [v]);
  const result = [];
  arr.forEach((v, i) => {
    const rest = arr.slice(i + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [v, ...combination]);
    result.push(...attached);
  });
  return result;
};

function solution(orders, course) {
  const answer = [];
  orders = orders.map((v) => v.split('').sort());
  course.forEach((n) => {
    const combi = [];
    orders.forEach((order) => {
      combi.push(...getCombinations(order, n));
    });
    const obj = {};
    combi.forEach((v) => {
      const str = v.join('');
      if (obj[str]) obj[str]++;
      else obj[str] = 1;
    });
    const arr = Object.entries(obj);
    arr.sort((a, b) => b[1] - a[1]);
    const max = arr[0] && arr[0][1];
    if (max !== 1) {
      for (let i = 0; i < arr.length; i++) {
        if (max !== arr[i][1]) break;
        answer.push(arr[i][0]);
      }
    }
  });
  answer.sort();
  return answer;
}

// 3 순위 검색
// https://programmers.co.kr/learn/courses/30/lessons/72412
// 효율성 실패
function solution(info, query) {
  const answer = [];
  info = info.map((v) => v.split(' '));
  query.forEach((q) => {
    const arr = q.replace(/\sand\s/g, ' ').split(' ');
    let count = 0;
    info.forEach((v) => {
      for (let i = 0; i < 5; i++) {
        if (i === 4 && +v[i] >= +arr[i]) count++;
        if (arr[i] === '-') continue;
        if (arr[i] !== v[i]) break;
      }
    });
    answer.push(count);
  });
  return answer;
}
// function solution(info, query) {
//   info = info.map((v) => v.split(' '));
//   // console.log(info);
//   query = query.map((v) =>
//     v.replace(/and/g, '').replace(/\s{2}/g, ' ').split(' ')
//   );
//   // console.log(query);
//   const arr = [];
//   query.forEach((v) => {
//     let count = 0;
//     for (let i = 0; i < info.length; i++) {
//       let tf = true;
//       for (let j = 0; j < 4; j++) {
//         if (v[j] !== '-' && info[i][j] !== v[j]) {
//           tf = false;
//           break;
//         }
//       }
//       if (tf && +info[i][4] >= +v[4]) {
//         count++;
//       }
//     }
//     arr.push(count);
//   });
//   // console.log(arr);
//   return arr;
// }

// // 효울성 실패2
// function solution(info, query) {
//   const case_ = [];
//   const ar1 = ['cpp', 'java', 'python'],
//     ar2 = ['backend', 'frontend'],
//     ar3 = ['junior', 'senior'],
//     ar4 = ['chicken', 'pizza'];
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 2; j++) {
//       for (let k = 0; k < 2; k++) {
//         for (let l = 0; l < 2; l++) {
//           case_.push([ar1[i], ar2[j], ar3[k], ar4[l]]);
//         }
//       }
//     }
//   }
//   // console.log('case_', case_);
//   info = info.map((v) => v.split(' '));
//   // console.log('info', info);
//   const info_arr = [];
//   info.forEach((v) => {
//     for (let i = 0; i < case_.length; i++) {
//       if (case_[i].toString() === v.slice(0, 4).toString()) {
//         info_arr.push([i, +v[4]]);
//         break;
//       }
//     }
//   });
//   info_arr.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : b[0] - a[0]));
//   // console.log('info_arr', info_arr);
//   query = query.map((v) =>
//     v.replace(/and/g, '').replace(/\s{2}/g, ' ').split(' ')
//   );
//   // console.log('query', query);
//   const answer = [];
//   query.forEach((v) => {
//     const query_arr = [];
//     const all_arr = [];
//     for (let i = 0; i < 4; i++) {
//       if (v[i] === '-') all_arr.push(i);
//     }
//     // console.log('query[i]', v, 'all_arr', all_arr);
//     for (let i = 0; i < case_.length; i++) {
//       const all_arr_slice = all_arr.slice();
//       for (let j = 0; j < 4; j++) {
//         // console.log(i, j);
//         if (all_arr_slice[0] === j) {
//           if (j === 3) query_arr.push([i, +v[4]]);
//           all_arr_slice.shift();
//           continue;
//         }
//         if (v[j] !== case_[i][j]) {
//           break;
//         }
//         if (j === 3) {
//           query_arr.push([i, +v[4]]);
//         }
//       }
//     }
//     // console.log('query_arr', query_arr);
//     let count = 0;
//     query_arr.forEach((v) => {
//       count += info_arr.filter((v2) => v2[0] === v[0] && v2[1] >= v[1]).length;
//     });
//     answer.push(count);
//   });
//   return answer;
// }

// 4 효율성 실패
class Graph {
  constructor() {
    this.edges = {};
  }
  addVertex(vertex) {
    this.edges[vertex] = {};
  }
  addEdge(vertex1, vertex2, weight) {
    if (!weight) weight = 0; // 가중치가 없다면 weight를 빼고 0으로 대체
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight; // 지향성이라면 제거
  }
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
}
function solution(n, s, a, b, fares) {
  const graph = new Graph();
  for (let i = 1; i <= n; i++) {
    graph.addVertex(i);
  }
  fares.forEach((v) => {
    graph.addEdge(v[0], v[1], v[2]);
  });
  const arr = [];
  for (let i = 1; i <= n; i++) {
    const dijkstra = graph.Dijkstra(i);
    const diplus = graph.Dijkstra(s)[i];
    arr.push(diplus + dijkstra[a] + dijkstra[b]);
  }
  return Math.min(...arr);
}
