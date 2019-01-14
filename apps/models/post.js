var db = require("../common/databaseconn");
var q = require('q');
var conn = db.getConnection();

function getAllPosts(){
	var defer = q.defer();
	var query = conn.query('SELECT * FROM posts',(err,posts)=>{
		if(err){
			defer.reject(err);
		}
		else{
			defer.resolve(posts);
		}
	})
	return defer.promise;
}	
function addNewPost(data){
	if(data){
		var defer = q.defer();
		var query = conn.query('INSERT INTO posts SET ? ',data,(err,result)=>{
			if(err){
				defer.reject(err);
			}
			else{
				defer.resolve(result);
			}
		})
		return defer.promise;
	}
	return false;
}
function getDetailPost(id){
	var defer = q.defer();
	var query = conn.query('SELECT * FROM posts WHERE ?',{id:id},(err,post)=>{
		if(err){
			defer.reject(err);
		}
		else{
			defer.resolve(post);
		}
	})
	return defer.promise;
}
function updatePost(param){
	if(param){
		var defer = q.defer();
		var query = conn.query('UPDATE posts  SET title = ?, content = ? , author = ? ,update_at = ?  WHERE id = ?',
			[param.title,param.content,param.author,new Date(),param.id],
			(err,post)=>{
				if(err){
					defer.reject(err);
				}
				else{
					defer.resolve(post);
				}
			})
		return defer.promise;
	}else{
		return false;
	}
}

function deletePost(id){
	if(id){
		var defer = q.defer();
		var query = conn.query('DELETE FROM posts  WHERE id = ?',
			[id],
			(err,post)=>{
				if(err){
					defer.reject(err);
				}
				else{
					defer.resolve(post);
				}
			})
		return defer.promise;
	}else{
		return false;
	}
}
module.exports = {
	getAllPosts : getAllPosts,
	addNewPost : addNewPost,
	getDetailPost : getDetailPost,
	updatePost : updatePost,
	deletePost : deletePost
}
