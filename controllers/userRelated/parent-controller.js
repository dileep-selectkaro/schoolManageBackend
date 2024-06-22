const Parent = require('../../models/userRelated/parentSchema.js');
const bcrypt = require('bcrypt');
const { createNewToken } = require('../../utils/token.js');

exports.parentLogIn = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let parent = await Parent.findOne({ email: req.body.email });
            if (parent) {
                const validated = await bcrypt.compare(req.body.password, parent.password);
                if (validated) {
                    parent.password = undefined;

                    const parentID = parent._id
                    const token = createNewToken(parentID)

                    res.send({
                        ...parent.toObject(),
                        token
                    })
                } else {
                    res.send({ message: "Invalid password" });
                }
            } else {
                res.send({ message: "User not found" });
            }
        } else {
            res.send({ message: "Email and password are required" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};