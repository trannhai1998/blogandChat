var express = require("express");

var router = express.Router();

router.use('/admin',require(__dirname+"/admin.js"));
router.use('/blog',require(__dirname+"/blog.js"));

router.get("/",(req,res)=>{
	res.redirect("/blog");
})
router.get("/about",(req,res)=>{
	res.render("blog/about",{data : {}});
})
router.get("/chat",(req,res)=>{
	res.render("chat");
})
module.exports = router;