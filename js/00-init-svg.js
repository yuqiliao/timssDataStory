// setup SVG canvas once; scroll triggers just update this
// removes need to worry about removing and appending g containers in subsequent
//  functions; just transition content in and out.

function svg_init() {

    /*************************
    ***** SET DIMENSIONS *****
    *************************/

    // dynamic dimension sizing code adapted from
    // https://github.com/d3/d3-selection/issues/128
    const bbox = d3.select("#chart").node().getBoundingClientRect()
    const width = bbox.width;
    const height = bbox.height;
    const margin = {top: 30, left: 30, right: 30, bottom: 30};

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.bottom - margin.top;
    
    const smallMultiplePadding = 30


    /**********************
    ***** APPEND DIVS *****
    **********************/

    d3.select("#chart")
        .append("svg")
        .attr("class", "chartContainer")
        .attr("width", plotWidth)
        .attr("height", plotHeight)
        .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          )

    /*******************
    ***** TOOLTIPS *****
    ********************/
    
    d3.select("#chart")
        .append("div")
        .attr("class", "tooltipRangeChart")

    d3.select("#chart")
        .append("div")
        .attr("class", "tooltipBarChart")



    const svg = d3.select("#chart").select("svg");

    /*****************************
    ***** APPEND AXES & GRID *****
    *****************************/

    // x-axis
    svg.append("g")
        .attr("class", "xAxis")
    

    // y-axis
    svg.append("g")
        .attr("class", "yAxis")

    // gridlines (basically just an axis with invisible ticks and labels)
    svg.append("g")
        .attr("class", "xGrid xGrid0")
    svg.append("g")
        .attr("class", "xGrid xGrid1")
    svg.append("g")
        .attr("class", "xGrid xGrid2")
    svg.append("g")
        .attr("class", "xGrid xGrid3")
    svg.append("g")
        .attr("class", "xGrid xGrid4")

    svg.append("g")
        .attr("class", "yGrid")


    svg.append("rect")
        .attr("class", "rectScaleBreak1")
    svg.append("rect")
        .attr("class", "rectScaleBreak2")
    
    svg.append("line")
        .attr("class", "lineScaleBreak11")
    svg.append("line")
        .attr("class", "lineScaleBreak12")
    svg.append("line")
        .attr("class", "lineScaleBreak21")
    svg.append("line")
        .attr("class", "lineScaleBreak22")

    /*****************************
    ***** APPEND AXIS LABELS *****
    *****************************/

    // empty placeholder to transition in correct text for each graph
    svg.selectAll(".xLabel")
        .data([{"label": ""}])
        .enter()
        .append("text")
        .attr("class", "xLabel")
        //.attr("transform", `translate(0, ${plotHeight + margin.bottom + 10})`)
        .text(d => d.label)
        .attr("text-anchor", "middle")
        .style("alignment-baseline", "baseline")
        .attr("x", (0.5 * (plotWidth + margin.left)))
        .attr("y", margin.top + plotHeight + margin.bottom - 5);


    /**************************************
    ***** APPEND PLOT, HEADER, FOOTER *****
    **************************************/

    // for main chart elements (paths, lines, circles, rects, etc. it's all called "plot" here)
    svg.append("g")
        .attr("id", "plot")

    // header for titles
    svg.append("g")
        .attr("id", "header");

    // footer for source information and other notes
    svg.append("g")
        .attr("id", "footer");

    

    /*************************
    ***** OTHER ELEMENTS *****
    **************************/
   


}
