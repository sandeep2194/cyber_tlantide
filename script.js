
var bill = {
    store: {
        ids: ["facture", "entreprise", "nom", "courriel", "addresse_postale", "telephone", "paiement", "total", "tps", "tvq", "gTotal", "livraison_demandee"],
        data: {},
        invNum: 0,
        //change number of rows of bill items
        numberOfRows: 4,
        // change services from those rows
        services: ['test1', "test2", "test3", "test4"],
        // change description from those rows
        description: ['test1', "test2", "test3", "test4"],
        localserverUrl: "http://127.0.0.1:3000",
        prodserverUrl: "https://164.92.66.219:3000",
        url: "0",
        env: 'prod'
    },
    addRow: async () => {
        if (bill.store.env == 'dev') {
            bill.store.url = bill.store.localserverUrl;
        } else {
            bill.store.url = bill.store.prodserverUrl;
        }
        await bill.getInvNum();
        // console.log(bill.store.invNum);
        for (let i = 0; i < bill.store.numberOfRows; i++) {
            const currentService = bill.store.services[i];
            const currentDescription = bill.store.description[i];
            document.getElementById('inv').innerHTML = bill.store.invNum;
            let items = document.getElementById('items')
            let row = document.createElement('div');
            row.className = "row";
            let col = document.createElement('div');
            col.className = "col";
            const classesForInputs = ["service", "description", "qty", "prix"]
            classesForInputs.forEach((v, i2) => {
                let input = document.createElement('input');
                input.type = "text";
                input.className = v.toString();
                input.id = v.toString();
                if (i2 == 0) {
                    input.value = currentService
                }
                if (i2 == 1) {
                    input.value = currentDescription
                }
                if (i2 == 2 || i2 == 3) {
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
        }
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
        let allPrice = document.querySelectorAll("#items .prix");
        let allQty = document.querySelectorAll('#items .qty');
        let allService = document.querySelectorAll('#items .service');
        let allDes = document.querySelectorAll('#items .description');
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
        let services = {}
        if (allService.length > 0) {
            for (let index = 0; index < allService.length; index++) {
                const price = allPrice[index].value;
                const qty = allQty[index].value;
                const ser = allService[index].value;
                const des = allDes[index].value;

                services["prix" + (index + 1)] = price;
                services["quantity" + (index + 1)] = qty;
                services["service" + (index + 1)] = ser;
                services["description" + (index + 1)] = des;
            }
            data['services'] = services
        }
        data.inv = bill.store.invNum;
        bill.store.data = data;
        localStorage.setItem("store", JSON.stringify(bill.store));
        bill.sendData();
    },
    sendData: () => {
        const url = bill.store.url + "/bill";
        fetch(url, {

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
        const url = bill.store.url + "/inv"
        let rep = await fetch(url, {
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
