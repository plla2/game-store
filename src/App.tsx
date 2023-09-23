import { useState } from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [cartItem] = useState([]);

  return (
    <>
      <Header cartItem={cartItem} />
      <Routes>
        <Route path="/" element={null} />
      </Routes>
    </>
  );
};

export default App;
