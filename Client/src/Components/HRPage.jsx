import React, { useEffect } from "react";
import NotificationPage from "./NotificationPage";

export default function HRPage({ hrId }) {
  useEffect(() => {
    // Set document title
    document.title = `HR ${hrId} Dashboard`;

    // Set favicon
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "/hr-icon.png"; // path relative to public folder
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [hrId]);

  return <NotificationPage userId={hrId} role="hr" />;
}
