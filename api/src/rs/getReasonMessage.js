const defaultReasons = {
  content: "profile data",
  collaborative: "liked articles",
  topology: "friends"
}

module.exports = (source, reasons = defaultReasons) => {
  const startOfMessage = "You have common";
  if (Array.isArray(source)) {
    const sources = Array.from(new Set(source));
    if (sources.length === 1) {
      return `${startOfMessage} ${reasons[sources[0]]}`;
    } else if (sources.length === 2) {
      return `${startOfMessage} ${reasons[sources[0]]} and ${reasons[sources[1]]}`;
    } else if (sources.length > 2) {
      const common = sources.slice(0, sources.length - 1).map(s => reasons[s]).join(', ');
      const last = reasons[sources[sources.length - 1]];
      return `${startOfMessage} ${common}, and ${last}`;
    }
  } else {
    return `${startOfMessage} ${reasons[source]}`;
  }
}
