window.onload = function() {
  //We instantiate our model
  const model = new DinnerModel();
  const homeView = new HomeView(document.getElementById("body"));
  const searchView = new SearchView(document.getElementById("body"), model);
  const bannerView = new Banner(document.getElementById("body"));
  const dishView = new DishView(document.getElementById("body"));
  const dinnerOverviewView = new DinnerOverviewView(
    document.getElementById("body")
  );
  bannerView.render(); // render first to render banner on top

  // dishView.render();
  dinnerOverviewView.render();

  // searchView.render();

  const overviewView = new OverviewView(
    document.getElementById("overview"),
    model
  );
  overviewView.render();

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
