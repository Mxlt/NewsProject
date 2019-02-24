let dataset;

$(document).ready(function () {
    dataset = JSON.parse(localStorage.getItem("history"));
    drawChart(dataset);
})

function drawChart(dataset) {
    let svgWidth = 600, svgHeight = 400;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;
 
    let svg = d3.select('svg')
     .attr("width", svgWidth)
     .attr("height", svgHeight);
   
    let g = svg.append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scaleLinear()
    .rangeRound([0, width]);
    
    let y = d3.scaleLinear()
     .rangeRound([height, 0]);
   
    let line = d3.line()
        .x(function (d) { return x(d.count) })
        .y(function (d) { return y(d.neutral) })
    x.domain(d3.extent(dataset, function (d) { return d.count }));
    y.domain([0, 100]);

    let line2 = d3.line()
        .x(function (d) { return x(d.count) })
        .y(function (d) { return y(d.positive) });


    let line3 = d3.line()
        .x(function (d) { return x(d.count) })
        .y(function (d) { return y(d.negative) });


    g.append("g")
        .attr("fill", "#000")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain");
        

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Percentage %");

    g.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    g.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line2);

    g.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line3);
}

