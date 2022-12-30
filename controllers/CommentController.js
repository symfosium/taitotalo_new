import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js'


export const addComment = async (req, res) => {
   try {
     const postId = req.params.id;
         const doc = new CommentModel();
         doc.user = req.userId;   
         doc.text = req.body.text;
         doc.likesCount = 0;
 
         const comment = await doc.save();
     PostModel.findOneAndUpdate(
       {
         _id: postId,
       },
       {
         $push: { comments: comment }
       },
       {
         returnDocument: 'after',
       },
       (err, doc) => {
         if (err) {
           console.log(err);
           return res.status(500).json({
             message: 'Ei pysty lataamaan artikkelia',
           });
         }
 
         if (!doc) {
           return res.status(404).json({
             message: 'Artikkeli ei löydetty',
           });
         }
         res.json(doc);
       },
     ).populate('user');
   } catch (err) {
     console.log(err);
     res.status(500).json({
       message: 'Artikkeleja ei pysty ladata',
     });
   }
 };
