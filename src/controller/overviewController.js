class OverviewController {
    constructor(view, model, app) {
        this.view = view;
        this.model = model;
        this.app = app;
        // TODO lab 3
    }

    renderView() {
      this.model.addObserver(this.view);
      this.view.render();
      document.getElementById("confirmButton").addEventListener('click',()=>{
          this.app.show("dinnerOverviewView")
      });
    }

    // TODO Lab 3
}
