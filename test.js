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
	var str = '<%for(var i=0,user,len=users.length;i<len;i++){ %>\
				<%= users[i].name %>\
				<% if(i<len-1){ %>, <% } %>\
			<% } %>';
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
	}));	// 'wwq, hxl, gp'
})();
(function() {
	// Using javascript in template
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
	}));	// 'wwq, hxl, gp'
})();