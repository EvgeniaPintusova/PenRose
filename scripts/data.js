function Model(url) {
  this.fetchData = () => {
    return fetch(url)
      .then((response) => response.json())
      .catch(() => console.log("Error"));
  };

  this.filteredArr = (arr, field, filter) => {
    return arr.filter((el) => el[field] < filter);
  };
}

function SliderView() {
  let sliderItemsContainer = document.getElementById("slider_items_container");
  let sliderItemTpl = document.getElementById("slider_tmpl");

  this.displaySlider = (items) => {
    sliderItemsContainer.innerHTML = '<li class="sim_slider_zero_screen"></li>';
    const fragment = new DocumentFragment();
    for (let i = 0; i < items.length; i++) {
      const el = sliderItemTpl.content.cloneNode(true);
      el.querySelector(".sim_slider_paragraph").textContent = items[i].name;
      el.querySelector(".sim_slider_author").textContent = items[i].price;
      fragment.appendChild(el);
    }
    sliderItemsContainer.appendChild(fragment);
  };
}

let url =
  "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
let model = new Model(url);
let sliderView = new SliderView();

let arr = model.fetchData().then((array) => {
  sliderView.displaySlider(model.filteredArr(array, "price", 5));
});