"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          await fetch("/api/admin/logout", { method: "POST" });
          router.replace("/admin/login");
          router.refresh();
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? "Saliendo..." : "Salir"}
    </Button>
  );
}
