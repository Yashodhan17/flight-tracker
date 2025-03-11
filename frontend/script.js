async function fetchFlights() {
    try {
        const response = await fetch("http://localhost:5000/flights");
        const data = await response.json();

        const flightList = document.getElementById("flight-list");
        flightList.innerHTML = ""; // Clear old data

        data.states.slice(0, 10).forEach((flight) => {
            const li = document.createElement("li");
            li.textContent = `Flight: ${flight[1]} - Latitude: ${flight[6]}, Longitude: ${flight[5]}`;
            flightList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching flights:", error);
    }
}
