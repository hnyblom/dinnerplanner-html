const IMAGE_BASE_URL = "https://spoonacular.com/recipeImages/";
class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }
  render() {
    this.model.getAllDishes().then(dishes => {
      var content = `
        <div class="container-fluid">
          <div class="row">
            <div id="overview" class="col-md-4 border"></div>
            <div class="col-md-8">
            <p class="text-left p-max-width mt-2 h2">Find a dish</p>
              
              <div class="space-sm"></div>
              <div class="row">
                <div class="col">
                  <input class="form-control" type="text" placeholder="Enter key words">
                </div>
                <div class="col">
                  <select class="form-control">
                    <option>All</option>
                    <option>Apetizer</option>
                    <option>Main course</option>
                    <option>Side dish</option>
                    <option>Dessert</option>
                  </select>
                </div>
                <div class="col">
                  <button id="searchButton" class="btn btn-outline-secondary btn-sm" type="button">Search</button>
                </div>
              </div>
              <div class="card-columns">
                ${dishes.map(
                  dish => `
                      <div class="card">
                        <img src="${IMAGE_BASE_URL +
                          dish.image}" class="card-img-top" alt="${dish.title}">
                        <div class="card-body">
                        ${dish.title}
                        </div>
                      </div>
                    `
                )}
              </div>
              
                
              
          </div>
        </div>
      `;
      this.container.innerHTML += content;
      this.afterRender();
    });
  }

  afterRender() {
    console.log("HELOO");
    const overviewView = new OverviewView(
      document.getElementById("overview"),
      this.model
    );
    overviewView.render();
  }
}

/**
 * <div class="space"></div>
          <nav id="navbar-search" class="navbar navbar-light bg-light">
            <a class="navbar-brand bold" href="#">Dishes</a>
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link" href="#appetizer">Appetizers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#main">Main Courses</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#side">Side Dishes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#dessert">Desserts</a>
              </li>
            </ul>
          </nav>
          <div data-spy="scroll" data-target="#navbar-search" data-offset="0">
                <h5 id="appetizer">Appetizers</h5>
                <div class="row space">
                  <div class="col">
                    <img src="images/bakedbrie.jpg" class="img-fluid border shadow" alt="Baked Brie">
                  </div>
                </div>

                <h5 id="main">Main dishes</h5>
                <div class="row space">
                  <div class="col">
                    <img src="images/meatballs.jpg" class="img-fluid border shadow" alt="Meatballs">
                  </div>
                  <div class="col">
                    <img src="images/pizza.jpeg" class="img-fluid border shadow" alt="Pizza">
                  </div>
                  <div class="col">
                    <img src="images/chicken.jpg" class="img-fluid border shadow" alt="Chicken">
                  </div>
                </div>

                <h5 id="side">Side dishes</h5>
                <div class="row space">
                  <div class="col">
                    <img src="images/toast.jpg" class="img-fluid border shadow" alt="Toast">
                  </div>
                </div>

                <h5 id="dessert">Desserts</h5>
                <div class="row space">
                  <div class="col">
                    <img src="images/icecream.jpg" class="img-fluid border shadow" alt="Icecream">
                  </div>
                </div>
              </div>
              </div>
 *
 */
