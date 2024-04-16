const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.post('/ads', imageUpload.single('image'), authMiddleware, ads.addNewAd);
router.put('/ads/:id', imageUpload.single('image'), authMiddleware, ads.updateAd);
router.delete('/ads/:id', authMiddleware, ads.deleteAd); 
router.get('/search/:searchPhrase', ads.searchAdsByTitle);

module.exports = router;