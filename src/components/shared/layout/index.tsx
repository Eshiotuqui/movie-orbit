import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { FiltersProvider } from "@/features/movies/context/filters-provider";

export function Layout() {
  return (
    <FiltersProvider>
      <div className="bg-background min-h-screen">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-8">
          <Outlet />
        </main>
      </div>
    </FiltersProvider>
  );
}
