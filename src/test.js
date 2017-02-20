// console.log('ssssssss')
var h = require('./index.html')
console.log(h)
// var t = require('./try.js')
document.getElementById('app').addEventListener('click',function(e){
	require.ensure(['./test.css'],function(require){
		var s = require('./test.css')
	})
})
