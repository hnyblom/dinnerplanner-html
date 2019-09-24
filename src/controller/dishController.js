class DishController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
  }

  renderView(dishID) {
    this.view.render(dishID).then(dish => {
      if (document.getElementById("backSearchBtn")) {
        document
          .getElementById("backSearchBtn")
          .addEventListener("click", () => {
            this.app.show("searchView");
          });
      }
    });
  }
}
