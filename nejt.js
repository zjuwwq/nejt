(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof module === 'object' && typeof exports === 'object' && exports === module.exports) {
		module.exports = factory();
	} else {
		this.NEJT = factory();
	}
})(this, function() {
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	var TYPE_REGEXP = /\s+(\w+)\]$/,
		START_TAG = '<%',
		END_TAG = '%>',
		INTERPOLATION_TAG = '=',
		SPECIAL_REGEXP = /[$^().*+?\[\]\\{}|]/g;
	/**
	 * escape the special characters in the regexp string
	 * @param  {String} regexpStr
	 * @return {String}
	 */
	function escapeRegexp(regexpStr) {
		if (type(regexpStr) !== 'string') return;
		return regexpStr.replace(SPECIAL_REGEXP, function(m) {
			return '\\' + m;
		});
	}
	/**
	 * escape the special characters in the html string
	 * @param  {String} htmlStr
	 * @return {String}
	 */
	function escape(htmlStr) {
		if (type(htmlStr) !== 'string') return;
		return htmlStr.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}
	/**
	 * get the object type
	 * @param  {Object} obj
	 * @return {String}
	 */
	function type(obj) {
		return Object.prototype.toString.call(obj).match(TYPE_REGEXP)[1].toLowerCase();
	}
	/**
	 * get element by id
	 * @param  {String} id
	 * @return {HTMLElement}
	 */
	function $(id) {
		return type(id) === 'string' ? document.getElementById(id) : id;
	}
	/**
	 * set the innerHTML of the element
	 * @param  {String} html
	 * @param  {HTMLElement} element
	 * @return {Void}
	 */
	function innerHTML(html, element) {
		element = $(element);
		if (element && ('innerHTML' in element)) {
			element.innerHTML = html === undefined ? '' : html;
		}
	}
	/**
	 * compile template string
	 * @param  {String} templateStr template string
	 * @return {Function}     template function
	 */
	function compile(templateStr) {
		var templateElement = $(templateStr);
		templateStr = templateElement && templateElement.innerHTML || templateStr;
		if (type(templateStr) !== 'string') return;
		var matches,
			startTag = escapeRegexp(this.config.startTag || START_TAG),
			endTag = escapeRegexp(this.config.endTag || END_TAG),
			isEscape = this.config.isEscape,
			interpolationTag = this.config.interpolationTag || INTERPOLATION_TAG,
			tokenRegexp = new RegExp(startTag + '([\\s\\S]*?)' + endTag, 'mg'),
			codes = ['var arr = [];'],
			cursor = 0,
			str,
			fn;

		// templateStr = templateStr.replace(new RegExp('[\\t\\r\\n]+(' + startTag + ')', 'g'), '$1')
		//	.replace(new RegExp('(' + endTag + ')[\\t\\r\\n]+', 'g'), '$1');
		templateStr = templateStr.replace(/\r/g, '').replace(/\n/g, '\\n');
		while (matches = tokenRegexp.exec(templateStr)) {
			codes.push('arr.push("' + templateStr.substring(cursor, matches.index) + '");');
			code = matches[1].trim();
			if (code.indexOf(interpolationTag) === 0) {
				code = code.substring(interpolationTag.length).trim();
				code = isEscape ? 'this.__escape__(' + code + ')' : code;
				codes.push('try{arr.push(' + code + ');}catch(e){console.log(e);}');
			} else {
				codes.push(code);
			}
			cursor = tokenRegexp.lastIndex;
		}
		codes.push('arr.push("' + templateStr.substring(cursor) + '");');
		fn = new Function('context', 'with(context){' + codes.join('') + '}return arr.join("");');
		return function() {
			var context = arguments[0] || {};
			var html = fn.call({
				__escape__: escape
			}, context);
			innerHTML(html, arguments[1]);
			return html;
		};
	}
	/**
	 * render template string with context to the element
	 * @param  {String} templateStr
	 * @param  {Object} context
	 * @param  {HTMLElement} element
	 * @return {String}             the result string of render template string with context
	 */
	function render(templateStr, context, element) {
		var template = compile.call(this, templateStr);
		if (type(template) === 'function') {
			var html = template(context);
			innerHTML(html, element);
			return html;
		}
	}

	return {
		compile: compile,
		render: render,
		config: {
			startTag: START_TAG,
			endTag: END_TAG,
			interpolationTag: INTERPOLATION_TAG,
			isEscape: true
		}
	};
});