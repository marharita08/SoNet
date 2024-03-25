const reasons = {
  content: "profile data",
  collaborative: "liked articles",
  topology: "friends"
}

module.exports = (source) => {
  const startOfMessage = "You have common";
  if (Array.isArray(source)) {
    if (source.length === 1) {
      return `${startOfMessage} ${reasons[source[0]]}`;
    } else if (source.length === 2) {
      return `${startOfMessage} ${reasons[source[0]]} and ${reasons[source[1]]}`;
    } else if (source.length === 3) {
      return `${startOfMessage} ${reasons[source[0]]}, ${reasons[source[1]]} and ${reasons[source[2]]}`;
    }
  } else {
    return `${startOfMessage} ${reasons[source]}`;
  }
}
