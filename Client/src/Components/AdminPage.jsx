import React, { useEffect } from "react";
import NotificationPage from "./NotificationPage";

export default function AdminPage({ adminId }) {
  useEffect(() => {
    
    document.title = `Admin ${adminId} Dashboard`;

    // Set favicon
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = "/admin-icon.png"; 
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [adminId]);

  return <NotificationPage userId={adminId} role="admin" />;
}
