const Posts = require('../models/postModels')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel');
const userModel = require('../models/userModel');
const cloudinary=require('../myconfig/images/cloudinary');
  // const urlsImg=[]
    // const files=req.files
    // if ( files){
    // for (const file of files){

    //     const result = await cloudinary.uploader.upload(file.path)
    //     urlsImg.push(result.secure_url)
    // }
    // }

const postCtrl = {
    createPost: async (req, res) => {
      
    try{
    
  
       const {title,price,tags,location,cathegorie,content, images } = req.body

        const newPost = new Posts({
            title,price,tags,location,cathegorie,content, images, user:req.user._id
            })
        await newPost.save()
          
            res.json({
                msg: 'Created Post!',
                newPost
                
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
            
        }
    },
    getPosts: async (req, res) => {
        try {
            
            const posts = await Posts.find().populate("user","fullname email mobile avatar")

            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: async (req, res) => {
        try {
            const {title,price,tags,location,cathegorie,content, images } = req.body

            const post = await Posts.findOneAndUpdate({_id: req.params.id}, {
            title,price,tags,location,cathegorie,content, images,
            },{returnDocument: 'after'}).populate("user","fullname email mobile avatar")
           
            res.json({
                msg: "Updated Post!",
                post
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Posts.find({_id: req.params.id, likes: req.user._id})
            if(post.length > 0) return res.status(400).json({msg: "You liked this post."})

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            }, {new: true})

            if(!like) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({msg: 'Liked Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unLikePost: async (req, res) => {
        try {

            const like = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user._id}
            }, {new: true})

            if(!like) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({msg: 'UnLiked Post!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({user: req.params.id}), req.query)
            .paginating()
            const posts = await features.query.sort("-createdAt")

            res.json({
                posts,
                result: posts.length
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)

            if(!post) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({
                post
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
  
    deletePost: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({_id: req.params.id, user: req.user._id})
            await Comments.deleteMany({_id: {$in: post.comments }})
            res.json({
                msg: 'Deleted Post!',
                newPost: {
                    ...post,
                    user: req.user
                }
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // getPostsDicover: async (req, res) => {
    //     try {

    //         const newArr = [...req.user.following, req.user._id]

    //         const num  = req.query.num || 9

    //         const posts = await Posts.aggregate([
    //             { $match: { user : { $nin: newArr } } },
    //             { $sample: { size: Number(num) } },
    //         ])

    //         return res.json({
    //             msg: 'Success!',
    //             result: posts.length,
    //             posts
    //         })

    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // savePost: async (req, res) => {
    //     try {
    //         const user = await Users.find({_id: req.user._id, saved: req.params.id})
    //         if(user.length > 0) return res.status(400).json({msg: "You saved this post."})

    //         const save = await Users.findOneAndUpdate({_id: req.user._id}, {
    //             $push: {saved: req.params.id}
    //         }, {new: true})

    //         if(!save) return res.status(400).json({msg: 'This user does not exist.'})

    //         res.json({msg: 'Saved Post!'})

    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // unSavePost: async (req, res) => {
    //     try {
    //         const save = await Users.findOneAndUpdate({_id: req.user._id}, {
    //             $pull: {saved: req.params.id}
    //         }, {new: true})

    //         if(!save) return res.status(400).json({msg: 'This user does not exist.'})

    //         res.json({msg: 'unSaved Post!'})

    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
    // getSavePosts: async (req, res) => {
    //     try {
    //         const features = new APIfeatures(Posts.find({
    //             _id: {$in: req.user.saved}
    //         }), req.query).paginating()

    //         const savePosts = await features.query.sort("-createdAt")

    //         res.json({
    //             savePosts,
    //             result: savePosts.length
    //         })

    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
}

module.exports = postCtrl