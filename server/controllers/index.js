const billService = require('../services')

exports.bill = async (req, res) => {
    try {
        const { client, bill } = req.query
        if (!client || !bill)
            return res.status(400).send('Phone number required')
        const save = billService.saveBill({ client, bill });
        return res.status(200).send('bill saved')
    } catch (error) {
        res.status(500).send({ 'status': error })
    }
}

