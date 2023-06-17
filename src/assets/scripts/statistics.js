
function getStatistics(format) {
    if (format === 'html') {
        window.location = 'htmlVisualisation.html';
    } else if (format === 'csv') {
        window.location = 'htmlVisualisation.html';
    } else if (format === 'json') {
        window.location = 'htmlVisualisation.html';
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
        let prodId = window.location.href.toString().substring(22, window.location.href.lastIndexOf("/"));
        let category = 'person';
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
                const statistics= {
                    'All fields': data.allFields,
                    'Fields Common with other in category': data.commonFields,
                    'Emotion for each field of the product': questNameValuesProduct,//data.mapsProduct,
                    'Average emotion felt in category': questNameValuesInCategory,//data.mapsCategory,
                };



                document.getElementById("statisticsJson").innerHTML =JSON.stringify(statistics,undefined,4);





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

