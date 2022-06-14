const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');
const reloadBtn = document.getElementById('reload');
const searchBtn = document.getElementById('search');
const serchTerm = document.getElementById('search-term');
const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');


getRandomMeal();
getRandomMeal();
getRandomMeal();
fetchFavMeals();

reloadBtn.addEventListener('click', ()=>{
    location.reload();
});

async function getRandomMeal(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");//saco una receta random de la api
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealById(id){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);

    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}


function addMeal(mealData, random = false){
    const meal = document.createElement('div');
    meal.classList.add('meal');//creo que aca se llamaba meals
    meal.innerHTML = `
    <div class="meal-header">
    ${random ? `<span class="random">
        Random Recipe
    </span>`:''}
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
            <i class="fas fa-heart"></i>
        </button>
    </div>`;

    const btn = meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener("click", () => {
        if(btn.classList.contains('active')){
            removeMealLS(mealData.idMeal)
            btn.classList.remove("active");
        }else{
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }
        favoriteContainer.innerHTML = "";
        fetchFavMeals();
    });

    meal.addEventListener('click',()=>{
        showMealInfo(mealData);
    }); 

    
    mealsEl.appendChild(meal);
}

function removeMealLS(mealId){
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function addMealLS(mealId){
    const mealIds = getMealsLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals(){
    //clean the container
    favoriteContainer.innerHTML = "";

    const mealIds = getMealsLS();

    const meals = []; 

    for(let i=0; i < mealIds.length; i++){
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);

        addMealFav(meal);
    }
}

function addMealFav(mealData){
    const favMeal = document.createElement('li');
  
    favMeal.innerHTML = `
    <li>
            <img 
            src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            /><span>${mealData.strMeal}</span>
            <button class='clear'><i class="fa-solid fa-rectangle-xmark"></i></button>
          </li>`;

    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click',()=>{
        removeMealLS(mealData.idMeal);

        fetchFavMeals();
    });

    favMeal.addEventListener('click',()=>{
        showMealInfo(mealData);
    }); 

    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData){
    mealInfoEl.innerHTML =  '';

    //update the meal info
    const mealEl = document.createElement('div');
    mealEl.classList.add('recipe-container');

    const ingredients = [];
    //get the infredients and measures
    for(let i=1; i<20; i++){
        if(mealData['strIngredient'+i]){
            ingredients.push(`${mealData['strIngredient' + i]} --
            ${mealData['strMeasure' + i]}`)
        }else{
            break;
        }
    }

    mealEl.innerHTML = ` 
        <h1>${mealData.strMeal}</h1>
        <img id="img-recipe"
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients</h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
       `
    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
} 

searchBtn.addEventListener('click', async ()=>{
    const search = serchTerm.value;
    const meals = await getMealsBySearch(search);

    mealsEl.innerHTML= "";
    mealPopup.classList.add('hidden');
    
    if(meals){
        meals.forEach((meal) =>{
            addMeal(meal);
        });
    }
    
});

popupCloseBtn.addEventListener('click',()=>{
    mealPopup.classList.add('hidden');
});