const {adamicAdarIndex} = require("./adamicAdarIndex");

module.exports = async (data) => {

  if (!data) {
    return [];
  }

  const {graph, users, id} = data;

  return users.map(u => {
    const score = adamicAdarIndex(graph, id, u);
    return {user_id: u, score}
  })
}
