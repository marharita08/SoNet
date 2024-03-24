function getNorm(v) {
  return Math.sqrt(v.reduce((acc, el) => acc + el * el, 0));
}

module.exports = (v1, v2) => {
  const dotProduct = v1.reduce((acc, el, index) => acc + el * v2[index], 0);

  const norm1 = getNorm(v1);
  const norm2 = getNorm(v2);

  return dotProduct / (norm1 * norm2)
}
