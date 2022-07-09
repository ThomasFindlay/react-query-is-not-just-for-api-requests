import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import MyWorker from "./worker?worker&inline";
const worker = MyWorker();
// const worker = new Worker(new URL('./worker.js', import.meta.url), {
//   type: 'module'
// })

const WebWorkersExample = props => {
  const queryClient = useQueryClient();
  const { data: count } = useQuery(["worker-count"], () => 0, {
    staleTime: Infinity,
  });

  const increment = async () => {
    worker.postMessage({
      count,
      type: "INCREMENT",
    });
  };

  const decrement = async () => {
    worker.postMessage({
      count,
      type: "DECREMENT",
    });
  };

  useEffect(() => {
    const handler = e => {
      queryClient.setQueryData(["worker-count"], e.data.count);
    };
    worker.addEventListener("message", handler);
    return () => worker.removeEventListener("message", handler);
  }, []);

  return (
    <div>
      <h2>WebWorkersExample</h2>
      <div>Count: {count}</div>
      <div>
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
      </div>
    </div>
  );
};

export default WebWorkersExample;
