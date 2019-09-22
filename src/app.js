const IMAGE_BASE_URL = "https://spoonacular.com/recipeImages/";

window.onload = function() {  
  const pageContent = document.getElementById("page-content");
  const model = new DinnerModel();
  const bannerView = new Banner(pageContent);
  const bannerController = new BannerController(bannerView, model);
  this.bannerController = bannerController;

  this.homeController = new HomeController(new HomeView(pageContent), model, this);
  this.searchController = new SearchController(new SearchView(pageContent, model), model, this);
  this.dishController = new DishController(new DishView(pageContent, model), model, this);
  this.dinnerPrintoutController = new DinnerPrintoutController(new DinnerPrintoutView(pageContent, model), model, this);
  this.dinnerOverviewController = new DinnerOverviewController(new DinnerOverviewView(pageContent, model), model, this);

  this.initialize = 
  function initialize() {
    this.show("homeView");
  }
  this.watch = 
  function watch(controller) {
    controller.watch()
  }
  this.show = 
  function show(view) {
    switch(view) {
      case "homeView":
        this.homeController.renderView();
        this.watch(this.homeController);
      break;
      case "searchView":
        this.document.getElementById("home").hidden = true;
        this.searchController.renderView();
        this.watch(this.searchController);
      break;
    }
  }
  
    
  
  this.initialize();


  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with.
   */
};
