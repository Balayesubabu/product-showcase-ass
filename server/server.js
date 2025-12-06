const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const dbPath = path.resolve(__dirname, '../database/showcase.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath, err);
    } else {
        console.log('Connected to the SQLite database.');
        // Ensure tables exist? We rely on seed.js for initial setup usually, 
        // but for a robust app, we might check here. 
        // For this task, we assume seed.js is run first.
    }
});

// Routes

// GET /api/products
// Query Params: page, limit, search, category
app.get('/api/products', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search ? `%${req.query.search}%` : null;
    const category = req.query.category;

    let countQuery = "SELECT COUNT(*) as count FROM products";
    let dataQuery = "SELECT * FROM products";
    let params = [];
    let whereClauses = [];

    if (search) {
        whereClauses.push("name LIKE ?");
        params.push(search);
    }
    if (category) {
        whereClauses.push("category = ?");
        params.push(category);
    }

    if (whereClauses.length > 0) {
        const whereSql = " WHERE " + whereClauses.join(" AND ");
        countQuery += whereSql;
        dataQuery += whereSql;
    }

    // Clone params for count query before adding limit/offset
    const countParams = [...params];

    dataQuery += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    db.get(countQuery, countParams, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const totalItems = row.count;
        const totalPages = Math.ceil(totalItems / limit);

        db.all(dataQuery, params, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                products: rows,
                meta: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: totalItems,
                    itemsPerPage: limit
                }
            });
        });
    });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(row);
    });
});

// POST /api/enquiries
app.post('/api/enquiries', (req, res) => {
    const { product_id, name, email, phone, message } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
        res.status(400).json({ error: "Name, Email, and Message are required." });
        return;
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Invalid email format." });
        return;
    }

    const sql = "INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)";
    const params = [product_id || null, name, email, phone, message];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "Enquiry submitted successfully",
            id: this.lastID
        });
    });
});

// GET /api/enquiries (Admin)
app.get('/api/enquiries', (req, res) => {
    const sql = `
        SELECT e.*, p.name as product_name 
        FROM enquiries e 
        LEFT JOIN products p ON e.product_id = p.id
        ORDER BY e.created_at DESC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
