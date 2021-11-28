const router = require('express').Router();
const { User, Post } = require('../models');
const auth = require('../utils/auth');

router.get('/edit/:id', auth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('updatePost', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router