var bill = {
    store: {
        ids: ["facture", "entreprise", "nom", "courriel", "addresse_postale", "telephone", "paiement", "service", "description", "qty", "prix", "total", "tps", "tvq", "gTotal", "livraison_demandee"],
        data: {},
        invNum: 0,
    },
    addRow: async () => {
        await bill.getInvNum();
        // console.log(bill.store.invNum);
        document.getElementById('inv').innerHTML = bill.store.invNum;
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
        data.inv = bill.store.invNum;
        bill.store.data = data;
        localStorage.setItem("store", JSON.stringify(bill.store));
        bill.sendData();
    },
    sendData: () => {
        fetch("http://164.92.66.219:3000/bill", {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                data: { ...bill.store.data }
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then(response => response.json())

            // Displaying results to console
            .then(json => console.log(json));
    },
    getInvNum: async () => {
        let rep = await fetch("http://164.92.66.219:3000/inv", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        // console.log(rep)
        let json = await rep.json()
        // console.log(json);
        bill.store.invNum = json.inv
        // .then(response => response.json()).then(json => bill.store.invNum = json.inv)
    }
}
window.addEventListener("load", bill.addRow);
