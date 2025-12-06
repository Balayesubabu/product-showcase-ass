import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/enquiries')
            .then(res => res.json())
            .then(data => {
                setEnquiries(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch enquiries", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="spinner"></div>;

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard: Enquiries</h2>

            <div style={{ overflowX: 'auto', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f8fafc' }}>
                            <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem' }}>Date</th>
                            <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem' }}>Product</th>
                            <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem' }}>Customer</th>
                            <th style={{ padding: '1rem', fontWeight: '600', fontSize: '0.9rem' }}>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No enquiries received yet.
                                </td>
                            </tr>
                        ) : (
                            enquiries.map(e => (
                                <tr key={e.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', whiteSpace: 'nowrap', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {new Date(e.created_at).toLocaleDateString()} <br />
                                        {new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {e.product_name ? (
                                            <span style={{ fontWeight: '500' }}>{e.product_name}</span>
                                        ) : (
                                            <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>General Enquiry</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '500' }}>{e.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{e.email}</div>
                                        {e.phone && <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{e.phone}</div>}
                                    </td>
                                    <td style={{ padding: '1rem', maxWidth: '300px' }}>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {e.message}
                                        </p>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
