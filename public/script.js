document.addEventListener("DOMContentLoaded", function() {
    const big5Traits = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
    const levelsBig5 = [0.2, 0.5, 0.8];  // Levels for Big 5
    let currentTraits = big5Traits;
    const resetButton = document.getElementById("resetButton");
    const sortButton = document.getElementById("sortButton");
    const addTraitButton = document.getElementById("addTraitButton");
    const traitSelect = document.getElementById("traitSelect");
    const sortingBucket = document.getElementById("sortingBucket");
    const kSelector = document.getElementById("kValue");
    const applyKNNButton = document.getElementById("applyKNN");
    const selectedPersonalitiesList = document.getElementById("selectedPersonalities");
    const doneButton = document.getElementById("doneButton");
    const generatedCodeDisplay = document.getElementById("generatedCodeDisplay");
    const knnPersonalitySelect = document.getElementById('knnPersonalitySelect');
    const showCustomPersonalityCheckbox = document.getElementById('showCustomPersonality');

    let personalityData = [
        {"name": "Dynamic Leader with Balanced Emotions and Practical Insights", "values": [0.8, 0.5, 0.8, 0.5, 0.2]},
        {"name": "Calm Strategist with Stable Mood and Conventional Approach", "values": [0.5, 0.2, 0.8, 0.2, 0.8]},
        {"name": "Engaging Organizer with Emotional Control and Social Skills", "values": [0.5, 0.5, 0.2, 0.8, 0.2]},
        {"name": "Reserved Leader with Practical Insights and Inner Strength", "values": [0.5, 0.5, 0.2, 0.2, 0.8]},
        {"name": "Socially Skilled Strategist with Critical Mood and Stability", "values": [0.2, 0.2, 0.8, 0.2, 0.8]},
        {"name": "Expressive Rebel with Emotional Intensity and Innovation", "values": [0.8, 0.2, 0.2, 0.8, 0.8]},
        {"name": "Stoic Pessimist with Emotional Control and Realistic Approach", "values": [0.2, 0.2, 0.2, 0.8, 0.2]},
        {"name": "Bold Explorer with Practical Insights and Emotional Intensity", "values": [0.8, 0.2, 0.2, 0.5, 0.8]},
        {"name": "Quiet Observer with Balanced Emotions and Practical Approach", "values": [0.2, 0.5, 0.2, 0.5, 0.2]},
        {"name": "Dynamic Enthusiast with Practical Insights and Social Skills", "values": [0.8, 0.2, 0.5, 0.8, 0.8]},
        {"name": "Sociable Traditionalist with Balanced Emotions and Practical Skills", "values": [0.8, 0.5, 0.5, 0.5, 0.2]},
        {"name": "Cautious Critic with Emotional Control and Practical Insights", "values": [0.2, 0.2, 0.5, 0.8, 0.2]},
        {"name": "Adventurous Idealist with Emotional Intensity and Innovation", "values": [0.8, 0.5, 0.2, 0.8, 0.8]},
        {"name": "Reserved Visionary with Practical Insights and Emotional Control", "values": [0.2, 0.2, 0.2, 0.8, 0.8]},
        {"name": "Charismatic Diplomat with Balanced Emotions and Innovation", "values": [0.8, 0.5, 0.8, 0.5, 0.8]},
        {"name": "Gentle Guardian with Practical Insights and Balanced Emotions", "values": [0.2, 0.8, 0.2, 0.8, 0.2]},
        {"name": "Assertive Pioneer with Emotional Intensity and Practical Insights", "values": [0.8, 0.2, 0.8, 0.8, 0.8]},
        {"name": "Introspective Strategist with Emotional Control and Innovation", "values": [0.2, 0.2, 0.8, 0.8, 0.8]},
        {"name": "Balanced Harmonizer with Practical Skills and Social Insights", "values": [0.5, 0.8, 0.8, 0.5, 0.5]},
        {"name": "Confident Organizer with Balanced Emotions and Practical Skills", "values": [0.8, 0.5, 0.5, 0.5, 0.2]},
        {"name": "Commanding Leader with Emotional Intensity and Practical Insights", "values": [0.8, 0.8, 0.8, 0.2, 0.2]},
        {"name": "Contemplative Artist with Balanced Emotions and Emotional Intensity", "values": [0.2, 0.8, 0.2, 0.2, 0.8]},
        {"name": "Analytical Skeptic with Practical Insights and Emotional Control", "values": [0.2, 0.2, 0.5, 0.8, 0.5]},
        {"name": "Visionary Leader with Balanced Emotions and Practical Insights", "values": [0.8, 0.8, 0.8, 0.5, 0.8]},
        {"name": "Compassionate Stabilizer with Practical Insights and Social Skills", "values": [0.5, 0.8, 0.8, 0.8, 0.5]},
        {"name": "Energetic Innovator with Emotional Intensity and Practical Skills", "values": [0.8, 0.5, 0.8, 0.2, 0.8]},
        {"name": "Thoughtful Philosopher with Emotional Intensity and Practical Insights", "values": [0.2, 0.8, 0.5, 0.8, 0.5]},
        {"name": "Driven Achiever with Balanced Emotions and Practical Skills", "values": [0.8, 0.8, 0.8, 0.5, 0.2]},
        {"name": "Empathetic Protector with Practical Insights and Balanced Emotions", "values": [0.2, 0.8, 0.8, 0.8, 0.2]},
        {"name": "Unconventional Theorist with Emotional Intensity and Practical Skills", "values": [0.5, 0.2, 0.2, 0.8, 0.8]},
        {"name": "Kindhearted Pragmatist with Balanced Emotions and Practical Insights", "values": [0.2, 0.8, 0.5, 0.8, 0.2]},
        {"name": "Warm Idealist with Practical Insights and Emotional Intensity", "values": [0.5, 0.8, 0.2, 0.8, 0.8]},
        {"name": "Influential Motivator with Balanced Emotions and Innovation", "values": [0.8, 0.8, 0.8, 0.5, 0.8]},
        {"name": "Reflective Mediator with Practical Insights and Balanced Emotions", "values": [0.2, 0.5, 0.5, 0.8, 0.8]},
        {"name": "Reserved Innovator with Balanced Emotions and Practical Insights", "values": [0.2, 0.5, 0.8, 0.5, 0.8]},
        {"name": "Enthusiastic Creator with Emotional Intensity and Practical Skills", "values": [0.8, 0.5, 0.8, 0.5, 0.8]},
        {"name": "Methodical Thinker with Practical Insights and Balanced Emotions", "values": [0.2, 0.5, 0.8, 0.2, 0.8]},
        {"name": "Devoted Scholar with Practical Insights and Emotional Intensity", "values": [0.2, 0.8, 0.8, 0.2, 0.8]},
        {"name": "Cooperative Realist with Practical Skills and Balanced Emotions", "values": [0.5, 0.8, 0.5, 0.5, 0.2]},
        {"name": "Charismatic Optimist with Balanced Emotions and Emotional Intensity", "values": [0.8, 0.8, 0.8, 0.2, 0.8]},
        {"name": "Reflective Dreamer with Practical Insights and Balanced Emotions", "values": [0.2, 0.5, 0.5, 0.8, 0.8]},
        {"name": "Empathetic Visionary with Practical Skills and Balanced Emotions", "values": [0.5, 0.8, 0.8, 0.5, 0.8]},
        {"name": "Dedicated Innovator with Emotional Intensity and Practical Insights", "values": [0.2, 0.8, 0.8, 0.5, 0.8]}
        // Add more personalities as needed
        // ... (personality data remains unchanged)
    ];

    let currentPersonalityValues = [0.5, 0.5, 0.5, 0.5, 0.5]; // Initialize with default values
    let customPersonalityValues = [...currentPersonalityValues]; // To store the custom personality
    let selectedPersonalityNames = []; // To keep track of selected personalities
    let topKPersonalities = []; // To keep track of Top-K similar personalities

    function loadPersonalities() {
        const personalityList = d3.select("#personalityNames");
        personalityList.selectAll("*").remove(); // Clear existing list items before adding new ones

        let sortedData = [];

        if (topKPersonalities.length > 0) {
            // Add top K personalities first
            topKPersonalities.forEach(name => {
                const personality = personalityData.find(p => p.name === name);
                if (personality) {
                    sortedData.push(personality);
                }
            });

            // Add the rest, excluding top K
            personalityData.forEach(personality => {
                if (!topKPersonalities.includes(personality.name)) {
                    sortedData.push(personality);
                }
            });
        } else {
            sortedData = personalityData;
        }

        sortedData.forEach(personality => {
            const li = personalityList.append("li")
                .attr("data-name", personality.name) // Added data attribute
                .text(personality.name)
                .on("click", () => {
                    showPersonalityRadar(personality.values);
                    highlightCurrentPersonality(personality.name);
                    currentPersonalityValues = [...personality.values]; // Copy the current personality values
                    updateRadarArea(); // Update the radar chart
                });

            const addSymbol = document.createElement("span");

            if (selectedPersonalityNames.includes(personality.name)) {
                addSymbol.innerHTML = "&times;"; // x symbol
                addSymbol.classList.add("remove-symbol");
                li.classed('selected', true);
            } else {
                addSymbol.innerHTML = "+";
                addSymbol.classList.add("add-symbol");
                li.classed('selected', false);
            }

            addSymbol.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent triggering the li's click event
                togglePersonalitySelection(personality.name, addSymbol, li);
            });
            li.node().appendChild(addSymbol);
        });

        // Highlight top K personalities
        highlightTopKPersonalities(topKPersonalities);
        // Highlight current personality if any
        const currentPersonalityName = document.querySelector('#personalityNames li.current')?.getAttribute('data-name');
        if (currentPersonalityName) {
            highlightCurrentPersonality(currentPersonalityName);
        }
    }

    function togglePersonalitySelection(name, addSymbol, li) {
        const index = selectedPersonalityNames.indexOf(name);
        if (index === -1) {
            // Add to selected
            selectedPersonalityNames.push(name);
            addSymbol.innerHTML = "&times;";
            addSymbol.classList.remove("add-symbol");
            addSymbol.classList.add("remove-symbol");
            li.classed('selected', true);

            // If the personality is currently viewed, remove 'current' class to change background to yellow
            if (li.classed('current')) {
                li.classed('current', false);
            }
        } else {
            // Remove from selected
            selectedPersonalityNames.splice(index, 1);
            addSymbol.innerHTML = "+";
            addSymbol.classList.remove("remove-symbol");
            addSymbol.classList.add("add-symbol");
            li.classed('selected', false);
        }
        updateAverageValues(); // Recalculate averages when selection changes
        updateSelectedPersonalitiesList();
    }

    function updateSelectedPersonalitiesList() {
        selectedPersonalitiesList.innerHTML = '';
        selectedPersonalityNames.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            selectedPersonalitiesList.appendChild(li);
        });
    }

    function highlightCurrentPersonality(name) {
        // Remove 'current' class from all list items
        const listItems = document.querySelectorAll("#personalityNames li");
        listItems.forEach(li => {
            li.classList.remove('current');
        });

        // Add 'current' class to the clicked personality
        const personalityLi = document.querySelector('#personalityNames li[data-name="' + name + '"]');
        if (personalityLi) {
            personalityLi.classList.add('current');
        }
    }

    function drawConcentricCircles(svg, rScale, levels) {
        const circleAxes = svg.selectAll(".circle-axis")
            .data(levels)
            .enter()
            .append("g")
            .attr("class", "circle-axis");
        circleAxes.append("circle")
            .attr("r", level => rScale(level))
            .style("fill", "none")
            .style("stroke", "grey")
            .style("stroke-dasharray", "2 2")
            .style("stroke-opacity", 0.7);
    }

    function initializeRadarChartBase(traits) {
        const levels = levelsBig5;
        const numTraits = traits.length;
        const width = 500, height = 550; // Increased width
        const margin = 80, radius = Math.min(width, height) / 2 - margin;
        const angleSlice = Math.PI * 2 / numTraits;
        const rScale = d3.scaleLinear().range([0, radius]).domain([0, 1]);

        // Remove existing SVG if any
        d3.select("#radarChart").select("svg").remove();

        const svg = d3.select("#radarChart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        drawConcentricCircles(svg, rScale, levels);

        const axes = svg.selectAll(".axis")
            .data(traits)
            .enter()
            .append("g")
            .attr("class", "axis");

        axes.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => rScale(1) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (d, i) => rScale(1) * Math.sin(angleSlice * i - Math.PI / 2))
            .style("stroke", "grey");

        axes.append("text")
            .attr("x", (d, i) => rScale(1.05) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => rScale(1.05) * Math.sin(angleSlice * i - Math.PI / 2))
            .text(d => d)
            .style("text-anchor", "middle");

        // Add draggable circles at each axis end
        axes.each(function(d, i) {
            const angle = angleSlice * i - Math.PI / 2;

            d3.select(this).append("circle")
                .attr("class", "draggable-point")
                .attr("cx", rScale(currentPersonalityValues[i]) * Math.cos(angle))
                .attr("cy", rScale(currentPersonalityValues[i]) * Math.sin(angle))
                .attr("r", 5) // Reduced size
                .style("fill", "grey")
                .call(d3.drag()
                    .on("start", function(event) {
                        d3.select(this).classed("active", true);
                        this.startX = event.x;
                        this.startY = event.y;
                    })
                    .on("drag", function(event) {
                        let dx = event.x - this.startX;
                        let dy = event.y - this.startY;
                        if (dx !== 0 || dy !== 0) {
                            let [x, y] = d3.pointer(event, svg.node());
                            let newValue = Math.sqrt(x * x + y * y) / rScale(1);
                            newValue = Math.max(0, Math.min(1, newValue));

                            // Snap to the nearest level
                            let closestLevel = levelsBig5.reduce((prev, curr) => Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev);
                            currentPersonalityValues[i] = closestLevel;

                            // Update the position of the point
                            d3.select(this)
                                .attr("cx", rScale(currentPersonalityValues[i]) * Math.cos(angle))
                                .attr("cy", rScale(currentPersonalityValues[i]) * Math.sin(angle));

                            // Update the radar area
                            updateRadarArea();

                            // Update custom personality values
                            customPersonalityValues[i] = closestLevel;
                        }
                    })
                    .on("end", function(event) {
                        d3.select(this).classed("active", false);
                    })
                );
        });

        return { svg: svg, rScale: rScale, angleSlice: angleSlice };
    }

    function drawRadarArea(svg, rScale, angleSlice, values, color, fillOpacity, className, fillArea = true, lineStyle = "solid") {
        const pointsData = values.map((value, i) => ({
            value: value,
            angle: angleSlice * i
        }));

        const path = svg.append("path")
            .datum(pointsData)
            .attr("class", className)
            .attr("d", d3.lineRadial()
                .angle(d => d.angle)
                .radius(d => rScale(d.value))
                .curve(d3.curveLinearClosed))
            .style("stroke", color)
            .style("stroke-width", 2)
            .style("stroke-opacity", 1)
            .style("stroke-dasharray", lineStyle === "dashed" ? "4 4" : "0");

        if (fillArea) {
            path.style("fill", color)
                .style("fill-opacity", fillOpacity);
        } else {
            path.style("fill", "none");
        }
    }

    function updateRadarArea() {
        const svgGroup = d3.select("#radarChart svg g");
        svgGroup.selectAll(".individual-radar-area").remove();
        drawRadarArea(radarChartBase.svg, radarChartBase.rScale, radarChartBase.angleSlice, currentPersonalityValues, "lightblue", 0.6, "individual-radar-area");

        // Update draggable points
        radarChartBase.svg.selectAll(".draggable-point")
            .attr("cx", function(d, i) {
                const angle = radarChartBase.angleSlice * i - Math.PI / 2;
                return radarChartBase.rScale(currentPersonalityValues[i]) * Math.cos(angle);
            })
            .attr("cy", function(d, i) {
                const angle = radarChartBase.angleSlice * i - Math.PI / 2;
                return radarChartBase.rScale(currentPersonalityValues[i]) * Math.sin(angle);
            });

        // Draw custom personality overlay if checkbox is checked
        if (showCustomPersonalityCheckbox.checked) {
            svgGroup.selectAll(".custom-radar-area").remove();
            drawRadarArea(
                radarChartBase.svg,
                radarChartBase.rScale,
                radarChartBase.angleSlice,
                customPersonalityValues,
                "purple",
                0.5,
                "custom-radar-area",
                false, // Do not fill the area
                "dashed" // Line style
            );
        } else {
            svgGroup.selectAll(".custom-radar-area").remove();
        }
    }

    function showPersonalityRadar(personalityValues) {
        currentPersonalityValues = [...personalityValues];
        updateRadarArea();
    }

    function showAverageRadar(averageValues) {
        d3.select("#radarChart svg g").selectAll(".average-radar-area").remove(); // Remove any existing average radar area
        drawRadarArea(
            radarChartBase.svg,
            radarChartBase.rScale,
            radarChartBase.angleSlice,
            averageValues,
            "red",
            0.5,
            "average-radar-area",
            false // Do not fill the area
        );
    }

    function updateAverageValues() {
        const totalValues = selectedPersonalityNames.reduce((acc, name) => {
            const personality = personalityData.find(p => p.name === name);
            if (personality) {
                personality.values.forEach((value, index) => {
                    acc[index] += value;
                });
            }
            return acc;
        }, new Array(5).fill(0));

        const numPersonalities = selectedPersonalityNames.length;
        if (numPersonalities > 0) {
            const averageValues = totalValues.map(value => value / numPersonalities);
            showAverageRadar(averageValues);
        } else {
            // Remove the average radar area if no personalities are selected
            d3.select("#radarChart svg g").selectAll(".average-radar-area").remove();
        }
    }

    function calculateDistance(values1, values2) {
        return Math.sqrt(values1.reduce((sum, value, index) => sum + Math.pow(value - values2[index], 2), 0));
    }

    function applyKNN(currentValues) {
        const dataToUse = personalityData.filter(personality => {
            // Exclude the current personality if applying KNN to a specific one
            const selectedOption = knnPersonalitySelect.value;
            if (selectedOption === 'current') {
                const currentPersonalityName = document.querySelector('#personalityNames li.current')?.getAttribute('data-name');
                return personality.name !== currentPersonalityName;
            }
            return true; // For 'custom' and 'average', include all
        });

        const distances = dataToUse.map(personality => ({
            name: personality.name,
            distance: calculateDistance(personality.values, currentValues)
        }));
        distances.sort((a, b) => a.distance - b.distance);
        const k = parseInt(kSelector.value, 10);
        topKPersonalities = distances.slice(0, k).map(p => p.name);

        highlightTopKPersonalities(topKPersonalities);
        loadPersonalities(); // Reload to reorder the list with top K on top
    }

    function highlightTopKPersonalities(topKPersonalitiesList) {
        const listItems = document.querySelectorAll("#personalityNames li");
        listItems.forEach(li => {
            const personalityName = li.getAttribute('data-name');
            if (topKPersonalitiesList.includes(personalityName)) {
                li.classList.add('top-k');
            } else {
                li.classList.remove('top-k');
            }
            // Keep 'selected' and 'current' classes intact
        });
    }

    function sortPersonalities() {
        const traitIndex = {
            "Openness": 0,
            "Conscientiousness": 1,
            "Extraversion": 2,
            "Agreeableness": 3,
            "Neuroticism": 4
        };
        const sortingOrder = Array.from(sortingBucket.children).map(item => ({
            trait: item.querySelector('.trait-name').textContent,
            order: item.querySelector('.order-select').value
        }));
        personalityData.sort((a, b) => {
            for (let { trait, order } of sortingOrder) {
                const comparison = a.values[traitIndex[trait]] - b.values[traitIndex[trait]];
                if (comparison !== 0) {
                    return order === 'asc' ? comparison : -comparison;
                }
            }
            return 0;
        });
        loadPersonalities();
    }

    function addTraitToBucket() {
        const trait = traitSelect.value;
        if (!Array.from(sortingBucket.children).some(item => item.querySelector('.trait-name').textContent === trait)) {
            const li = document.createElement("li");
            li.classList.add("sortable-item");
            const traitSpan = document.createElement("span");
            traitSpan.classList.add("trait-name");
            traitSpan.textContent = trait;
            const orderSelect = document.createElement("select");
            orderSelect.classList.add("order-select");
            orderSelect.innerHTML = `<option value="asc">Ascending (Low to High)</option><option value="desc">Descending (High to Low)</option>`;
            const deleteSpan = document.createElement("span");
            deleteSpan.classList.add("delete-symbol");
            deleteSpan.innerHTML = "&times;";
            deleteSpan.addEventListener("click", () => {
                sortingBucket.removeChild(li);
            });
            li.appendChild(traitSpan);
            li.appendChild(orderSelect);
            li.appendChild(deleteSpan);
            sortingBucket.appendChild(li);
        }
    }

    function initializeSortable() {
        new Sortable(sortingBucket, {
            animation: 150,
            ghostClass: 'sortable-ghost'
        });
    }

    // Initialize the radar chart
    let radarChartBase = initializeRadarChartBase(currentTraits);

    resetButton.addEventListener('click', function() {
        // Remove the individual radar area
        d3.select("#radarChart svg").remove();

        // Remove 'current' and 'top-k' highlights
        const listItems = document.querySelectorAll("#personalityNames li");
        listItems.forEach(li => {
            li.classList.remove('current');
            li.classList.remove('top-k');
            // Keep 'selected' class intact
        });

        // Reset currentPersonalityValues to default
        currentPersonalityValues = [0.5, 0.5, 0.5, 0.5, 0.5];
        customPersonalityValues = [...currentPersonalityValues]; // Reset custom personality values

        // Re-initialize the radar chart
        radarChartBase = initializeRadarChartBase(currentTraits);
        updateRadarArea();

        // Update the average radar area
        updateAverageValues();

        // Clear the generated code
        generatedCodeDisplay.textContent = '';
    });

    applyKNNButton.addEventListener('click', function() {
        const selectedOption = knnPersonalitySelect.value;
        let valuesToUse = null;

        if (selectedOption === 'custom') {
            // Use the custom personality from the radar chart
            valuesToUse = customPersonalityValues;
        } else if (selectedOption === 'current') {
            // Use the currently selected personality
            const currentPersonalityName = document.querySelector('#personalityNames li.current')?.getAttribute('data-name');
            if (currentPersonalityName) {
                const personality = personalityData.find(p => p.name === currentPersonalityName);
                valuesToUse = personality.values;
            } else {
                alert("Please select a personality from the list.");
                return;
            }
        } else if (selectedOption === 'average') {
            // Use the average personality
            if (selectedPersonalityNames.length > 0) {
                const totalValues = selectedPersonalityNames.reduce((acc, name) => {
                    const personality = personalityData.find(p => p.name === name);
                    if (personality) {
                        personality.values.forEach((value, index) => {
                            acc[index] += value;
                        });
                    }
                    return acc;
                }, new Array(5).fill(0));

                valuesToUse = totalValues.map(value => value / selectedPersonalityNames.length);
            } else {
                alert("Please select at least one personality to compute the average.");
                return;
            }
        }

        if (valuesToUse) {
            applyKNN(valuesToUse);
        }
    });

    showCustomPersonalityCheckbox.addEventListener('change', function() {
        updateRadarArea();
    });

    sortButton.addEventListener('click', sortPersonalities);
    addTraitButton.addEventListener('click', addTraitToBucket);
    loadPersonalities();
    initializeSortable();

    // Function to generate a unique 6-digit code
    function generateRandomCode() {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }

    // Event listener for the Done button
    doneButton.addEventListener('click', async function() {
        const code = generateRandomCode();

        // Get the selected personalities (full objects)
        const selectedPersonalities = selectedPersonalityNames.map(name => {
            return personalityData.find(p => p.name === name);
        });

        // Check if there are selected personalities
        if (selectedPersonalities.length === 0) {
            alert("Please select at least one personality before clicking Done.");
            return;
        }

        // Prepare data to send to the server
        const data = {
            code: code,
            personalities: selectedPersonalities
        };

        try {
            // Send a POST request to the server
            const response = await fetch('/api/savePersonalities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                generatedCodeDisplay.textContent = `Your code is: ${code}`;
                alert("Your selected personalities have been saved successfully!");
            } else {
                console.error('Server error:', result.message);
                alert("Failed to save your personalities: " + result.message);
            }
        } catch (err) {
            console.error('Network error:', err);
            alert("An error occurred while saving your personalities. Please try again.");
        }
    });

    // Initial drawing of the radar area
    updateRadarArea();
});
