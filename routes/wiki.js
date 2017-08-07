var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next){
	res.redirect('/')
})

router.post('/', function(req, res, next){

	var page = models.Page.build({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  	});

	page.save()
	.then(function(result){
		res.redirect(result.route)
	})
	.catch(next)


})

router.get('/add', function(req, res, next){
	res.render('addpage');

})
router.get('/:urlTitle', function (req, res, next) {

  models.Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(foundPage){
    res.render("wikipage", {pageData: foundPage});
  })
  .catch(next);

});
// router.get('/:pageUrl',function(req,res,next){
// 	//res.send('hit dynamic route at '+ req.params.pageUrl);
// 	const pageInst= models.Page.findOne({
// 		where:{
// 			urlTitle : req.params.urlTitle
// 		}
// 	})
// 	res.json(pageInst);
// })


module.exports = router