let sampleBellyData

d3.json("samples.json").then((data) => {
    sampleBellyData = data;

    let option = d3.select("#selDataset");    
    sampleBellyData.names.forEach(d => {
        option
        .append("option")
        .property("value", d)
        .text(d)
    });
});

function optionChanged(sel){
    // getting data for the information chart and the plots
    let metadata = sampleBellyData.metadata.filter(d => d.id === parseInt(sel))[0];
    let samples = sampleBellyData.samples.filter(d => d.id === sel)[0];
    InfoChart(metadata);
    Plots(samples);
}

// Information Chart
function InfoChart(data){
    let option = d3.select("#sample-metadata"); 
    let entries_data = Object.entries(data);
    option.selectAll("p").remove()
    entries_data.forEach(d => {
        option
        .append("p")
        .text(`${d[0]}: ${d[1]}`)
    });
}

// Plotting
function Plots(samples){
    // Plotting Bar chart
    let traceBar = {
        x: samples.sample_values,
        y: samples.otu_ids.sort((a, b) => a - b).map(d => "OTU " + d),
        text: samples.otu_labels,
        type: "bar",
        orientation: "h"
    };

    let dataBar = [traceBar]  
    Plotly.newPlot("bar", dataBar);

    // Plotting Bubble plot
    traceBuble = {
        x: samples.otu_ids.sort((a, b) => a - b),
        y: samples.sample_values,
        text: samples.otu_labels,
        mode: "markers",
        marker: {
            size: samples.sample_values, 
            sizeref: 0.1,
            sizemode: "area"
        }
    };

    let dataBubble = [traceBuble];
    Plotly.newPlot("bubble", dataBubble);
};
