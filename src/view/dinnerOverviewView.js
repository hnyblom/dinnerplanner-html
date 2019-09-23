class DinnerOverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }
  render() {
    const menu = this.model.menu;
    const totalPrice = this.model.getTotalMenuPrice();
    const numOfGuests = this.model.getNumberOfGuests();
    const content = `
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="m-3">
              <h2 class="ml-2 float-left">Dinner for ${numOfGuests} people</h2>
              <button id="backSearchBtn" class="btn btn-outline-secondary float-right mr-2">
                Go back and edit dinner
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <hr class="my-2"/>
            <div class="p-5 mx-auto row">
              ${menu
                .map(
                  dish => `
                  <div class="col-md-3">
                    <div class="card mb-2" style="width: 10rem; height:100%;">
                      <img src="${dish.image}" class="card-img-top" alt="">
                      <div class="card-body">
                        <p class="card-text">${dish.title}</p>
                      </div>
                    </div>
                    <p>${dish.pricePerServing * numOfGuests}</p>
                  </div>
                
                `
                )
                .join("")}
              
              <div class="col-md-3 border-left">
                <b>Total</b>
                <p>${totalPrice}</p>
              </div >
            </div >
          </div >
        </div >
      <div class="row">
        <div class="col text-center">
          <hr />
          <button id="printBtn" class="btn btn-outline-secondary">Print Full Recipe</button>
        </div>
      </div>
      </div >
      `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {
    this.model.addObserver(this);
  }
}
