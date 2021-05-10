function drawUS1(data, response) {
    
    /**********************
    ***** BASIC SETUP *****
    **********************/

    // dynamic dimension sizing code adapted from
    // https://github.com/d3/d3-selection/issues/128
    const bbox = d3.select("#chart").node().getBoundingClientRect()

    const width = bbox.width;
    const height = bbox.height;
    const margin = {top: 50, left: 150, right: 50, bottom: 50};

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.bottom - margin.top;

    const svg = d3.select("#chart")
                    .select("svg")
                    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    const DURATION = 1000;




    /***********************
    ***** X & Y SCALES *****
    ***********************/

    let min = 350
    let max = 700

    let yGroup = "Education system";
   
    let xScale = d3
        .scaleLinear()
        .domain([min, max])
        .range([margin.left, plotWidth]);

    let yScale = d3.scaleBand()
        .domain(data.map(d => d[yGroup]))
        .range([margin.top, plotHeight])
        .padding(.5);


    
    
    /***************************************
    ***** X AXIS, AXIS LABEL, GRIDLINE *****
    ***************************************/

    

    let tickLength = 5
    let breaks = [350, 400, 450, 500, 550, 600, 650, 700]

    let xAxisBottom = d3
        .axisBottom(xScale)
        .tickSize(tickLength)
        .tickValues(breaks)
        .tickPadding(5)
        .tickFormat(function(n) {
            if (n === 350) {
            return 0
            } else {
            if (n === 700) {
                return "1,000"
            } else {
                return n
            }
            }
        })

    let yAxis = d3
        .axisLeft(yScale)
        .tickSize(0)
        .tickPadding(10)
    
    svg.selectAll(".xAxis")
        .attr("transform", "translate(0," + plotHeight + ")")
        .call(xAxisBottom)
        .selectAll("text")
        .attr("transform", "translate(0,5)")
        .style("text-anchor", "middle")
        .style("font", "16px Arial")

    svg.selectAll(".yAxis")
        .attr("transform", "translate(" + margin.left+ ",0)")
        .call(yAxis)
        //remove the y axis path (https://github.com/d3/d3-axis/issues/48)
        //.call(d => d.select(".domain").remove())
        .selectAll("text")
        .style("text-anchor", "end")
        .style("alignment-baseline", "middle")
        .style("font-weight", "bold")
        .style("font", "12px Arial")
        .style("fill", "black")

    

    let rectSize = 15
    let break1 = 375
    let break2 = 675

    let breakYPosition = plotHeight
    //add white rect 1
    svg.selectAll(".rectScaleBreak1")
        .attr("y", breakYPosition - 5)
        .attr("x", xScale(break1) - rectSize / 2)
        .attr("width", rectSize)
        .attr("height", rectSize)
        .style("fill", "white")
        .style("stroke", "white")
        .style("opacity", 1)

    //add white rect 2
    svg.selectAll(".rectScaleBreak2")
        .attr("y", breakYPosition - 5)
        .attr("x", xScale(break2) - rectSize / 2)
        .attr("width", rectSize)
        .attr("height", rectSize)
        .style("fill", "white")
        .style("stroke", "white")
        .style("opacity", 1)

    //add scale break lines
    svg.selectAll(".lineScaleBreak11")
        .attr("y1", breakYPosition + 5)
        .attr("y2", breakYPosition - 5)
        .attr("x1", xScale(break1) - rectSize / 2 - 5)
        .attr("x2", xScale(break1) - rectSize / 2 + 5)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
        .style("opacity", 1)
    svg.selectAll(".lineScaleBreak12")
        .attr("y1", breakYPosition + 5)
        .attr("y2", breakYPosition - 5)
        .attr("x1", xScale(break1) + rectSize / 2 - 5)
        .attr("x2", xScale(break1) + rectSize / 2 + 5)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
        .style("opacity", 1)

    svg.selectAll(".lineScaleBreak21")
        .attr("y1", breakYPosition + 5)
        .attr("y2", breakYPosition - 5)
        .attr("x1", xScale(break2) - rectSize / 2 - 5)
        .attr("x2", xScale(break2) - rectSize / 2 + 5)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
        .style("opacity", 1)
    svg.selectAll(".lineScaleBreak22")
        .attr("y1", breakYPosition + 5)
        .attr("y2", breakYPosition - 5)
        .attr("x1", xScale(break2) + rectSize / 2 - 5)
        .attr("x2", xScale(break2) + rectSize / 2 + 5)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
        .style("opacity", 1)

    //drawScoreGapLines
    let varScoreYear1 = "Year1 average score"
    let varScoreYear2 = "Year2 average score"

    let group = "Education system"
    let barHeight = 10

    let join_line = svg.selectAll(".gapLines").data(data)

    let newelementsLine = join_line
        .enter()
        .append("line")
        .attr("class", "gapLines")

    join_line
        .merge(newelementsLine)
        .attr("stroke-width", 2.5)
        .attr("stroke", "gray")
        .attr("x1", function(d) {
        return xScale(d[varScoreYear1])
        })
        .attr("x2", function(d) {
        return xScale(d[varScoreYear2])
        })
        .attr("y1", function(d) {
        return yScale(d[group]) + barHeight / 2
        })
        .attr("y2", function(d) {
        return yScale(d[group]) + barHeight / 2
        })

    join_line.exit().remove()
    
    
    //draw circle

    let colorYear1 = "#071D49"
    let colorYear2 = "#FBB03B"
    let colorBorder = "#576F7F"

    let circleR = 25


    let vars = [varScoreYear1, varScoreYear2]
    let varsColors = [colorYear1, colorYear2]

    for (var i = 0; i < vars.length; i++) {
        //draw circles
        let join = svg.selectAll(".scoreCircle" + i).data(data)

        let newelements = join
        .enter()
        .append("circle")
        .attr("class", function(d) {
            return "scoreCircle" + i
        })

        join
        .merge(newelements)
        .attr("cx", function(d) {
            return xScale(d[vars[i]])
        })
        .attr("cy", function(d) {
            return yScale(d[group]) + barHeight / 2
        })
        .attr("r", circleR)
        .style("fill", function(d) {})
        .style("fill", varsColors[i])
        .style("opacity", 1)
        .style("stroke", colorBorder)
        .style("stroke-width", "1px")

        join.exit().remove()
    }

    //drawCircleLabels
    //draw labels for year 1 circles
    let join_score = svg.selectAll(".year1Labels").data(data)
    let newelements_score = join_score.enter().append("text")

    join_score
      .merge(newelements_score)
      .attr(
        "class",
        d =>
          `year1Labels ${d[group]}-year1Labels`)
      .attr("x", function(d) {
        if (d[varScoreYear1] < d[varScoreYear2]) {
          return xScale(d[varScoreYear1]) - 39
        } else {
          return xScale(d[varScoreYear1]) + 10
        }
      })
      .attr("y", function(d) {
        return yScale(d[group])
      })
      .style("text-anchor", "start")
      .style("alignment-baseline", "middle")
      .style("font", "12px Arial")
      .text(function(d) {
        return Math.round(d[varScoreYear1])
      })

    join_score.exit().remove()

    //draw labels for year 2 circles
    let join_score2 = svg.selectAll(".year2Labels").data(data)

    let newelements_score2 = join_score2.enter().append("text")

    join_score2
      .merge(newelements_score2)
      .attr(
        "class",
        d =>
          `year2Labels ${d[group]}-year2Labels`)
      .attr("x", function(d) {
        if (d[varScoreYear1] > d[varScoreYear2]) {
          return xScale(d[varScoreYear2]) - 35
        } else {
          return xScale(d[varScoreYear2]) + 10
        }
      })
      .attr("y", function(d) {
        return yScale(d[group])
      })
      .style("text-anchor", "start")
      .style("alignment-baseline", "middle")
      .style("font", "12px Arial")
      .text(function(d) {
        return Math.round(d[varScoreYear2])
      })

    join_score2.exit().remove()


    


    /***************************************
    ***** Y AXIS, AXIS LABEL, GRIDLINE *****
    ***************************************/


    // svg.select(".yGrid")
    //     .attr("transform", `translate(${margin.left}, ${margin.top})`) //+ 1 * yScale.bandwidth()
    //     .call(d3.axisLeft(yScale)
    //         .tickSize(-(plotWidth))
    //         .tickFormat("")
    //     );

    
    /*************************
    ***** TITLE, CAPTION *****
    *************************/

    // Create header grouping
    const header = svg.select("#header");

    // chart title
    header.selectAll(".chartTitle")
        .data([{"label": "Low and high performers of the US 4th-grade students on the TIMSS mathematics scale"}])
        .enter()
        .append("text")
        .text(function(d) {return d.label;})
        .attr("x", margin.left)
        .attr("y", margin.top * 0.5)
        .attr("text-anchor", "start")
        .attr("class", "chartTitle")
        .style("font-family", "sans-serif")
        .style("font-weight", "bold")
        .style("font-size", plotWidth/45) //to make the font size responsive
        //console.log(plotWidth);

    // Create footer grouping
    const footer = svg.select("#footer");

    // Caption with data source
    footer.selectAll(".captionText")
        .data([{"label": "Data source: ePIRLS 2016 data"}])
        .enter()
        .append("text")
        .text(function(d) {return d.label;})
        .attr("x", margin.left)
        .attr("y", plotHeight + margin.bottom*0.5)
        .attr("text-anchor", "start")
        .attr("class", "captionText")
    


    
    

    


}
