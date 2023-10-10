import QrScannerHomePage from "./main";
import ContextProvider from "@/components/ContextProvider";

export default function index() {
  return (
    <ContextProvider>
      <QrScannerHomePage/>
    </ContextProvider>
  )
}