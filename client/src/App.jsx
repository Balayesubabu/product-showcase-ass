import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'admin'

  return (
    <div className="app">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />

      <main className="container" style={{ padding: '2rem 1rem' }}>
        {currentView === 'home' ? (
          <ProductList />
        ) : (
          <AdminPanel />
        )}
      </main>
    </div>
  );
}

export default App;
