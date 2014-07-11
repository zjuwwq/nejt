nejt
===

a nice easy javascript template, a embedded javascript template.

# 1. Installtion
Download:[Source](https://raw.githubusercontent.com/zjuwwq/nejt/master/nejt.js) | [Minified](https://raw.githubusercontent.com/zjuwwq/nejt/master/nejt.min.js)

Npm: `npm install nejt`

Bower: `bower install nejt`
# 2. API

## 2.1 render
Description

	Render the template string and the data, then set the result to be the element's innerHTML.
Syntax

	NEJT.render(templateStr, data[, element|elementId])
Parameters

	. templateStr - the template string
	. data - the data
	. element|elementId - the container element/element's id
Returns

	the result string rendered from the template string and the data.
Examples

	[Demo0](#render0), [Demo1](#render1)

## 2.2 compile
Description

	Compile the template string to a render function which can render with the data many times.
Syntax

	NEJT.Compile(templateStr)
Parameters

	. templateStr - the template string
Returns

	the render function compile from the template string.
Examples

	[Demo0](#compile0), [Demo1](#compile1)


# 3. Options

# 4. Getting Started
## Interpolation

```javascript
NEJT.render('Hello, <%= name %>.<%= age %>', {name: 'Jack'});	// 'Hello, Jack.'
```

<a name="render0"></a>
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
// delete tab and line-break
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
// delete tab and line-break
htmlStr.replace(/[\t\n]/mg, '');		//'wwq, hxl, gp'
```

## Custom interpolation symbol
```javascript
NEJT.config.interpolationTag = '~';
NEJT.render('Hello, <%~ name %>.<%~ age %>', {name: 'Jack'});	// 'Hello, Jack.'
```
<a name="compile0"></a>
## Compile once, use any times
```javascript
var render = NEJT.compile('Hello, <%= name %>.');
render({name: 'Jack'});		// 'Hello, Jack.'
render({name: 'Tom'});		//'Hello, Tom.'
```

## Using in browser
<a name="render1"></a>
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
<a name="compile0"></a>
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
