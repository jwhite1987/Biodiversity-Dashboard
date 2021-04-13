const source = "samples.json";

d3.json(source).then(function(data) {
  console.log(data);
  });

const dataPromise = d3.json(source);
console.log("Data Promise: ", dataPromise);

function init() {
  d3.json(source).then((d) => {
    var sampleValues = d.samples.map(a => a.sample_values);
    console.log(sampleValues)
    var otuIds = d.samples.map(a => a.otu_ids)
    var otuLabels = d.samples.map(a => a.otu_labels);
    var demoInfo = d.metadata[0];
        var wFreq = demoInfo.wfreq;
    var id = demoInfo.id;
    var dropdownIds = d.metadata.map(a => a.id)
    console.log(demoInfo)
    var ethnicity = demoInfo.ethnicity;
    var gender = demoInfo.gender;
    var age = demoInfo.age;
    var location = demoInfo.location;
    var bbtype = demoInfo.bbtype;
    var wfreq = demoInfo.wfreq;

    d3.select("#selDataset")
      .selectAll('option')
      .data(dropdownIds)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => d);

    d3.select("#sample-metadata").append('ul')
    var ul = d3.select('ul')
    ul.append('li').text(`ID: ${demoInfo.id}`)
      .append('li').text(`Ethnicity: ${demoInfo.ethnicity}`)
      .append('li').text(`Gender: ${demoInfo.gender}`)
      .append('li').text(`Age: ${demoInfo.age}`)
      .append('li').text(`Location: ${demoInfo.location}`)
      .append('li').text(`BBType: ${demoInfo.bbtype}`)
      .append('li').text(`WFreq: ${demoInfo.wfreq}`);


    slicedData = sampleValues[0].slice(0, 10).reverse();
    secondSlice = otuIds[0].slice(0, 10).reverse();
    thirdSlice = otuLabels[0].slice(0, 10).reverse();

    var stringIds = [];

    secondSlice.forEach(a => {
      stringIds.push(`OTU ID: ${a}`);
    });

    var data = [{
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
    var layout = {
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
    var data2 = [{
      x: stringIds,
      y: slicedData,
      mode: 'markers',
      marker: {
        size: slicedData,
        color: 'rgb(44, 160, 101)'
      }
    }];
    var layout2 = {
      // title: 'Marker Size',
      showlegend: false,
      height: 500,
      width: 800
    };
    // var data2 = [trace1];
    console.log(slicedData, secondSlice, thirdSlice);

    var data3 = [{
      domain: { x: [0, 1], y: [0, 1]},
      value: wFreq,
      title: { text: 'Wash Frequency' },
      type: 'indicator',
      mode: 'gauge+number'
    }];
    var newLayout = { width: 600, height: 500, margin: { t: 0, b: 0}};

    var CHART = d3.selectAll("#bar").node();
    var CHART2 = d3.selectAll("#bubble").node();
    var CHART3 = d3.selectAll("#gauge").node();


    Plotly.newPlot(CHART, data, layout);
    Plotly.newPlot(CHART2, data2, layout2);
    Plotly.newPlot(CHART3, data3, newLayout);
  })
};

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
  d3.json(source).then((data) => {
    var sampleValues = data.samples.map(object => object.sample_values);
    var otuIds = data.samples.map(object => object.otu_ids);
    var otuLabels = data.samples.map(object => object.otu_labels);
    var dropdown = d3.select("#selDataset");
    var dataset = dropdown.property("value");

    var CHART = d3.selectAll("#plot").node();

    var x = [];
    var y = [];
    if (dataset === data.samples.id[x]) {
        slicedData = sampleValues[x].slice(0, 10).reverse();
        secondSlice = otuIds[x].slice(0, 10).reverse();
        thirdSlice = otuLabels[x].slice(0, 10).reverse();

        var stringIds = [];

        secondSlice.forEach(a => {
          stringIds.push(`OTU ID: ${a}`);
        x = slicedData;
        y = secondSlice;

      });
    // updating();

    Plotly.restyle(CHART, "x", [x]);
    Plotly.restyle(CHART, "y", [y]);
  }}


)};



init();
