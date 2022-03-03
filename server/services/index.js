const fs = require('fs');
const path = require('path');
const helpers = require('../utils/helpers');
const CSV = require('csv-blink');

exports.saveBill = (data) => {
    const today = helpers.todayDate();
    const dir = path.join("../data/", today.toString());
    if (!fs.existsSync(dir)) {
        fs.mkdir(path.join("../data/", today.toString()), (err) => helpers.logError(err));
    }
    createCSV(data, dir)
}

const createCSV = (data, dir) => {
    const csv = new CSV(
        ["No Facture", "Nom Entreprise", "Nom", "Courriel", "Adresse", "Telephone", "# Cheque", "Livraison", "Sous Total", "TPS", "TVQ", "Grand Total", "produit", "options", "quantite", "prix"],
    )
    const row = Object.values(data);
    csv.addRow(row)
    const file = fs.writeFile(path.join(dir, data.noFacture + '.csv'), csv.file, (err) => helpers.logError(err))
    console.log('done', csv.file);
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