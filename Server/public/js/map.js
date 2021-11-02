// body tag가 불러와진 후 로딩하는 함수
// window.onload
$(document).ready(function(){
    initMap();
});

function initMap() {
    // 광주 경도 위도 -> 지도가 뜨는 위치
    var gwangju = { lat: 35.1595454 ,lng: 126.8526012};
    var map = new google.maps.Map(document.querySelector('.map'), {
        zoom: 14,
        center: gwangju
    });
    
    // 마커 표시하기
    new google.maps.Marker({
        postion = gwangju,
        map,
        title: "Hello World!"
    });
}


