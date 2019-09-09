const IMAGE_BASE_URL = "https://spoonacular.com/recipeImages/";

window.onload = function () {
  //We instantiate our model
  const pageContent = document.querySelector("#page-content");
  const model = new DinnerModel();
  const bannerView = new Banner(pageContent);

  const homeView = new HomeView(pageContent);
  const searchView = new SearchView(pageContent, model);
  const dishView = new DishView(pageContent, model);
  const dinnerPrintoutView = new DinnerPrintoutView(pageContent, model);
  const dinnerOverviewView = new DinnerOverviewView(pageContent, model);

  // render
  bannerView.render(); // render first to render banner on top

  searchView.render();
  // dishView.render(592479);
  // dinnerOverviewView.render();
  // dinnerPrintoutView.render();

  // homeView.render();
  //homeView.startBtn.onclick=(overviewView.render());

  //Test
  //model.test();

  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with (see exampleView.js).
   */
};
