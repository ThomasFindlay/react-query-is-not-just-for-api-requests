self.onmessage = function (e) {
  console.log("on message", e);
  const { count, type } = e.data;
  let nextCount;
  switch (type) {
    case "INCREMENT":
      nextCount = count + 1;
      break;
    case "DECREMENT":
      nextCount = count - 1;
    default:
      break;
  }
  self.postMessage({
    count: nextCount,
  });
};
