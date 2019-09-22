class Banner {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.overviewView = new OverviewView(
      document.getElementById("overview"),
      model
    );
  }
  render() {
    const content = `
      <div id="header" class="header d-flex align-items-center justify-content-center">
        <h1>DINNER PLANNER</h1>        
      </div>
    `;
    this.container.innerHTML += content;
    this.afterRender();
  }

  afterRender() {}
}
