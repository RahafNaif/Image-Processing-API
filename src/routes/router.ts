import express from 'express';
import images from './api/images';

const router = express.Router();

router.get('/', (req,res) => {
    res.send('router');
});

router.use('/images', images);

export default router;