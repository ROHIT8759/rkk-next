import type { AppProps } from "next/app";
import { reportWebVitals } from "rkk-next";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

// Export Web Vitals for performance monitoring
export { reportWebVitals };
