class DishController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
  }

  observers(observer) {
    this.model.removeObserver(observer);
    this.model.addObserver(this);
  }

  renderView(dishID) {
    this.view.render(dishID).then(dish => {
      document.getElementById("backSearchBtn").addEventListener("click", () => {
        this.app.show("searchView");
      });
    });
  }
  update() {
    this.renderView(this.view.id);
  }
}
