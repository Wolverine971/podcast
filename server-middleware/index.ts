import * as commentController from './elasticSearchController'

// import * as emailController from "./email";

import * as feedbackController from './feedbackController'
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

// `${endpoints.addComment}/${this.type}/${this.post.id}`,
app.post('/comment/add/:type/:parentId', commentController.create)
app.post('/comment/update', commentController.update)
app.get('/comments/:id', commentController.find)
// app.get("/like/:commentId/:operation/:enneaType?", isAuth,
//   commentController.addCommentLike
// );
app.get('/post/meta', commentController.meta)

app.post('/feedback', feedbackController.sendAnonomousFeedBack)
app.get('/feedback/:postId', feedbackController.seeFeedBack)
app.delete('/feedback/:postId', feedbackController.deleteFeedback)

app.post('/password/:type?', feedbackController.password)

module.exports = app
