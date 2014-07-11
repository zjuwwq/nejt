describe('nejt - a nice easy javascript template', function() {
	beforeEach(function(){
		NEJT.config = {
			startTag: '<%',
			endTag: '%>',
			interpolationTag: '=',
			isEscape: true
		};
	});
	it('Interpolation', function() {
		var str = NEJT.render('Hello, <%= name %>.<%= age %>', {name: 'Jack'});
		expect(str).toEqual('Hello, Jack.');
	});
	it('Using javascript in template', function() {
		var str = '<ul>\
				<%for(var i=0,user,len=users.length;i<len;i++){ %>\
					<li><%= users[i].name %><% if(i<len-1){ %>, <% } %></li>\
				<% } %>\
			</ul>';
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
		var htmlStr = NEJT.render(str, {users: users});
		expect(htmlStr.replace(/[\t\n]/mg, '')).toEqual('<ul><li>wwq, </li><li>hxl, </li><li>gp</li></ul>');
	});
	it('Custom delimiters', function() {
		NEJT.config.startTag = '[[';
		NEJT.config.endTag = ']]';
		var str = '[[for(var i=0,user,len=users.length;i<len;i++){ ]]\
				[[= users[i].name ]]\
				[[ if(i<len-1){ ]], [[ } ]]\
			[[ } ]]';
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
		var htmlStr = NEJT.render(str, {users: users});
		expect(htmlStr.replace(/[\t\n]/mg, '')).toEqual('wwq, hxl, gp');
	});
	it('Custom interpolation symbol', function() {
		NEJT.config.interpolationTag = '~';
		var str = NEJT.render('Hello, <%~ name %>.<%~ age %>', {name: 'Jack'});
		expect(str).toEqual('Hello, Jack.');
	});
	it('Escape', function() {
		var str = NEJT.render('<p>Hello, <%= name %>.</p>', {name: '</p>Jack'});
		expect(str).toEqual('<p>Hello, &lt;/p&gt;Jack.</p>');
		NEJT.config.isEscape = false;
		str = NEJT.render('<p>Hello, <%= name %>.</p>', {name: '</p>Jack'});
		expect(str).toEqual('<p>Hello, </p>Jack.</p>');
	});
	it('Compile once, use any times', function() {
		var render = NEJT.compile('Hello, <%= name %>.');
		expect(render({name: 'Jack'})).toEqual('Hello, Jack.');
		expect(render({name: 'Tom'})).toEqual('Hello, Tom.');
	});
});