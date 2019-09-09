window.onload = function() {
  //We instantiate our model
  const body = document.getElementById("body");
  const model = new DinnerModel();
  const bannerView = new Banner(body);

  const homeView = new HomeView(body);
  const searchView = new SearchView(body, model);
  const dishView = new DishView(body);
  const dinnerPrintoutView = new DinnerPrintoutView(
    document.getElementById("body")
  );
  const dinnerOverviewView = new DinnerOverviewView(
    document.getElementById("body")
  );

  // render
  bannerView.render(); // render first to render banner on top

  searchView.render();
  // dishView.render();
  // dinnerOverviewView.render();
  // dinnerPrintoutView.render();

  // const overviewView = new OverviewView(
  //   document.getElementById("overview"),
  //   model
  // );
  // overviewView.render();

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
