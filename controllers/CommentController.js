import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js'


export const addComment = async (req, res) => {
   try {
     const postId = req.params.id;
         const comment = new CommentModel();
         comment.user = req.body.userId;   
         comment.text = req.body.text;
         comment.likesCount = 0;
 
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
