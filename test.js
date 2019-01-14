const bcrypt = require('bcrypt');
const config = require('config');
function hash_password(password){
	var saltRounds = config.get("salt");
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash =  bcrypt.hashSync(password,salt);
	return hash;
}
function compare_password(password,hash){
	return bcrypt.compareSync(password,hash);
}
console.log(hash_password("namvip123"));
console.log(compare_password("namvip123",hash_password("namvip123")))