class OverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.model.addObserver(this);
  }

  // An example of creating HTML procedurally. Think about the pros and cons of this approach.
  render() {
    const isMobile = false;
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }

    if (window.innerWidth < 400) {
      isMobile = true;
    }

    const menu = this.model.menu;
    const totalPrice = this.model.getTotalMenuPrice();
    const numOfGuests = this.model.getNumberOfGuests();
    const content = `
        <div class="row space"> 
            <div class="col"><p class="text-left p-max-width mt-2 h2">My Dinner</p></div>
            
              ${
                isMobile
                  ? `<div class="col">
                  <nav class="navbar navbar-light light-blue lighten-4 mobileShow">
                  <a class="navbar-brand" href="#"></a>
                  <button class="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
                      aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span></button>
                      </div>
                      `
                  : ""
              }  
            
        
              ${
                isMobile
                  ? `<div class="collapsMobile collapse navbar-collapse" id="navbarSupportedContent1">`
                  : ""
              }
            <div class="col">
              <a class="nonMobileShow" id="navContent">
                <div><p class="text-right p-max-width mt-2">People:</p></div>
            </div>
            <div class="dropdown col">
                <button id="dropdownButton" class="btn btn-outline-secondary btn-sm dropdown-toggle btn-right" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span id="num-of-guests-dropdown" class="caret">${numOfGuests}</span>
                </button>
                <div id="dropdown-menu" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button id="sel1" class="dropdown-item" href="#">1</button>
                    <button id="sel2" class="dropdown-item" href="#">2</button>
                    <button id="sel3" class="dropdown-item" href="#">3</button>
                    <button id="sel4" class="dropdown-item" href="#">4</button>
                    <button id="sel5" class="dropdown-item" href="#">5</button>
                </div>
            </div>
          </div>
            <table class="table table-sm menu-table">
                <thead>
                    <tr>
                        <th scope="col">Dish name</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody id="menu-table-tbody">    
                  ${menu
                    .map(
                      dish => `
                    <tr>
                    <td>${dish.title}</td>
                    <td>${dish.pricePerServing}</td>
                    <td><button id="${
                      dish.id
                    }rm" class="btn btn-outline-secondary btn-sm btn-right" type="button">X</button></td>
                    </tr>
                    `
                    )
                    .join("")}
                </tbody>
            </table>
            <div class="space"></div>
            <div class="row">
                <div class="col">Total cost:</div>
                <div class="col" id="sum">${totalPrice}</div>
            </div>
            <div class="space"></div>
            <button id="confirmButton" class="btn btn-outline-secondary btn-sm" type="button">Confirm dinner</button>
        </div>
    
    ${isMobile ? `</div></nav>` : ""}
    `;
    this.container.innerHTML = content;
    this.afterRender();
  }

  afterRender() {}
  update(payload) {
    document.getElementById(
      "num-of-guests-dropdown"
    ).innerText = this.model.getNumberOfGuests();
    document.getElementById("menu-table-tbody").innerHTML = `
      ${this.model
        .getFullMenu()
        .map(
          dish => `
        <tr>
        <td>${dish.title}</td>
        <td>${dish.pricePerServing * this.model.getNumberOfGuests()}</td>
        <td><button id="${
          dish.id
        }rm" class="btn btn-outline-secondary btn-sm btn-right" type="button">X</button></td>
        </tr>
        `
        )
        .join("")}`;
    document.getElementById("sum").innerText = this.model.getTotalMenuPrice();
  }
}
