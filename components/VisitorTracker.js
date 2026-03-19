"use client";
import { useEffect } from "react";

function getOrCreateSessionId() {
  let id = sessionStorage.getItem("vsid");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("vsid", id);
  }
  return id;
}

export default function VisitorTracker() {
  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    const ping = () =>
      fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});

    ping(); // initial ping on page load

    // Ping every 90 seconds to keep session alive & update concurrent count
    const interval = setInterval(ping, 90_000);
    return () => clearInterval(interval);
  }, []);

  return null;
}