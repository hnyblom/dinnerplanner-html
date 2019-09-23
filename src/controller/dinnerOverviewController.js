class DinnerOverviewController {
    constructor(view, model, app) {
        this.view = view;
        this.model = model;
        this.app = app;
        // TODO lab 3
    }

    renderView() {
        this.model.removeObserver(this.app.overviewView);
        this.model.removeObserver(this.app.searchView);
        this.model.addObserver(this.view);

        this.view.render();
        document.getElementById("backSearchBtn").addEventListener('click',()=>{
            this.app.show("searchView");
        });
        document.getElementById("printBtn").addEventListener('click',()=>{
            this.app.show("printView");
        });
    }

    // TODO Lab 3
}
