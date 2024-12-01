# CS450 - Assignment 6
# Website can be viewed here: https://antc3519.github.io/CS450-Assignment6/

Classwork for CS450 - Introduction to Data Visualization

In this assignment, you will create an interactive data visualization to analyze the usage of hashtags over time for various LLM models (GPT-4, Gemini, PaLM-2, Claude, and LLaMA-3.1). A streamgraph will be used to display the trends in hashtag usage for each model, accompanied by interactive tooltips and mini bar charts for a detailed view of each model. Below are details and grading.

1. Upload Component and Streamgraph (70 points): Use D3.js to create a streamgraph that displays the number of times a hashtag was used over time for each LLM model. The x-axis should represent time, and each stream should correspond to one LLM model, with the flow area for each model illustrating hashtag usage over time. Initially, only the upload component will be visible, allowing users to upload the data. Once the user uploads the data, the streamgraph will be generated. The test dataset can be downloaded from this link. Following is a short description of the columns.
Date: Month and year of the data.
GPT-4, Gemini, PaLM-2, Claude, LLaMA-3.1: The number of hashtags for each AI model in that month.

2. Legend (30 points):
Create a legend that corresponds to each LLM model, indicating which color represents each model. Position the legend outside the graph, as shown in the following picture. Additionally, the legend should follow the same order as the models in the streamgraph.

3. Interactive Tooltip with BarChart (100 points):
Implement a tooltip that appears when the user hovers over any section of the streamgraph. The tooltip should display a mini bar chart that represents the number of times the hashtag was used for that specific model over the time. The tooltip should dynamically update based on the section of the streamgraph that is being hovered, showing a mini chart for the hovered model only. Position the tooltip near the mouse cursor and ensure that the mini bar chart includes both x and y axes. Additionally, the color of the bars should match the color of the corresponding model. A successful implementation will produce the following output.

4. Styling: The layout should closely resemble the design shown in the pictures and animations above. Use the following colors for the models: "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00".
