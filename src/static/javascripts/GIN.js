
const GIN = {
	install(Vue,GIN_OPTIONS){
		Vue.prototype.CONST = {
			PORT:'http://xiaoyin.net.cn:3000',
			// PORT:'http://localhost:3000',
			categories:[
				{name:'All',path:''},
				{name:'问题',path:'/problem'},
				{name:'读书',path:'/note'},
				{name:'日常',path:'/affair'},
			],
			essay_types:new Map([['problem','问题'],['note','读书'],['affair','日常']]),
			fun:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',			
		},
		Vue.prototype.UTILS = {
			isArray(value){
				return Object.prototype.toString.apply(value) === '[object Array]'
			},
			// 字符串去空格
			trim(str){ 
				return str.replace(/(^\s*)|(\s*$)/g,""); 
			},
			// 设置最多显示字数
			setContextLimit(className,length){
				let maxLength = length
				let nodes = document.querySelectorAll('.'+className)
				for(let node of nodes){
					if(node.innerText.length>maxLength){
						node.innerText=node.innerText.substring(0,maxLength)+'...'
					}
				}
			},
			// 获得最大公约数
			getLCM(arr){
				function getBig(a,b){
					if(a < b){
						var temp = a;
						a = b;
						b = temp;
					}
					if(b == 0){
						return a;
					}
					return getBig(b,a%b);
				}
				return arr.reduce(function(a,b){
					return a*b/getBig(a,b);
				},1);
			},
		}
	}
}

export default GIN