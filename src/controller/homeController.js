class HomeController {
  constructor(view, model, app) {
    this.app = app;
    this.view = view;
    this.model = model;
  }

  renderView() {
    this.view.render();
    document.getElementById("startBtn").addEventListener("click", () => {
      this.changeView();
    });
  }

  changeView() {
    this.app.show("searchView");
  }

  update(payload) {
    this.startBtn = $(this.container).find("#startBtn");
  }
}
