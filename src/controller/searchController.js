class SearchController {
    constructor(view, model, app) {
        this.view = view;
        this.model = model;
        this.app = app;
    }

    renderView() {
        this.model.addObserver(this.view);
        Promise.resolve(this.model.dishes).then(dishes => {
            this.loop(dishes);
        })
    }
    loop(dishes){
        this.view.render(dishes);
            dishes.forEach(dish => {
                document.getElementById(dish.id.toString()).addEventListener('click', ()=>{
                    this.app.show("dishView", dish.id, this.view)});
                });
            document.getElementById("searchBtn").addEventListener('click', ()=>{
                var searchText = document.getElementById("searchInput").value.toLowerCase();
                var category = document.getElementById("searchCat").value.toLowerCase();
                if(category=="all"){category="";}

                this.model.getAllDishes(searchText,category).then(filteredDishes=>{
                    this.model.dishes = filteredDishes;
                    this.loop(this.model.dishes);
                })
                
                

            });
    }
}
