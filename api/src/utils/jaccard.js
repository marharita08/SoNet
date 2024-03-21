function jaccardSimilarityVector(v1, v2) {
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
}

function jaccardSimilaritySet(s1, s2) {
  const intersection = new Set([...s1].filter(x => s2.has(x)));
  const union = new Set([...s1, ...s2]);

  return intersection.size / union.size;
}

module.exports = {jaccardSimilarityVector, jaccardSimilaritySet};
