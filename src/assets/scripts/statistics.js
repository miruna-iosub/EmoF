function getStatistics(format) {
  if (format === "html") {
    window.location = "htmlVisualisation";
  } else if (format === "csv") {
    window.location = "csvVisualisation.html";
  } else if (format === "json") {
    window.location = "jsonlVisualisation.html";
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

function getChart() {
  try {
    let array = window.location.href.split("/");
    let prodId = array[4];
    let category = array[3];
    console.log(prodId + " " + category);
    var index = 0;
    fetch('http://localhost:3005/statistics/' + prodId + '/' + category,
      {
        method: 'GET'
      })

      .then((response) => {
        return response.json();
      })
      .then((data) => {
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




        let ok = data.allFields;
        console.log(ok[1]);

        document.getElementById("statisticsJson").innerHTML = JSON.stringify(statistics, undefined, 4);


        // import { parse } from 'json2csv';
        //
        // const obj = [
        //     { firstName: 'Russell', lastName: 'Castillo', age: 23 },
        //     { firstName: 'Christy', lastName: 'Harper', age: 35 },
        //     { firstName: 'Eleanor', lastName: 'Mark', age: 26 },
        // ];
        //
        // const csv = parse(obj, { delimiter: '|' });
        //
        // console.log(csv);
        // var fields = Object.keys(statistics)
        // var replacer = function(key, value) { return value === null ? '' : value }
        // var csv = statistics.map(function(row){
        //     return fields.map(function(fieldName){
        //         return JSON.stringify(row[fieldName], replacer)
        //     }).join(',')
        // })
        // csv.unshift(fields.join(',')) // add header column
        // csv = csv.join('\r\n');
        // console.log(csv)
        //
        //
        //
        // document.getElementById("statisticsCsv").innerHTML =csv;
      })
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
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
}

function getCSV() {
  try {
    let array = window.location.href.split("/");
    let prodId = array[4];
    let category = array[3];
    console.log(prodId + " " + category);
    var index = 0;
    fetch("http://localhost:3005/statistics/" + prodId + "/" + category, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const statistics = {
          questions: data.allFields,
          matrix: data.matrixProduct,
          emotions: data.arrayOfEmotions,
        };
        const csvData = convertToCSV(statistics);
        const filename = "statistics.csv";
        downloadCSV(csvData, filename);
      });
  } catch (e) {
    console.log(e);
  }
}
