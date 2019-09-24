class OverviewController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
    // TODO lab 3
  }
  observers() {
    this.model.addObserver(this);
  }
  renderView() {
    this.view.render();
    document.getElementById("confirmButton").addEventListener("click", () => {
      this.app.show("dinnerOverviewView");
    });
  }

  update(payload) {
    this.renderView();
  }
}
