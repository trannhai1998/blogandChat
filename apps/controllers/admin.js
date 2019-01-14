var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');

//insert to DB
var user_md = require("../models/users");
var post_md = require("../models/post");
var helper = require('../helpers/helper');

router.get("/",(req,res)=>{
	if(req.session.user){
		var data = post_md.getAllPosts();
		data.then(posts=>{
			var dataposts = {
				posts:posts,
				error:false
			}
			res.render("admin/dashboard",{data : dataposts});
		}).catch(err => {
			res.render('admin/dashboard',{data : err});

		})
	}else {
		res.redirect("/admin/signin");
	}
	
})
router.get("/signup",(req,res)=>{
	res.render("signup",{data : {}});
});

router.post("/signup",(req,res)=>{
	var user = req.body;
	if(user.email.trim().length == 0 ){
		res.render("signup",{data : {error:"Email is required"}});
	}
	if (user.passwd != user.repasswd && user.passwd.trim().length != 0){
		res.render("signup",{data : {error:"Password is not match"}});
	}
	user1 = {
		email : user.email,
		password : helper.hash_password(user.passwd),
		first_name : user.firstname,
		last_name : user.lastname
	}
	//vi promise luon co du lieu
	// Check email
	let resultCheckmail = user_md.GetUserByEmail(user.email);
	if(resultCheckmail){
		resultCheckmail.then((data)=>{
			res.render("signup",{data:{error:"This Email was Signuped"}});
		}).catch((err)=>{
			res.render("signup",{data:{error:`${err}`}});
		})
	}else{
		var result = user_md.addUser(user1);
		result.then( (data)=>{
			res.redirect("/admin/signin");	
		}).catch((err)=>{
			res.render("signup",{data : {error : "error"}});
		})
	}
	// if(!result){
	// 	res.render("signup",{data:{error:"Could not insert user Data to DB"}});
	// }
	// else {
	// 	res.render("signup",{data:{success:"Signup thanh "}});
	// }
})

//Login

router.get("/signin",(req,res)=>{
	res.render("signin",{data : {}})
})

router.post("/signin",(req,res)=>{
	var params = req.body;

	if(params.email.trim().length == 0){
		res.render('signin',{data : {error : "Please Enter Email !!"}})
	}else {
		var data = user_md.GetUserByEmail(params.email);
		if (data){
			data.then(function(users){
				var user = users[0];
				var status = helper.compare_password(params.password,user.password);
				if(!status){
					res.render('signin',{data:{error: "Password is wrong @@"}});
				}else {
					req.session.user = user ;
					console.log(req.session.user);
					res.redirect('/admin');
				}
			})
		}else{
			res.render('signin',{data : {error:"User not exists"}})
		}
	}
})

//New Post
router.get("/post/new",(req,res)=>{
	if(req.session.user){
		res.render("admin/posts/addnew",{data : {error : false}});}
		else{
			res.redirect("/admin/signin");
		}

	})
router.post('/post/new',(req,res)=>{
	var params = req.body;
	var now = new Date();
	params.create_at = now ;
	params.update_at = now;

	let result = post_md.addNewPost(params);
	result.then(data =>{
		res.redirect('/admin');
	}).catch(err=>{
		res.render("admin/posts/addnew",{data:{error:err}});
	})
});
router.get('/post/edit/:id',(req,res)=>{
	if(req.session.user){
		var params = req.params;
		var id = params.id;
		var postdata = post_md.getDetailPost(id);
		console.log(postdata);
		if(postdata){
			postdata.then(result=>{
				var post = result[0];
				var data = {
					post : post,
					error : false
				}
				res.render("admin/posts/edit",{data:data});
			}).catch(err=>{
				res.render('admin/posts/edit',{data :{error : 'Count not Get POST'}});
			})
		}
	}else{
		res.redirect("/admin/signin");
	}
});
// Start Put
router.put("/post/edit",(req,res)=>{
	var params = req.body;
	console.log(params);
	data = post_md.updatePost(params);
	if(!data){
		res.json({status_code : 500})
	}else{
		data.then( (result) => {
			res.json({status_code:200})
		}).catch((err)=>{
			res.json({status_code:500})
		})
		
	}

})
//End Put

//Start Delete
router.delete("/post/delete",(req,res)=>{
	var id = req.body.id;
	console.log(id);
	var data = post_md.deletePost(id);
	console.log(data);
	if(!data){
		res.json({status_code:500});
	}else{
		data.then((result)=>{
			res.json({status_code:200});
		}).catch((err)=>{
			res.json({status_code:500});
		})
	}
})
//End Deletd

// User list 
router.get('/users',(req,res)=>{
	if(req.session.user){
		var data = user_md.getAllUser();
		if(!data){
			console.log("loi~");
		}
		else{
			data.then(  users=>{
				let data = {
					user : users,
					error : false
				}
				res.render('admin/users/userlist',{data : data  });
			}).catch(err =>{
				res.render('admin/users/userlist',{data : error  });
			})
		}
	}else{
		res.redirect("/admin/signin");
	}
	
})
// End User List

module.exports = router;