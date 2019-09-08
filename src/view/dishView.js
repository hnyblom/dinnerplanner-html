class DishView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }
  render() {
    const content = `
      <div class="row">
        <div id="overview" class="col-md-4 border"></div>
        <div class="col-md-7">
          <div class="row">
            <div class="col-1"></div>
            <div class="col p-3">
              <h2>Lasange</h2>
              <img src="images/pizza.jpeg" class="img-fluid border shadow" alt="Pizza">
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
              magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
              arcu. Maecenas a efficitur leo.
              </p>
              <button class="btn btn-primary">
              Back to Search
              </button>
            </div>
            <div class="col p-3">
              <div class="border ingredients-banner p-2">
                <h4>Ingredients for X people</h4>
                <hr class="my-4">
                <div>
                  <table class="table table-borderless">
          
                    <tbody>
                      <tr>
                        <th scope="row">2 tbsp</th>
                        <th>olive oil</th>
                        <th>SEK</th>
                        <th>2.0</th>
                      </tr>
                      <tr>
                        <th scope="row">2 tbsp</th>
                        <th>olive oil</th>
                        <th>SEK</th>
                        <th>2.0</th>
                      </tr>
                      <tr>
                        <th scope="row">2 tbsp</th>
                        <th>olive oil</th>
                        <th>SEK</th>
                        <th>2.0</th>
                        </tr>
                    </tbody>
                  </table>
                  <hr/>
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <th><button class="btn btn-primary">Add to menu</button></th>
                        <th></th>
                        <th>SEK</th>
                        <th>200</th>
                      </tr>
                    </tbody>  
                    <tr>
                  </table>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML += content;
    this.afterRender();
  }

  afterRender() {}
}
