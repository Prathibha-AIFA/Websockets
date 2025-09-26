import React, { useEffect } from "react";
import NotificationPage from "./NotificationPage";

export default function ClientPage({ clientId }) {
  useEffect(() => {
    // Set document title
    document.title = `Client ${clientId} Dashboard`;

    // Set favicon
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "/client-icon.png"; 
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [clientId]);

  return <NotificationPage userId={clientId} role="client" />;
}
