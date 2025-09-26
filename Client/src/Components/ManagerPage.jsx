import React, { useEffect } from "react";
import NotificationPage from "./NotificationPage";

export default function ManagerPage({ managerId }) {
  useEffect(() => {
    // Set document title
    document.title = `Manager ${managerId} Dashboard`;

    // Set favicon
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "/manager-icon.png"; // path relative to public folder
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [managerId]);

  return <NotificationPage userId={managerId} role="manager" />;
}
