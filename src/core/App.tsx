import React, { useEffect, useMemo, useState } from "react";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Results from "../pages/Results";
import Library from "../pages/Library";
import Archive from "../pages/Archive";

type Route = "home" | "test" | "results" | "library" | "archive";

function useHashRoute(): [Route, (r: Route) => void] {
  const get = (): Route => {
    const h = (location.hash || "#home").replace("#", "");
    if (h === "home" || h === "test" || h === "results" || h === "library" || h === "archive") return h;
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
    <div className="container">
      <div className="header">
        <div className="brand">
          <h1>SOULSTACK //</h1>
          <p>3-layer diagnostic • 32 subtype signature • archive</p>
        </div>

        <div className="nav">
          <a className="pill" href="#home">Home</a>
          <a className="pill" href="#test">Take Test</a>
          <a className="pill" href="#results">Results</a>
          <a className="pill" href="#library">Library</a>
          <a className="pill" href="#archive">Archive</a>
        </div>
      </div>

      {page}
    </div>
  );
}
