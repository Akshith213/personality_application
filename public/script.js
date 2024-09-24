document.addEventListener("DOMContentLoaded", function() {
    const big5Traits = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
    let currentTraits = big5Traits;
    const resetButton = document.getElementById("resetButton");
    const sortButton = document.getElementById("sortButton");
    const addTraitButton = document.getElementById("addTraitButton");
    const traitSelect = document.getElementById("traitSelect");
    const personalityPanel = document.querySelector(".personality-list");
    const sortingBucket = document.getElementById("sortingBucket");
    const selectedPersonalities = document.getElementById("selectedPersonalities");
    const doneButton = document.getElementById("doneButton");
    const kSelector = document.getElementById("kValue");
    const applyKNNButton = document.getElementById("applyKNN");
    const levelsBig5 = [0.2, 0.5, 0.8];  // Levels for Big 5

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
        {"name": "Reflective Mediator with Practical Insights and Balanced Emotions", "values": [0.2, 0.8, 0.5, 0.5, 0.8]},
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
    ];

    function loadPersonalities() {
        const personalityList = d3.select("#personalityNames");
        personalityList.selectAll("*").remove(); // Clear existing list items before adding new ones

        personalityData.forEach(personality => {
            const li = personalityList.append("li")
                .attr("data-name", personality.name) // Added data attribute
                .text(personality.name)
                .on("click", () => {
                    showPersonalityRadar(personality.values);
                });
            const addSymbol = document.createElement("span");
            addSymbol.classList.add("add-symbol");
            addSymbol.innerHTML = "+";
            addSymbol.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent triggering the li's click event
                addPersonalityToSelected(personality.name); // Ensure the radar chart can be updated from the selected list
            });
            li.node().appendChild(addSymbol);

            // Check if this personality is in selectedPersonalities and add 'selected' class
            if (Array.from(selectedPersonalities.children).some(item => item.textContent.replace(/\×$/, '').trim() === personality.name)) {
                li.classed('selected', true);
            }
        });
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
        const width = 600, height = 600;
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
            .attr("x", (d, i) => rScale(1.2) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (d, i) => rScale(1.2) * Math.sin(angleSlice * i - Math.PI / 2))
            .text(d => d)
            .style("text-anchor", "middle");

        return { svg: svg, rScale: rScale, angleSlice: angleSlice };
    }

    function drawRadarArea(svg, rScale, angleSlice, values, color, fillOpacity, className, fillArea = true) {
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
            .style("stroke-opacity", 1);

        if (fillArea) {
            path.style("fill", color)
                .style("fill-opacity", fillOpacity);
        } else {
            path.style("fill", "none");
        }
    }

    function showPersonalityRadar(personalityValues) {
        d3.select("#radarChart svg g").selectAll(".individual-radar-area").remove(); // Remove any existing individual radar area
        drawRadarArea(radarChartBase.svg, radarChartBase.rScale, radarChartBase.angleSlice, personalityValues, "lightblue", 0.6, "individual-radar-area");
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
        const selectedPersonalityNodes = document.querySelectorAll('#selectedPersonalities li');
        const totalValues = Array.from(selectedPersonalityNodes).reduce((acc, node) => {
            const name = node.textContent.replace(/\×$/, '').trim();
            const personality = personalityData.find(p => p.name === name);
            if (personality) {
                personality.values.forEach((value, index) => {
                    acc[index] += value;
                });
            }
            return acc;
        }, new Array(5).fill(0));

        const numPersonalities = selectedPersonalityNodes.length;
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
        const dataToUse = personalityData;
        const distances = dataToUse.map(personality => ({
            name: personality.name,
            distance: calculateDistance(personality.values, currentValues)
        }));
        distances.sort((a, b) => a.distance - b.distance);
        const k = parseInt(kSelector.value, 10);
        const topKPersonalities = distances.slice(0, k).map(p => p.name);
        reorderList(topKPersonalities);
        highlightTopKPersonalities(topKPersonalities);
    }

    function reorderList(topKPersonalities) {
        const list = document.getElementById("personalityNames");
        const items = Array.from(list.childNodes);
        topKPersonalities.forEach(personalityName => {
            const item = items.find(item => item.textContent.replace(/\×$/, '').trim() === personalityName);
            if (item) {
                list.insertBefore(item, list.firstChild);
            }
        });
    }

    function highlightTopKPersonalities(topKPersonalities) {
        const listItems = document.querySelectorAll("#personalityNames li");
        listItems.forEach(li => {
            const personalityName = li.getAttribute('data-name');
            if (topKPersonalities.includes(personalityName)) {
                li.classList.add('top-k');
            } else {
                li.classList.remove('top-k');
            }
            // Keep 'selected' class intact
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
            orderSelect.innerHTML = `<option value="asc">Asc</option><option value="desc">Desc</option>`;
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

    function addPersonalityToSelected(name) {
        const existing = Array.from(selectedPersonalities.children).some(item => item.textContent.replace(/\×$/, '').trim() === name);
        if (!existing) {
            const li = document.createElement("li");
            li.textContent = name;
            const deleteSpan = document.createElement("span");
            deleteSpan.classList.add("delete-symbol");
            deleteSpan.innerHTML = "&times;";
            deleteSpan.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent click event from propagating to li
                selectedPersonalities.removeChild(li);
                updateDoneButtonState();
                updateAverageValues(); // Recalculate averages when a personality is removed

                // Remove the highlight from the main list
                const personalityLi = document.querySelector('#personalityNames li[data-name="' + name + '"]');
                if (personalityLi) {
                    personalityLi.classList.remove('selected');
                }
            });

            li.addEventListener('click', (event) => {
                const personality = personalityData.find(p => p.name === name);
                if (personality) {
                    showPersonalityRadar(personality.values);
                }
            });

            li.appendChild(deleteSpan);
            selectedPersonalities.appendChild(li);
            updateDoneButtonState();
            updateAverageValues(); // Recalculate averages when a new personality is added

            // Highlight the corresponding item in the main list
            const personalityLi = document.querySelector('#personalityNames li[data-name="' + name + '"]');
            if (personalityLi) {
                personalityLi.classList.add('selected'); // Add 'selected' class
            }
        }
    }

    function generateRandomCode() {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }

    function updateDoneButtonState() {
        doneButton.disabled = selectedPersonalities.children.length == 0;
    }

    resetButton.addEventListener('click', function() {
        // Remove both individual and average radar areas
        d3.select("#radarChart svg g").selectAll(".individual-radar-area").remove();
        d3.select("#radarChart svg g").selectAll(".average-radar-area").remove();

        // Remove top-k highlights
        const listItems = document.querySelectorAll("#personalityNames li");
        listItems.forEach(li => {
            li.classList.remove('top-k');
            // Keep 'selected' class intact
        });
    });

    applyKNNButton.addEventListener('click', function() {
        // Get the currentValues from the average radar area or from selected personalities
        const averageArea = d3.select(".average-radar-area");
        if (!averageArea.empty()) {
            const averageValues = averageArea.datum().map(d => d.value);
            applyKNN(averageValues);
        } else {
            alert("Please select personalities to compute the average before applying KNN.");
        }
    });

    sortButton.addEventListener('click', sortPersonalities);
    addTraitButton.addEventListener('click', addTraitToBucket);
    loadPersonalities();
    initializeSortable();

    // Initialize the radar chart base once
    const radarChartBase = initializeRadarChartBase(currentTraits);

    document.getElementById('doneButton').addEventListener('click', async function() {
        const code = generateRandomCode();
        document.getElementById('generatedCodeDisplay').textContent = `Your code is: ${code}`;
        console.log("Generated code:", code);

        const selectedPersonalityNodes = document.querySelectorAll('#selectedPersonalities li');
        const personalities = Array.from(selectedPersonalityNodes).map(node => {
            const name = node.textContent.replace(/\×$/, '').trim();
            const personality = personalityData.find(p => p.name === name);
            if (!personality) {
                console.error('Failed to find personality for name:', name);
                return null; // Skip this entry
            }
            return { name, values: personality.values };
        }).filter(p => p !== null); // Filter out any null entries due to missing personalities

        try {
            const response = await fetch('/api/savePersonalities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code, personalities })
            });

            const result = await response.json();
            if (response.ok) {
                document.getElementById('responseMessage').textContent = 'Personalities saved successfully!';
            } else {
                document.getElementById('responseMessage').textContent = 'Failed to save personalities: ' + result.message;
            }
        } catch (err) {
            console.error(err);
            document.getElementById('responseMessage').textContent = 'Failed to save personalities. Please try again.';
        }
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('token');   // Remove the authentication token
        localStorage.removeItem('username'); // Remove the stored username
        alert('Logged out successfully!');
        window.location.href = 'login.html'; // Redirect the user to the login page
    });
});
