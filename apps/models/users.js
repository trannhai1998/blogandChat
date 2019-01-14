var db = require("../common/databaseconn");
var q = require('q');
var conn = db.getConnection();

function addUser(user){
	if(user){
		var defer = q.defer();
		var query = conn.query('INSERT INTO users SET ? ',user,(err,result)=>{
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
//Get User By Email
function GetUserByEmail(email){
	if(email){
		let defer = q.defer();
		let query = conn.query('SELECT * FROM users WHERE ? ',{email:email},(err,result) => {
			if(err){
				defer.reject(err);
			}else {
				defer.resolve(result);
			}
		});
		return  defer.promise;
	}
	return false;
}
//User List
function getAllUser(){
	let defer = q.defer();
		let query = conn.query('SELET * FROM users',(err,result) => {
			if(err){
				defer.reject(err);
			}else {
				defer.resolve(result);
			}
		});
		return  defer.promise;
	return false;
}
// End User List

module.exports = {
	addUser : addUser,
	GetUserByEmail : GetUserByEmail,
	getAllUser : getAllUser
}