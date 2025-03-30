import { createRoot } from "react-dom/client";
import "./index.css";
import { UserTree } from "./Components/UserTree/UserTree.tsx";

createRoot(document.getElementById("root")!).render(<UserTree />);
