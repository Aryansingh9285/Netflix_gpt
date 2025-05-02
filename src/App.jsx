import { Provider } from "react-redux";
import "./App.css";
import Body from "./component/Body";
import appstore from "./utils/appstore";

function App() {
  return (
    <>
      <Provider store={appstore}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
