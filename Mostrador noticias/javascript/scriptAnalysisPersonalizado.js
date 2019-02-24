let button = $('#submit');

button.click(function () {
    let text = $('#input').val();
    positiveArray = positiveString.split("\n");
    negativeArray = negativeString.split("\n");
    let positiveWords = 0;
    let negativeWords = 0;
    let paragraphToArray = text.split(' ');
    for (let k = 0; k < positiveArray.length; k++) {
        if (paragraphToArray.includes(positiveArray[k])) positiveWords++;
    }
    for (let k = 0; k < negativeArray.length; k++) {
        if (paragraphToArray.includes(negativeArray[k])) negativeWords++;
    }
    localStorage.setItem("positive", JSON.stringify(positiveWords));
    localStorage.setItem("negative", JSON.stringify(negativeWords));
    localStorage.setItem("wordscount", JSON.stringify(paragraphToArray.length));
    window.location.href = "analisis.html";

})