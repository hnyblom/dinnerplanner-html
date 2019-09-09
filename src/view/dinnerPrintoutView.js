class DinnerPrintoutView {
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
      <div class="col">
        <hr />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-3">
            <img src="images/bakedbrie.jpg" class="img-fluid shadow" alt="">
          </div>
          <div class="col-4">
            <h3>Lasange</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
            magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
            arcu. Maecenas a efficitur leo.
            </p>
          </div>
          <div class="col-4">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
            magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
            arcu. Maecenas a efficitur leo.
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
            magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
            arcu. Maecenas a efficitur leo.
            </p>
          </div>
        </div>
      </div>
    `;
    this.container.innerHTML += content;
    this.afterRender();
  }

  afterRender() {}
}
