var bill = {
    addRow: () => {
        let items = document.getElementById('items')
        let row = document.createElement('div');
        row.className = "row";
        let col = document.createElement('div');
        col.className = "col";
        const classesForInputs = ["service", "description", "quantity", "prix"]
        classesForInputs.forEach((v, i) => {
            let input = document.createElement('input');
            input.type = "text";
            input.className = v.toString();
            if (i == 2 || i == 3) {
                input.value = 0;
            }
            col.appendChild(input);
        })
        row.appendChild(col);
        items.appendChild(row);
        bill.total();
    },
    total: () => {
        let allPrice = document.querySelectorAll("#items .prix");
        let allQty = document.querySelectorAll('#items .quantity');
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
}
window.addEventListener("load", bill.addRow);
