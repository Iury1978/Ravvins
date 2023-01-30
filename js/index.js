const ratings = document.querySelectorAll(".rating");
console.log('ratings: ', ratings);

if (ratings.length > 0) {
  initRatings();
}

// основная функция
function initRatings() {
  let ratingActive, ratingValue;
  // проход по всем рейтингам на странице
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }
  // Инициализируем конкретный рейтинг
  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();

    // рейтинг вводить можно только при налиции модификатора
    //  не во всех местах нужно вводить, где-то только отображать
    if (rating.classList.contains("rating_set")) {
      setRating(rating);
    }
  }

  // инициализация переменных(объектов может быть много, поэтому получаем
  // не у документа,  а у каждого конкретного рейтинга)
  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
  }
  // измеряем ширину активных звезд (видимую ширину контейнера , в котором полоса звезд)
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  // Возможность уазать оценку
  function setRating(rating) {
    // получаю массив из радиокнопок, что бы их прослушивать
    const ratingItems = rating.querySelectorAll(".rating__item");
    console.log('ratingItems: ', ratingItems);
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", function (e) {
        // обновление переменных( рейтингов может быть много опять же )
        initRatingVars(rating);
        // обновление активных звезд
        setRatingActiveWidth(ratingItem.value);
        console.log("ratingItem.value: ", ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        // обновление активных звезд (возвращаем в то состояние, что было)
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        // обновление переменных(на тачскринах нет наведения мыши
        //  поэтому тот обновляем на всякий случай)
        initRatingVars(rating);

        // отобразить указанную оценку(индекс массива)
        ratingValue.innerHTML = 5 - index;
        setRatingActiveWidth();
      });
    }
  }
}
