import { Header } from "@/components/Header";
import { Container } from "@/components/ui/Container";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Container>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </Container>
    </>
  ),
});
