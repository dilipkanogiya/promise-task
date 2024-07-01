// Function to fetch data from an API and update the DOM
function fetchData(url, containerId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayData(data, containerId);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Function to create and append card elements
function createCards(title, body, container) {
    let column = document.createElement('div');
    column.classList.add('col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-4', 'mb-4');

    let card = document.createElement('div');
    card.setAttribute('class', 'card h-100 text-center');

    card.innerHTML = `
        <div class="card-header bg-dark text-center text-white">
            <h2>${title}</h2>
        </div>
        <div class="card-body pb-4">
            ${body}
        </div>
    `;

    column.appendChild(card);
    container.appendChild(column);
}

// Function to display data in the DOM
function displayData(data, containerId) {
    const container = document.querySelector(`#${containerId} .data-container`);
    
    if (containerId === 'api1') {
        // Display cat images
        data.forEach((cat, index) => {
            const body = `<img src="${cat.url}" class="card-img-top" alt="Cat Image">`;
            createCards(`Cat Image ${index + 1}`, body, container);
        });
    } else if (containerId === 'api2') {
        // Display dog images
        data.message.forEach((dogUrl, index) => {
            const body = `<img src="${dogUrl}" class="card-img-top" alt="Dog Image">`;
            createCards(`Dog Image ${index + 1}`, body, container);
        });
    } else if (containerId === 'api3') {
        // Display jokes
        data.forEach((joke, index) => {
            const body = `<p>${joke.setup} - ${joke.punchline}</p>`;
            createCards(`Joke ${index + 1}`, body, container);
        });
    }
}

