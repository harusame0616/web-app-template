"use client";

import { Download } from "lucide-react";
import { useState } from "react";

import { Button } from "@workspace/ui/components/button";

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/admin/users/export");

      if (response.ok) {
        const blob = await response.blob();
        const filename =
          response.headers
            .get("Content-Disposition")
            ?.split("filename=")[1]
            ?.replace(/['"]/g, "") ??
          `users_${new Date().toISOString().split("T")[0]}.csv`;

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const errorText = await response.text();
        alert(errorText || "エクスポートに失敗しました");
      }
    } catch {
      alert("エクスポートに失敗しました");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={isExporting} variant="ghost">
      <Download className="h-4 w-4" />
      CSVエクスポート
    </Button>
  );
}
