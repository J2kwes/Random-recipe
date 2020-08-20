/*  
    fetchData() sends a GET request to the mealdb api. 
    The data is then passed on to the getRecipe() funcion
*/

async function fetchData() {
  let apiData = await axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((resp) => {
      return resp.data.meals;
    });

  getRecipe(apiData);
}

/*  
    getRecipe() gets the data array from fecthData().
    in the array is a nested object wich contains all meal data.
    To get to this object we loop through the array and call the 
    setRecipe() function on all nested objects.
*/

function getRecipe(data) {
  const recipe = data;
  recipe.map((recipe) => setRecipe(recipe));
}

/*  
    setRecipe() takes the data from the JSON object
    and links it to the DOM.
*/

async function setRecipe(data) {
  /* 
    checkValue() checks to see if the individual strings inside
    of an array contain valid values(in this case not empty). only
    if a string contains atleast one character is it returned to 
    the array.
  */

  function checkValue(string) {
    if (string != "" && string != null) {
      return string;
    }
  }

  const recipeImg = document.querySelector(".recipe-img");
  const recipeTitle = document.querySelector(".recipe-title");
  const recipeCat = document.querySelector(".recipe-category");
  const ingridientList = document.querySelector(".ingridient-list");
  const instructions = document.querySelector(".instructions");
  const readMore = document.querySelector(".read-more");

  let ingridients = [
    data.strIngredient1,
    data.strIngredient2,
    data.strIngredient3,
    data.strIngredient4,
    data.strIngredient5,
    data.strIngredient6,
    data.strIngredient7,
    data.strIngredient8,
    data.strIngredient9,
    data.strIngredient10,
    data.strIngredient11,
    data.strIngredient12,
    data.strIngredient13,
    data.strIngredient14,
    data.strIngredient15,
    data.strIngredient16,
    data.strIngredient17,
    data.strIngredient18,
    data.strIngredient19,
    data.strIngredient20,
  ];

  let measures = [
    data.strMeasure1,
    data.strMeasure2,
    data.strMeasure3,
    data.strMeasure4,
    data.strMeasure5,
    data.strMeasure6,
    data.strMeasure7,
    data.strMeasure8,
    data.strMeasure9,
    data.strMeasure10,
    data.strMeasure11,
    data.strMeasure12,
    data.strMeasure13,
    data.strMeasure14,
    data.strMeasure15,
    data.strMeasure16,
    data.strMeasure17,
    data.strMeasure18,
    data.strMeasure19,
    data.strMeasure20,
  ];

  ingridients = ingridients.filter((str) => checkValue(str));
  measures = measures.filter((str) => checkValue(str));

  for (i = 0; i < ingridients.length; i++) {
    const row = document.createElement("div");
    const ing = document.createElement("p");
    const mes = document.createElement("p");
    const ingText = document.createTextNode(ingridients[i] + ":");
    const mesText = document.createTextNode(measures[i]);

    ing.appendChild(ingText);
    mes.appendChild(mesText);
    row.appendChild(ing);
    row.appendChild(mes);
    ingridientList.appendChild(row);
  }

  recipeImg.src = data.strMealThumb;
  recipeTitle.innerHTML = data.strMeal;
  recipeCat.innerHTML = data.strCategory;
  instructions.innerHTML = data.strInstructions;
  readMore.onclick = function (e) {
    console.log('click');
  };

  console.log(data);
  console.log(ingridients);
  console.log(measures);
}

fetchData();
