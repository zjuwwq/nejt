var NEJT = require('./nejt.js');
(function() {
	// Interpolation
	var template = NEJT.compile('Hello, <%= name %>.<%= age %>');
	console.log(template({
		name: 'Jack'
	})); // 'Hello, Jack.'
})();

(function() {
	// Using javascript in template
	var str = '<ul>\
				<%for(var i=0,user,len=users.length;i<len;i++){ %>\
					<li><%= users[i].name %><% if(i<len-1){ %>, <% } %></li>\
				<% } %>\
			</ul>';
	var template = NEJT.compile(str);
	var users = [{
		name: "wwq",
		age: 30
	}, {
		name: "hxl",
		age: 32
	}, {
		name: "gp",
		age: 33
	}];
	console.log(template({
		users: users
	}).replace(/[\t\n]/mg,''));	// '<ul><li>wwq, </li><li>hxl, </li><li>gp</li></ul>'
})();
(function() {
	// Custom delimiters
	var str = '[[for(var i=0,user,len=users.length;i<len;i++){ ]]\
				[[= users[i].name ]]\
				[[ if(i<len-1){ ]], [[ } ]]\
			[[ } ]]';
	NEJT.config.startTag = '[[';
	NEJT.config.endTag = ']]';
	var template = NEJT.compile(str);
	var users = [{
		name: "wwq",
		age: 30
	}, {
		name: "hxl",
		age: 32
	}, {
		name: "gp",
		age: 33
	}];
	console.log(template({
		users: users
	}).replace(/[\t\n]/mg,''));	// 'wwq, hxl, gp'
})();