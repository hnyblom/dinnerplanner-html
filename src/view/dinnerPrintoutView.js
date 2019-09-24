class DinnerPrintoutView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
  }
  render() {
    const nrGuests = this.model.getNumberOfGuests();
    const menu = this.model.getFullMenu();
    const content = `
    
      <div class="row space">
        <div class="col">
          <h2 class="ml-2 float-left">Dinner for ${nrGuests}</h2>
        </div>
        <div class="col">
          <button id="backSearchBtn" class="btn btn-outline-secondary float-right mr-2 btn-right">
            Go back and edit dinner
          </button>
        </div>
      </div>
      <div class="row space">
        <div class="container">
          
            ${menu
              .map(
                dish =>
                  `
                <div class="row">
                  <div class="col-3">
                    <img src="${dish.image}" class="img-fluid shadow" alt="${
                    dish.title
                  }">
                  </div><div class="col-4">
                    <h3>${dish.title}</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
                    magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
                    arcu. Maecenas a efficitur leo.
                    </p>
                  </div>
                  <div class="col-5">
                    <p>
                    ${dish.instructions}
                    </p>
                  </div>
                </div>
                <hr/>
            `
              )
              .join("")}
            
        </div>
      </div>
    `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {}
}
