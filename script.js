var bill = {
    store: {
        ids: ["facture", "entreprise", "nom", "courriel", "addresse_postale", "telephone", "paiement", "service", "description", "qty", "prix", "total", "tps", "tvq", "gTotal", "livraison_demandee"],
        data: {},
    },
    addRow: () => {
        let items = document.getElementById('items')
        let row = document.createElement('div');
        row.className = "row";
        let col = document.createElement('div');
        col.className = "col";
        const classesForInputs = ["service", "description", "qty", "prix"]
        classesForInputs.forEach((v, i) => {
            let input = document.createElement('input');
            input.type = "text";
            input.className = v.toString();
            input.id = v.toString();
            if (i == 2 || i == 3) {
                input.value = 0;
            }
            if (v == "qty" || v == "prix") {
                input.addEventListener('change', bill.total);
            }
            col.appendChild(input);
        })
        row.appendChild(col);
        if (items)
            items.appendChild(row);
    },
    total: () => {
        let allPrice = document.querySelectorAll("#items .prix");
        let allQty = document.querySelectorAll('#items .qty');
        amt = 0;
        if (allPrice.length > 0) {
            for (let index = 0; index < allPrice.length; index++) {
                const price = allPrice[index].value;
                const qty = allQty[index].value;
                amt += parseFloat(price * qty);
            }
        }
        const tps = amt * 0.05;
        const tvq = amt * 0.085;
        const gTotal = amt + tps + tvq;

        document.getElementById("total").innerHTML = amt.toFixed(2);
        document.getElementById("tps").innerHTML = tps.toFixed(2);
        document.getElementById("tvq").innerHTML = tvq.toFixed(2);
        document.getElementById("gTotal").innerHTML = gTotal.toFixed(2);
    },
    save: () => {
        bill.total();
        data = {};
        bill.store.ids.forEach((v, i) => {
            const el = document.getElementById(v);
            // el ? console.log(el.tagName) : console.log(null)
            if (el && el.tagName == 'INPUT') {
                if (el.type)
                    data[v.toString()] = el.value ? el.value : 'null';
            } else if (el && el.tagName == "DIV") {
                data[v.toString()] = el.innerHTML ? el.innerHTML : 'null'
            }
        });
        bill.store.data = data;
        localStorage.setItem("store", JSON.stringify(bill.store));
    },
}
window.addEventListener("load", bill.addRow);
