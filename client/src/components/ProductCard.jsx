import React from 'react';

export default function ProductCard({ product, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: 'var(--surface-color)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                }}>
                    {product.category}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    flex: 1
                }}>
                    {product.short_desc}
                </p>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary-color)' }}>
                    ${product.price}
                </div>
            </div>
        </div>
    );
}
