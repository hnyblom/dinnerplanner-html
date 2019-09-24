class DishView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.id = 0;
    this.model.addObserver(this);
  }
  render(dishID) {
    const numOfGuests = this.model.getNumberOfGuests();
    this.id = dishID;
    this.model.getDish(dishID).then(dish => {
      const content = `
            <div class="row">
              <div class="col-1"></div>
              <div class="col p-3">
                <h2 class="pt-2">${dish.title}</h2>
                <img src="${dish.image}" class="img-fluid border shadow">
                <p class="pt-3">
                ${dish.instructions}
                </p>
                <button id="backSearchBtn" class="btn btn-outline-secondary">
                Back to Search
                </button>
              </div>
              <div class="col p-3">
                <div class="border ingredients-banner p-2">
                <h4 id="dish-view-num-of-guests">Ingredients for ${numOfGuests}</h4>
                  <hr class="my-4"/>
                  <div>
                    <table class="table table-borderless" id="dish-view-table">
                      <tbody id="dish-view-table-tbody">
                      ${dish.extendedIngredients
                        .map(
                          ingredient => `
                                <tr>
                                  <th scope="row">${ingredient.amount *
                                    numOfGuests} ${ingredient.unit}</th>
                                  <th>${ingredient.name}</th>
                                  <th>SEK</th>
                                  <th>${
                                    ingredient.price === undefined
                                      ? "N/A"
                                      : ingredient.price
                                  }</th>
                                </tr>
                        `
                        )
                        .join("")}
                      </tbody>
                    </table>
                    <hr/>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <th><button id="addMenuBtn" class="btn btn-outline-secondary">Add to menu</button></th>
                          <th></th>
                          <th>SEK</th>
                          <th id="dish-view-total-price">${dish.pricePerServing *
                            numOfGuests}</th>
                        </tr>
                      </tbody>  
                      <tr>
                    </table>
                    
                  </div>
                </div>
              </div>
            </div>
      `;
      this.container.innerHTML = content;
      this.afterRender(dish);
    });
    this.id = dishID;
    return this.model.getDish(dishID);
  }

  afterRender(dish) {
    document.getElementById("addMenuBtn").addEventListener("click", () => {
      this.model.addDishToMenu(dish);
    });
  }

  update(payload) {
    const numOfGuests = this.model.getNumberOfGuests();
    if (document.getElementById("dish-view-num-of-guests")) {
      document.getElementById(
        "dish-view-num-of-guests"
      ).innerText = `Ingredients for ${numOfGuests}`;
      this.model.getDish(this.id).then(dish => {
        document.getElementById("dish-view-table-tbody").innerHTML = `
          ${dish.extendedIngredients
            .map(
              ingredient => `
              <tr>
              <th scope="row">${ingredient.amount * numOfGuests} ${
                ingredient.unit
              }</th>
                <th>${ingredient.name}</th>
                <th>SEK</th>
                <th>${
                  ingredient.price === undefined ? "N/A" : ingredient.price
                }</th>
                </tr>
                `
            )
            .join("")}
                `;
        document.getElementById("dish-view-total-price").innerText =
          numOfGuests * dish.pricePerServing;
      });
    }
  }
}
