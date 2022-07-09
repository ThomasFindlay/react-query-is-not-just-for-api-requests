import localforage from "localforage";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useStorage = (key, { initialData, queryConfig, mutationConfig }) => {
  const queryClient = useQueryClient();
  const query = useQuery(
    [key],
    async () => {
      return (await localforage.getItem(key)) || initialData;
    },
    {
      staleTime: Infinity,
      ...queryConfig,
    }
  );

  const mutation = useMutation(count => localforage.setItem(key, count), {
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
    ...mutationConfig,
  });

  return {
    data: query.data,
    mutate: mutation.mutate,
    query,
    mutation,
  };
};

export const IndexedDbExample = props => {
  const { data: count, mutate: updateCount } = useStorage("count", {
    initialData: 0,
  });

  return (
    <div>
      <h2>Indexed DB Mutation</h2>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => updateCount(count - 1)}>Decrement</button>
        <button onClick={() => updateCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
};

// export const IndexedDbExample = props => {
//   const queryClient = useQueryClient();
//   const { data: count } = useQuery(
//     ["count"],
//     async () => {
//       return (await localforage.getItem("count")) || 0;
//     },
//     {
//       staleTime: Infinity,
//     }
//   );

//   const { mutate: updateCount } = useMutation(
//     count => {
//       return localforage.setItem("count", count);
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["count"]);
//       },
//     }
//   );

//   return (
//     <div>
//       <h2>Indexed DB Mutation</h2>
//       <div>Count: {count}</div>
//       <div>
//         <button onClick={() => updateCount(count - 1)}>Decrement</button>
//         <button onClick={() => updateCount(count + 1)}>Increment</button>
//       </div>
//     </div>
//   );
// };

export default IndexedDbExample;
