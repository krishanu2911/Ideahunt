import './App.css';
import RouterPath from 'Route/RouterPath';
import { Footer, Topnav } from 'Components';
import { useTheme } from 'Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const { themeState } = useTheme();
  const { theme } = themeState;
  return (
      <main className={`App ${theme==="light" ? "app-light" : "app-dark"}`}>
        <ToastContainer />
            {/* here add the component with the same class name */}
             <nav className='nav-section'>
              <Topnav />
            </nav>
            <section className="main-content">
            <RouterPath />
            </section>
            <footer className='footer-section'>
                <Footer />
            </footer>
        </main>
  );
}

export default App;
