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
NEJT.render('Hello, <%= name %>.<%= age %>', {name: 'Jack'});	// 'Hello, Jack.'
```

## Using javascript in template

``` javascript
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
htmlStr.replace(/[\t\n]/mg, '');		//'<ul><li>wwq, </li><li>hxl, </li><li>gp</li></ul>'
```

## Custom delimiters

``` javascript
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
htmlStr.replace(/[\t\n]/mg, '');		//'wwq, hxl, gp'
```

## Custom interpolation symbol
```javascript
NEJT.config.interpolationTag = '~';
NEJT.render('Hello, <%~ name %>.<%~ age %>', {name: 'Jack'});	// 'Hello, Jack.'
```

## Compile once, use any times
```javascript
var render = NEJT.compile('Hello, <%= name %>.');
render({name: 'Jack'});		// 'Hello, Jack.'
render({name: 'Tom'});		//'Hello, Tom.'
```

## Using in browser
### Template in script element
html:

```html
<div id="xx"></div>
<script type="text/nejt" id="users">
	<ul>
		<% for(var i=0,user,len=users.length;i<len;i++){ %>
			<li><%= users[i].name %><% if(i<len-1){ %>, <% } %></li>
		<% } %>
	</ul>
</script>
```
javascript:

```javascript
var users = [{name: "wwq", age: 30}, {name: "hxl", age: 32}, {name: "gp", age: 33}];
NEJT.render('users', {users: users}, 'xx');
```
### Compile once, use any times

```html
<div id="a"></div>
<div id="b"></div>
```
javascript:

```javascript
var render = NEJT.compile('Hello, <%= name %>.');

render({name: 'Jack'}, 'a');

var html = render({name: 'Tom'});
document.getElementById('b').innerHTML = html;
```

# [LICENSE](https://github.com/zjuwwq/nejt/blob/master/LICENSE)
MIT
