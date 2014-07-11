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
		var template = NEJT.compile('Hello, <%= name %>.<%= age %>');
		expect(template({
			name: 'Jack'
		})).toEqual('Hello, Jack.');
	});
	it('Using javascript in template', function() {
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
		expect(template({
			users: users
		}).replace(/[\t\n]/mg, '')).toEqual('<ul><li>wwq, </li><li>hxl, </li><li>gp</li></ul>');
	});
	it('Custom delimiters', function() {
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
		expect(template({
			users: users
		}).replace(/[\t\n]/mg, '')).toEqual('wwq, hxl, gp');
	});
	it('Custom interpolation symbol', function() {
		NEJT.config.interpolationTag = '~';
		var template = NEJT.compile('Hello, <%~ name %>.<%~ age %>');
		expect(template({
			name: 'Jack'
		})).toEqual('Hello, Jack.');
	});
	it('Escape', function() {
		var template = NEJT.compile('<p>Hello, <%= name %>.</p>');
		expect(template({
			name: '</p>Jack'
		})).toEqual('<p>Hello, &lt;/p&gt;Jack.</p>');
		NEJT.config.isEscape = false;
		var template = NEJT.compile('<p>Hello, <%= name %>.</p>');
		expect(template({
			name: '</p>Jack'
		})).toEqual('<p>Hello, </p>Jack.</p>');
	});
});