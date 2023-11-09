import * as Cesium from 'cesium';
/**
        * 加载不同类型地图服务的底图
        @ id 图层的id标识
        @ servertype 地图服务类型(0代表ArcGisMapServerImageryProvider;1代表createOpenStreetMapImageryProvider;
        2代表WebMapTileServiceImageryProvider;3代表createTileMapServiceImageryProvider;
        4 代表UrlTemplateImageryProvider;5 代表WebMapServiceImageryProviderr(WMS))
        @ url 地图服务的url
        @ layerid 地图图层的id
        @ proxyUrl 代理请求url
        @ tilingScheme 地图坐标系,WebMercatorTilingScheme(摩卡托投影坐标系3857);GeographicTilingScheme(世界地理坐标系4326)
        */
function loadServerTypeMap(id, servertype, url, layerid, proxyUrl, IsWebMercatorTilingScheme) {
    var layers = cesium.cesiumViewer.scene.imageryLayers;
    var layer = null;
    switch (servertype) {
        case 0://ArcGisMapServerImageryProvider
            var curlayer = layers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                proxy: new Cesium.DefaultProxy(proxyUrl),
                url: url,
                layers: layerid,
                enablePickFeatures: false
            }));
            layer = { layer: curlayer, id: id };
            break;
        case 1://OpenStreetMapImageryProvider
            var curlayer = layers.addImageryProvider(Cesium.createOpenStreetMapImageryProvider({
                url: url
            }));
            layer = { layer: curlayer, id: id };
            break;
        case 2://WebMapTileServiceImageryProvider
            break;
        case 3://createTileMapServiceImageryProvider
            break;
        case 4://UrlTemplateImageryProvider
            break;
        case 5://WebMapServiceImageryProvider
            var m_tilingScheme = new Cesium.GeographicTilingScheme();
            if (IsWebMercatorTilingScheme) {
                m_tilingScheme = new Cesium.WebMercatorTilingScheme();
            }
            var curlayer = layers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
                url: url,
                layers: layerid,
                //tilingScheme:tilingScheme,
                tilingScheme: m_tilingScheme,
                parameters: {
                    service: "WMS",
                    version: "1.1.1",
                    request: "GetMap",
                    transparent: true,
                    format: 'image/png'
                },
                show: false
            }));
            layer = { layer: curlayer, id: id };
            break;
        case 6://kml,kmz
            var options = {
                camera: cesium.cesiumViewer.scene.camera,
                canvas: cesium.cesiumViewer.scene.canvas
            };
            cesium.cesiumViewer.dataSources.add(Cesium.KmlDataSource.load(url, options)).then(function (dataSource) {
                cesium.cesiumViewer.camera.flyHome();
            });
            break;
        case 7://geoJson
            /*var options = {
                camera : cesium.cesiumViewer.scene.camera,
                canvas : cesium.cesiumViewer.scene.canvas
            };
            cesium.cesiumViewer.dataSources.add(Cesium.KmlDataSource.load(url, options)).then(function(dataSource){
                cesium.cesiumViewer.camera.flyHome();
            });*/
            /*var dataSource = Cesium.GeoJsonDataSource.load('../../../../Apps/SampleData/simplestyles.geojson');
            viewer.dataSources.add(dataSource);
            viewer.zoomTo(dataSource);*/
            cesium.cesiumViewer.dataSources.add(Cesium.GeoJsonDataSource.load(url)).then(function (dataSource) {
                cesium.cesiumViewer.zoomTo(dataSource);
            });
            break;
        default://ArcGisMapServerImageryProvider
            var curlayer = layers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
                proxy: new Cesium.DefaultProxy(proxyUrl),
                url: url,
                layers: layerid,
                enablePickFeatures: false
            }));
            layer = { layer: curlayer, id: id };
            break;
    }
    if (layer)
        cesium.layer3DList.push(layer);
}