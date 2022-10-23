const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allComments = await Comment.findAll({
            include: [User, Post]
        })

        res.status(200).json(allComments)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const singleComment = await Comment.findByPk(req.params.id, {
            include: [User, Post]
        })
        res.status(200).json(singleComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update(req.body, { where: { id: req.params.id } })
        res.status(200).json(updateComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            body: req.body.description,
            user_id: req.session.user_id,
            post_id: req.session.post_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const delComment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(delComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
