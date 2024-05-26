import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../connect.js";

const secretKey = 'root';

const storeAdminData = async (login, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const q = `INSERT INTO admins (login, password, name) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(q, [login, hashedPassword, name], function(err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

// Authentication function
const authenticate = async (login, password) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM admins WHERE login = ?`, [login], async (err, row) => {
            if (err) {
                return reject(err);
            }

            if (!row) {
                return resolve({ success: false });
            }

            const match = await bcrypt.compare(password, row[0].password);

            if (match) {
                const token = jwt.sign({ login }, secretKey, { expiresIn: '1h' });

                resolve({ success: true, token: token });
            } else {
                resolve({ success: false });
            }
        });
    });
};

// Routes
export const registerAdmin = async (req, res) => {
    const { login, password, name } = req.body;

    try {
        await storeAdminData(login, password, name);
        res.status(201).send('User registered');
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            res.status(400).send('User already exists');
        } else {
            res.status(500).json(err);
        }
    }
};

export const authenticateAdmin = async (req, res) => {
    const { login, password } = req.body;

    try {
        const result = await authenticate(login, password);

        if (result.success) {
            res.status(200).json({ message: 'Authenticated', token: result.token });
        } else {
            res.status(401).send('Invalid login or password');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
