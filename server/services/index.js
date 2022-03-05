const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path');
const storage = require('node-persist');
const helpers = require('../utils/helpers');
const CSV = require('csv-blink');

exports.getInvNum = async () => {
    await helpers.startStore()
    return await storage.getItem('inv');
}

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

exports.deleteData = async () => {
    try {
        const dir = path.join(__dirname, "../../data")
        if (fs.existsSync(dir))
            await fs.rm(dir, {
                recursive: true
            }, (err) => helpers.logError(err))
        if (!fs.existsSync(dir))
            fs.mkdir(path.join(__dirname, "../../data/"), (err) => helpers.logError(err))
        await storage.setItem('inv', 1)
    } catch (error) {
        console.log(error)
    }
}


const createCSV = (data, dir, billNo, date) => {
    const csv = new CSV(
        Object.keys(data),
    )
    const row = Object.values(data);
    csv.addRow(row)
    const name = data.nom.split(" ");
    const nomFirstLetter = [...name[0]][0];
    const prenomFirstLetter = [...name[1]][0];
    const fileName = billNo + '-' + date + "-" + nomFirstLetter + prenomFirstLetter + ".csv"
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