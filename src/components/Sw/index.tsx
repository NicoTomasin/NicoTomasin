"use client";
import { useEffect } from "react";
export default function Sw() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);
  return null;
}
