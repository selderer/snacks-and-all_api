import { db } from "../connect.js";

export const getAllProducts = (req, res) => {
    // Get all products from DB
    const q = "SELECT * FROM `products` ORDER BY RAND()"

    db.query(q, [], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data)
    })
}

export const getProductById = (req, res) => {
    const productId = req.params.productId;
    const q = "SELECT * FROM products WHERE id = (?)"

    db.query(q, [productId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    })
}

export const getFilteredProducts = (req, res) => {
    const { category, type, limit, search: name, from, to } = req.query;

    let q = "SELECT * FROM products WHERE 1=1";
    const values = [];

    if (type) {
        q += " AND type = ?";

        values.push(type);
    }

    if (category) {
        q += " AND category = ?";

        values.push(category);
    }

    if (name) {
        q += " AND name LIKE ?";

        values.push(`%${name}%`);
    }

    if (limit) {
        q += " LIMIT ?";

        values.push(Number(limit));
    }

    if (from && to) {
        q += " AND price BETWEEN ? AND ?";

        values.push(Number(from), Number(to));
    }

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};


export const addProduct = (req, res) => {
    const q = "INSERT INTO products (`name`, `description`, `image`, `price`, `category`, `type`) VALUES (?)"

    const values = [
        req.body.name,
        req.body.description,
        req.body.image,
        req.body.price,
        req.body.category,
        req.body.type,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Product added")
    })
}

export const updateProduct = (req, res) => {
    const q = "UPDATE products SET name = ?, description = ?, price = ?, category = ?, type = ?, image = ? WHERE id = ?";
    const productId = req.params.productId;

    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        req.body.type,
        req.body.image,
        productId
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Product updated");
    });
}

export const deleteProduct = (req, res) => {
    const q = "DELETE FROM products WHERE id = ?";
    const productId = req.params.productId;

    db.query(q, [productId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Product deleted");
    });
}
