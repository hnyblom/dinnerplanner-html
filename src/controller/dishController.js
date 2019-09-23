class DishController {
    constructor(view, model, app) {
        this.view = view;
        this.model = model;
        this.app = app;
        // TODO lab 3
    }

    renderView(dishID, observer) {
        this.model.removeObserver(observer);
        this.model.addObserver(this.view);
        this.view.render(dishID)
        /* .then(
            document.getElementById("backSearchBtn").addEventListener('click',()=>{
                this.app.show("searchView")
            })); */
         
        
       
      
    }

    // TODO Lab 3
}
