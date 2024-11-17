import express from 'express';
import { CategoryController } from '../controllers/category.controller';


const router = express.Router();
const categoryController = new CategoryController();

router.post('/createcategory', (req, res) => categoryController.createCategory(req, res));
router.get('/getcategory/:category_id', (req, res) => categoryController.getCategory(req, res));
router.put('/updatecategory/:category_id', (req, res) => categoryController.updateCategory(req, res));
router.delete('/deletecategory/:category_id', (req, res) => categoryController.deleteCategory(req, res));
router.get('/getallcategory', (req, res) => categoryController.getAllCategory(req, res));

export default router;