// =========== Functional methods ======================================================
/**
* Função que aplica uma outra função em um array
*/
function map(func, array) {
	var result = [];
	forEach(array, function (element) {
		result.push(func(element));
	});
	return result;
}

/**
* Função de loop em arrays
*/
function forEach(array, action) {
	for (var i = 0; i < array.length; i++)
		action(array[i]);
}

/**
* Função de loop em objetos
*/
function forEachIn(object, action) {
	for (var property in object) {
		if (object.hasOwnProperty(property))
			action(property, object[property]);
	}
}

/**
* Função que retorna o menor valor de um array
*/
function smallest(array){ 
	return Math.min.apply( Math, array ); 
}

/**
* Função que retorna o maior valor de um array
*/
function largest(array){ 
	return Math.max.apply( Math, array ); 
}

// =========== Elements methods ======================================================

/**
* Função que insere um elemento depois de um elemento informado
*/
function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	
	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
	} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

/**
* Função que altera os atributos de um node
*/
function setNodeAttribute(node, attribute, value) {
	if (attribute == "class")
		node.className = value;
	else if (attribute == "checked")
		node.defaultChecked = value;
	else if (attribute == "for")
		node.htmlFor = value;
	else if (attribute == "style")
		node.style.cssText = value;
	else
		node.setAttribute(attribute, value);
}

/**
* Função que cria um elemento
*/
function dom(name, attributes) {
	var node = document.createElement(name);

	if (attributes) {
		forEachIn(attributes, function(name, value) {
			setNodeAttribute(node, name, value);
		});
	}
	
	for (var i = 2; i < arguments.length; i++) {
		var child = arguments[i];
		
		if (typeof child == "string")
			child = document.createTextNode(child);

		node.appendChild(child);
	}
	return node;
}

/**
* Função que aplica fade a um elemento
*/
function fade(id) {
	var dom = _$(id),
		level = 1;

	function step() {
		var h = level.toString(16);
		var color = "#FFFF" + h + h;
		if(level < 15) {
			level += 1;
			dom.style.backgroundColor = color; 	
		}

		setTimeout(step, 100);
	}

	setTimeout(step, 100);
}

/**
* Função que retorna um node com a class informada
*/
function getElementsByClassName(className) {
	var results = [];
	walkTheDOM(document.body, function(node) {
		var a, c = node.className, i;
		if(c) {
			a = c.split(' ');
			for( i = 0; i < a.length; i += 1 ) {
				if( a[i] === className ) {
					results.push(node);
					break;
				}
			}
		}
	});

	return results;
}

/**
* Função que adiciona um evento a um node de forma corretas
*/
function addEventHandler(node, type, f) {
	if( node.addEventListener ) {
		node.addEventListener(type, f, false);
	} else if( node.attachEvent ) {
		node.attachEvent('on' + type, f);
	} else {
		node['on' + type] = f;
	}
}

// =========== Utilities methods ======================================================

/**
* Função para debugar
*/
function log(msg) {
	console.log(msg);	
}

/**
* Função que retorna o node do id informado
*/
function _$(id) {
	var node = document.getElementById(id);
	return node;
}

// =========== Object methods ======================================================

/**
* Função cria um objeto
*/
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}

// =========== Built-in Methods ======================================================

/**
* Função que aplica o conceito TRIM em uma string
*/
String.prototype.trim = function() {
	return this.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '');
};

// Method to template something with {}
String.prototype.supplant = function(o) {
	return this.replace(/{([^{}]*)}/g,
		function(a, b) {
			var r = o[b];
			return typeof r === 'string' ? 
				r : a;
		}
	);
};

Object.prototype.later = function(msec, method) {
	var that = this,
		args = Array.prototype.slice.apply(arguments, [2]);
	if( typeof method === 'string' ) {
		method = that[method];
	}

	setTimeout(function() {
		method.apply(that, args);
	}, msec);

	return that;
};

if(typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}