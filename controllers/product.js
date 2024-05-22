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
    const category = req.query.category;
    const type = req.query.type;
    const limit = req.query.limit;
    const name = req.query.search;

    let q = "SELECT * FROM products WHERE type = (?) OR category = (?)"

    if (name) {
        q += " OR name LIKE ?"
    }

    if (limit) {
        q += " LIMIT ?"
    }

    db.query(q, [type, category, Number(limit), name], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}

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

