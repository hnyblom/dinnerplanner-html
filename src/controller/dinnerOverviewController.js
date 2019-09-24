class DinnerOverviewController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
    // TODO lab 3
  }

  renderView() {
    this.view.render();
    document.getElementById("backSearchBtn").addEventListener("click", () => {
      this.app.show("searchView");
    });
    document.getElementById("printBtn").addEventListener("click", () => {
      this.app.show("printView");
    });
  }

  // TODO Lab 3
}
