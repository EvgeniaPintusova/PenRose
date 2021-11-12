$(document).ready(() => {
  $(".header_burger").click(() => {
    $(".header_burger, .header_menu").toggleClass("active");
    $("body").toggleClass("lock");
  });
});
