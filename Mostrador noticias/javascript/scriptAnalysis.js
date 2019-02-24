$(document).ready(function () {
    let positive = JSON.parse(localStorage.getItem("positive"));
    let negative = JSON.parse(localStorage.getItem("negative"));
    let words = JSON.parse(localStorage.getItem("wordscount"));
    let message = ''
    message += "<p class='analysisResult'>There were " + positive + " positive words and " + negative + " negative words in the main paragraph.</p>";
    message += "<p class='analysisResult'>There were " + words + " words in the main paragraph</p>";
    let positive_percentage = positive / words * 100;
    let negative_percentage = negative / words * 100;
    let neutral_percentage = 100 - positive_percentage - negative_percentage;
    message += "<p class='analysisResult'>" + positive_percentage + "% of the words were positive, and " + negative_percentage + "% of the words were negative.</p>";
    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Positive-Negative-Neutral"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: [
                { y: neutral_percentage, label: "Neutral" },
                { y: positive_percentage, label: "Positive" },
                { y: negative_percentage, label: "Negative" }
            ]
        }]
    });
    chart.render();
                                    
    document.getElementById("Message").innerHTML = message;
})

let button = $('#historial');

button.click(function () {
    window.location.href = "historial.html";
})