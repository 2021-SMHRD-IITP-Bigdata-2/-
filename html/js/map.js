
// 위치 표기
var locations = [
    ['동원 게장 백반', 35.1491293, 126.9424985],
    ['광주 두꺼비 게장 백반', 35.1639897, 126.9024887],
    ['민들레', 35.1499714, 126.8533361],
    ['백년미가 유촌점', 35.1654719, 126.8529967]
]

// body tag가 불러와진 후 로딩하는 함수
window.onload = function initMap() {
    // 광주 경도 위도 -> 지도가 뜨는 위치
    const gwangju = { lat: 35.1595454 ,lng: 126.8526012};
    var map = new google.maps.Map(document.querySelector('.map'), {
        zoom: 14,
        center: gwangju
    });

    // 아이콘 이미지 변경
    const icon =  {
        url : '../img/Fin.png',
        size : new google.maps.Size(40,40),
        origin : new google.maps.Point(0,0),
        anchor : new google.maps.Point(20,40),
        scaledSize : new google.maps.Size(40,40),
    };
    
    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            icon : icon,
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}