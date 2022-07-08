import localforage from "localforage";

const IndexedDbMutationExample = props => {
  const mutation = useMutation(["count"], (count, config) => {
    console.log("config", config);
    return localforage.setItem("count", count);
  });
  return (
    <div>
      <h2>Indexed DB example</h2>
      <div>
        <button>Increment</button>
      </div>
    </div>
  );
};

export default IndexedDbExample;
