class OverviewController {
  constructor(view, model, app) {
    this.view = view;
    this.model = model;
    this.app = app;
    // TODO lab 3
  }
  renderView() {
    this.view.render();
    let dropdownB1 = document.getElementById("sel1");
    let dropdownB2 = document.getElementById("sel2");
    let dropdownB3 = document.getElementById("sel3");
    let dropdownB4 = document.getElementById("sel4");
    let dropdownB5 = document.getElementById("sel5");
    dropdownB1.addEventListener("click", () => {
      this.changeGuests(1);
    });
    dropdownB2.addEventListener("click", () => {
      this.changeGuests(2);
    });
    dropdownB3.addEventListener("click", () => {
      this.changeGuests(3);
    });
    dropdownB4.addEventListener("click", () => {
      this.changeGuests(4);
    });
    dropdownB5.addEventListener("click", () => {
      this.changeGuests(5);
    });
    document.getElementById("confirmButton").addEventListener("click", () => {
      this.app.show("dinnerOverviewView");
    });
    this.updateListeners();
  }

  updateListeners() {
    this.model.getFullMenu().forEach(dish => {
      document
        .getElementById(dish.id.toString() + "rm")
        .addEventListener("click", () => {
          this.model.removeDishFromMenu(dish.id);
          this.updateListeners();
        });
    });
  }

  changeGuests(value) {
    //var value = document.getElementById("dropdownButton").value;
    this.model.setNumberOfGuests(value);
    this.updateListeners();
  }
}
