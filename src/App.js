import './App.css';
import RouterPath from 'Route/RouterPath';
import { Topnav } from 'Components';
import { useTheme } from 'Context';
function App() {
  const { themeState } = useTheme();
  const { theme } = themeState;
  return (
    <div className={`App ${theme==="light" ? "app-light" : "app-dark"}`}>
      <main className='main-section'>
            {/* here add the component with the same class name */}
            <nav className='nav-section'>
              <Topnav />
            </nav>
            <RouterPath />
            <footer className='footer-section'>
                footer
            </footer>
        </main>
    </div>
  );
}

export default App;
