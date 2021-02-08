document.getElementById("btn-submit").addEventListener("click", displayFoods)
displayDetails = (data, img, name) => {
    const displayDetails = document.getElementById("detail-foods");
    displayDetails.innerHTML = `
<img src="${img}">
<h5 class="meal-name">${name}</h5>
<p>Ingredients</p>
`
    ingraList(data.meals[0]);
}

function displayFoods() {
    document.getElementById("detail-foods").innerHTML = "";
    document.getElementById("food-category").innerHTML = "";
    document.getElementById("error").innerHTML = "";
    const foodDiv = document.getElementById("food-category");
    const input = document.getElementById("search-item").value;
    const url = `https://themealdb.com/api/json/v1/1/search.php?f=${input[0]}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.meals.length; i++) {
                let mealName = data.meals[i].strMeal;
                let mealImg = data.meals[i].strMealThumb;
                const displayDiv = document.createElement("div");
                displayDiv.className = "display-div";
                displayDiv.innerHTML = `
                <img src='${mealImg}'>
                <h5 class="meal-name">${mealName}</h5>
                `;
                foodDiv.appendChild(displayDiv);
                displayDiv.addEventListener('click', () => {
                    document.getElementById("detail-foods").innerHTML = "";
                    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
                        .then(res => res.json())
                        .then(data => displayDetails(data, mealImg, mealName))
                });
            }
        })
        .catch(error => {
            document.getElementById("error").innerHTML = `
            <h3>Your Food not found. please try another food.</h3>
        `
        })
}

function ingraList(data) {
    const ingredientList = Object.keys(data);
    let ul = document.createElement("ul");
    let list = [];
    for (let i = 9; i <= 28; i++) {
        list.push(ingredientList[i])
    }
    list.forEach((key, index) => {
        if (data[key] == null || data[key] == "") {
            ul.innerHTML = ul.innerHTML;
        }
        else {
            ul.innerHTML += `<li>${data[key]}</li>`;
        }
    });
    document.getElementById("detail-foods").appendChild(ul);
}