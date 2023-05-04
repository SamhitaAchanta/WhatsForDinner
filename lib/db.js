var mysql = require('mysql');
var con = mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'cis393proj'
});
con.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully..!!');
	}
});
module.exports = con;
