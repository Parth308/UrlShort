const express = require('express');
const { generateNewShortURL } = require('../controllers/url');

const router = express.Router();

router.post('/', generateNewShortURL);

router.get('/', (req, res) => {
	return res.json({ msg: 'get method' });
});
module.exports = router;
