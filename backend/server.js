import express from 'express';
// import products from './data/products.js';
import { config } from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import path from 'path';
import productRoutes from './routes/productRoutes.js';
import { error } from 'console';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express();
const PORT = process.env.PORT || 5000;

config();

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client/public"));

// Middleware: used to perform some action on the request and response object.
// Be sure to call the next() method so that the application can move on to the next piece of middleware, if any
// app.use((request, response, next) => {
//     console.log("Hello");
//     console.log(request.originalUrl);
//     next()

// })

app.get('/', (req, res) => {
    res.send('API is running....');
})

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`app listening on port ${PORT} and Server running in ${process.env.NODE_ENV}`.yellow.bold)
})

