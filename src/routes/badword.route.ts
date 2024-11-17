import express from 'express';
import { BadWordController } from '../controllers/badword.controller';


const router = express.Router();
const badWordController = new BadWordController();

router.post('/createbadword', (req, res) => badWordController.createBadWord(req, res));
router.get('/getallbadwords', (req, res) => badWordController.getAllBadWords(req, res));
router.put('/updatebadword/:oldBadWord', (req, res) => badWordController.updateBadWord(req, res));
router.delete('/deletebadword/:oldBadWord', (req, res) => badWordController.deleteBadWord(req, res));


export default router;