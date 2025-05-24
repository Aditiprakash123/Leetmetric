document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");

    const easyProgress = document.querySelector(".easy-progress");
    const mediumProgress = document.querySelector(".medium-progress");
    const hardProgress = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    async function fetchUserDetails(username) {
        const URL = `https://leetcode-stats-api.herokuapp.com/${username}`;

        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const data = await response.json();
            console.log("Fetched Data:", data);

            // Update the pie chart visualization
            updatePieCharts(data);
        } catch (error) {
            alert("Error fetching data: " + error.message);
            console.error("Fetch error:", error);
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updatePieCharts(data) {
        const totalEasy =  data.easySolved;
        const totalMedium = data.mediumSolved ;
        const totalHard =  data.hardSolved ;
        const totalSolved = totalEasy + totalMedium + totalHard || 1;

        const easyPercentage = (totalEasy / totalSolved) * 100;
        const mediumPercentage = (totalMedium / totalSolved) * 100;
        const hardPercentage = (totalHard / totalSolved) * 100;

        function setPieChart(element, percentage, color) {
            element.style.background = `conic-gradient(${color} ${percentage}%, #ddd ${percentage}% 100%)`;
            // element.style.background= `linear-gradient(to right, #4caf50 70%, #ddd 70%)`;
    
        }
        setPieChart(easyProgress, easyPercentage, "#2ecc71");
        setPieChart(mediumProgress, mediumPercentage, "#f1c40f");
        setPieChart(hardProgress, hardPercentage, "#e74c3c");

        easyLabel.innerText = `Easy/Total: ${totalEasy}/${totalSolved}`;
        mediumLabel.innerText = `Medium/Total: ${totalMedium}/${totalSolved}`;
        hardLabel.innerText = `Hard/Total: ${totalHard}/${totalSolved}`;
    }

    

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value.trim();

            fetchUserDetails(username);
    });
});
