import React, { useState } from 'react';
import EnquiryForm from './EnquiryForm';

export default function ProductModal({ product, onClose }) {
    const [showForm, setShowForm] = useState(false);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '1rem'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius)',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }} onClick={e => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: 'none', fontSize: '1.5rem', cursor: 'pointer',
                        color: 'var(--text-secondary)'
                    }}
                >
                    &times;
                </button>

                <div style={{ display: 'flex', flexDirection: window.innerWidth < 600 ? 'column' : 'row' }}>
                    <div style={{ flex: 1, minHeight: '300px' }}>
                        <img
                            src={product.image_url}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ flex: 1, padding: '2rem' }}>
                        <div style={{
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem'
                        }}>
                            {product.category}
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h2>
                        <div style={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                            ${product.price}
                        </div>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            {product.long_desc || product.short_desc}
                        </p>

                        {!showForm ? (
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1rem' }}
                                onClick={() => setShowForm(true)}
                            >
                                Enquire About This Product
                            </button>
                        ) : (
                            <EnquiryForm product={product} onCancel={() => setShowForm(false)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
