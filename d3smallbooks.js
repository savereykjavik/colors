




function setCommonAndScalesSmall() {
  thousandsS = viewArray[viewArrayiS];
  computeCommon();
  $("#test").css("font-size", textsize + "pt");
}


function startSmall() {
	getText( "books/tinyshades.txt", function (lines) {
        lines4 = lines;
        lastLayoutInput4 = lines;
        data4 = layoutLines(lastLayoutInput4);
        drawBookSmall(group4A, group4B, data4);
    });
    getText( "books/tinyshades.txt", function (lines) {
        lines5 = lines;
        lastLayoutInput5 = lines;
        data5 = layoutLines(lastLayoutInput5);
        drawBookSmall(group5A, group5B, data5);
    });
    getText( "books/tinyshades.txt", function (lines) {
        lines6 = lines;
        lastLayoutInput6 = lines;
        data6 = layoutLines(lastLayoutInput6);
        drawBookSmall(group6A, group6B, data6);
    });
};


function drawBookSmall(rect, text, words) {

  var bookrect = rect.selectAll("rect")
    .data(words);
  var booktext = text.selectAll("text")
    .data(words);

  //new
  bookrect.enter().append("rect");
  booktext.enter().append("text");

  // new and existing
  drawRectSmall(bookrect);
}



$(".list-inline li").click(function(){
    var value = $(this).attr('value');
    viewArrayiS = value;
    setCommonAndScales();

    if (isSortedS)
      sort();
    else
      resetSmall();
    drawSmall();
});


function drawSmall() {
  drawBookSmall(group4A, group4B, data4);
  drawBookSmall(group5A, group5B, data5);
  drawBookSmall(group6A, group6B, data6);
};



function resetSmall() {
  lastLayoutInput4 = lines4;
  lastLayoutInput5 = lines5;
  lastLayoutInput6 = lines6;
  data4 = layoutLines(lastLayoutInput4, false);
  data5 = layoutLines(lastLayoutInput5, false);
  data6 = layoutLines(lastLayoutInput6, false);
  lastJustifyForceS = false;
  isSortedS = false;
};


function sortSmall() {
  function sortbook(book) {
    var sortedline = [];

    for (var i = 0; i < book.length; i++) {
      var line = book[i];
      for (var j = 0; j < line.length; j++) {
        var word = line[j];
        sortedline.push(word);
      }
    }

    sortedline.sort(function(a,b) {
      var common = commonIndex(clean(getWord(a))) - commonIndex(clean(getWord(b)));
      return common != 0
          ? common
          : a.index - b.index;
    });

    return [sortedline];
  }

  lastLayoutInput4 = sortbook(lines4);
  lastLayoutInput5 = sortbook(lines5);
  lastLayoutInput6 = sortbook(lines6);
  data4 = sortLayout(layoutLines(lastLayoutInput4, true));
  data5 = sortLayout(layoutLines(lastLayoutInput5, true));
  data6 = sortLayout(layoutLines(lastLayoutInput6, true));
  lastJustifyForceS = true;
  isSortedS = true;
};

function reflowSmall() {
  data4 = layoutLines(lastLayoutInput4, lastJustifyForce);
  data5 = layoutLines(lastLayoutInput5, lastJustifyForce);
  data6 = layoutLines(lastLayoutInput6, lastJustifyForce);
};



function drawRectSmall(rect) {
  rect
    .classed("word", true)
    .classed("rect", true)
    .style("opacity", function(d) {
      return 1;
    })
    .style("stroke", function(d) {
      return strokecolor;
    })
    .style("stroke-width", function(d) {
        return d.common ? "0.5pt" : "0.8pt";
    })
    .style("stroke-opacity", function(d) {
        return 0.6;
    })
    .attr("rx", 0.2)
    .attr("ry", 0.2)

    .style("fill", function(d) {
        return blueScale(d.commoni);
    })

    .transition().duration(animationTime).ease("quad-out")
    .attr("x", function(d, i) {
      return d.x;
    })
    .attr("y", function(d,i) {
      return d.y * boxsideS;
    })
    .attr("width", function(d) { return d.width; })
    .attr("height", boxsideS);
}