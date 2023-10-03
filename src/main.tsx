import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./fonts/fontStyleSheets.scss";
import "./style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
