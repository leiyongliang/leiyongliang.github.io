$(function(){
	$("#main-title").click(function(){
		$("#main-title").hide();
		$("#show_me").css({'top':'10%'});
	})
	$("#show_me").click(function(){
		$("#show_me").hide();
		$("#like_me").show();
		$("#like_me").css({'opacity':1})
		setTimeout(function(){
			$("#like_me").hide();
			$("#final").show();
			$("#final").css({'animation':'final 2s steps(360)'})
		},5000)
	})

})

