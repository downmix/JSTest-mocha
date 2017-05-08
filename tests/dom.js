const assert = chai.assert;
const $$ = window.$$;

/*
describe('Array', () => {
	describe('#indexOf()', () => {
		it('should not throw an error', () => {
			assert.equal([1,2,3].indexOf(2),1);
		});
	});
});	
*/

describe('Super Awesome DOM Library', () => {
	describe('#noConflict()', () => {
		it('noConflict() 호출하면 dom의 메인함수가 반환된다.', () => {
			//Given
			//When
			const dom = $$.noConflict();
			
			//Then
			assert.equal(dom, $$);
		});
		
		it('noConflict() 호출하면 이전 속성 상태로 돌린다.', () => {
			//Given
			window.$$ = {name: 'other'};
			
			
			return importScript('../src/dom.js').then(() => {
			//When			
			window.$$.noConflict();
			
			//Then
			assert.isObject(window.$$);
			assert.equal(window.$$.name, 'other');
			});
		})
		
	});
	
	describe('#superdom()', () => {
		describe('selecting', () =>{
			it('superdom() 호출하면 superDOM 객체가 반환', () => {
				//Given
				//When
				const dom = $$();
				
				//Then
				assert.isObject(dom);
				assert.instanceOf(dom, $$.fn.constructor);
			});
			
			it('SuperDOM 객체는 배열처럼 push, pop, splice를 사용할수있어야한다.', () =>{
				//Given
				const dom1 = $$();
				const dom2 = $$([1,2,3]);
				//When
				dom1.push(1);
				dom1.push(2);
				dom1.push(3);
				dom1.pop();
				dom2.splice(1,1);
				
				//Then
				assert.equal(dom1.length, 2);
				assert.equal(dom2.length, 2);
				assert.equal(dom1[0], 1);
				assert.equal(dom1[1], 2);
				assert.equal(dom2[0], 1);
				assert.equal(dom2[1], 3);
			});
			
			it('셀렉터를 전달하면 해당하는 DOM를 원소로 갖는 객체반환', () =>{
				//Given
				//When
				const dom1 = $$('.classification');
				const dom2 = $$('#identification');
				const dom3 = $$('.items .item');
				console.log(dom2);
				//Then	
				assert.equal(dom1[0].nodeType, Node.ELEMENT_NODE);
				assert.equal(dom2[0].nodeType, Node.ELEMENT_NODE);
				assert.equal(dom3[0].nodeType, Node.ELEMENT_NODE);
				assert.equal(dom1[0].childNodes[0].nodeValue, 'select by class');
				assert.equal(dom2[0].childNodes[0].nodeValue, 'select by Id');
				assert.equal(dom3.length, 5);
			});
			
			it('셀렉터를 전달하면 해당하는 DOM를 원소로 갖는 객체반환', () =>{
				//Given
				//When
				const dom = $$('.no-match');
				
				//Then
				assert.equal(dom.length, 0);
			});
		});
		
		
		describe('creating', () => {
			it('HTML 문자열을 전달하면 DOM를 생성한후 그것을 원소로 갖는 개체가 반환', () => {
				//Given
				//When
				const dom = $$('<div>it\'s Division Element</div>');
				
				//then
				assert.equal(dom.length, 1);
				assert.equal(dom[0].nodeType, Node.ELEMENT_NODE);
				assert.equal(dom[0].innerText, 'it\'s Division Element');
			});
			
			it('동일 레벨로 작성된 HTML 문자열을 전달하면 해당갯수만큼 DOM을 원소로 갖는 객체', () => {
				//Given
				//When
				const dom = $$(`
					<div>it\' division Element1</div>
					<div>it\' division Element2</div>
					<div>it\' division Element3</div>
				`);
				//Then
				
				assert.equal(dom.length, 3);
				assert.equal(dom[0].nodeType, Node.ELEMENT_NODE);
				assert.equal(dom[1].nodeType, Node.ELEMENT_NODE);
				assert.equal(dom[2].nodeType, Node.ELEMENT_NODE);
				assert.equal(dom[0].innerText, 'it\' division Element1');
				assert.equal(dom[1].innerText, 'it\' division Element2');
				assert.equal(dom[2].innerText, 'it\' division Element3');
			});
		});
	});
});

function importScript(src){
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		
		script.src = src;
		script.type = 'text\/javascript';
		script.onerror = reject;
		script.onload = resolve;
		
		document.body.appendChild(script);	
	});
}