document.addEventListener('DOMContentLoaded', function() {
    const chapterNav = document.getElementById('chapterNav');
    const contentFrame = document.getElementById('contentFrame');

    // Define an array of chapters with their corresponding file names
    const chapters = [
        { title: 'Introduction', file: 'introduction.html' },
        { title: 'Habitat Structure', file: 'habitat_structure.html' },
        { title: 'Scenarios for Lunar Base Population and Design', file: 'scenarios_population_design.html' },
        // Add more chapters as needed
    ];

    // Populate the navigation with chapter buttons
    chapters.forEach(chapter => {
        const button = document.createElement('button');
        button.textContent = chapter.title;
        button.classList.add('collapsible');
        button.addEventListener('click', async function() {
            try {
                const filePath = `content/${chapter.file}`;
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`);
                }
                const html = await response.text();
                contentFrame.innerHTML = html;
            } catch (error) {
                console.error('Error fetching content:', error);
                contentFrame.innerHTML = `<p>Failed to load content from ${chapter.title}. Please check your network connection or file paths.</p>`;
            }
        });
        chapterNav.appendChild(button);
    });
});
