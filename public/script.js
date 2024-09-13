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
                .text(personality.name)
                .on("click", () => {
                    initializeRadarChart(currentTraits, personality.values);
                });
            const addSymbol = document.createElement("span");
            addSymbol.classList.add("add-symbol");
            addSymbol.innerHTML = "+";
            addSymbol.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent triggering the li's click event
                addPersonality(personality.name); // Existing function to handle UI addition
                addPersonalityToSelected(personality.name); // Ensure the radar chart can be updated from the selected list
            });
            li.node().appendChild(addSymbol);
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

    function initializeRadarChart(traits, values = traits.map(() => 0.5)) {

        console.log("Initializing radar chart with traits:", traits, "and values:", values);
        const levels = levelsBig5;
        const numTraits = traits.length;
        const width = 600, height = 600;
        const margin = 80, radius = Math.min(width, height) / 2 - margin;
        const angleSlice = Math.PI * 2 / numTraits;
        const rScale = d3.scaleLinear().range([0, radius]).domain([0, 1]);
        const pointsData = traits.map((trait, i) => ({
            trait: trait,
            value: values[i],
            angle: angleSlice * i
        }));

        


        d3.select("#radarChart").select("svg").remove();
        const svg = d3.select("#radarChart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        drawConcentricCircles(svg, rScale, levels);
        const axes = svg.selectAll(".axis")
            .data(pointsData)
            .enter()
            .append("g")
            .attr("class", "axis");

        axes.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", d => rScale(1) * Math.cos(d.angle - Math.PI / 2))
            .attr("y2", d => rScale(1) * Math.sin(d.angle - Math.PI / 2))
            .style("stroke", "grey");

        axes.append("text")
            .attr("x", d => rScale(1.2) * Math.cos(d.angle - Math.PI / 2))
            .attr("y", d => rScale(1.2) * Math.sin(d.angle - Math.PI / 2))
            .text(d => d.trait)
            .style("text-anchor", "middle");

        const radarArea = svg.append("path")
            .datum(pointsData)
            .attr("d", d3.lineRadial()
                .angle(d => d.angle)
                .radius(d => rScale(d.value))
                .curve(d3.curveLinearClosed))
            .style("fill", "lightblue")
            .style("fill-opacity", 0.6);

        // const drag = d3.drag()
        //     .on("drag", function(event, d) {
        //         const distance = Math.sqrt(Math.pow(event.x, 2) + Math.pow(event.y, 2));
        //         const newValue = rScale.invert(distance);
        //         d.value = levels.reduce((prev, curr) => (Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev));
        //         updateRadarChart(pointsData, svg, rScale, d);
        //     });

        // svg.selectAll(".radar-point")
        //     .data(pointsData)
        //     .enter()
        //     .append("circle")
        //     .attr("class", "radar-point")
        //     .attr("r", 4)
        //     .attr("cx", d => rScale(d.value) * Math.cos(d.angle - Math.PI / 2))
        //     .attr("cy", d => rScale(d.value) * Math.sin(d.angle - Math.PI / 2))
        //     .style("fill", "navy")
        //     .call(drag);

        // function updateRadarChart(pointsData, svg, rScale, draggedPoint) {
        //     radarArea.datum(pointsData).attr("d", d3.lineRadial()
        //         .angle(d => d.angle)
        //         .radius(d => rScale(d.value))
        //         .curve(d3.curveLinearClosed));
        //     svg.selectAll(".radar-point")
        //         .data(pointsData)
        //         .attr("cx", d => rScale(d.value) * Math.cos(d.angle - Math.PI / 2))
        //         .attr("cy", d => rScale(d.value) * Math.sin(d.angle - Math.PI / 2))
        //         .style("fill", "navy")
        //         .attr("r", 4);
        // }
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
            const item = items.find(item => item.textContent.includes(personalityName));
            if (item) {
                list.insertBefore(item, list.firstChild);
                item.style.fontWeight = 'bold';
                item.style.backgroundColor = 'lightgrey';
            }
        });
    }


    function highlightTopKPersonalities(topKPersonalities) {
        const listItems = document.querySelectorAll("#personalityNames li");
        listItems.forEach(li => {
            const personalityName = li.textContent.trim();
            // Assuming topKPersonalities contains objects with a 'name' property
            if (topKPersonalities.map(personality => personality.name.trim().toLowerCase()).includes(personalityName.toLowerCase())) {
                li.style.fontWeight = 'bold';
                li.style.backgroundColor = 'lightgrey';
            } else {
                li.style.fontWeight = 'normal';
                li.style.backgroundColor = 'transparent';
            }
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

    function addPersonality(name) {
        if (!Array.from(selectedPersonalities.children).some(item => item.textContent.includes(name))) {
            const li = document.createElement("li");
            li.textContent = name;
            const deleteSpan = document.createElement("span");
            deleteSpan.classList.add("delete-symbol");
            deleteSpan.innerHTML = "&times;";
            deleteSpan.addEventListener("click", () => {
                selectedPersonalities.removeChild(li);
                updateDoneButtonState();
            });
            li.appendChild(deleteSpan);
            selectedPersonalities.appendChild(li);
            updateDoneButtonState();
        }
    }

    function generateRandomCode() {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }

    function updateDoneButtonState() {
        doneButton.disabled = selectedPersonalities.children.length ==0;
    }

    function addPersonalityToSelected(name) {
        const existing = Array.from(selectedPersonalities.children).some(item => item.textContent.includes(name));
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
            });
    
            li.addEventListener('click', (event) => {
                const personality = personalityData.find(p => p.name === name);
                if (personality) {
                    initializeRadarChart(currentTraits, personality.values);
                }
            });
    
            li.appendChild(deleteSpan);
            selectedPersonalities.appendChild(li);
            updateDoneButtonState();
        }
    }

    resetButton.addEventListener('click', function() {
        initializeRadarChart(currentTraits);
        d3.selectAll("#personalityNames li")
            .style("font-weight", "normal")
            .style("background-color", "transparent");
    });

    applyKNNButton.addEventListener('click', function() {
        const currentValues = d3.selectAll(".radar-point").data().map(d => d.value);
        applyKNN(currentValues);
    });

    sortButton.addEventListener('click', sortPersonalities);
    addTraitButton.addEventListener('click', addTraitToBucket);
    loadPersonalities();
    initializeRadarChart(currentTraits);
    initializeSortable();

    document.getElementById('doneButton').addEventListener('click', async function() {
        const randomCode = generateRandomCode();
        document.getElementById('generatedCodeDisplay').textContent = `Your code is: ${randomCode}`;
        console.log("Generated code:", randomCode);
        const selectedPersonalityNodes = document.querySelectorAll('#selectedPersonalities li');
        const personalities = Array.from(selectedPersonalityNodes).map(node => {
            // Remove any extraneous characters by using a regular expression that captures only the name
            const name = node.textContent.replace(/\×$/, '').trim();
            const personality = personalityData.find(p => p.name === name);
            if (!personality) {
                console.error('Failed to find personality for name:', name);
                return null; // Skip this entry
            }
            return { name, values: personality.values };
        }).filter(p => p !== null); // Filter out any null entries due to missing personalities
    
        const username = localStorage.getItem('username'); // Make sure username is stored in localStorage
    
        try {
            const response = await fetch('http://localhost:5002/api/savePersonalities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Make sure the token is stored and sent correctly
                },
                body: JSON.stringify({ username, personalities })
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













