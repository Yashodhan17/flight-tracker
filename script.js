async function fetchFlights() {
    const icao = document.getElementById('icao').value.toUpperCase();
    if (!icao) {
        alert("Please enter an airport ICAO code.");
        return;
    }

    const url = 'https://opensky-network.org/api/states/all';

    try {
        const response = await fetch(url);
        const data = await response.json();
        const flights = data.states;

        // Filter flights departing from the entered ICAO airport
        const filteredFlights = flights.filter(flight => flight[2] === icao);

        displayFlights(filteredFlights);
    } catch (error) {
        console.error("Error fetching flight data:", error);
        alert("Failed to load flight data.");
    }
}

function displayFlights(flights) {
    const tableBody = document.getElementById('flightData');
    tableBody.innerHTML = "";

    if (flights.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No flights found</td></tr>";
        return;
    }

    flights.forEach(flight => {
        const row = `<tr>
            <td>${flight[1] || "N/A"}</td>
            <td>${flight[2]}</td>
            <td>${flight[7] ? flight[7] + " m" : "N/A"}</td>
            <td>${flight[9] ? Math.round(flight[9] * 3.6) + " km/h" : "N/A"}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
