const billService = require('../services')

exports.bill = async (req, res) => {
    try {
        const { data } = req.body
        console.log(data)
        if (!data)
            return res.status(400).send('Phone number required')
        const save = billService.saveBill({ ...data });
        return res.status(200).send('bill saved')
    } catch (error) {
        res.status(500).send({ 'status': error })
    }
}
exports.getInvNum = async (req, res) => {
    try {
        const inv = await billService.getInvNum();
        return res.status(200).send({ "inv": inv.toString() })
    } catch {
        res.status(500).send({ 'status': error })
    }
}

exports.deleteData = async (req, res) => {
    try {
        billService.deleteData();
        res.status(200).send({ 'status': "success", "message": "all data delted" },)
    } catch (error) {
        res.status(500).send({ 'status': error })
    }
}