import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { H } from "highlight.run";
import { ErrorBoundary } from "@highlight-run/react";

H.init("2d1y8l3d", {
  serviceName: "frontend-app",
  tracingOrigins: true,
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
    urlBlocklist: [
      // insert full or partial urls that you don't want to record here
      // Out of the box, Highlight will not record these URLs (they can be safely removed):
      "https://www.googleapis.com/identitytoolkit",
      "https://securetoken.googleapis.com",
    ],
  },
});

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
