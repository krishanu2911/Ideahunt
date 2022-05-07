import './App.css';
import RouterPath from 'Route/RouterPath';
function App() {
  return (
    <div className="App">
      <main className='main-section'>
            {/* here add the component with the same class name */}
            <nav className='nav-section'>top nav bar</nav>
            <RouterPath />
            <footer className='footer-section'>
                footer
            </footer>
        </main>
    </div>
  );
}

export default App;
