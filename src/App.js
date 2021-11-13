import { hot } from "react-hot-loader";
import FetchDealers from "./FetchDealers";
import "./App.css";

function App() {
  return (
    <div className="App">
      <FetchDealers />
    </div>
  );
}

export default hot(module)(App);
