class SearchController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
  }
  observers() {
    this.model.addObserver(this);
  }
  renderView() {
    Promise.resolve(this.model.dishes).then(dishes => {
      this.loop(dishes, "Enter Keyword", "All");
    });
  }

  loop(dishes, placeholder, dropdown) {
    this.view.render(dishes);
    document
      .getElementById("searchInput")
      .setAttribute("placeholder", placeholder);
    document.getElementById("searchCat").value = dropdown;
    dishes.forEach(dish => {
      document
        .getElementById(dish.id.toString())
        .addEventListener("click", () => {
          this.app.show("dishView", dish.id, this);
        });
    });
    document.getElementById("searchBtn").addEventListener("click", () => {
      const searchText = document
        .getElementById("searchInput")
        .value.toLowerCase();
      const category = document.getElementById("searchCat").value;
      const categoryLow = category.toLowerCase();
      if (category == "all") {
        category = "";
      }

      this.model.getAllDishes(searchText, categoryLow).then(filteredDishes => {
        this.model.dishes = filteredDishes;
        this.loop(this.model.dishes, searchText, category);
      });
    });
  }

  update(payload) {
    this.renderView();
  }
}
