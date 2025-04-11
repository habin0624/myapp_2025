
$(document).ready(function () {
  $(".map_meun > div").click(function () {
    // 모든 버튼에서 map_on 클래스 제거
    $(".map_meun > div").removeClass("map_on");
    $(".map_meun > div > div").removeClass("map_on");

    // 클릭한 요소에 map_on 클래스 추가
    $(this).addClass("map_on");
    $(this).children("div").addClass("map_on");
  });
});
