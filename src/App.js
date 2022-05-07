import './App.css';
import RouterPath from 'Route/RouterPath';
function App() {
  return (
      <main className="App">
            {/* here add the component with the same class name */}
            <nav className='nav-section'>top nav bar</nav>
            <section className="main-content">
            <RouterPath />
            </section>
            <footer className='footer-section'>
                footer
            </footer>
        </main>
  );
}

export default App;
