import React, { useState } from 'react';

export default function EnquiryForm({ product, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        try {
            const res = await fetch('http://localhost:3000/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: product.id,
                    ...formData
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Submission failed');
            }

            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message);
        }
    };

    if (status === 'success') {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f0fdf4', borderRadius: 'var(--radius)' }}>
                <h3 style={{ color: 'var(--success-color)', marginBottom: '1rem' }}>Enquiry Sent!</h3>
                <p>We have received your message and will get back to you shortly.</p>
                <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={onCancel}>Close</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Send an Enquiry</h3>

            {status === 'error' && (
                <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: 'var(--danger-color)', borderRadius: 'var(--radius)', fontSize: '0.9rem' }}>
                    {errorMsg}
                </div>
            )}

            <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: '500' }}>Name *</label>
                <input
                    type="text"
                    className="input"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: '500' }}>Email *</label>
                <input
                    type="email"
                    className="input"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: '500' }}>Phone (Optional)</label>
                <input
                    type="tel"
                    className="input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: '500' }}>Message *</label>
                <textarea
                    className="input"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ resize: 'vertical' }}
                ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    disabled={status === 'submitting'}
                >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={status === 'submitting'}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
