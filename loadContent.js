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
    'content/habitat modules.html', 
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

    for (const file of files) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();

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

            // Append the content to the container
            container.appendChild(section);
        } catch (error) {
            console.error(error);
        }
    }

    // Trigger the collapsible functionality after all content is loaded
    triggerCollapsible();
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
