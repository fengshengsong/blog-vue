document.onreadystatechange = function(e){
	if(document.readyState == 'complete'){
		setTimeout(function(){
			document.querySelector("#loading").style.opacity = 0;
			document.querySelector("#loading").style.display = 'none';
		},2000);
	}
}