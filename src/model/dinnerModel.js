//DinnerModel class
const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/5";

//DinnerModel Object constructor
class DinnerModel {
  constructor() {
    this.dishes = this.getAllDishes(); // to be replaced in lab 3
    this.nrGuests = 1;
    //this.menu = []
    this.menu = menuInit;
    this.observers = [];
  }

  setNumberOfGuests(num, arg) {
    if (num >= 0) {
      this.nrGuests = num;
    }
    this.notifyObservers(arg);
  }

  getNumberOfGuests() {
    return this.nrGuests;
  }

  //Returns the dish that is on the menu for selected type
  getSelectedDish(type) {
    return this.menu.find(function(dish) {
      return dish.type === type;
    });
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return this.menu;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    return this.menu
      .map(function(dish) {
        return dish.extendedIngredients;
      })
      .flat();
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  //Functional version
  getTotalMenuPrice() {
    const totalPrice = this.menu.reduce(function(accumulator, dish) {
      return accumulator + dish.pricePerServing;
    }, 0);
    return (totalPrice * this.nrGuests).toFixed(2);
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  addDishToMenu(dish, arg) {
    const commonDishTypes = this.menu.filter(x => {
      if (x.dishTypes !== undefined && dish.dishTypes !== undefined) {
        return x.dishTypes[0] == dish.dishTypes[0];
      }
    });
    if (commonDishTypes.length > 0) {
      const foundIndex = this.menu.findIndex(function(dish) {
        return commonDishTypes[0].id == id;
      });
      if (foundIndex != undefined) {
        this.menu.splice(foundIndex, 1);
      }
    }
    this.menu.push(dish);
    this.notifyObservers(arg);
  }

  //Removes dish from menu
  removeDishFromMenu(id, arg) {
    const foundIndex = this.menu.findIndex(function(dish) {
      return dish.id == id;
    });
    if (foundIndex != undefined) {
      this.menu.splice(foundIndex, 1);
    }
    this.notifyObservers(arg);
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any query all the dishes will be returned
  getAllDishes(type, query) {
    document.getElementById("loader").style.display = "block";

    let searchParams = new URLSearchParams();
    if (type && type !== undefined) {
      searchParams.append("type", type);
    }
    if (query && query !== undefined) {
      searchParams.append("query", query);
    }

    const searchStr = searchParams.toString();
    return fetch(
      `${BASE_URL}/recipes/search${searchStr === "" ? "" : "?"}${searchStr}`,
      {
        headers: {
          "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        document.getElementById("loader").style.display = "none";
        return json.results;
      })
      .catch(error => {
        document.getElementById("loader").style.display = "none";
        console.error("Error:", error);
      });
  }

  //Removes duplicates from lists
  //Functional version
  uniq(list) {
    return list.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }

  //function that returns a dish of specific ID
  getDish(id) {
    if (!id || id === "") {
      return undefined;
    }
    document.getElementById("loader").style.display = "block";
    return fetch(`${BASE_URL}/recipes/${id}/information`, {
      headers: {
        "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"
      }
    })
      .then(res => {
        document.getElementById("loader").style.display = "none";
        return res.json();
      })
      .catch(error => {
        document.getElementById("loader").style.display = "none";
        console.error("Error:", error);
      });
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
  removeObserver(observer) {
    this.observers = this.observers.filter(function(ele) {
      return ele != observer;
    });
  }

  notifyObservers(arg) {
    for (var i = 0; i < this.observers.length; i++) {
      this.observers[i].update(arg);
    }
  }
}

// the dishes constant contains an array of all the
// dishes in the database. Each dish has id, name, type,
// image (name of the image file), description and
// array of ingredients. Each ingredient has name,
// quantity (a number), price (a number) and unit (string
// defining the unit i.e. "g", "slices", "ml". Unit
// can sometimes be empty like in the example of eggs where
// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
const dishesConst = [
  {
    id: 1,
    name: "French toast",
    type: "starter",
    image: "toast.jpg",
    description:
      "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
    ingredients: [
      {
        name: "eggs",
        quantity: 0.5,
        unit: "",
        price: 10
      },
      {
        name: "milk",
        quantity: 30,
        unit: "ml",
        price: 6
      },
      {
        name: "brown sugar",
        quantity: 7,
        unit: "g",
        price: 1
      },
      {
        name: "ground nutmeg",
        quantity: 0.5,
        unit: "g",
        price: 12
      },
      {
        name: "white bread",
        quantity: 2,
        unit: "slices",
        price: 2
      }
    ]
  },
  {
    id: 2,
    name: "Sourdough Starter",
    type: "starter",
    image: "sourdough.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "active dry yeast",
        quantity: 0.5,
        unit: "g",
        price: 4
      },
      {
        name: "warm water",
        quantity: 30,
        unit: "ml",
        price: 0
      },
      {
        name: "all-purpose flour",
        quantity: 15,
        unit: "g",
        price: 2
      }
    ]
  },
  {
    id: 3,
    name: "Baked Brie with Peaches",
    type: "starter",
    image: "bakedbrie.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "round Brie cheese",
        quantity: 10,
        unit: "g",
        price: 8
      },
      {
        name: "raspberry preserves",
        quantity: 15,
        unit: "g",
        price: 10
      },
      {
        name: "peaches",
        quantity: 1,
        unit: "",
        price: 4
      }
    ]
  },
  {
    id: 100,
    name: "Meat balls",
    type: "main dish",
    image: "meatballs.jpg",
    description:
      "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
    ingredients: [
      {
        name: "extra lean ground beef",
        quantity: 115,
        unit: "g",
        price: 20
      },
      {
        name: "sea salt",
        quantity: 0.7,
        unit: "g",
        price: 3
      },
      {
        name: "small onion, diced",
        quantity: 0.25,
        unit: "",
        price: 2
      },
      {
        name: "garlic salt",
        quantity: 0.7,
        unit: "g",
        price: 2
      },
      {
        name: "Italian seasoning",
        quantity: 0.6,
        unit: "g",
        price: 3
      },
      {
        name: "dried oregano",
        quantity: 0.3,
        unit: "g",
        price: 3
      },
      {
        name: "crushed red pepper flakes",
        quantity: 0.6,
        unit: "g",
        price: 3
      },
      {
        name: "Worcestershire sauce",
        quantity: 6,
        unit: "ml",
        price: 7
      },
      {
        name: "milk",
        quantity: 20,
        unit: "ml",
        price: 4
      },
      {
        name: "grated Parmesan cheese",
        quantity: 5,
        unit: "g",
        price: 8
      },
      {
        name: "seasoned bread crumbs",
        quantity: 15,
        unit: "g",
        price: 4
      }
    ]
  },
  {
    id: 101,
    name: "MD 2",
    type: "main dish",
    image: "bakedbrie.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ingredient 1",
        quantity: 1,
        unit: "pieces",
        price: 8
      },
      {
        name: "ingredient 2",
        quantity: 15,
        unit: "g",
        price: 7
      },
      {
        name: "ingredient 3",
        quantity: 10,
        unit: "ml",
        price: 4
      }
    ]
  },
  {
    id: 102,
    name: "MD 3",
    type: "main dish",
    image: "meatballs.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ingredient 1",
        quantity: 2,
        unit: "pieces",
        price: 8
      },
      {
        name: "ingredient 2",
        quantity: 10,
        unit: "g",
        price: 7
      },
      {
        name: "ingredient 3",
        quantity: 5,
        unit: "ml",
        price: 4
      }
    ]
  },
  {
    id: 103,
    name: "MD 4",
    type: "main dish",
    image: "meatballs.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ingredient 1",
        quantity: 1,
        unit: "pieces",
        price: 4
      },
      {
        name: "ingredient 2",
        quantity: 12,
        unit: "g",
        price: 7
      },
      {
        name: "ingredient 3",
        quantity: 6,
        unit: "ml",
        price: 4
      }
    ]
  },
  {
    id: 200,
    name: "Chocolat Ice cream",
    type: "dessert",
    image: "icecream.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ice cream",
        quantity: 100,
        unit: "ml",
        price: 6
      }
    ]
  },
  {
    id: 201,
    name: "Vanilla Ice cream",
    type: "dessert",
    image: "icecream.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ice cream",
        quantity: 100,
        unit: "ml",
        price: 6
      }
    ]
  },
  {
    id: 202,
    name: "Strawberry",
    type: "dessert",
    image: "icecream.jpg",
    description: "Here is how you make it... Lore ipsum...",
    ingredients: [
      {
        name: "ice cream",
        quantity: 100,
        unit: "ml",
        price: 6
      }
    ]
  }
];

const menuInit = [
  {
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    veryHealthy: true,
    cheap: false,
    veryPopular: true,
    sustainable: false,
    weightWatcherSmartPoints: 6,
    gaps: "no",
    lowFodmap: false,
    ketogenic: false,
    whole30: false,
    preparationMinutes: 25,
    cookingMinutes: 25,
    sourceUrl:
      "http://blog.fatfreevegan.com/2013/06/kale-and-quinoa-salad-with-black-beans.html",
    spoonacularSourceUrl:
      "https://spoonacular.com/kale-and-quinoa-salad-with-black-beans-592479",
    aggregateLikes: 50077,
    spoonacularScore: 100.0,
    healthScore: 100.0,
    creditsText: "Fat Free Vegan",
    sourceName: "Fat Free Vegan",
    pricePerServing: 101.23,
    extendedIngredients: [
      {
        id: 1022009,
        aisle: "Ethnic Foods;Spices and Seasonings",
        image: "chili-powder.jpg",
        consitency: "solid",
        name: "ancho chile powder",
        original:
          "1 teaspoon ancho chile powder (or other pure chile powder, not a blend)",
        originalString:
          "1 teaspoon ancho chile powder (or other pure chile powder, not a blend)",
        originalName:
          "ancho chile powder (or other pure chile powder, not a blend)",
        amount: 1.0,
        unit: "teaspoon",
        meta: ["pure", "(or other chile powder, not a blend)"],
        metaInformation: ["pure", "(or other chile powder, not a blend)"],
        measures: {
          us: { amount: 1.0, unitShort: "tsp", unitLong: "teaspoon" },
          metric: { amount: 1.0, unitShort: "tsp", unitLong: "teaspoon" }
        }
      },
      {
        id: 9037,
        aisle: "Produce",
        image: "avocado.jpg",
        consitency: "solid",
        name: "avocado",
        original: "1 avocado, sliced or cubed (optional)",
        originalString: "1 avocado, sliced or cubed (optional)",
        originalName: "avocado, sliced or cubed (optional)",
        amount: 1.0,
        unit: "",
        meta: ["cubed", "sliced"],
        metaInformation: ["cubed", "sliced"],
        measures: {
          us: { amount: 1.0, unitShort: "", unitLong: "" },
          metric: { amount: 1.0, unitShort: "", unitLong: "" }
        }
      },
      {
        id: 16015,
        aisle: "Pasta and Rice;Canned and Jarred",
        image: "black-beans.jpg",
        consitency: "solid",
        name: "black beans",
        original:
          "1 15-ounce can black beans, rinsed and drained (about 1 1/2 cups)",
        originalString:
          "1 15-ounce can black beans, rinsed and drained (about 1 1/2 cups)",
        originalName: "15-ounce can black beans, rinsed and drained (about",
        amount: 1.5,
        unit: "cups",
        meta: ["rinsed", "drained", "canned"],
        metaInformation: ["rinsed", "drained", "canned"],
        measures: {
          us: { amount: 1.5, unitShort: "cups", unitLong: "cups" },
          metric: { amount: 354.882, unitShort: "ml", unitLong: "milliliters" }
        }
      },
      {
        id: 11124,
        aisle: "Produce",
        image: "sliced-carrot.png",
        consitency: "solid",
        name: "carrot",
        original: "1/2 cup grated carrot",
        originalString: "1/2 cup grated carrot",
        originalName: "grated carrot",
        amount: 0.5,
        unit: "cup",
        meta: ["grated"],
        metaInformation: ["grated"],
        measures: {
          us: { amount: 0.5, unitShort: "cups", unitLong: "cups" },
          metric: { amount: 118.294, unitShort: "ml", unitLong: "milliliters" }
        }
      },
      {
        id: 2009,
        aisle: "Spices and Seasonings",
        image: "chili-powder.jpg",
        consitency: "solid",
        name: "chile powder",
        original: "1/4 teaspoon chipotle chile powder, or to taste",
        originalString: "1/4 teaspoon chipotle chile powder, or to taste",
        originalName: "chipotle chile powder, or to taste",
        amount: 0.25,
        unit: "teaspoon",
        meta: ["to taste"],
        metaInformation: ["to taste"],
        measures: {
          us: { amount: 0.25, unitShort: "tsps", unitLong: "teaspoons" },
          metric: { amount: 0.25, unitShort: "tsps", unitLong: "teaspoons" }
        }
      },
      {
        id: 1002014,
        aisle: "Spices and Seasonings",
        image: "ground-cumin.jpg",
        consitency: "solid",
        name: "cumin",
        original: "1/2 teaspoon cumin",
        originalString: "1/2 teaspoon cumin",
        originalName: "cumin",
        amount: 0.5,
        unit: "teaspoon",
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 0.5, unitShort: "tsps", unitLong: "teaspoons" },
          metric: { amount: 0.5, unitShort: "tsps", unitLong: "teaspoons" }
        }
      },
      {
        id: 11215,
        aisle: "Produce",
        image: "garlic.jpg",
        consitency: "solid",
        name: "garlic",
        original: "2 cloves garlic, minced",
        originalString: "2 cloves garlic, minced",
        originalName: "garlic, minced",
        amount: 2.0,
        unit: "cloves",
        meta: ["minced"],
        metaInformation: ["minced"],
        measures: {
          us: { amount: 2.0, unitShort: "cloves", unitLong: "cloves" },
          metric: { amount: 2.0, unitShort: "cloves", unitLong: "cloves" }
        }
      },
      {
        id: 12220,
        aisle: "Health Foods;Baking",
        image: "flax-seeds.png",
        consitency: "solid",
        name: "ground flaxseed",
        original: "1 teaspoon chia seeds or ground flaxseed",
        originalString: "1 teaspoon chia seeds or ground flaxseed",
        originalName: "chia seeds or ground flaxseed",
        amount: 1.0,
        unit: "teaspoon",
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 1.0, unitShort: "tsp", unitLong: "teaspoon" },
          metric: { amount: 1.0, unitShort: "tsp", unitLong: "teaspoon" }
        }
      },
      {
        id: 11233,
        aisle: "Produce",
        image: "kale.jpg",
        consitency: "solid",
        name: "kale",
        original: "4 – 6 cups chopped kale leaves (about 4-5 ounces)",
        originalString: "4 – 6 cups chopped kale leaves (about 4-5 ounces)",
        originalName: "– 6 cups chopped kale leaves (about",
        amount: 4.0,
        unit: "ounces",
        meta: ["chopped"],
        metaInformation: ["chopped"],
        measures: {
          us: { amount: 4.0, unitShort: "oz", unitLong: "ounces" },
          metric: { amount: 113.398, unitShort: "g", unitLong: "grams" }
        }
      },
      {
        id: 9152,
        aisle: "Produce",
        image: "lemon-juice.jpg",
        consitency: "liquid",
        name: "lemon juice",
        original: "additional lemon juice and seasonings, to taste",
        originalString: "additional lemon juice and seasonings, to taste",
        originalName: "additional lemon juice and seasonings, to taste",
        amount: 6.0,
        unit: "servings",
        meta: ["to taste"],
        metaInformation: ["to taste"],
        measures: {
          us: { amount: 6.0, unitShort: "servings", unitLong: "servings" },
          metric: { amount: 6.0, unitShort: "servings", unitLong: "servings" }
        }
      },
      {
        id: 9160,
        aisle: "Produce",
        image: "lime-juice.png",
        consitency: "liquid",
        name: "lime juice",
        original: "1/4 cup freshly squeezed lemon or lime juice",
        originalString: "1/4 cup freshly squeezed lemon or lime juice",
        originalName: "freshly squeezed lemon or lime juice",
        amount: 0.25,
        unit: "cup",
        meta: ["freshly squeezed"],
        metaInformation: ["freshly squeezed"],
        measures: {
          us: { amount: 0.25, unitShort: "cups", unitLong: "cups" },
          metric: { amount: 59.147, unitShort: "ml", unitLong: "milliliters" }
        }
      },
      {
        id: 20035,
        aisle: "Pasta and Rice;Health Foods",
        image: "uncooked-quinoa.png",
        consitency: "solid",
        name: "quinoa",
        original:
          "1 cup quinoa, rinsed very well (I used a combo of red and white quinoa)",
        originalString:
          "1 cup quinoa, rinsed very well (I used a combo of red and white quinoa)",
        originalName:
          "quinoa, rinsed very well (I used a combo of red and white quinoa)",
        amount: 1.0,
        unit: "cup",
        meta: [
          "white",
          "red",
          "rinsed",
          "well",
          "(I used a combo of and quinoa)"
        ],
        metaInformation: [
          "white",
          "red",
          "rinsed",
          "well",
          "(I used a combo of and quinoa)"
        ],
        measures: {
          us: { amount: 1.0, unitShort: "cup", unitLong: "cup" },
          metric: { amount: 236.588, unitShort: "ml", unitLong: "milliliters" }
        }
      },
      {
        id: 11821,
        aisle: "Produce",
        image: "red-pepper.jpg",
        consitency: "solid",
        name: "red bell pepper",
        original: "1/2 red bell pepper, chopped",
        originalString: "1/2 red bell pepper, chopped",
        originalName: "red bell pepper, chopped",
        amount: 0.5,
        unit: "",
        meta: ["red", "chopped"],
        metaInformation: ["red", "chopped"],
        measures: {
          us: { amount: 0.5, unitShort: "", unitLong: "" },
          metric: { amount: 0.5, unitShort: "", unitLong: "" }
        }
      },
      {
        id: 2047,
        aisle: "Spices and Seasonings",
        image: "salt.jpg",
        consitency: "solid",
        name: "salt",
        original: "1/2 tsp salt, or to taste (optional)",
        originalString: "1/2 tsp salt, or to taste (optional)",
        originalName: "salt, or to taste (optional)",
        amount: 0.5,
        unit: "tsp",
        meta: ["to taste"],
        metaInformation: ["to taste"],
        measures: {
          us: { amount: 0.5, unitShort: "tsps", unitLong: "teaspoons" },
          metric: { amount: 0.5, unitShort: "tsps", unitLong: "teaspoons" }
        }
      },
      {
        id: 6615,
        aisle: "Canned and Jarred",
        image: "chicken-broth.png",
        consitency: "liquid",
        name: "vegetable broth",
        original: "3 tablespoons vegetable broth",
        originalString: "3 tablespoons vegetable broth",
        originalName: "vegetable broth",
        amount: 3.0,
        unit: "tablespoons",
        meta: [],
        metaInformation: [],
        measures: {
          us: { amount: 3.0, unitShort: "Tbsps", unitLong: "Tbsps" },
          metric: { amount: 3.0, unitShort: "Tbsps", unitLong: "Tbsps" }
        }
      }
    ],
    id: 592479,
    title: "Kale and Quinoa Salad with Black Beans",
    readyInMinutes: 50,
    servings: 6,
    image: "https://spoonacular.com/recipeImages/592479-556x370.jpg",
    imageType: "jpg",
    cuisines: [],
    dishTypes: ["side dish"],
    diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"],
    occasions: [],
    winePairing: {},
    instructions:
      "Instructions  Heat a saucepan. Add the rinsed and drained quinoa and the garlic and toast it until almost dry. Add the vegetable broth, bring to a boil, reduce heat, and cover. Simmer until all the water is absorbed, about 20 minutes. Remove from heat and allow to cool. While the quinoa is cooking, make the dressing in a small bowl or measuring cup: whisk together the lemon juice, 3 tablespoons broth, chia/flax seeds, chile powders, cumin, and salt. Allow to stand until the chia seeds start to thicken the dressing. Place the kale in a large serving bowl. Add half of the dressing and massage it into the kale using a wringing motion until the kale is very tender. Two minutes of massaging should do it, but the longer, the better. Add the quinoa, black beans, carrot, and bell pepper, along with the remaining dressing. Mix well and refrigerate until ready to serve. Just before serving, check the seasoning and add more lemon juice, chile powder, cumin, and salt, as needed. Stir in chopped avocado, if desired, or serve with slices of avocado on the side.",
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step: "Heat a saucepan.",
            ingredients: [],
            equipment: [
              { id: 404669, name: "sauce pan", image: "sauce-pan.jpg" }
            ]
          },
          {
            number: 2,
            step:
              "Add the rinsed and drained quinoa and the garlic and toast it until almost dry.",
            ingredients: [
              { id: 11215, name: "garlic", image: "garlic.png" },
              { id: 20035, name: "quinoa", image: "uncooked-quinoa.png" }
            ],
            equipment: []
          },
          {
            number: 3,
            step:
              "Add the vegetable broth, bring to a boil, reduce heat, and cover. Simmer until all the water is absorbed, about 20 minutes.",
            ingredients: [
              { id: 6615, name: "vegetable broth", image: "chicken-broth.png" }
            ],
            equipment: [],
            length: { number: 20, unit: "minutes" }
          },
          {
            number: 4,
            step:
              "Remove from heat and allow to cool. While the quinoa is cooking, make the dressing in a small bowl or measuring cup: whisk together the lemon juice, 3 tablespoons broth, chia/flax seeds, chile powders, cumin, and salt. Allow to stand until the chia seeds start to thicken the dressing.",
            ingredients: [
              { id: 9152, name: "lemon juice", image: "lemon-juice.jpg" },
              { id: 10012220, name: "flaxseed", image: "flax-seeds.png" },
              { id: 20035, name: "quinoa", image: "uncooked-quinoa.png" },
              { id: 1006615, name: "broth", image: "chicken-broth.png" },
              { id: 1002014, name: "cumin", image: "ground-cumin.jpg" },
              { id: 2047, name: "salt", image: "salt.jpg" }
            ],
            equipment: [
              { id: 404766, name: "measuring cup", image: "measuring-cup.jpg" },
              { id: 404661, name: "whisk", image: "whisk.png" },
              { id: 404783, name: "bowl", image: "bowl.jpg" }
            ]
          },
          {
            number: 5,
            step: "Place the kale in a large serving bowl.",
            ingredients: [{ id: 11233, name: "kale", image: "kale.jpg" }],
            equipment: [{ id: 404783, name: "bowl", image: "bowl.jpg" }]
          },
          {
            number: 6,
            step:
              "Add half of the dressing and massage it into the kale using a wringing motion until the kale is very tender. Two minutes of massaging should do it, but the longer, the better.",
            ingredients: [{ id: 11233, name: "kale", image: "kale.jpg" }],
            equipment: []
          },
          {
            number: 7,
            step:
              "Add the quinoa, black beans, carrot, and bell pepper, along with the remaining dressing.",
            ingredients: [
              {
                id: 10211821,
                name: "bell pepper",
                image: "bell-pepper-orange.png"
              },
              { id: 16015, name: "black beans", image: "black-beans.jpg" },
              { id: 11124, name: "carrot", image: "sliced-carrot.png" },
              { id: 20035, name: "quinoa", image: "uncooked-quinoa.png" }
            ],
            equipment: []
          },
          {
            number: 8,
            step:
              "Mix well and refrigerate until ready to serve. Just before serving, check the seasoning and add more lemon juice, chile powder, cumin, and salt, as needed. Stir in chopped avocado, if desired, or serve with slices of avocado on the side.",
            ingredients: [
              { id: 2009, name: "chili powder", image: "chili-powder.jpg" },
              { id: 9152, name: "lemon juice", image: "lemon-juice.jpg" },
              { id: 9037, name: "avocado", image: "avocado.jpg" },
              { id: 1002014, name: "cumin", image: "ground-cumin.jpg" },
              { id: 2047, name: "salt", image: "salt.jpg" }
            ],
            equipment: []
          }
        ]
      }
    ]
  },
  {
    vegetarian: true,
    vegan: true,
    glutenFree: false,
    dairyFree: true,
    veryHealthy: true,
    cheap: false,
    veryPopular: true,
    sustainable: false,
    weightWatcherSmartPoints: 13,
    gaps: "no",
    lowFodmap: false,
    ketogenic: false,
    whole30: false,
    preparationMinutes: 5,
    cookingMinutes: 10,
    sourceUrl: "http://www.twopeasandtheirpod.com/creamy-avocado-pasta/",
    spoonacularSourceUrl: "https://spoonacular.com/creamy-avocado-pasta-547775",
    aggregateLikes: 67131,
    spoonacularScore: 100.0,
    healthScore: 100.0,
    creditsText: "Two Peas and Their Pod",
    sourceName: "Two Peas and Their Pod",
    pricePerServing: 171.39,
    extendedIngredients: [
      {
        id: 9037,
        aisle: "Produce",
        image: "avocado.jpg",
        consitency: "solid",
        name: "avocado",
        original: "1 large ripe Avocado, pitted and peel removed",
        originalString: "1 large ripe Avocado, pitted and peel removed",
        originalName: "ripe Avocado, pitted and peel removed",
        amount: 1.0,
        unit: "large",
        meta: ["pitted", "ripe"],
        metaInformation: ["pitted", "ripe"],
        measures: {
          us: { amount: 1.0, unitShort: "large", unitLong: "large" },
          metric: { amount: 1.0, unitShort: "large", unitLong: "large" }
        }
      },
      {
        id: 10211821,
        aisle: "Produce",
        image: "bell-pepper-orange.png",
        consitency: "solid",
        name: "bell pepper",
        original: "Freshly ground black pepper, to taste",
        originalString: "Freshly ground black pepper, to taste",
        originalName: "Freshly ground black pepper, to taste",
        amount: 2.0,
        unit: "servings",
        meta: ["black", "freshly ground", "to taste"],
        metaInformation: ["black", "freshly ground", "to taste"],
        measures: {
          us: { amount: 2.0, unitShort: "servings", unitLong: "servings" },
          metric: { amount: 2.0, unitShort: "servings", unitLong: "servings" }
        }
      },
      {
        id: 11165,
        aisle: "Produce;Spices and Seasonings",
        image: "cilantro.png",
        consitency: "solid",
        name: "fresh cilantro",
        original: "1/4 cup chopped fresh cilantro",
        originalString: "1/4 cup chopped fresh cilantro",
        originalName: "chopped fresh cilantro",
        amount: 0.25,
        unit: "cup",
        meta: ["fresh", "chopped"],
        metaInformation: ["fresh", "chopped"],
        measures: {
          us: { amount: 0.25, unitShort: "cups", unitLong: "cups" },
          metric: { amount: 59.147, unitShort: "ml", unitLong: "milliliters" }
        }
      },
      {
        id: 11215,
        aisle: "Produce",
        image: "garlic.jpg",
        consitency: "solid",
        name: "garlic",
        original: "1 clove garlic, minced",
        originalString: "1 clove garlic, minced",
        originalName: "garlic, minced",
        amount: 1.0,
        unit: "clove",
        meta: ["minced"],
        metaInformation: ["minced"],
        measures: {
          us: { amount: 1.0, unitShort: "clove", unitLong: "clove" },
          metric: { amount: 1.0, unitShort: "clove", unitLong: "clove" }
        }
      },
      {
        id: 1082047,
        aisle: "Spices and Seasonings",
        image: "salt.jpg",
        consitency: "solid",
        name: "kosher salt",
        original: "1/2 teaspoon kosher salt, or to taste",
        originalString: "1/2 teaspoon kosher salt, or to taste",
        originalName: "kosher salt, or to taste",
        amount: 0.5,
        unit: "teaspoon",
        meta: ["to taste"],
        metaInformation: ["to taste"],
        measures: {
          us: { amount: 0.5, unitShort: "tsps", unitLong: "teaspoons" },
          metric: { amount: 0.5, unitShort: "tsps", unitLong: "teaspoons" }
        }
      },
      {
        id: 9160,
        aisle: "Produce",
        image: "lime-juice.png",
        consitency: "liquid",
        name: "lime juice",
        original: "1 tablespoon fresh lime juice",
        originalString: "1 tablespoon fresh lime juice",
        originalName: "fresh lime juice",
        amount: 1.0,
        unit: "tablespoon",
        meta: ["fresh"],
        metaInformation: ["fresh"],
        measures: {
          us: { amount: 1.0, unitShort: "Tbsp", unitLong: "Tbsp" },
          metric: { amount: 1.0, unitShort: "Tbsp", unitLong: "Tbsp" }
        }
      },
      {
        id: 20124,
        aisle: "Pasta and Rice",
        image: "whole-wheat-spaghetti.jpg",
        consitency: "solid",
        name: "whole wheat pasta",
        original: "6 ounces pasta, we used whole wheat spaghetti",
        originalString: "6 ounces pasta, we used whole wheat spaghetti",
        originalName: "pasta, we used whole wheat spaghetti",
        amount: 6.0,
        unit: "ounces",
        meta: ["whole wheat"],
        metaInformation: ["whole wheat"],
        measures: {
          us: { amount: 6.0, unitShort: "oz", unitLong: "ounces" },
          metric: { amount: 170.097, unitShort: "g", unitLong: "grams" }
        }
      }
    ],
    id: 547775,
    title: "Creamy Avocado Pasta",
    readyInMinutes: 15,
    servings: 2,
    image: "https://spoonacular.com/recipeImages/547775-556x370.jpg",
    imageType: "jpg",
    cuisines: [],
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    diets: ["dairy free", "lacto ovo vegetarian", "vegan"],
    occasions: [],
    winePairing: {
      pairedWines: [],
      pairingText:
        "No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.",
      productMatches: []
    },
    instructions:
      "1. Bring water to a boil in a medium sized pot. Salt the water and add in your pasta, reduce heat to medium, and cook until Al Dente, about 8-10 minutes.2. While the pasta is cooking, make the sauce by placing the avocado, garlic, lime juice, cilantro, salt and pepper into a food processor or blender. Process until smooth and creamy.3. When pasta is done cooking, drain and place pasta into a large bowl. Add the sauce to the pasta and toss until pasta is well coated. Season with additional salt and pepper, if desired. Serve immediately.Note: This pasta dish is best eaten the day it is made.",
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step:
              "Bring water to a boil in a medium sized pot. Salt the water and add in your pasta, reduce heat to medium, and cook until Al Dente, about 8-10 minutes.",
            ingredients: [{ id: 2047, name: "salt", image: "salt.jpg" }],
            equipment: [{ id: 404752, name: "pot", image: "stock-pot.jpg" }],
            length: { number: 10, unit: "minutes" }
          },
          {
            number: 2,
            step:
              "While the pasta is cooking, make the sauce by placing the avocado, garlic, lime juice, cilantro, salt and pepper into a food processor or blender. Process until smooth and creamy.",
            ingredients: [
              {
                id: 1102047,
                name: "salt and pepper",
                image: "salt-and-pepper.jpg"
              },
              { id: 9160, name: "lime juice", image: "lime-juice.png" },
              { id: 11165, name: "cilantro", image: "cilantro.png" },
              { id: 9037, name: "avocado", image: "avocado.jpg" },
              { id: 11215, name: "garlic", image: "garlic.png" }
            ],
            equipment: [
              {
                id: 404771,
                name: "food processor",
                image: "food-processor.png"
              },
              { id: 404726, name: "blender", image: "blender.png" }
            ]
          },
          {
            number: 3,
            step:
              "When pasta is done cooking, drain and place pasta into a large bowl.",
            ingredients: [],
            equipment: [{ id: 404783, name: "bowl", image: "bowl.jpg" }]
          },
          {
            number: 4,
            step:
              "Add the sauce to the pasta and toss until pasta is well coated. Season with additional salt and pepper, if desired.",
            ingredients: [
              {
                id: 1102047,
                name: "salt and pepper",
                image: "salt-and-pepper.jpg"
              }
            ],
            equipment: []
          },
          {
            number: 5,
            step:
              "Serve immediately.Note: This pasta dish is best eaten the day it is made.",
            ingredients: [],
            equipment: []
          }
        ]
      }
    ]
  }
];
