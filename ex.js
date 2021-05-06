// create vertex set Q
var Q = {},
  dist = {};
for (var vertex in this.edges) {
  // unknown distances set to Infinity
  dist[vertex] = Infinity;
  // add v to Q
  Q[vertex] = this.edges[vertex];
}
// Distance from source to source init to 0
dist[source] = 0;

while (!_isEmpty(Q)) {
  var u = _extractMin(Q, dist); // get the min distance

  // remove u from Q
  delete Q[u];

  // for each neighbor, v, of u:
  // where v is still in Q.
  for (var neighbor in this.edges[u]) {
    // current distance
    var alt = dist[u] + this.edges[u][neighbor];
    // a shorter path has been found
    if (alt < dist[neighbor]) {
      dist[neighbor] = alt;
    }
  }
}
return dist;
