function adamicAdarIndex(graph, node1, node2) {
  const neighbors1 = new Set(graph[node1]);
  const neighbors2 = new Set(graph[node2]);

  const commonNeighbors = new Set([...neighbors1].filter(x => neighbors2.has(x)));

  let adamicAdar = 0;
  for (const commonNeighbor of commonNeighbors) {
    const degree = graph[commonNeighbor].length;
    adamicAdar += 1 / Math.log(degree);
  }
  return adamicAdar;
}

module.exports = {adamicAdarIndex};
