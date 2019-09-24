const IMAGE_BASE_URL = "https://spoonacular.com/recipeImages/";

window.onload = function() {
  const pageContent = document.getElementById("page-content");
  const banner = document.getElementById("banner");
  const overview = document.getElementById("overview");
  const rightSide = document.getElementById("rightSide");
  const model = new DinnerModel();

  this.bannerView = new Banner(banner, model);
  this.bannerController = new BannerController(bannerView, model, this);
  this.overviewView = new OverviewView(overview, model);
  this.overviewController = new OverviewController(overviewView, model, this);
  this.homeView = new HomeView(pageContent, model);
  this.homeController = new HomeController(homeView, model, this);
  this.searchView = new SearchView(rightSide, model);
  this.searchController = new SearchController(searchView, model, this);
  this.dishView = new DishView(rightSide, model);
  this.dishController = new DishController(dishView, model, this);
  this.dinnerPrintoutView = new DinnerPrintoutView(pageContent, model);
  this.dinnerPrintoutController = new DinnerPrintoutController(
    dinnerPrintoutView,
    model,
    this
  );
  this.dinnerOverviewView = new DinnerOverviewView(pageContent, model);
  this.dinnerOverviewController = new DinnerOverviewController(
    dinnerOverviewView,
    model,
    this
  );

  this.initialize = function initialize() {
    this.bannerController.renderView();
    this.show("homeView");
  };
  this.watch = function watch(controller) {
    controller.watch();
  };
  this.show = function show(view, arg, controller) {
    switch (view) {
      case "homeView":
        this.homeController.renderView();
        break;
      case "searchView":
        pageContent.innerHTML = "";
        this.overviewController.renderView();
        this.searchController.renderView();
        break;
      case "dishView":
        this.dishController.renderView(arg);
        break;
      case "dinnerOverviewView":
        overview.innerHTML = "";
        rightSide.innerHTML = "";
        this.dinnerOverviewController.renderView();
        break;
      case "printView":
        this.dinnerPrintoutController.renderView();
        break;
    }
  };

  this.initialize();

  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with.
   */
};
