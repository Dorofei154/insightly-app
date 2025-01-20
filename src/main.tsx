import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ModalProvider, MoodProvider, ThemeProvider } from "./contexts";
import { ErrorBoundary } from "./shared";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <ModalProvider>
          <MoodProvider>
            <App />
          </MoodProvider>
        </ModalProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
