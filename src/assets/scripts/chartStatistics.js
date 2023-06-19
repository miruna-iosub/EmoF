function getStatistics(format) {
    if (format === 'html') {
        window.location = 'htmlVisualisation.html';
    } else if (format === 'csv') {
        window.location = 'htmlVisualisation.html';
    } else if (format === 'json') {
        window.location = 'htmlVisualisation.html';
    }


}


class MapObject1 {
    fieldName;
    map;

    constructor(fieldName, map) {
        this.fieldName = fieldName;
        this.map = map;
    }

}

function getChart() {
    try {
        let prodId = '648c84c13bbc8ab24a97c074';
        let category = 'product';
        var index = 0;
        fetch('http://localhost:3005/api/v1/statistics/' + prodId + '/' + category, {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const statistics = {
                    'All fields': data.allFields,
                    'Fields Common with others in category': data.commonFields,
                    'Emotion for each field of the product': data.mapsProduct,
                    'Average emotion felt in category': data.mapsCategory,
                };

                const chartData = {
                    labels: Object.keys(statistics),
                    datasets: [
                        {
                            label: 'Statistics',
                            backgroundColor: 'rgba(0, 123, 255, 0.5)',
                            borderColor: 'rgba(0, 123, 255, 1)',
                            borderWidth: 1,
                            data: Object.values(statistics).map((value) => value.length)
                        }
                    ]
                };

                const chartOptions = {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                };

                const ctx = document.getElementById('chartCanvas').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions
                });
            });
    } catch (e) {
        console.log(e);
    }
}