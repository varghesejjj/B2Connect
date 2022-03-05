const axios = require('axios')

exports.getIpinfo = async (req, res) => {
    if (!req.body.ip ) {
        res.json({
            success: false,
            message: "Please enter an Ip address",
        });
    }
    else {
        const ip = req.body.ip
        try {
            const ipDet = await axios.get(`http://api.iplocation.net/?ip=${ip}`)
            res.json({
                success: true,
                data: ipDet.data
            });
        } catch (err) {
            console.log(err)
            res.status(201).json({
                success: false,
                message: err.message,
            });
        }
    }
}
