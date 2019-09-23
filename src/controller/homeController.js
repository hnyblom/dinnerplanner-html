class HomeController {
    constructor(view, model, app) {
        this.app = app;
        this.view = view;
        this.model = model;
        // TODO lab 3
    }

    renderView() {
      this.view.render();
      document.getElementById("startBtn").addEventListener('click',() => {this.changeView()});
        // TODO lab 3
    }
   
    changeView(){
        this.app.show("searchView");
    }
    // TODO Lab 3
}
