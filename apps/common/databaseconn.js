var config = require("config");

var mysql = require("mysql");
const connecting = mysql.createConnection({
	host : config.get("mysql.host"),
	user : config.get("mysql.user"),
	password: config.get("mysql.password"),
	database : config.get("mysql.database"),
	port : config.get("mysql.port")
});
connecting.connect();
function getConnection(){
	if(!connecting){
		connecting.connect();
	}
	return connecting;
}
module.exports = {
	getConnection : getConnection
}