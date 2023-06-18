function getStatistics(format) {
    if (format === "inPage") {
        window.location = "htmlVisualisation";
    }else if(format === 'chart'){
      window.location = "chartVisualisation";

    } else {
        downloadJson();
    }
}

class MapObject {
    fieldName;
    map;

    constructor(fieldName, map) {
        this.fieldName = fieldName;
        this.map = map;
    }
}

function downloadJson() {
    try {
        let array = window.location.href.split("/");
        let prodId = array[4];
        let category = array[3];
        console.log(prodId + " " + category);
        var index = 0;
        fetch('http://localhost:3005/statistics/' + prodId + '/' + category,
            {
                method: 'GET',
                credentials: 'include',
            })

            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.message==="Unauthorised"){
                    window.alert(data.message);
                    window.location="/";
                }
                else {
                    let questNameValuesProduct = [];
                    for (let index = 0; index < data.mapsProduct.length; index++) {
                        questNameValuesProduct[index] = new MapObject(data.allFields[index], data.mapsProduct[index]);
                    }
                    let questNameValuesInCategory = [];
                    for (let index = 0; index < data.mapsCategory.length; index++) {
                        questNameValuesInCategory[index] = new MapObject(data.commonFields[index], data.mapsCategory[index]);
                    }
                    const statistics = {
                        'Available emotions': data.arrayOfEmotions,
                        'All fields': data.allFields,
                        'Fields common with other in category': data.commonFields,
                        'Emotion for each field of the product': questNameValuesProduct,//    data.mapsProduct,
                        'Average emotion felt in category': questNameValuesInCategory,//data.mapsCategory,
                        'Most felt emotion per question product': data.mostFeltEmotionPerQuestionProduct,//
                        'Most felt emotion per question category': data.mostFeltEmotionPerQuestionCategory,//
                        'Total number of reviews product': data.totalNumberOfReviewsProduct,//
                        'Total number of reviews category': data.totalNumberOfReviewsCategory,//
                        'Percent matrix product float': data.percentMatrixProduct,//
                        'Percent matrix category float': data.percentMatrixCategory,//
                        'Percent matrix product': data.percentMatrixProductWith,//
                        'Percent matrix category': data.percentMatrixCategoryWith, //
                    };

                    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(statistics));
                    var downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", dataStr);
                    downloadAnchorNode.setAttribute("download", prodId + "_" + category + "statistics.json");
                    document.body.appendChild(downloadAnchorNode); // required for firefox
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                }
    });
    }catch (e) {
        console.log(e);
    window.alert('Failed at getting data.');
    }

}


function getChart() {
    try {
        let array = window.location.href.split("/");
        let prodId = array[4];
        let category = array[3];
        console.log(prodId + " " + category);
        var index = 0;
        fetch('http://localhost:3005/statistics/' + prodId + '/' + category,
            {
                method: 'GET',
                credentials: 'include',
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.message==="Unauthorized."){
                    window.alert(data.message);
                    window.location="/";
                }else{
                    let questNameValuesProduct = [];
                for (let index = 0; index < data.mapsProduct.length; index++) {
                    questNameValuesProduct[index] = new MapObject(data.allFields[index], data.mapsProduct[index]);
                }
                let questNameValuesInCategory = [];
                for (let index = 0; index < data.mapsCategory.length; index++) {
                    questNameValuesInCategory[index] = new MapObject(data.commonFields[index], data.mapsCategory[index]);
                }

                const statistics = {
                    'Available emotions': data.arrayOfEmotions,
                    'All fields': data.allFields,
                    'Fields common with other in category': data.commonFields,
                    'Emotion for each field of the product': questNameValuesProduct,//    data.mapsProduct,
                    'Average emotion felt in category': questNameValuesInCategory,//data.mapsCategory,
                    'Most felt emotion per question product': data.mostFeltEmotionPerQuestionProduct,//
                    'Most felt emotion per question category': data.mostFeltEmotionPerQuestionCategory,//
                    'Total number of reviews product': data.totalNumberOfReviewsProduct,//
                    'Total number of reviews category': data.totalNumberOfReviewsCategory,//
                    'Percent matrix product float': data.percentMatrixProduct,//
                    'Percent matrix category float': data.percentMatrixCategory,//
                    'Percent matrix product': data.percentMatrixProductWith,//
                    'Percent matrix category': data.percentMatrixCategoryWith, //
                };
                document.getElementById("statisticsJson").innerHTML = JSON.stringify(statistics, undefined, 4);
            } })
    } catch (e) {
        console.log(e);
    }


}

/////////////////
function convertToCSV(statistics) {
    const csvHeader = `Question,${statistics.emotions.join(",")}\n`;

    // Prepare the CSV content
    let csvContent = "";

    // Iterate over each question and its corresponding row in the matrix
    for (let i = 0; i < statistics.questions.length; i++) {
        const question = statistics.questions[i];
        const row = statistics.matrix[i];

        // Convert the row values to a comma-separated string
        const rowValues = row.join(",");

        // Append the question and row values to the CSV content
        csvContent += `${question},${rowValues}\n`;
    }

    // Combine the header and content to form the complete CSV data
    const csvData = csvHeader + csvContent;
    return csvData;
}

function downloadCSV(csvData, filename) {
    const blob = new Blob([csvData], {type: "text/csv"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
}

function getCSV1() {
    try {
        let array = window.location.href.split("/");
        let prodId = array[4];
        let category = array[3];
        console.log(prodId + " " + category);
        var index = 0;
        fetch("http://localhost:3005/statistics/" + prodId + "/" + category, {
            method: "GET",
            credentials: 'include',

        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.message==="Unauthorized."){
                    window.alert(data.message);
                    window.location="/";
                }else {
                    const statistics = {
                        questions: data.allFields,
                        matrix: data.matrixProduct,
                        emotions: data.arrayOfEmotions,
                    };
                    const csvData = convertToCSV(statistics);
                    const filename = `${prodId}_${category}_statistics.csv`;
                    downloadCSV(csvData, filename);
                }
            });
    } catch (e) {
        console.log(e);
    }
}

/////////////////

function getCSV2() {
    try {
        let array = window.location.href.split("/");
        let prodId = array[4];
        let category = array[3];
        console.log(prodId + " " + category);
        var index = 0;
        fetch("http://localhost:3005/statistics/" + prodId + "/" + category, {
            method: "GET",
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.message==="Unauthorized."){
                    window.alert(data.message);
                    window.location="/";
                }else {
                    const statistics = {
                        questions: data.allFields,
                        matrix: data.percentMatrixProductWith,
                        emotions: data.arrayOfEmotions,
                    };
                    const csvData = convertToCSV(statistics);
                    const filename = `${prodId}_${category}_statistics.csv`;
                    downloadCSV(csvData, filename);
                }
            });
    } catch (e) {
        console.log(e);
    }
}

////////

function convertToCSV1(statistics) {
    const csvHeader = `Question, Most Felt, Frequency \n`;

    // Prepare the CSV content
    let csvContent = "";

    // Iterate over each question and its corresponding row in the matrix
    for (let i = 0; i < statistics.questions.length; i++) {
        const question = statistics.questions[i];
        const row = statistics.matrix[i];

        // Convert the row values to a comma-separated string
        const rowValues = row.join(",");

        // Append the question and row values to the CSV content
        csvContent += `${question},${rowValues}\n`;
    }

    // Combine the header and content to form the complete CSV data
    const csvData = csvHeader + csvContent;
    return csvData;
}


function getCSV3() {
    try {
        let array = window.location.href.split("/");
        let prodId = array[4];
        let category = array[3];
        console.log(prodId + " " + category);
        var index = 0;
        fetch("http://localhost:3005/statistics/" + prodId + "/" + category, {
            method: "GET",
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.message==="Unauthorized."){
                    window.alert(data.message);
                    window.location="/";
                }else {
                    const statistics = {
                        questions: data.allFields,
                        matrix: data.mostFeltEmotionPerQuestionProduct,
                    };
                    const csvData = convertToCSV1(statistics);
                    const filename = `${prodId}_${category}_statistics.csv`;
                    downloadCSV(csvData, filename);
                }
            });
    } catch (e) {
        console.log(e);
    }
}

//////////////


function getCSV4() {
    try {
        let array = window.location.href.split("/");
        let prodId = array[4];
        let category = array[3];
        console.log(prodId + " " + category);
        var index = 0;
        fetch("http://localhost:3005/statistics/" + prodId + "/" + category, {
            method: "GET",
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.message==="Unauthorized."){
                    window.alert(data.message);
                    window.location="/";
                }else {
                    const statistics = {
                        questions: data.allFields,
                        matrix: data.matrixCategory,
                        emotions: data.arrayOfEmotions,
                    };
                    const csvData = convertToCSV(statistics);
                    const filename = `${prodId}_${category}_statistics.csv`;
                    downloadCSV(csvData, filename);
                }
            });
    } catch (e) {
        console.log(e);
    }
}

////////////

function getCSV5() {
    try {
        let array = window.location.href.split("/");
        let prodId = array[4];
        let category = array[3];
        console.log(prodId + " " + category);
        var index = 0;
        fetch("http://localhost:3005/statistics/" + prodId + "/" + category, {
            method: "GET",
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.message==="Unauthorized."){
                    window.alert(data.message);
                    window.location="/";
                }else {
                    const statistics = {
                        questions: data.allFields,
                        matrix: data.percentMatrixCategoryWith,
                        emotions: data.arrayOfEmotions,
                    };
                    const csvData = convertToCSV(statistics);
                    const filename = `${prodId}_${category}_statistics.csv`;
                    downloadCSV(csvData, filename);
                }
            });
    } catch (e) {
        console.log(e);
    }
}

/////////////////


function getCSV6() {
    try {
        let array = window.location.href.split("/");
        let prodId = array[4];
        let category = array[3];
        console.log(prodId + " " + category);
        var index = 0;
        fetch("http://localhost:3005/statistics/" + prodId + "/" + category, {
            method: "GET",
            credentials: 'include',
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.message==="Unauthorized."){
                    window.alert(data.message);
                    window.location="/";
                }else {
                    const statistics = {
                        questions: data.allFields,
                        matrix: data.mostFeltEmotionPerQuestionCategory,
                    };
                    const csvData = convertToCSV1(statistics);
                    const filename = `${prodId}_${category}_statistics.csv`;
                    downloadCSV(csvData, filename);
                }
            });
    } catch (e) {
        console.log(e);
    }
  }
////////////////
function getChart1() {
    try {
      let array = window.location.href.split("/");
      let prodId = array[4];
      let category = array[3];
      console.log(prodId + " " + category);
      fetch('http://localhost:3005/statistics/' + prodId + '/' + category, {
        method: 'GET'
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let coloane = [];
          for(let i=0; i<data.matrixCategory.length; i++){
            for(let j = 0; j< data.arrayOfEmotions.length; j++){
              coloane[j] = data.matrixProduct[i][j];
            }
          }
  
          const chartData = {
            labels: data.arrayOfEmotions,
            datasets: [
              {
                label: 'Statistics',
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                data: coloane
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
  
