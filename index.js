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

function setRecipe(data) {
  /* 
    checkValue() checks to see if the individual strings inside
    of an array contain valid values (in this case meaning not empty). only
    if a string contains atleast one character is it returned to 
    the array.
  */

  function checkValue(string) {
    if (string != "" && string != null) {
      return string;
    }
  }

  /* 
    createArray() takes a string as its first parameter.
    The string is then split by the value of the second parameter.
    Each part of the string is stored in an array wich is 
    returned by the function.
  */

  function createArray(string, splitBy) {
    if (checkValue(string)) {
      const arr = string.split(splitBy);
      return arr;
    }
  }

  //DOM elements for future reference:
  const recipeImg = document.querySelector(".recipe-img");
  const recipeTitle = document.querySelector(".recipe-title");
  const recipeCat = document.querySelector(".recipe-category");
  const tagRow = document.querySelector(".tags");
  const ingredientList = document.querySelector(".ingredient-list");
  const instructionsContainer = document.querySelector(
    ".instructions-container"
  );
  const instructions = document.querySelector(".instructions");
  const readMore = document.querySelector(".read-more");
  const recipeOriginBg = document.querySelector(".recipe-bg");
  const originalRecipeBtn = document.querySelector(".original-recipe");

  // API data arrays:
  const tags = createArray(data.strTags, ",");

  let ingredients = [
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

  // Remove empty strings from arrays:
  ingredients = ingredients.filter((str) => checkValue(str));
  measures = measures.filter((str) => checkValue(str));

  // DOM manipulation:
  for (i = 0; i < ingredients.length; i++) {
    const row = document.createElement("div");
    const ing = document.createElement("p");
    const mes = document.createElement("p");
    const ingText = document.createTextNode(ingredients[i] + ":");
    const mesText = document.createTextNode(measures[i]);

    ing.appendChild(ingText);
    mes.appendChild(mesText);
    mes.classList.add("align-right");
    row.appendChild(ing);
    row.appendChild(mes);
    ingredientList.appendChild(row);
  }

  if (tags) {
    for (i = 0; i < tags.length; i++) {
      const tag = document.createElement("span");
      const tagText = document.createTextNode(tags[i]);

      tag.appendChild(tagText);
      tagRow.appendChild(tag);
    }
  }

  recipeImg.src = data.strMealThumb;
  recipeTitle.innerHTML = data.strMeal;
  recipeCat.innerHTML = data.strCategory;
  instructions.innerHTML = data.strInstructions;
  recipeOriginBg.style.backgroundImage = "url(" + data.strMealThumb + ")";
  originalRecipeBtn.href = data.strSource;
  readMore.onclick = function () {
    instructionsContainer.classList.add("extended");
  };
}

fetchData();
