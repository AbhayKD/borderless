import React, { useEffect } from "react";
import "./App.css";
import RootContainer from "./components/RootContainer";
import { useSelector } from "react-redux";
import { selectAppState } from "./store/app/selector";

function App() {
  const {error} = useSelector(selectAppState)
  useEffect(() => {
    if(error){
      alert(error);
    }
  }, [error])
  return (
    <div className="App">
      <RootContainer />
    </div>
  );
}

export default App;
