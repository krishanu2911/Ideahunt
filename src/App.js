import "./App.css";
import RouterPath from "Route/RouterPath";
import { Topnav } from "Components";
import { useTheme } from "Context";

function App() {
  const { themeState } = useTheme();
  const { theme } = themeState;
  return (
    
      <main className={`App ${theme === "light" ? "app-light" : "app-dark"}`}>
        {/* here add the component with the same class name */}
        <nav className="nav-section">
          <Topnav />
        </nav>
        <section className="main-content">
          <RouterPath />
        </section>
        <footer className="footer-section">footer</footer>
      </main>
    
  );
}

export default App;
