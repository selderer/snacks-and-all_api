import {db} from "../connect.js";

export const getAllProducts = (req, res) => {
    // Get all products from DB

}

export const addProduct = (req, res) => {
    const q = `INSERT INTO products`

    db.query(q, [])
}