import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import accountRoutes from './routes/account.route';
import categoryRoutes from './routes/category.route';
import transactionRoutes from './routes/transaction.route'
import badWordRoutes from './routes/badword.route'
import { authenticateToken } from './middlewares/validatetoken';
import cors from 'cors';


const app = express();
const port: number = 3000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  preflightContinue: false,
  optionsSuccessStatus: 200 
}));

app.use(authenticateToken);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/category', categoryRoutes);
app.use('/transaction', transactionRoutes);
app.use('/badword', badWordRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});