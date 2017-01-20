window.onload=function(){
	var _begin;
	var _end;
	document.querySelector('#pageA').addEventListener('touchstart', function(e) {
	    _begin = e.changedTouches[0].pageX;
	}, false);
	document.querySelector('#pageA').addEventListener('touchend', function(e) {
	    _end = e.changedTouches[0].pageX;
	    if (_end - _begin>=50) {
	    	pageA.css({
	            	'display':'none',	
	            });
            pageD.css({
            	'display':'block',
            })
	        /*console.log('从左向右')
	        console.log(_end-_begin)*/

		}
		else if(_end - _begin<=-50){
	        /*console.log('从右向左')
	        console.log(_end-_begin)*/
	        pageA.css({
	            	'display':'none',	
	            });
            pageB.css({
            	'display':'block',
            })
	    }
	    else{

	    }
	}, false);

	document.querySelector('#pageB').addEventListener('touchstart', function(e) {
	    _begin = e.changedTouches[0].pageX;
	}, false);
	document.querySelector('#pageB').addEventListener('touchend', function(e) {
	    _end = e.changedTouches[0].pageX;
	    if (_end - _begin>=50) {
	        pageB.css({
	            	'display':'none',	
	            });
            pageA.css({
            	'display':'block',
            })

		}
		else if(_end - _begin<=-50){
	        /*console.log('从右向左')
	        console.log(_end-_begin)*/
	        pageB.css({
	            	'display':'none',	
	            });
            pageC.css({
            	'display':'block',
            })
	    }
	    else{

	    }
	}, false);

	document.querySelector('#pageC').addEventListener('touchstart', function(e) {
	    _begin = e.changedTouches[0].pageX;
	}, false);
	document.querySelector('#pageC').addEventListener('touchend', function(e) {
	    _end = e.changedTouches[0].pageX;
	    if (_end - _begin>=50) {
	        pageC.css({
	            	'display':'none',	
	            });
            pageB.css({
            	'display':'block',
            })

		}
		else if(_end - _begin<=-50){
	        /*console.log('从右向左')
	        console.log(_end-_begin)*/
	        pageC.css({
	            	'display':'none',	
	            });
            pageD.css({
            	'display':'block',
            })
	    }
	    else{

	    }
	}, false);

	document.querySelector('#pageD').addEventListener('touchstart', function(e) {
	    _begin = e.changedTouches[0].pageX;
	}, false);
	document.querySelector('#pageD').addEventListener('touchend', function(e) {
	    _end = e.changedTouches[0].pageX;
	    if (_end - _begin>=50) {
	        pageD.css({
	            	'display':'none',	
	            });
            pageC.css({
            	'display':'block',
            })

		}
		else if(_end - _begin<=-50){
	        /*console.log('从右向左')
	        console.log(_end-_begin)*/
	        pageD.css({
	            	'display':'none',	
	            });
            pageA.css({
            	'display':'block',
            })
	    }
	    else{

	    }
	}, false);

	document.querySelector('#pageE').addEventListener('touchstart', function(e) {
	    _begin = e.changedTouches[0].pageX;
	}, false);
	document.querySelector('#pageE').addEventListener('touchend', function(e) {
	    _end = e.changedTouches[0].pageX;
	    if (_end - _begin>=50) {
	    	pageE.css({
	            	'display':'none',	
	            });
            pageG.css({
            	'display':'block',
            })
	        /*console.log('从左向右')
	        console.log(_end-_begin)*/

		}
		else if(_end - _begin<=-50){
	        /*console.log('从右向左')
	        console.log(_end-_begin)*/
	        pageE.css({
	            	'display':'none',	
	            });
            pageF.css({
            	'display':'block',
            })
	    }
	    else{

	    }
	}, false);

	document.querySelector('#pageF').addEventListener('touchstart', function(e) {
	    _begin = e.changedTouches[0].pageX;
	}, false);
	document.querySelector('#pageF').addEventListener('touchend', function(e) {
	    _end = e.changedTouches[0].pageX;
	    if (_end - _begin>=50) {
	        /*console.log('从左向右')
	        console.log(_end-_begin)*/
	        pageF.css({
	            	'display':'none',	
	            });
	            pageE.css({
	            	'display':'block',
	            })

		}
		else if(_end - _begin<=-50){
	        /*console.log('从右向左')
	        console.log(_end-_begin)*/
	        pageF.css({
	            	'display':'none',	
	            });
	            pageG.css({
	            	'display':'block',
	            })
	    }
	    else{

	    }
	}, false);  

	document.querySelector('#pageG').addEventListener('touchstart', function(e) {
	    _begin = e.changedTouches[0].pageX;
	}, false);
	document.querySelector('#pageG').addEventListener('touchend', function(e) {
	    _end = e.changedTouches[0].pageX;
	    if (_end - _begin>=50) {
	       /* console.log('从左向右')
	        console.log(_end-_begin)*/
	        pageG.css({
	            	'display':'none',	
	            });
	            pageF.css({
	            	'display':'block',
	            })

		}
		else if(_end - _begin<=-50){
	        /*console.log('从右向左')
	        console.log(_end-_begin)*/
	        pageG.css({
	            	'display':'none',	
	            });
	            pageE.css({
	            	'display':'block',
	            })
	    }
	    else{

	    }
	}, false);  


}
