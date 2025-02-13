let selectedCityInterval = null; // Variável para armazenar o intervalo da cidade selecionada

// horário local
function updateLocalTime() {
  const localTimeElement = document.getElementById("local-time");
  const now = new Date();
  localTimeElement.textContent = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function updateSelectedCityTime() {
  const timezoneSelect = document.getElementById("timezone-select");
  const selectedTimeElement = document.getElementById("selected-time");
  const timezone = timezoneSelect.value;

  if (timezone) {
 
    if (selectedCityInterval) {
      clearInterval(selectedCityInterval);
    }

 
    selectedCityInterval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Atualizando NOME - FILTRO 
      selectedTimeElement.innerHTML = `
        <p>Selected City: ${
          timezoneSelect.options[timezoneSelect.selectedIndex].text
        }</p>
        <p>Current Time: ${time}</p>
      `;
    }, 1000); // Atualiza a cada segundo
  } else {
    selectedTimeElement.innerHTML = `<p>Selected City: Choose a city to see the time.</p>`;
  }
}

// Exibe o horário de todas as cidades
function showAllCitiesTime() {
  const cities = {
    "America/New_York": "New York",
    "Europe/London": "London",
    "Asia/Tokyo": "Tokyo",
  };

  const allCitiesDiv = document.getElementById("all-cities");
  allCitiesDiv.innerHTML = "";

  // Atualiza todas  cidades   real
  setInterval(() => {
    allCitiesDiv.innerHTML = ""; // Limpa 

    Object.entries(cities).forEach(([timezone, city]) => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const cityTimeHtml = `
          <div class="card">
            <h3>${city}</h3>
            <p>Current Time: ${time}</p>
          </div>
        `;

      // Atualiza 
      allCitiesDiv.innerHTML += cityTimeHtml;
    });
  }, 1000); // Atualiza a cada segundo
}

// eventos aos elementos
document.addEventListener("DOMContentLoaded", () => {
  updateLocalTime();
  setInterval(updateLocalTime, 1000); // Atualiza o horário local a cada segundo

  const timezoneSelect = document.getElementById("timezone-select");
  timezoneSelect.addEventListener("change", updateSelectedCityTime);

  const allCitiesButton = document.getElementById("all-cities-btn");
  allCitiesButton.addEventListener("click", showAllCitiesTime);

  // Inicializando o select2 no select
});
