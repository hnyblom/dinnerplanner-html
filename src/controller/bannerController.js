class BannerController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
  }

  renderView() {
    this.view.render();
  }
}
