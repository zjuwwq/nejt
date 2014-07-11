nejt
===

a nice easy javascript template, a embedded javascript template.

# Installtion
Download:[Source](https://raw.githubusercontent.com/zjuwwq/nejt/master/nejt.js) | [Minified](https://raw.githubusercontent.com/zjuwwq/nejt/master/nejt.min.js)

Npm: `npm install nejt`

Bower: `bower install nejt`

# Getting Started
## Interpolation

```javascript
var template = NEJT.compile('Hello, <%= name %>.<%= age %>'); 
template({name: 'Jack'}) // 'Hello, Jack.'
```

## Using javascript in template

``` javascript
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
template({users: users}).replace(/[\t\n]/mg,'');	// '<ul><li>wwq, </li><li>hxl, </li><li>gp</li></ul>'
```

## Custom delimiters

``` javascript
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
template({users: users}).replace(/[\t\n]/mg,'');	// 'wwq, hxl, gp'
```


# [LICENSE](https://github.com/zjuwwq/nejt/blob/master/LICENSE)
MIT
