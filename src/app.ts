import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import accountRoutes from './routes/account.route';
import categoryRoutes from './routes/category.route';
import multer from 'multer'
import cloudinary from './utils/cloudinary'
import upload from './middlewares/multer'

const app = express();
const port: number = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});


app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/category', categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});