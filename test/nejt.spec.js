describe('nejt - a nice easy javascript template', function(){
	it('interpolation', function(){
		var template = NEJT.compile('Hello, <%= name %>.<%= age %>');
		expect(template({name: 'Jack'})).toEqual('Hello, Jack.');
	});
	it('support javascript grammer', function(){
		var str = '<%for(var i=0,user,len=users.length;i<len;i++){ %>\
				<%= users[i].name %>\
				<% if(i<len-1){ %>, <% } %>\
			<% } %>';
		var template = NEJT.compile(str);
		var users = [{name: "wwq", age: 30}, {name: "hxl", age: 32}, {name: "gp", age: 33}];
		expect(template({users: users})).toEqual('wwq, hxl, gp');
	});
	it('support customize start/end tag', function(){
		var str = '{{for(var i=0,user,len=users.length;i<len;i++){ ]]\
				{{= users[i].name ]]\
				{{ if(i<len-1){ ]], {{ } ]]\
			{{ } ]]';
		NEJT.config.startTag = '{{';
		NEJT.config.endTag = ']]';
		var template = NEJT.compile(str);
		var users = [{name: "wwq", age: 30}, {name: "hxl", age: 32}, {name: "gp", age: 33}];
		expect(template({users: users})).toEqual('wwq, hxl, gp');
	});
});