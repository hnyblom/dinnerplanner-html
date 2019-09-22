class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }
  render() {
    this.model.getAllDishes().then(dishes => {
      console.log(dishes);
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
    const overviewView = new OverviewView(
      document.getElementById("overview"),
      this.model
    );
    overviewView.render();
  }

  update(payload) {
    // TODO lab3
  }
  watch(){

  }
}
