const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'showcase.db');
const schemaPath = path.resolve(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(schemaPath, 'utf8');

const products = [
    {
        name: "Vintage Film Camera",
        category: "Electronics",
        short_desc: "Classic 35mm film camera in excellent condition.",
        long_desc: "This fully manual 35mm film camera is perfect for photography enthusiasts. Features an f/1.8 lens, sturdy metal body, and timeless design. rigorously tested and fully functional light meter.",
        price: 149.99,
        image_url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Leather Satchel",
        category: "Accessories",
        short_desc: "Handcrafted genuine leather messenger bag.",
        long_desc: "Made from premium full-grain leather that ages beautifully. Features a laptop compartment (fits up to 15\"), adjustable strap, and brass hardware. Ideal for work or daily commute.",
        price: 120.00,
        image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Ceramic Coffee Set",
        category: "Home",
        short_desc: "Minimalist ceramic pour-over set + 2 mugs.",
        long_desc: "Elevate your morning ritual with this matte black ceramic coffee set. Includes a dripper, a 600ml server, and two matching hand-thrown mugs. Dishwasher safe.",
        price: 45.50,
        image_url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Wireless Noise-Canceling Headphones",
        category: "Electronics",
        short_desc: "Immersive sound with 30-hour battery life.",
        long_desc: "Focus on what matters with active noise cancellation. These over-ear headphones offer plush ear cushions, fast charging (5 hours in 10 mins), and crystal clear calls.",
        price: 299.00,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Succulent Terrarium",
        category: "Home",
        short_desc: "Geometric glass terrarium with mixed succulents.",
        long_desc: "A low-maintenance indoor garden in a stylish gold-framed glass prism. Contains a variety of hardy succulents and decorative stones. Perfect for brightening up a desk.",
        price: 35.00,
        image_url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Mechanical Keyboard",
        category: "Electronics",
        short_desc: "RGB backlit mechanical keyboard with Blue switches.",
        long_desc: "Tactile and clicky. This 60% mechanical keyboard saves desk space without sacrificing performance. Features customizable RGB lighting, detachable USB-C cable, and N-key rollover.",
        price: 89.99,
        image_url: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Canvas Sneaker",
        category: "Fashion",
        short_desc: "Classic low-top canvas sneakers in off-white.",
        long_desc: "Versatile and comfortable. These sneakers feature a durable canvas upper, vulcanized rubber sole for traction, and a cushioned insole for all-day wear.",
        price: 55.00,
        image_url: "https://images.unsplash.com/photo-1607522370275-f14bc3a5d288?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Smart Watch",
        category: "Electronics",
        short_desc: "Fitness tracker with heart rate monitor.",
        long_desc: "Track your health metrics with precision. Monitors heart rate, sleep steps, and SpO2. Waterproof up to 50m. Syncs seamlessly with both iOS and Android.",
        price: 199.50,
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    }
];

db.serialize(() => {
    // Enable foreign keys
    db.run("PRAGMA foreign_keys = ON");

    // Execute Schema
    // We split by ';' to run statements individually, as sqlite3 exec might not handle multiple well in all versions or for safety.
    // Actually, db.exec is fine for scripts.
    db.exec(schema, (err) => {
        if (err) {
            console.error("Error executing schema:", err);
            return;
        }
        console.log("Schema applied successfully.");

        // Insert Data
        const stmt = db.prepare("INSERT INTO products (name, category, short_desc, long_desc, price, image_url) VALUES (?, ?, ?, ?, ?, ?)");

        products.forEach(p => {
            stmt.run(p.name, p.category, p.short_desc, p.long_desc, p.price, p.image_url, (err) => {
                if (err) console.error("Error inserting product:", p.name, err);
            });
        });

        stmt.finalize(() => {
            console.log("Seed data inserted.");
            db.close();
        });
    });
});
