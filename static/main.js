document.addEventListener("DOMContentLoaded", function() {
    const sphere = document.getElementById("stock-sphere");
    const stockDiv = document.getElementById("stock");
    const stockForm = document.getElementById("stock-form");
    const stockSymbolInput = document.getElementById("stock-symbol");

    function updateSphereColor(stockSymbol) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://127.0.0.1:5000/getColor/${stockSymbol}`, true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = xhr.responseText;
                sphere.classList.remove("red", "green");

                if (response === "red") {
                    sphere.classList.add("red");
                } else if (response === "green") {
                    sphere.classList.add("green");
                }
            } else {
                console.error("Error fetching stock color.");
            }
        };

        xhr.send();
    }

    stockForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const stockSymbol = stockSymbolInput.value;
        stockDiv.textContent = `Stock Symbol: ${stockSymbol}`;
        updateSphereColor(stockSymbol);
    });

    // Initial update when the page loads
    const initialStockSymbol = "AAPL";
    stockSymbolInput.value = initialStockSymbol;
    stockDiv.textContent = `Stock Symbol: ${initialStockSymbol}`;
    updateSphereColor(initialStockSymbol);

    setInterval(function() {
        updateSphereColor(stockSymbolInput.value);
    }, 10000);
});
