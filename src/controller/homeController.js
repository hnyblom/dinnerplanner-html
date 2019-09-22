class HomeController {
    constructor(view, model, app) {
        this.app = app;
        this.view = view;
        this.model = model;
        // TODO lab 3
    }

    renderView() {
      this.view.render();
        // TODO lab 3
    }
   
    watch(){
        //this.view.startBtn.onclick = this.app.show("searchView");
        //this.changeView();
        this.view.startBtn.addEventListener("click", this.changeView());
    }
    changeView(){
        this.app.show("searchView");
    }
    // TODO Lab 3
}
