const Calllog = require('../Models/Calllog');
const mongoose = require('mongoose');

exports.calllog_get_calllog = async (req, res) => {
    Calllog.find()
        .select('-__v')
        .exec()
        .then(result => {
            const response = {
                count: result.length,
                Calllog: result.map(docs => {
                    return {
                        _id: docs._id,
                        CallTo: docs.CallTo,
                        StartTime: docs.StartTime,
                        StopTime: docs.StopTime
                    }
                })
            }
            if (result.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "Nothing"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

exports.calllog_add_calllog = async (req, res) => {
    const calllog = new Calllog({
        _id: new mongoose.Types.ObjectId(),
        CallTo: req.body.callto,
        StartTime: req.body.starttime,
        StopTime: req.body.stoptime
    });

    calllog.save().then(result => {
        res.status(201).json({
            message: "Call log has been added !",
            createProduct: {
                Product: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:2229/calllog/',
                }
            }
        })
    }).catch(err => {
        res.status(500).json({
            error: err,
            a: req.body
        });
    })
}

exports.calllog_delete_calllog = (req, res) => {
    const id = req.params.calllogId;
    Calllog.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Calllog Removed!",
                calllog: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:2229/calllog'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}