const home = (req,res) => {
    res.status(200).json({"message":"hi"})
};

module.exports = home;
