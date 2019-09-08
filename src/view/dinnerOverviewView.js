class DinnerOverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }
  render() {
    const content = `
      <div class="row">
        <div class="col">
          <div class="m-3">
            <h2 class="ml-2 float-left">Dinner for X people</h2>
            <button class="btn btn-success float-right mr-2">
              Go back and edit dinner
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <hr class="my-2"/>
          <div class="p-5 mx-auto row">
            <div class="col-md-3">
              <div class="card mb-2" style="width: 10rem;">
                <img src="images/bakedbrie.jpg" class="card-img-top" alt="">
                <div class="card-body">
                  <p class="card-text">Baked Brie</p>
                </div>
              </div>
              <p>34.0</p>
            </div>
            <div class="col-md-3">
              <div class="card mb-2" style="width: 10rem;">
                <img src="images/bakedbrie.jpg" class="card-img-top" alt="">
                <div class="card-body">
                  <p class="card-text">Baked Brie</p>
                </div>
              </div>
              <p>34.0</p>
            </div>
            <div class="col-md-3">
              <div class="card mb-2" style="width: 10rem;">
                <img src="images/bakedbrie.jpg" class="card-img-top" alt="">
                <div class="card-body">
                  <p class="card-text">Baked Brie</p>
                </div>
              </div>
              <p>34.0</p>
            </div>
            <div class="col-md-3 border-left">
              <p>price</p>
              <p>34.0</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <hr/>
          <button class="btn btn-success">Print Full Recipe</button>
        </div>
      </div>
    `;
    this.container.innerHTML += content;
    this.afterRender();
  }

  afterRender() {}
}
