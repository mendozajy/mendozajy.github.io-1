//locate parts on the webpage
dropdown = d3.select("#selDataset");
demographicspanel = d3.select("#sample-metadata");
grapharea = d3.select("#bar");
nojubjectheader= d3.select("#no_subject");

// Load JSON file when the page opens
d3.json("samples.json").then(item => {

  // Add Dropdown Options When the Page Loads
  item.names.forEach(value => {
    option = dropdown.append("option")
    option.text(value);
  });
 
    //Log What We Did

    console.log("Here are the IDs of the Subjects");
    console.log(item.names);
    console.log("\n");

    
    });

  // Function that will run each time a subject is picked

function UpdatePage() {
// Get the subject id entered in the Dropdown

subject = d3.select("#selDataset").property("value");

// Log the subject picked
console.log("The subject selected from the dropdown is " + subject);
console.log("\n");

// Clear areas each time a subject is picked.  Add to the end of the function

demographicspanel.html("");
grapharea.html("");
nojubjectheader.html("");

// Load JSON file when a subject is picked
d3.json("samples.json").then(item => {

// Grab Data From Each Part of the Json
samples = item.samples;
metadata = item.metadata;
// Filter the samples and metadata based on the id someone picked
//subject is the value in the drop down menu

subject_samples=samples.filter(sample => sample.id == subject);
subject_meta=metadata.filter(meta => meta.id == subject);
   
//Log the data found for the selected subject
   
console.log("Here is the filtered data for chosen subject");
console.log(subject_samples);
console.log(subject_meta);
console.log("\n");

  // Update the demographics

Object.entries(subject_meta[0]).forEach(value => {
    // Add p tag for each item
    panelinfo = demographicspanel.append("p");
  
    // Add the value
  
    panelinfo.text(value[0] + ": " + value[1]);
});
// Grab just 10 samples and reverse the order for the graph

otus = subject_samples[0].otu_ids.splice(0,10);
otu_values = subject_samples[0].sample_values.splice(0,10).reverse();
otu_labels = subject_samples[0].otu_labels.splice(0,10).reverse();
OTU_ids = otus.map(otu_value => "OTU " + otu_value).reverse();
//Log What We Did

console.log("Here is the graph data for chosen subject");
console.log(otus);
console.log(otu_values);
console.log(otu_labels);
console.log("\n");
// Add data to the bar graph

   var bartrace = {
    x: otu_values,
    y: OTU_ids,
    text: otu_labels,
    type:"bar",
    orientation: "h",
};

bar_data = [bartrace];

// create layout variable for bar graph

var barlayout = {
  title: "Top 10 OTU",
  yaxis:{
      tickmode:"linear",
  },
};

// create the bar plot

   Plotly.newPlot("bar", bar_data, barlayout);

//Log What We Did

console.log("Here is the Bargraph was made");
console.log(bar_data);
console.log(barlayout);
console.log("\n");

// The bubble chart

var bubbletrace = {
    x: otus,
    y: otu_values,
    mode: "markers",
    marker: {
        size: otu_values,
        color: otus
    },
    text:  otu_labels
};

var bubbledata = [bubbletrace];

// set the layout for the bubble plot

var bubblelayout = {
    xaxis:{title: "OTU ID"},
    height: 600,
    width: 900
};

// create the bubble plot

Plotly.newPlot("bubble", bubbledata, bubblelayout);

//Log What We Did

console.log("Here is the BubbleGraph was made");
console.log(bar_data);
console.log(barlayout);
console.log("\n");

});

}
  
// Give our web page instructions on when to update the webpage

d3.select("#selDataset").on("change", UpdatePage)




