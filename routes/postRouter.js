const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')
const upload=require('../myconfig/images/multer')


router.route('/posts')
    .post(auth, postCtrl.createPost)
    .get(postCtrl.getPosts)
    
router.get('/search',postCtrl.searchpost)
router.get('/catsearch',postCtrl.catsearch)
router.route('/post/:id')
    .patch(auth, postCtrl.updatePost)
    .delete(auth, postCtrl.deletePost)
    // .get( postCtrl.getPost)

router.patch('/post/:id/like', auth, postCtrl.likePost)

router.patch('/post/:id/unlike', auth, postCtrl.unLikePost)

router.get('/user_posts/:id', postCtrl.getUserPosts)

// router.get('/post_discover', auth, postCtrl.getPostsDicover)

// router.patch('/savePost/:id', auth, postCtrl.savePost)

// router.patch('/unSavePost/:id', auth, postCtrl.unSavePost)

// router.get('/getSavePosts', auth, postCtrl.getSavePosts)


module.exports = router