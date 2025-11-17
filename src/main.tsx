import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { securityService } from "./services/securityService";

// Initialize security service
securityService.init();

createRoot(document.getElementById("root")!).render(<App />);
