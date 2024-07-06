const files = [
    'content/introduction.html', 
    'content/goals.html', 
    'content/population_size.html', 
    'content/use_cases_civilian-research.html', 
    'content/use_cases_civilian-resources.html', 
    'content/use_cases_civilian-health_tourism.html', 
    'content/use_cases_civilian-stepping_stone.html', 
    'content/use_cases_defence.html', 
    'content/architectural_concept.html', 
    'content/habitat_layout.html',
    'content/habitat_modules.html', 
    'content/habitat_materials.html',
    'content/inflatable_habitat.html', 			
    'content/water_storage_treatment.html', 
    'content/control_monitoring.html', 
    'content/surface_supply_logistics.html', 
    'content/mental_health_wellbeing.html', 
    'content/long_term_self_sufficiency.html', 
    'content/governance_management.html', 
    'content/safety_redundancy.html', 
    'content/environmental_control.html', 
    'content/list_of_disruptive_technologies.html', 
    'content/summary.html'
];

// Function to fetch content and append to the DOM
async function fetchAndDisplayContent() {
    const container = document.getElementById('content-container');

    // Array to store all fetch promises
    const fetchPromises = files.map(async file => {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}: ${response.status} ${response.statusText}`);
            }
            const html = await response.text();
            return { file, html };
        } catch (error) {
            console.error(error);
            return { file, html: `<div>Error loading ${file}</div>` };
        }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(fetchPromises);

    // Create containers for each group of sections
    const firstThreeContainer = createSectionContainer('Introduction');
    const nextFiveContainer = createSectionContainer('Application');
    const followingFiveContainer = createSectionContainer('Lunar Base Concept');
    const followingEightContainer = createSectionContainer('Logistics and Technology');
    const lastTwoContainer = createSectionContainer('Final Sections');

    // Track the number of sections added
    let sectionCount = 0;

    // Process each fetched result
    results.forEach(({ file, html }) => {
        // Create a temporary div to parse the HTML and find the title
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Find the header element (assuming it's the first h1 or h2)
        const headerElement = tempDiv.querySelector('h1, h2');

        // Use header text as button text
        const buttonText = headerElement ? headerElement.textContent : 'Untitled';

        // Create a section for each file's content
        const section = document.createElement('div');
        section.classList.add('content-section');
        section.innerHTML = `<button class="collapsible">${buttonText}</button><div class="content">${html}</div>`;

        // Append the section to the appropriate container
        if (sectionCount < 3) {
            firstThreeContainer.appendChild(section);
        } else if (sectionCount < 8) {  // Next five chapters
            nextFiveContainer.appendChild(section);
        } else if (sectionCount < 13) {  // Following five chapters
            followingFiveContainer.appendChild(section);
        } else if (sectionCount < 20) {  // Following seven chapters
            followingEightContainer.appendChild(section);
        } else {  // Last two chapters
            lastTwoContainer.appendChild(section);
        }

        sectionCount++;
    });

    // Append the containers to the main container
    container.appendChild(firstThreeContainer);
    container.appendChild(nextFiveContainer);
    container.appendChild(followingFiveContainer);
    container.appendChild(followingEightContainer);
    container.appendChild(lastTwoContainer);

    // Trigger the collapsible functionality after all content is loaded
    triggerCollapsible();
}

// Function to create a container with a title
function createSectionContainer(title) {
    const container = document.createElement('div');
    container.classList.add('content-section', 'grouped-container');

    const header = document.createElement('h2');
    header.textContent = title;
    container.appendChild(header);

    return container;
}

// Function to initialize collapsible elements
function triggerCollapsible() {
    const coll = document.getElementsByClassName('collapsible');
            
    Array.from(coll).forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
}

// Call the function to fetch and display content
fetchAndDisplayContent();
