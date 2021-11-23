const router = require('express').Router();
const { User, Post } = require('../models');
const auth = require('../utils/auth');

// GET all posts for the homepage. (auth not required)
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}); 

