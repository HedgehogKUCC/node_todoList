const express = require('express');

// build router
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index.ejs', { title: 'Node Express' });
});

module.exports = router;
