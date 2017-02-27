module.exports = {
	// PORT:'http://xiaoyin.net.cn:3000',
	PORT:'http://localhost:3000',
	isArray(value){
     	return Object.prototype.toString.apply(value) === '[object Array]'
	},
	setContextLimit(className,length){
		let maxLength = length
		let nodes = document.querySelectorAll('.'+className)
		for(let node of nodes){
			if(node.innerText.length>maxLength){
				node.innerText=node.innerText.substring(0,maxLength)+'...'
			}
		}
	},
	trim(str){ 
		return str.replace(/(^\s*)|(\s*$)/g,""); 
	},
	categories:[
		{name:'All',path:'/all'},
        {name:'问题',path:'/problem'},
        {name:'读书',path:'/note'},
        {name:'日常',path:'/affair'},
    ],
    menus:[
    	{name:'博客',iconfont:'&#xe61e;',event:'blog'},
    	{name:'标签',iconfont:'&#xe6f9;',event:'tag'},
    	{name:'测试',iconfont:'&#xe616;',event:'test'},
    	{name:'搜索',iconfont:'&#xe615;',event:'search'},
    ],
    essay_types: new Map([['problem','问题'],['note','读书'],['affair','日常']]),
    joke:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
}