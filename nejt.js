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
	 * @param  {String} regexpStr regexp string
	 * @return {String}     escaped string
	 */
	function escape(regexpStr) {
		if (type(regexpStr) !== 'string') return;
		return regexpStr.replace(SPECIAL_REGEXP, function(m) {
			return '\\' + m;
		});
	}
	/**
	 * 获取对象类型
	 * @param  {Object} obj 对象
	 * @return {String}     类型
	 */
	function type(obj) {
		return Object.prototype.toString.call(obj).match(TYPE_REGEXP)[1].toLowerCase();
	}
	/**
	 * compile template string
	 * @param  {String} templateStr template string
	 * @return {Function}     template function
	 */
	function compile(templateStr) {
		if (type(templateStr) !== 'string') return;
		var matches,
			startTag = escape(this.config.startTag || START_TAG),
			endTag = escape(this.config.endTag || END_TAG),
			interpolationTag = this.config.interpolationTag || INTERPOLATION_TAG,
			tokenRegexp = new RegExp(startTag + '([\\s\\S]*?)' + endTag, 'mg'),
			codes = ['var arr = [];'],
			cursor = 0,
			str,
			fnStr;

		templateStr = templateStr.replace(new RegExp('[\\t\\r\\n]+(' + startTag + ')', 'g'), '$1')
			.replace(new RegExp('(' + endTag + ')[\\t\\r\\n]+', 'g'), '$1');
		while (matches = tokenRegexp.exec(templateStr)) {
			codes.push('arr.push("' + templateStr.substring(cursor, matches.index) + '");');
			code = matches[1].trim();
			if (code.indexOf(interpolationTag) === 0) {
				code = code.substring(interpolationTag.length).trim();
				codes.push('try{arr.push(' + code + ');}catch(e){}');
			} else {
				codes.push(code);
			}
			cursor = tokenRegexp.lastIndex;
		}
		fnStr = 'context=context||{};with(context){' + codes.join('') + '}return arr.join("");';
		return new Function('context', fnStr);
	}
	return {
		compile: compile,
		config: {
			startTag: START_TAG,
			endTag: END_TAG,
			interpolationTag: INTERPOLATION_TAG
		}
	};
});