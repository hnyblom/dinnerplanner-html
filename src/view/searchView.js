class SearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }
  render(dishes) {
    const searchInputVal = this.model.getSearchInput();
    const searchInputCategory = this.model.getSearchCategory();
    console.log(searchInputCategory);
    let content = `
          
              <div class="row space">
                <div class="col"><p class="text-left p-max-width mt-2 h2">Find a dish</p></div>
                <div class="col">
                  <input id="searchInput" class="form-control" type="text" placeholder="Enter Keyword" value="${searchInputVal}">
                </div>
                <div class="col">
                  <select id="searchCat" class="form-control" value="${searchInputCategory}">
                    ${[
                      "All",
                      "Appetizer",
                      "Main course",
                      "Side dish",
                      "Dessert"
                    ].map(
                      option =>
                        `
                        <option ${
                          option === searchInputCategory ? "selected" : null
                        }>${option}</option>
                      `
                    )}
                    
                  </select>
                </div>
                <div class="col">
                  <button id="searchBtn" class="btn btn-outline-secondary btn-sm" type="button">Search</button>
                </div>
              </div>
              <div class="card-columns">
                ${dishes.map(
                  dish => `
                      <button id="${dish.id}" class="card">
                        <img src="${IMAGE_BASE_URL +
                          dish.image}" class="card-img-top" alt="${dish.title}">
                        <div class="card-body">
                          ${dish.title}
                        </div>
                      </button>
                    `
                )}
              </div>           
      `;
    this.container.innerHTML = content;
    // this.afterRender(dishes);
  }

  afterRender(dishes) {}
}
