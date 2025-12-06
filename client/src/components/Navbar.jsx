import React from 'react';

export default function Navbar({ currentView, onViewChange }) {
    return (
        <nav style={{
            backgroundColor: 'var(--surface-color)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    Showcase App
                </h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className={`btn ${currentView === 'home' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => onViewChange('home')}
                    >
                        Products
                    </button>
                    <button
                        className={`btn ${currentView === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => onViewChange('admin')}
                    >
                        Admin
                    </button>
                </div>
            </div>
        </nav>
    );
}
