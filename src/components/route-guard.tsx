import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export { RouteGuard };

function RouteGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/"];
    const path = url.split("?")[0];
    const jwt = localStorage.getItem("auth_token");
    if (!jwt && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/",
        query: { returnUrl: router.asPath },
      });
    } else {
      // redirect if user has been logged in
      if (router.pathname === "/") {
        router.replace("/photos");
      }
      setAuthorized(true);
    }
  }

  return authorized && children;
}
