/** Civic Signal Field app shell: routes are intentionally content-first and share an accessible TRACE structure. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { AboutPage, CareersPage, ContactPage, InnovationsPage, InsightDetailPage, InsightsPage, ProjectDetailPage, ProjectsPage, ServiceDetailPage, ServicesPage, TeamDetailPage, TeamPage } from "./pages/TracePages";
import { TeamHierarchyPage } from "./components/TeamHierarchy";


function RouteEntryReset() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
}

function Router() {
  return (
    <><RouteEntryReset /><Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={AboutPage} />
        <Route path={"/services"} component={ServicesPage} />
        <Route path={"/services/:slug"} component={ServiceDetailPage} />
        <Route path={"/projects"} component={ProjectsPage} />
        <Route path={"/projects/:slug"} component={ProjectDetailPage} />
        <Route path={"/team"} component={TeamHierarchyPage} />
        <Route path={"/team/:slug"} component={TeamDetailPage} />
        <Route path={"/insights"} component={InsightsPage} />
        <Route path={"/insights/:slug"} component={InsightDetailPage} />
        <Route path={"/innovations"} component={InnovationsPage} />
        <Route path={"/careers"} component={CareersPage} />
        <Route path={"/contact"} component={ContactPage} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch></>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
