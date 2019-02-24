
let button = $('#button');
let output = $('#output');
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let responseObject;
let favoriteButtonList;

function insertData(news, newsObject, i) {
    news += "<div class='cube'>";
    news += "<h3 class='headline'>Headline: " + newsObject.response.docs[i].headline.main + "</h3>";
    news += "<p class='date'>Date: '" + newsObject.response.docs[i].pub_date + "</p>";
    news += "<p class='paragraph'>Main Paragraph: " + newsObject.response.docs[i].lead_paragraph + "</p>";
    news += "<p class='url'>Link: " + "<a href=\'" + newsObject.response.docs[i].web_url + "\'>" + newsObject.response.docs[i].web_url + "</a></p>";
    news += "<p class='id'>ID: " + newsObject.response.docs[i]._id + "</p>";
    news += "<input type='button' class='favorite' id='" + newsObject.response.docs[i]._id + "' value='Add Favorite'/>";
    news += "</div>";
    return news;
}


button.click(function(){
  let year = $('#year').val();
  let month = $('#month').val();
  let keyword = $('#keyword').val();
    if (year === '' || month === '') {
        document.getElementById('output').innerHTML = "<p class='warning'>Missing requirements.<p>";
    } else if (parseInt(year) < 1851 || parseInt(year) > currentYear || parseInt(month) < 0 || parseInt(month) > 11 || (parseInt(year) === currentYear && parseInt(month) > (currentMonth + 1))){
        document.getElementById('output').innerHTML = "<p class='warning'>Error en los datos. No podemos viajar antes del 1851 y tampoco al futuro.<p>";
    } else {
    let request = 'https://api.nytimes.com/svc/archive/v1/' + year + '/' + month + '.json?api-key=ruEZdCqikltz1plbfpKQinaMnmLXKFXj';
    fetch(request)
      .then(function(response){
        return response.json();
      })
      .then(function(newsObject){
        let arrlen = newsObject.response.docs.length;
        let news = '';
          if (arrlen === 0) {
              document.getElementById('output').innerHTML = "<p class='warning'>No data found.<p>";
          } else {
              let found = false;
              let keywordVals = keyword.split(" ");
              for (let i = 0; i < arrlen; i++) {
                  if (keyword === '') {
                      if (newsObject.response.docs[i].lead_paragraph != null) {
                          responseObject = newsObject;
                          found = true;
                          news = insertData(news, newsObject, i);
                      }
                  } else if (keywordVals.length > 1) {
                      let keywordsLength = newsObject.response.docs[i].keywords.length;
                      let keywordsArr = newsObject.response.docs[i].keywords;
                      let count = 0;
                      for(let j = 0; j < keywordsLength; j++) {
                         for (let z = 0; z < keywordVals.length; z++) {
                             if (keywordsArr[j].value.includes(keywordVals[z].toUpperCase())) {
                                 count++;
                             }
                             if (count === keywordVals.length) {
                                 responseObject = newsObject;
                                 news = insertData(news, newsObject, i);
                                 found = true;
                                 break;
                             }
                             
                          }
                          if (found) {
                              break;
                          }
                      }

                  } else {
                      let keywordsLength = newsObject.response.docs[i].keywords.length;
                      let keywordsArr = newsObject.response.docs[i].keywords;
                      
                      for (let j = 0; j < keywordsLength; j++) {
                          if (keywordsArr[j].value.includes(keyword.toUpperCase())) {
                              responseObject = newsObject;
                              news = insertData(news, newsObject, i);
                              found = true;
                              break;
                          }
                      }  
                  }

              }
              if (!found) {
                  document.getElementById('output').innerHTML = "<p class='warning'>No data found.<p>";
              } else {
                  document.getElementById('output').innerHTML = news;
                  favoriteButtonList = document.getElementsByClassName('favorite');
                  for (let i = 0; i < favoriteButtonList.length; i++) {
                      favoriteButtonList[i].onclick = function () {
                          toAdd(this.getAttribute('id'));
                      };
                  }
              }

        }

      })
  }

});

function toAdd(id) {
    responseObject.response.docs.forEach(function (element) {
        if (element._id == id) {
            let noticia = [element];
            let saved = JSON.parse(localStorage.getItem("noticia"));
            
            if (saved !== null) {
                let repeated;
                saved.forEach(function (one) {
                    if (one._id === id) repeated = true;
                });
                if (!repeated) {
                    noticia = noticia.concat(saved);
                } else {
                    noticia = saved;
                }
        }
        localStorage.setItem("noticia", JSON.stringify(noticia));
        }
    })
}



