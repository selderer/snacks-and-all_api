import Express from "express";
const app = Express();
import productsRoutes from "./routes/products.js";
import ordersRoutes from "./routes/orders.js";

app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

app.use(Express.json())

app.listen(8800, () => {
    console.log("API is working")
});
