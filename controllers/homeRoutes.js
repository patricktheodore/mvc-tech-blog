const router = require('express').Router();
const { User, Post } = require('../models');
const auth = require('../utils/auth');

// GET all posts for the homepage. (auth not required)
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggein_in: req.session.loggin_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user/:id', /*auth,*/ async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'date_created']
                },
            ],
        });

        const user = userData.get({ plain: true });

        res.json(user);

        // res.render('profile', {
        //     ...user,
        //     logged_in: true
        // });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

router.get('/dashboard', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});


module.exports = router

