let noticia;
let storeAnalysisHistory;

$(document).ready(function () {
    storeAnalysisHistory = JSON.parse(localStorage.getItem("history"));
    noticia = JSON.parse(localStorage.getItem("noticia"));
    if (noticia !== null && noticia.length !== 0) {
        let noticiasLength = noticia.length;
        let news = '';
        for (let i = 0; i < noticiasLength; i++) {
            news = insertData(news, noticia, i);
        }
        document.getElementById('favs').innerHTML = news;
        let eliminateButtonList = document.getElementsByClassName('eliminate');
        for (let i = 0; i < eliminateButtonList.length; i++) {
            eliminateButtonList[i].onclick = function () {
                toEliminate(this.getAttribute('id'));
                $(this).closest('.cube').remove();
            };
        }
        let analizeButtonList = document.getElementsByClassName('analize');
        for (let i = 0; i < analizeButtonList.length; i++) {
            analizeButtonList[i].onclick = function () {
                toAnalize(this.getAttribute('id'));
            }
        }

    } else {
        let empty = "<p class='aviso'>No tienes favoritos aniadidos</p>";
        document.getElementById('favs').innerHTML = empty;
    }

})

function toEliminate(id) {
    let long = noticia.length;
    for (let j = 0; j < long; j++) {
        if (noticia[j]._id === id) {
            noticia.splice(j, 1);
            break;
        }
    }
    localStorage.setItem("noticia", JSON.stringify(noticia));
}

function insertData(news, objectArr, i) {
    news += "<div class='cube'>";
    news += "<h3 class='headline'>Headline: " + objectArr[i].headline.main + "</h3>";
    news += "<p class='date'>Date: '" + objectArr[i].pub_date + "</p>";
    news += "<p class='paragraph'>Main Paragraph: " + objectArr[i].lead_paragraph + "</p>";
    news += "<p class='url'>Link: " + "<a href=\'" + objectArr[i].web_url + "\'>" + objectArr[i].web_url + "</a></p>";
    news += "<p class='id'>ID: " + objectArr[i]._id + "</p>";
    news += "<input type='button' class='eliminate btn btn-default' id='" + objectArr[i]._id + "' value='Eliminate'/>";
    news += "<input type='button' class='analize btn btn-default' id='" + objectArr[i]._id + i + "' value='Analize' />";
    news += "</div>";
    return news;
}

function toAnalize(id) {

    positiveArray = positiveString.split("\n");
    negativeArray = negativeString.split("\n");
    let positiveWords = 0;
    let negativeWords = 0;
    let long = noticia.length;
    for (let j = 0; j < long; j++) {
        if ((noticia[j]._id + j) === id) {
            let paragraphToArray = noticia[j].lead_paragraph.split(' ');
            for (let k = 0; k < positiveArray.length; k++) {
                if(paragraphToArray.includes(positiveArray[k])) positiveWords++;
            }
            for (let k = 0; k < negativeArray.length; k++) {
                if (paragraphToArray.includes(negativeArray[k])) negativeWords++;
            }
            localStorage.setItem("positive", JSON.stringify(positiveWords));
            localStorage.setItem("negative", JSON.stringify(negativeWords));
            localStorage.setItem("wordscount", JSON.stringify(paragraphToArray.length));
            if (storeAnalysisHistory === null) {
                storeAnalysisHistory = [];
                let element = {
                    'count': 0,
                    'positive': (positiveWords / paragraphToArray.length * 100),
                    'negative': (negativeWords / paragraphToArray.length * 100),
                    'neutral': (100 - (positiveWords / paragraphToArray.length * 100) - (negativeWords / paragraphToArray.length * 100))
                }
                storeAnalysisHistory.push(element);
            } else {
                let element = {
                    'count': storeAnalysisHistory.length + 1,
                    'positive': (positiveWords / paragraphToArray.length * 100),
                    'negative': (negativeWords / paragraphToArray.length * 100),
                    'neutral': (100 - (positiveWords / paragraphToArray.length * 100) - (negativeWords / paragraphToArray.length * 100))
                }
                storeAnalysisHistory.push(element);
            }
            localStorage.setItem("history", JSON.stringify(storeAnalysisHistory));
            window.location.href = "analisis.html";
            break;
        }
    }

};


