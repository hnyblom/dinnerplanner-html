$("#dropdownButton").on("show.bs.dropdown", function() {
  document.getElementById("dropdownText").text = document
    .getElementById("dropdownButton")
    .val();
});
