$(document).ready(function () {
  $("[data-toggle='tooltip']").tooltip();
});

function showTooltip(target) {
  $(target).tooltip('show');
  setTimeout(function () {
    $(target).tooltip('hide');
  }, 2000)
}