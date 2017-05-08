(function(w, d){
	const root = w;
	const doc = d;
	const prevEnv = root.$$;
	
	function isHTML(text){
		const containsTag = /^\s*<(\w+|!)[^>]*>/.exec(text);
		return containsTag !== null && containsTag.length>1;
	}
	
	function SuperDOM(params){
		let nodes = [];
		
		if(typeof params === 'string' && isHTML(params)){
			const frag = doc.createDocumentFragment();
			const div = doc.createElement('div');
			
			frag.appendChild(div);
			div.innerHTML = params;
			nodes = Array.from(div.children);
		}else if(typeof params === 'string'){
			nodes = Array.from(doc.querySelectorAll(params));
		}else{
			nodes = params;
		}
		
		this.push.apply(this, nodes);
	}
	
	SuperDOM.prototype = {
		constructor: SuperDOM,
		length: 0,
		push: Array.prototype.push,
		pop: Array.prototype.pop,
		splice: Array.prototype.splice
	};
	
	function superdom(params){
		return new SuperDOM(params);
	}
	
	superdom.noConflict = function() {
		root.$$ = prevEnv;
		return superdom;
		
	};
	
	root.$$ = superdom;
	root.$$.fn = SuperDOM.prototype;
	
})(window, document);