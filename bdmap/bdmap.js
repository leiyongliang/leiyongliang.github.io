class MapWrapper {
    constructor(arg) {
        this.map = new BMap.Map(arg.container)
        this.map.enableScrollWheelZoom()

        if (arg.searchResultPanel && arg.suggest) {
            this.searchResultPanel = document.getElementById(arg.searchResultPanel)
            this.addSuggest(arg.suggest)
        }
    }

    // 定位
    locate() {
        let city = new BMap.LocalCity()
        city.get((result) => {
            let cityName = result.name ? result.name : '深圳'
            this.map.setCenter(cityName)
            this.initMap(cityName)
        })
    }

    // 初始化地图
    initMap(city) {
        // 设置城市和地图级别
        this.map.centerAndZoom(city)

        // 城市列表控件
        let size = new BMap.Size(10, 20)
        this.map.addControl(new BMap.CityListControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: size
        }))

        // 添加带有定位的导航控件
        let navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        })
        this.map.addControl(navigationControl)

        // 添加定位控件
        let geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", (e) => {
            // 定位成功事件
            // var address = '';
            // address += e.addressComponent.province;
            // address += e.addressComponent.city;
            // address += e.addressComponent.district;
            // address += e.addressComponent.street;
            // address += e.addressComponent.streetNumber;
            // alert("当前定位地址为：" + address);
        })
        geolocationControl.addEventListener("locationError", (e) => {
            // 定位失败事件
            // alert(e.message);
        })
        this.map.addControl(geolocationControl)
    }

    // 关键字提示输入
    addSuggest(suggestId) {
        // 建立一个自动完成的对象
        let ac = new BMap.Autocomplete({
            input: suggestId,
            location: this.map
        })

        // 鼠标点击下拉列表后的事件
        ac.addEventListener('onconfirm', (e) => {
            let value = e.item.value
            let addr = value.province + value.city + value.district + value.street + value.business
            this.setPlace(addr)
        })
    }

    setPlace(addr) {
        this.searchResultPanel.innerHTML = ''

        // 清除地图上所有覆盖物
        this.map.clearOverlays()

        // 智能搜索
        let local = new BMap.LocalSearch(this.map, {
            onSearchComplete: (results) => {
                // 获取第一个智能搜索的结果
                let r = local.getResults().getPoi(0)
                this.addMarkerInfo(r.title + '，' + r.address, r.point)

                if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                    for (let i = 0; i < results.getCurrentNumPois(); i++) {
                        let r = results.getPoi(i)
                        let button = document.createElement('button')
                        button.textContent = r.title + '，' + r.address
                        button.type = 'button'
                        button.dataset.address = r.address + ' ' + r.title
                        button.dataset.url = r.url
                        button.dataset.city = r.city
                        button.dataset.point = JSON.stringify(r.point)
                        button.onclick = () => {
                            this.map.clearOverlays()
                            this.map.setCenter(r.point)
                            this.addMarkerInfo(r.title + '，' + r.address, r.point)
                        }

                        this.searchResultPanel.appendChild(button)
                    }
                }
            }
        })
        local.search(addr)
    }

    // 添加标注信息
    addMarkerInfo(address, point) {
        this.address = address
        this.point = point
        this.map.centerAndZoom(point, 18)

        // 添加标注
        this.map.addOverlay(new BMap.Marker(point))

        // // 添加信息窗口
        // let infoWindow = new BMap.InfoWindow(address); // 创建信息窗口对象
        // this.map.openInfoWindow(infoWindow, point); //开启信息窗口

        // 添加文字标签
        let opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new BMap.Size(20, -30) //设置文本偏移量
        }
        let label = new BMap.Label(address, opts); // 创建文本标注对象
        label.setStyle({
            color: "red",
            fontSize: "12px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "微软雅黑"
        });
        this.map.addOverlay(label);
    }

    getInfo() {
        if (this.point) {
            return {
                address: this.address,
                point: this.point,
                zoom: this.map.getZoom()
            }
        }
        return null
    }

    setInfo(info) {
        if (info) {
            this.map.clearOverlays()
            this.map.centerAndZoom(info.point, info.zoom)
            this.addMarkerInfo(info.address, info.point)
            this.map.setZoom(info.zoom)
        }
    }
}