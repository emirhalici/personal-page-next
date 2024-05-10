import { ModeToggle } from "~/components/mode-toggle";
import { ThemeProvider } from "~/components/theme-provider";
import "~/styles/globals.css";
import type { AppProps } from "next/app";

// if you want something to be in every page or wrap every page with something use _app.tsx
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ModeToggle></ModeToggle>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
