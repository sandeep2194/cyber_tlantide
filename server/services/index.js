const fs = require('fs');
const path = require('path');
const helpers = require('../utils/helpers');

exports.saveBill = (data) => {
    const today = helpers.todayDate();
    const dir = path.join("../data/", today.toString());
    if (!fs.existsSync(dir)) {
        fs.mkdir(path.join("../data/", today.toString()), (err) => helpers.logError(err));
    }
    createCSV(data, dir)
}

const createCSV = (data, dir) => {
    const ObjectsToCsv = require('objects-to-csv');
    // Sample data - two columns, three rows:
    const data2 = [
        { code: 'CA', name: 'California' },
        { code: 'TX', name: 'Texas' },
        { code: 'NY', name: 'New York' },
    ];
    // If you use "await", code must be inside an asynchronous function:
    (async () => {
        const csv = new ObjectsToCsv(data2);
        // Save to file:
        await csv.toDisk(path.join(dir, data2[0].name + '.csv'));
        // Return the CSV file as string:
        console.log(await csv.toString());
    })();
}
this.saveBill();