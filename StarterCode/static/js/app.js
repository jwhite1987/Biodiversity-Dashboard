const source = "samples.json";

d3.json(source).then(function(data) {
  console.log(data);
  });

const dataPromise = d3.json(source);
console.log("Data Promise: ", dataPromise);

function init() {
  d3.json(source).then((d) => {
    var sampleValues = d.samples.map(a => a.sample_values);
    var otuIds = d.samples.map(a => a.otu_ids)
    var otuLabels = d.samples.map(a => a.otu_labels);
    var demoInfo = `${d.metadata[0]}`;
    console.log(demoInfo);
    d3.select("sample-metadata")
      .append(demoInfo)
      .enter();

    slicedData = sampleValues[0].slice(0, 10).reverse();
    secondSlice = otuIds[0].slice(0, 10).reverse();
    thirdSlice = otuLabels[0].slice(0, 10).reverse();

    var stringIds = [];

    secondSlice.forEach(a => {
      stringIds.push(`OTU ID: ${a}`);
    });

    data = [{
      x: slicedData,
      y: stringIds,
      type: "bar",
      text: thirdSlice,
      orientation: "h",
      marker: {
        color: 'rgba(55,128,191,0.6)',
        width: 10
      }
    }];
    layout = {
        title: "Top Ten Bacteria",
        hovermode: "closest",
        hoverlabel: { bgcolor: "#FFF" },
        legend: {orientation: 'h', y: -0.3},
        xaxis: {
          // tickformat: ".0%",
          title: "Number of Bacteria",
          zeroline: false
        },
        yaxis: {
        //   title: "Bacteria ID",
          zeroline: false,
          showticklabels: true,
          // tickangle: -20,
          tickfont: {
            size: 10,
            color: 'black'
    },
        },
        height: 500,
        width: 500
      };
    var trace1 = {
      x: stringIds,
      y: slicedData,
      mode: 'markers',
      marker: {
        size: slicedData,
        color: stringIds
      }
    };
    var layout2 = {
      // title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };
    var data2 = [{trace1}];
    console.log(slicedData, secondSlice, thirdSlice);
    Plotly.newPlot("bar", data, layout);
    Plotly.newPlot("bubble", data2, layout2)
  })
}

// Haven't finished this part below yet/ Ignore

// function updatePlotly() {
//   d3.json(source).then((data) => {
//     var sampleValues = data.samples.map(object => object.sample_values);
//     var otuIds = data.samples.map(object => object.otu_ids);
//     var otuLabels = data.samples.map(object => object.otu_labels);
//
//     var dropdownMenu = d3.select("#selDataset");
//     var options = dropdownMenu.selectAll("option")
//       .data(source)
//       .enter()
//       .append("option")
//       .text(d => d.samples.id);
//
//     var newSV = sampleValues.sort(function compareFunction(first, second) {
//       return second - first;
//
//     });
//
//     console.log(otuIds);
//     var trace1 = {
//       type: "bar",
//       x: newSV,
//       y: otuIds,
//       orientation: 'h'
//     }
//
//     var data = [trace1];
//
//     var layout = {
//       title: 'Things',
//     };
//
//     Plotly.newPlot("bar", data, layout);
//
//   });
// }

init();
