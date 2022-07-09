import "./App.css";
import { useQuery } from "react-query";
import IndexedDbExample from "./examples/IndexedDb";
import MediaExample from "./examples/MediaExample";
import WebWorkersExample from "./examples/WebWorkersExample";

function App() {
  const { data: indexedDbCount } = useQuery(["count"]);
  const { data: workerCount } = useQuery(["worker-count"]);
  return (
    <div className="App">
      <MediaExample />
      <IndexedDbExample />
      <WebWorkersExample />

      <h2>All data</h2>
      <ul>
        <li>Indexed DB count: {indexedDbCount}</li>
        <li>Worker count: {workerCount}</li>
      </ul>
    </div>
  );
}

export default App;
