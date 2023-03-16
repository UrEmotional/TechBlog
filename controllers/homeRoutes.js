const router = require("express").Router();
const { Post } = require("..models/");

router.get('/', async (req, res) => {
    try{ 
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    order: ['date_created']
                }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      } catch (err) {
          res.status(500).json(err);
      };     
  });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;
