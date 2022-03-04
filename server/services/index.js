const fs = require('fs');
const path = require('path');
const storage = require('node-persist');
const helpers = require('../utils/helpers');
const CSV = require('csv-blink');

exports.saveBill = async (data) => {
    await helpers.startStore()
    const today = helpers.todayDate();
    const dir = path.join(__dirname, "../../data/", today.toString());
    let get = await storage.getItem('inv');
    if (!get) {
        await storage.setItem('inv', 1);
    }
    console.log('get', get);
    if (!fs.existsSync(dir)) {
        fs.mkdir(path.join(dir), (err) => helpers.logError(err));
    }
    createCSV(data, dir, get, today)
    get++
    await storage.setItem('inv', get);
}

const createCSV = (data, dir, billNo, date) => {
    const csv = new CSV(
        Object.keys(data),
    )
    const row = Object.values(data);
    csv.addRow(row)
    const fileName = billNo + '-' + date + "-" + "EB.csv"
    fs.writeFile(path.join(dir, fileName), csv.file, (err) => helpers.logError(err))
}
// this.saveBill({
//     noFacture: "test1223",
//     nf2: "test",
//     nf3: "test",
//     nf4: "test",
//     nf5: "test",
//     nf6: "test",
//     nf7: "test",
//     nf8: "test",
//     nf9: "test",
//     nf10: "test",
//     nf11: "test",
//     nf12: "test",
//     nf13: "test",
//     nf14: "test",
//     nf15: "test",
//     nf16: "test",
// });