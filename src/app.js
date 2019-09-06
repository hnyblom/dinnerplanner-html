window.onload = function () {
  //We instantiate our model
  const model = new DinnerModel();
  let homeView = new HomeView(document.getElementById("body"));
  let searchView = new SearchView(document.getElementById("body"), model);
  //homeView.render();
  //homeView.startBtn.onclick=(overviewView.render());
  searchView.render();
  let overviewView = new OverviewView(document.getElementById("overview"), model);
  overviewView.render();
  
  //Test
  //model.test();

  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * query for elements in the whole document.
   * In other places you should limit the search only to the children
   * of the specific view you're working with (see exampleView.js).
   */

};
