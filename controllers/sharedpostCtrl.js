const sharedpost = require('../models/sharedPost')
  // const urlsImg=[]
    // const files=req.files
    // if ( files){
    // for (const file of files){

    //     const result = await cloudinary.uploader.upload(file.path)
    //     urlsImg.push(result.secure_url)
    // }
    // }

const sharedpostCtrl = {
    Createshpost: async (req, res) => {
      
    try{
    
  
       const {title,content, image ,idreviw} = req.body

       const newPost = new sharedpost({
        title,content,idreviw, image, user:req.user._id
        })
    await newPost.save()
    res.json({
        msg: 'Post Shared!',
        newPost
        
    })
        } catch (err) {
            return res.status(500).json({msg: err.message})
         
            
        }
    },

    getsharepost: async (req, res) => {
        try {
            const sharepost = await sharedpost.find({user: req.user._id})

            res.json({
                sharepost,
                result: sharepost.length
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = sharedpostCtrl