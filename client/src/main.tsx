import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { IconContext } from "react-icons";

createRoot(document.getElementById("root")!).render(
  <IconContext.Provider value={{ size: "1.2em" }}>
    <App />
  </IconContext.Provider>
);
