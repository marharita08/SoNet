module.exports = {
  adamicAdar: (graph, node1, node2) => {
    const neighbors1 = new Set(graph[node1]);
    const neighbors2 = new Set(graph[node2]);

    const commonNeighbors = new Set([...neighbors1].filter(x => neighbors2.has(x)));

    let adamicAdar = 0;
    for (const commonNeighbor of commonNeighbors) {
      const degree = graph[commonNeighbor].length;
      adamicAdar += 1 / Math.log(degree);
    }
    return adamicAdar;
  },

  cosine: (v1, v2) => {
    const dotProduct = v1.reduce((acc, el, index) => acc + el * v2[index], 0);

    const getNorm = (v) => Math.sqrt(v.reduce((acc, el) => acc + el * el, 0));

    const norm1 = getNorm(v1);
    const norm2 = getNorm(v2);

    return dotProduct / (norm1 * norm2);
  },

  cosineSalton: (s1, s2) => {
    const intersection = new Set([...s1].filter(x => s2.has(x)));
    const denominator = Math.sqrt(s1.size * s2.size);

    return denominator === 0 ? 0 : intersection.size / denominator;
  },

  jaccardVector: (v1, v2) => {
    if (v1.length !== v2.length) {
      throw new Error("Vectors length mismatch");
    }
    let equals = 0;
    let notEquals = 0;
    for (let i = 0; i < v1.length; i++) {
      if (v1[i] === v2[i]) {
        equals++;
      } else {
        notEquals++;
      }
    }

    return equals / (v1.length + notEquals);
  },

  jaccardSet: (s1, s2) => {
    if (s1.size === 0 || s2.size === 0) {
      return 0;
    }
    const intersection = new Set([...s1].filter(x => s2.has(x)));
    const union = new Set([...s1, ...s2]);

    return intersection.size / union.size;
  }
};
