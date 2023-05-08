import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <SnackbarProvider autoHideDuration={2000}>
    <App />
  </SnackbarProvider>
);
