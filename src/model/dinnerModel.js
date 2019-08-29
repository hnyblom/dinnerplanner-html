//DinnerModel Object constructor
class DinnerModel {

constructor(){
this.dishes=dishesConst; // to be replaced in lab 3
this.nrGuests=0;
this.guests=guestsConst;
this.menu=menuConst;

//TODO Lab 1 implement the data structure that will hold number of guest
// and selected dishes for the dinner menu
}

test(){
  this.getTotalMenuPrice();
  var nothing =0;
}

setNumberOfGuests(num) {
  if(num >= 0){
    this.nrGuests=num;
  }
}

getNumberOfGuests() {
  return this.nrGuests;
}

//Returns the dish that is on the menu for selected type 
getSelectedDish(type) {
  var allDishesType = this.getAllDishes(this.menu, type);
  return allDishesType;
}

//Returns all the dishes on the menu.
getFullMenu() {
  var allDishes = this.getAllDishes(this.menu);
  return allDishes;
}

//Returns all ingredients for all the dishes on the menu.
getAllIngredients() {
  return this.dishes.map(function(dish){return dish.ingredients}).flat();
  //var allIngredients = this.getIngredients();
  //Unique ingredients? Quantity matters? Add quantities of ingredients with same name?
  //var un = this.uniq(flatIngredients);
  //return allIngredients;
}

//Returns the total price of the menu (all the ingredients multiplied by number of guests).
//Functional version
getTotalMenuPriceFunc() {
  var allIngredients = this.getAllIngredients();
  var totalPrice = allIngredients.reduce(function(accumulator, ingredient){return accumulator+ingredient.price},0);
  return totalPrice;
}
//Procedural version
getTotalMenuPrice() {
  var allIngredients = this.getAllIngredients();
  var totalPrice = 0
  allIngredients.forEach(function(ingredient){totalPrice = totalPrice+ingredient.price});
  return totalPrice;
}

//Adds the passed dish to the menu. If the dish of that type already exists on the menu
//it is removed from the menu and the new one added.
addDishToMenu(id) {
  //Get the wanted dish from the database of dishes
  var lookupDish = this.getDish(this.dishes,id);
  var type = lookupDish.type;
  //Check if dish is already on menu
  var menuDish = this.getDish(this.menu, id);
  if(menuDish!=undefined){
    //If dish was on menu remove the old version
    this.removeDishFromMenu(id);
  }
  //Remove other dishes of the same type on the menu
  var sameType = this.getAllDishes(this.menu,type);
  sameType.forEach(function(dish){return this.removeDishFromMenu(dish.id)}, this)
 
  //Add the dish to the menu
  var dish = this.getDish(this.dishes, id);
  this.menu.push(dish); 
}

//Removes dish from menu
removeDishFromMenu(id) {
  var foundIndex = this.menu.findIndex(function(dish){return dish.id==id});
  if(foundIndex!=undefined){
    this.menu.splice(foundIndex,1)
  }
}

//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
//you can use the filter argument to filter out the dish by name or ingredient (use for search)
//if you don't pass any query all the dishes will be returned
getAllDishes(from,type,query) {
  return from.filter(function(dish) {
  let found = true;
  if(query){
    found = false;
    dish.ingredients.forEach(function(ingredient) {
      if(ingredient.name.indexOf(query)!==-1) {
        found = true;
      }
    });
    if(dish.name.indexOf(query) !== -1)
    {
      found = true;
    }
    
  }if(type!==undefined){
    if(type==""){
      return found;
    }
    return dish.type === type && found;

  }else{
    return dish;
  }
  });	
}

//
/* getIngredientsFunc(filter) {
  return this.dishes.map(function(dish){return dish.ingredients}).flat();
}
getIngredients(filter) {
  var resArr = [];
  this.dishes.forEach(function(dish){resArr.push(dish.ingredients)});
  var resArr = resArr.flat(Infinity);
  return resArr;
} */

//Removes duplicates from lists
uniqFunc(list) {
  return list.sort().filter(function(item, pos, ary) {
    return !pos || item != ary[pos - 1];
  })
}
uniq(list){
  var resArr=[];
  list.forEach(function(elem){
    if(!resArr.includes(elem)){
      resArr.push(elem);
    }
  })
  return resArr;
}

//function that returns a dish of specific ID
getDish (from, id) {
    for(let dsh of from){
  if(dsh.id == id) {
      return dsh;
  }
    }
    return undefined;
}
}

const guestsConst = [];
// the dishes constant contains an array of all the 
// dishes in the database. Each dish has id, name, type,
// image (name of the image file), description and
// array of ingredients. Each ingredient has name, 
// quantity (a number), price (a number) and unit (string 
// defining the unit i.e. "g", "slices", "ml". Unit
// can sometimes be empty like in the example of eggs where
// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
const smallDishesConst = [{
  'id':1,
  'name':'French toast',
  'type':'starter',
  'image':'toast.jpg',
  'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
  'ingredients':[{ 
    'name':'eggs',
    'quantity':0.5,
    'unit':'',
    'price':10
    },{
    'name':'milk',
    'quantity':30,
    'unit':'ml',
    'price':6
    },{
    'name':'white bread',
    'quantity':2,
    'unit':'slices',
    'price':2
    }]
  },{
    'id':2,
    'name':'Sourdough Starter',
    'type':'starter',
    'image':'sourdough.jpg',
    'description':"Here is how you make it... Lore ipsum...",
    'ingredients':[{ 
      'name':'active dry yeast',
      'quantity':0.5,
      'unit':'g',
      'price':4
      },{
      'name':'eggs',
      'quantity':30,
      'unit':'ml',
      'price':0
      },{
      'name':'all-purpose flour',
      'quantity':15,
      'unit':'g',
      'price':2
      }]
    },{
      'id':100,
      'name':'Meat balls',
      'type':'main dish',
      'image':'meatballs.jpg',
      'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
      'ingredients':[{ 
        'name':'extra lean ground beef',
        'quantity':115,
        'unit':'g',
        'price':20
        },{
        'name':'sea salt',
        'quantity':0.7,
        'unit':'g',
        'price':3
        },{
        'name':'small onion, diced',
        'quantity':0.25,
        'unit':'',
        'price':2
        },{
        'name':'garlic salt',
        'quantity':0.7,
        'unit':'g',
        'price':2
        },{
        'name':'Italian seasoning',
        'quantity':0.6,
        'unit':'g',
        'price':3
        },{
        'name':'dried oregano',
        'quantity':0.3,
        'unit':'g',
        'price':3
        },{
        'name':'crushed red pepper flakes',
        'quantity':0.6,
        'unit':'g',
        'price':3
        },{
        'name':'Worcestershire sauce',
        'quantity':6,
        'unit':'ml',
        'price':7
        },{
        'name':'milk',
        'quantity':20,
        'unit':'ml',
        'price':4
        },{
        'name':'grated Parmesan cheese',
        'quantity':5,
        'unit':'g',
        'price':8
        },{
        'name':'seasoned bread crumbs',
        'quantity':15,
        'unit':'g',
        'price':4
        }]
      }];
      const dishesConst = [{
  'id':1,
  'name':'French toast',
  'type':'starter',
  'image':'toast.jpg',
  'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
  'ingredients':[{ 
    'name':'eggs',
    'quantity':0.5,
    'unit':'',
    'price':10
    },{
    'name':'milk',
    'quantity':30,
    'unit':'ml',
    'price':6
    },{
    'name':'brown sugar',
    'quantity':7,
    'unit':'g',
    'price':1
    },{
    'name':'ground nutmeg',
    'quantity':0.5,
    'unit':'g',
    'price':12
    },{
    'name':'white bread',
    'quantity':2,
    'unit':'slices',
    'price':2
    }]
  },{
  'id':2,
  'name':'Sourdough Starter',
  'type':'starter',
  'image':'sourdough.jpg',
  'description':"Here is how you make it... Lore ipsum...",
  'ingredients':[{ 
    'name':'active dry yeast',
    'quantity':0.5,
    'unit':'g',
    'price':4
    },{
    'name':'warm water',
    'quantity':30,
    'unit':'ml',
    'price':0
    },{
    'name':'all-purpose flour',
    'quantity':15,
    'unit':'g',
    'price':2
    }]
  },{
  'id':3,
  'name':'Baked Brie with Peaches',
  'type':'starter',
  'image':'bakedbrie.jpg',
  'description':"Here is how you make it... Lore ipsum...",
  'ingredients':[{ 
    'name':'round Brie cheese',
    'quantity':10,
    'unit':'g',
    'price':8
    },{
    'name':'raspberry preserves',
    'quantity':15,
    'unit':'g',
    'price':10
    },{
    'name':'peaches',
    'quantity':1,
    'unit':'',
    'price':4
    }]
  },{
  'id':100,
  'name':'Meat balls',
  'type':'main dish',
  'image':'meatballs.jpg',
  'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
  'ingredients':[{ 
    'name':'extra lean ground beef',
    'quantity':115,
    'unit':'g',
    'price':20
    },{
    'name':'sea salt',
    'quantity':0.7,
    'unit':'g',
    'price':3
    },{
    'name':'small onion, diced',
    'quantity':0.25,
    'unit':'',
    'price':2
    },{
    'name':'garlic salt',
    'quantity':0.7,
    'unit':'g',
    'price':2
    },{
    'name':'Italian seasoning',
    'quantity':0.6,
    'unit':'g',
    'price':3
    },{
    'name':'dried oregano',
    'quantity':0.3,
    'unit':'g',
    'price':3
    },{
    'name':'crushed red pepper flakes',
    'quantity':0.6,
    'unit':'g',
    'price':3
    },{
    'name':'Worcestershire sauce',
    'quantity':6,
    'unit':'ml',
    'price':7
    },{
    'name':'milk',
    'quantity':20,
    'unit':'ml',
    'price':4
    },{
    'name':'grated Parmesan cheese',
    'quantity':5,
    'unit':'g',
    'price':8
    },{
    'name':'seasoned bread crumbs',
    'quantity':15,
    'unit':'g',
    'price':4
    }]
  },{
  'id':101,
  'name':'MD 2',
  'type':'main dish',
  'image':'bakedbrie.jpg',
  'description':"Here is how you make it... Lore ipsum...",
  'ingredients':[{ 
    'name':'ingredient 1',
    'quantity':1,
    'unit':'pieces',
    'price':8
    },{
    'name':'ingredient 2',
    'quantity':15,
    'unit':'g',
    'price':7
    },{
    'name':'ingredient 3',
    'quantity':10,
    'unit':'ml',
    'price':4
    }]
  },{
  'id':102,
  'name':'MD 3',
  'type':'main dish',
  'image':'meatballs.jpg',
  'description':"Here is how you make it... Lore ipsum...",
  'ingredients':[{ 
    'name':'ingredient 1',
    'quantity':2,
    'unit':'pieces',
    'price':8
    },{
    'name':'ingredient 2',
    'quantity':10,
    'unit':'g',
    'price':7
    },{
    'name':'ingredient 3',
    'quantity':5,
    'unit':'ml',
    'price':4
    }]
  },{
  'id':103,
  'name':'MD 4',
  'type':'main dish',
  'image':'meatballs.jpg',
  'description':"Here is how you make it... Lore ipsum...",
  'ingredients':[{ 
    'name':'ingredient 1',
    'quantity':1,
    'unit':'pieces',
    'price':4
    },{
    'name':'ingredient 2',
    'quantity':12,
    'unit':'g',
    'price':7
    },{
    'name':'ingredient 3',
    'quantity':6,
    'unit':'ml',
    'price':4
    }]
  },{
  'id':200,
  'name':'Chocolat Ice cream',
  'type':'dessert',
  'image':'icecream.jpg',
  'description':"Here is how you make it... Lore ipsum...",
  'ingredients':[{ 
    'name':'ice cream',
    'quantity':100,
    'unit':'ml',
    'price':6
    }]
  },{
  'id':201,
  'name':'Vanilla Ice cream',
  'type':'dessert',
  'image':'icecream.jpg',
  'description':"Here is how you make it... Lore ipsum...",
  'ingredients':[{ 
    'name':'ice cream',
    'quantity':100,
    'unit':'ml',
    'price':6
    }]
  },{
  'id':202,
  'name':'Strawberry',
  'type':'dessert',
  'image':'icecream.jpg',
  'description':"Here is how you make it... Lore ipsum...",
  'ingredients':[{ 
    'name':'ice cream',
    'quantity':100,
    'unit':'ml',
    'price':6
    }]
  }
];
//const menuConst=Array.from(dishesConst);
const menuConst=[];



