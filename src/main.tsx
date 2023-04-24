import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
import { SnackbarProvider } from "notistack";
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <SnackbarProvider autoHideDuration={2000}>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
