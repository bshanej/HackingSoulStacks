import React, { useEffect, useMemo, useState } from "react";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Results from "./pages/Results";
import Library from "./pages/Library";
import Archive from "./pages/Archive";

type Route = "home" | "test" | "results" | "library" | "archive";

function useHashRoute(): [Route, (r: Route) => void] {
  const get = (): Route => {
    const h = (location.hash || "#home").replace("#", "");
    if (["home", "test", "results", "library", "archive"].includes(h)) return h as Route;
    return "home";
  };

  const [route, setRoute] = useState<Route>(get());

  useEffect(() => {
    const on = () => setRoute(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  return [route, (r) => (location.hash = r)];
}

export default function App() {
  const [route, nav] = useHashRoute();

  const page = useMemo(() => {
    switch (route) {
      case "home": return <Home onStart={() => nav("test")} />;
      case "test": return <Test onDone={() => nav("results")} />;
      case "results": return <Results />;
      case "library": return <Library />;
      case "archive": return <Archive />;
      default: return <Home onStart={() => nav("test")} />;
    }
  }, [route]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand">
          <h1>SOULSTACK //</h1>
          <p className="tagline">3-layer diagnostic • 32 subtype signature</p>
        </div>

        <nav className="nav-pills">
          <button className={`pill ${route === "home" ? "active" : ""}`} onClick={() => nav("home")}>Home</button>
          <button className={`pill ${route === "test" ? "active" : ""}`} onClick={() => nav("test")}>Test</button>
          <button className={`pill ${route === "results" ? "active" : ""}`} onClick={() => nav("results")}>Results</button>
          <button className={`pill ${route === "library" ? "active" : ""}`} onClick={() => nav("library")}>Library</button>
          <button className={`pill ${route === "archive" ? "active" : ""}`} onClick={() => nav("archive")}>Archive</button>
        </nav>
      </header>

      <main className="content">
        {page}
      </main>
    </div>
  );
}
