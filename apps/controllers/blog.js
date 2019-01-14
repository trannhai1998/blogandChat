var express = require("express");
var router = express.Router();

var post_md = require("../models/post");

router.get("/",(req,res)=>{
	// res.json({"message":"this is blog page"});
	let data = post_md.getAllPosts();
	if(!data){
	}
	else{
		data.then( posts => {
			let data = {
				posts : posts,
				error : false
			}
			res.render("blog/home",{data : data});
		}).catch(err => {
			res.render("blog/home",{data : {error : err}});
		})
	}
})
router.get("/post/:id",(req,res)=>{
	let data = post_md. getDetailPost(req.params.id);
	data.then( post => {
		var post = post[0];
		data = {
			post :post ,
			error : false
		}
		res.render('blog/post',{data : data});
	}).catch(err => {
		data = {
			error : "Countn't get Post Detail"
		}
		res.render('blog/post',{data : data});
	})
})
router.get("/about",(req,res)=>{
	res.render("blog/about",{data : {}});
})
module.exports = router;