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
      title: 'Bubble Chart',
      showlegend: false,
      height: 500,
      width: 800
    };

    console.log(slicedData, secondSlice, thirdSlice);

    var data3 = [{
      domain: { x: [0, 1], y: [0, 1]},
      value: wFreq,
      title: { text: 'Wash Frequency' },
      type: 'indicator',
      mode: 'gauge+number',
      gauge: {
        bar: { color: 'darkblue' }
      }
    }];
    var newLayout = { width: 600, height: 500, margin: { t: 25, b: 25, l: 25, r: 25}};

    var CHART = d3.selectAll("#bar").node();
    var CHART2 = d3.selectAll("#bubble").node();
    var CHART3 = d3.selectAll("#gauge").node();


    Plotly.newPlot(CHART, data, layout);
    Plotly.newPlot(CHART2, data2, layout2);
    Plotly.newPlot(CHART3, data3, newLayout);
  })
};

d3.selectAll("#selDataset").on("change", optionChanged);
var dropdown = d3.select("#selDataset");
var dataset = dropdown.property("value");

function optionChanged(dataset) {

  d3.json(source).then((data) => {
    var metadata = data.metadata;
    var input = metadata.filter(a => a.id.toString() == dataset)[0];

    var samples = data.samples;
    var input2 = samples.filter(a => a.id.toString() === dataset)[0];

    var ids = input.id;
    var eth = input.ethnicity;
    var gender = input.gender;
    var age = input.age;
    var location = input.location;
    var bbType = input.bbtype;
    var wFreq = input.wfreq;


    var ul = d3.selectAll("ul")
    ul
      .html("")
      .append('li').text(`ID: ${ids}`)
      .append('li').text(`Ethnicity: ${eth}`)
      .append('li').text(`Gender: ${gender}`)
      .append('li').text(`Age: ${age}`)
      .append('li').text(`Location: ${location}`)
      .append('li').text(`BBType: ${bbType}`)
      .append('li').text(`WFreq: ${wFreq}`);

    var CHART = d3.selectAll("#bar").node();
    var CHART2 = d3.selectAll("#bubble").node();
    var CHART3 = d3.selectAll("#gauge").node();

    console.log(input2.sample_values);

    slicedData = input2.sample_values.slice(0, 10).reverse();
    secondSlice = input2.otu_ids.slice(0, 10).reverse();
    thirdSlice = input2.otu_labels.slice(0, 10).reverse();
    console.log(slicedData, secondSlice, thirdSlice);

    var stringIds = [];

    secondSlice.forEach(a => {
      stringIds.push(`OTU ID: ${a}`);
    });


    x = [];
    y = [];
    newText = [];
    gaugeValue = input.wfreq;
    size = [];
    x = slicedData;
    y = stringIds;
    newText = thirdSlice;
    size = slicedData;

    Plotly.restyle(CHART, "x", [x]);
    Plotly.restyle(CHART, "y", [y]);
    Plotly.restyle(CHART, "text", [newText]);

    Plotly.restyle(CHART2, "x", [y]);
    Plotly.restyle(CHART2, "y", [x]);
    Plotly.restyle(CHART2, "size", [size]);

    Plotly.restyle(CHART3, "value", [gaugeValue]);

    console.log("Yay, we're done!")

  })};
init();
