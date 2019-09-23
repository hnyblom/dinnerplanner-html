class SearchController {
    constructor(view, model, app) {
        this.view = view;
        this.model = model;
        this.app = app;
        // TODO lab 3
    }

    renderView() {
      this.model.addObserver(this.view);
      this.view.render();
      this.model.dishes.then(dishes=>{dishes.forEach(dish => {
        document.getElementById(dish.id.toString()).addEventListener('click', ()=>{
            this.app.show("dishView", dish.id, this.view)})
        })});
      
    }
    watch() {
        
    }
    // TODO Lab 3
}
