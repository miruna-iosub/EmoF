class MapObject {
    fieldName;
    map;

    constructor(fieldName, map) {
        this.fieldName = fieldName;
        this.map = map;
    }
}

function convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let csv = '';

    for (let i = 0; i < array.length; i++) {
        let row = '';
        for (let key in array[i]) {
            if (row !== '') row += ',';
            row += array[i][key];
        }
        csv += row + '\r\n';
    }

    return csv;
}

function downloadCSV(csvData, filename) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
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
        let prodId =array[4];
        let category=array[3];
        console.log(prodId+ " " +category);
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

let ok=data.allFields;
console.log(ok[1]);

                
const csvData = convertToCSV(statistics);
const filename = 'statistics.csv';
downloadCSV(csvData, filename);




            })
    } catch (e) {
        console.log(e);
    }

}


