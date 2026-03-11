import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import { FiltersProvider } from "@/features/movies/context/filters-provider";

export function Layout() {
  return (
    <FiltersProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </FiltersProvider>
  );
}
