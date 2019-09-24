class DinnerPrintoutController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
  }

  renderView() {
    this.view.render();
    document.getElementById("backSearchBtn").addEventListener("click", () => {
      this.app.show("searchView");
    });
  }

  update() {
    this.renderView();
  }
}
