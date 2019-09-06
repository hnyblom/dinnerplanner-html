class OverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    render() {
        var content =`
        <p class="text-left p-max-width h2">My Dinner</p>
        <div class="space"></div>
        <div class="row">
            <div class="col">People:</div>
            <div class="dropdown col">
                <button id="dropdownButton" class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span id="dropdownText" class="caret">5</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">1</a>
                    <a class="dropdown-item" href="#">2</a>
                    <a class="dropdown-item" href="#">3</a>
                    <a class="dropdown-item" href="#">4</a>
                    <a class="dropdown-item" href="#">5</a>
                </div>
            </div>
        </div>
        <div class="space-lg"></div>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">Dish name</th>
                    <th scope="col">Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>To be filled</td>
                    <td>To be filled</td>
                </tr>
            </tbody>
        </table>
        <div class="space"></div>
        <div class="row">
            <div class="col">Total cost:</div>
            <div class="col" id="sum">100</div>
        </div>
        <div class="space"></div>
        <button id="confirmButton" class="btn btn-outline-secondary btn-sm" type="button">Confirm dinner</button>
      </div>
    `;
        this.container.innerHTML = content;
        this.afterRender();
    }

    afterRender() {
    }
}
