import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({});
    const [filters, setFilters] = useState({
        page: 1,
        limit: 6,
        search: '',
        category: ''
    });
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page: filters.page,
                limit: filters.limit,
                search: filters.search,
                category: filters.category
            }).toString();

            const res = await fetch(`http://localhost:3000/api/products?${query}`);
            const data = await res.json();
            setProducts(data.products);
            setMeta(data.meta);
        } catch (err) {
            console.error("Failed to fetch products", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const handleSearch = (e) => {
        e.preventDefault();
        setFilters(prev => ({ ...prev, page: 1 })); // Reset to page 1 on search
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    return (
        <div>
            {/* Controls */}
            <div className="controls" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                </form>
                <select
                    className="input"
                    style={{ width: 'auto' }}
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }))}
                >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home">Home</option>
                    <option value="Fashion">Fashion</option>
                </select>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {products.map(p => (
                            <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                        <button
                            className="btn btn-secondary"
                            disabled={meta.currentPage === 1}
                            onClick={() => handlePageChange(meta.currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            Page {meta.currentPage} of {meta.totalPages}
                        </span>
                        <button
                            className="btn btn-secondary"
                            disabled={meta.currentPage === meta.totalPages}
                            onClick={() => handlePageChange(meta.currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </div>
    );
}
