class SearchController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
  }

  renderView() {
    this.model.getAllDishes().then(dishes => this.setListeners(dishes));
  }

  setListeners(dishes) {
    this.view.render(dishes);
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
      this.model.setSearchCategory(category);
      this.model.setSearchInput(searchText);

      this.model.getAllDishes(searchText, categoryLow).then(filteredDishes => {
        this.setListeners(filteredDishes);
      });
    });
  }
}
