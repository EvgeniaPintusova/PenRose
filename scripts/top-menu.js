topMenuAction = () => {
  let arrow = document.getElementById("downMenu");
  let submenu = document.getElementById("submenu");
  let target = "";
  arrow.addEventListener("click", (e) => {
    target = e.target;
    arrow.classList.toggle("submenu_arrow_scale");
    submenu.classList.toggle("submenu_active");
  });
  document.addEventListener("click", (e) => {
    if (
      target !== e.target &&
      arrow.classList.contains("submenu_arrow_scale")
    ) {
      arrow.classList.remove("submenu_arrow_scale");
      submenu.classList.remove("submenu_active");
    }
  });
};

topMenuAction();
