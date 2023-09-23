import { useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import "./styles/App.scss";

const App = () => {
  const [cartItem] = useState([]);

  return (
    <div className="App">
      <Header cartItem={cartItem} />
      <Routes>
        <Route path="/" element={null} />
      </Routes>
    </div>
  );
};

export default App;
