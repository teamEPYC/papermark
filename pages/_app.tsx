import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

import { TeamProvider } from "@/context/team-context";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";

import { PostHogCustomProvider } from "@/components/providers/posthog-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { EXCLUDED_PATHS } from "@/lib/constants";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>SeedToScale | The Open Source DocSend Alternative</title>
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="SeedToScale is an open-source document sharing alternative to DocSend with built-in analytics."
          key="description"
        />
        <meta
          property="og:title"
          content="SeedToScale | The Open Source DocSend Alternative"
          key="og-title"
        />
        <meta
          property="og:description"
          content="SeedToScale is an open-source document sharing alternative to DocSend with built-in analytics."
          key="og-description"
        />
        <meta
          property="og:image"
          content="https://www.papermark.io/_static/meta-image.png"
          key="og-image"
        />
        <meta
          property="og:url"
          content="https://www.papermark.io"
          key="og-url"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@papermarkio" />
        <meta name="twitter:creator" content="@papermarkio" />
        <meta name="twitter:title" content="SeedToScale" key="tw-title" />
        <meta
          name="twitter:description"
          content="SeedToScale is an open-source document sharing alternative to DocSend with built-in analytics."
          key="tw-description"
        />
        <meta
          name="twitter:image"
          content="https://www.papermark.io/_static/meta-image.png"
          key="tw-image"
        />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>
      <SessionProvider session={session}>
        <PostHogCustomProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem themes={["light", "dark", "seed-theme"]}>
            <PlausibleProvider
              domain="papermark.io"
              enabled={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}
            >
              <main className={inter.className}>
                <Toaster closeButton />
                <TooltipProvider delayDuration={100}>
                  {EXCLUDED_PATHS.includes(router.pathname) ? (
                    <Component {...pageProps} />
                  ) : (
                    <TeamProvider>
                      <Component {...pageProps} />
                    </TeamProvider>
                  )}
                </TooltipProvider>
              </main>
            </PlausibleProvider>
          </ThemeProvider>
        </PostHogCustomProvider>
      </SessionProvider>
    </>
  );
}
