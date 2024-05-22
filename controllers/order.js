import { db } from "../connect.js";

export const postOrder = (req, res) => {
    const q = "INSERT INTO orders (`fullName`, `email`, `address`, `city`, `postCode`) VALUES (?)"

    const values = [
        req.body.fullName,
        req.body.email,
        req.body.address,
        req.body.city,
        req.body.postCode,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Order added")
    })}