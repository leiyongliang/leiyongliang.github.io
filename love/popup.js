  var map = new AMap.Map('container', {
        resizeEnable: true,
        center: [106.554183, 29.529137],
        zoom: 6
    });
    var lineArr = [
        ['114.083887','22.548902'],
        ['117.263056', '31.864324']
    ];
    var polyline = new AMap.Polyline({
        path: lineArr,            // 设置线覆盖物路径
        strokeColor: '#3366FF',   // 线颜色
        strokeOpacity: 1,         // 线透明度
        strokeWeight: 2,          // 线宽
        strokeStyle: 'solid',     // 线样式
        strokeDasharray: [10, 5], // 补充线样式
        geodesic: true            // 绘制大地线
    });
    polyline.setMap(map);

     new AMap.Marker({
        map: map,
		position: ['117.263056', '31.864324'],
        icon: new AMap.Icon({            
            size: new AMap.Size(40, 50),  //图标大小
            image: "./liked.png",
            imageOffset: new AMap.Pixel(0,30)
        })        
    });
    new AMap.Marker({
        map: map,
		position: ['114.083887','22.548902'],
        icon: new AMap.Icon({            
            size: new AMap.Size(40, 50),  //图标大小
            image: "./liked.png",
            imageOffset: new AMap.Pixel(0,30)
        })        
    });
    var lnglat = new AMap.LngLat(117.263056, 31.864324);
    document.getElementById('dis').innerHTML = '他离你的距离：'+ lnglat.distance([114.083887, 22.548902]) + '米'
    var startT = new Date('2017/1/1').getTime()
    setInterval(function() {
        var dist = new Date().getTime() - startT
        var days=Math.floor(dist/(24*3600*1000))
        var leave1=dist%(24*3600*1000)    //计算天数后剩余的毫秒数  
        var hours=Math.floor(leave1/(3600*1000))
        var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数  
        var minutes=Math.floor(leave2/(60*1000))
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数  
        var seconds=Math.round(leave3/1000)
        document.getElementById('time').innerHTML = '我们在一起：'+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"
    }, 1000)
    