module.exports = function(io){
	var usernames = [];
	io.sockets.on("connection",(socket)=>{
		console.log("Have a new User connected")
		//Listen Adduser event
		socket.on("adduser",(username)=>{
			//Save
			socket.username = username;
			usernames.push(username);
			//Notify to myself
			var data = {
				sender : "SERVER",
				message : "You have john Chat Room"
			}
			socket.emit("updatemessage",data);
			//Notify to other users
			var data = {
				sender : "SERVER",
				message : username + " have john to Chat room"
			};
			socket.broadcast.emit("updatemessage",data);

		})
		socket.on("send_message",(message)=>{
			//Notify to myself
			data = {
				sender : "You",
				message : message
			}
			socket.emit("updatemessage",data)
			//Notify to other User
			var data = {
				sender : socket.username,
				message : message
			}
			socket.broadcast.emit("updatemessage",data);
		})
		socket.on("disconnect",() => {
			//Delete username 
			for(var i = 0 ;i < usernames.length; i++){
				if (usernames[i]==socket.username){
					usernames.splice(i, 1);
				}
			}
			data = {
			sender : "SERVER",
			message :  socket.username + " Out Group Chat "

		}
		socket.broadcast.emit("updatemessage",data);
		})
		//Notify to Other User
		
	})
}


