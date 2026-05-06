"use client";
// ponto de entrada da aplicação, onde o componente Scene é renderizado 
import { createRoot } from "react-dom/client";
import App from "./page";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);