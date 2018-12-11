 
   var  end = new Date("2018/12/19");
 	setInterval(function(){
 		var now = new Date();
 		var ends = end.getTime();
 		var nows = now.getTime();
 		var reduces = ends - nows;
 		var nHour = parseInt(reduces/1000/60/60);
 		var nMinute = parseInt((reduces - nHour*1000*3600)/1000/60);
 		var nSecond = parseInt((reduces - nHour*1000*3600 - nMinute*1000*60)/1000);
 		if(nHour < 10){
 			nHour = "0" + nHour;
 		}
 		if(nMinute < 10){
 			nMinute = "0" + nMinute;
 		}
 		if(nSecond < 10){
 			nSecond = "0" + nSecond;
		 }
		 if(nHour===00){
			 clearInterval;
		 }
// 		if(nHour = 0 && nMinute =0 && nSecond =0){
// 			nHour = "00";
// 			minute = "00";
// 			second = "00";
// 			clearInterval();
// 		}
 		hour.innerHTML = nHour;
 		minute.innerHTML = nMinute;
 		second.innerHTML = nSecond;
 	},1000)
