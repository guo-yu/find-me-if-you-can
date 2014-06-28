var mapObj, marker;

window.document.onload = function() {
  mapInit();
}

//初始化地图对象，加载地图
function mapInit() {
  mapObj = new AMap.Map("map", {
    //二维地图显示视口
    view: new AMap.View2D({
      center: new AMap.LngLat(116.397428, 39.90923), //地图中心点
      zoom: 13 //地图显示的缩放级别
    })
  });
  //添加点标记，并使用自己的icon
  addMarker();
}

//在地图上添加点标记函数
function addMarker() {
  marker = new AMap.Marker({
    icon: new AMap.Icon({ //复杂图标
      size: new AMap.Size(28, 37), //图标大小
      image: "http://webapi.amap.com/images/custom_a_j.png", //大图地址
      imageOffset: new AMap.Pixel(-28, 0) //相对于大图的取图位置
    }),
    position: new AMap.LngLat(116.405467, 39.907761)
  });
  marker.setMap(mapObj); //在地图上添加点
}