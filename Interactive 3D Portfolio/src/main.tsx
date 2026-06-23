import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { Agentation } from "agentation";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    {import.meta.env.DEV && <Agentation />}
  </>
);