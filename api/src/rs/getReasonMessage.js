const defaultReasons = {
  content: "profile data",
  collaborative: "liked articles",
  topology: "friends"
}

module.exports = (source, reasons = defaultReasons) => {
  const startOfMessage = "You have common";
  if (Array.isArray(source)) {
    if (source.length === 1) {
      return `${startOfMessage} ${reasons[source[0]]}`;
    } else if (source.length === 2) {
      return `${startOfMessage} ${reasons[source[0]]} and ${reasons[source[1]]}`;
    } else if (source.length > 2) {
      const common = source.slice(0, source.length - 1).map(s => reasons[s]).join(', ');
      const last = reasons[source[source.length - 1]];
      return `${startOfMessage} ${common}, and ${last}`;
    }
  } else {
    return `${startOfMessage} ${reasons[source]}`;
  }
}
