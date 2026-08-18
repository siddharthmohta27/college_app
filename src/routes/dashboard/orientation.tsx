import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/orientation")({
  beforeLoad: () => {
    throw redirect({
      to: "/app/orientation",
    });
  },
  component: () => null,
});
