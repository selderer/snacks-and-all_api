import Express from "express";
const app = Express();
import productsRoutes from "./routes/products.js";
import ordersRoutes from "./routes/orders.js";
import multer from "multer";
import cors from "cors";

app.use(cors())
app.use(Express.json())

app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;

    res.status(200).json(file.filename);
})

app.listen(8800, () => {
    console.log("API is working")
});
