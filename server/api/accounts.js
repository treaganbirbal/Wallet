const router = require("express").Router();
const { User, Accounts, Budget, Transaction } = require("../db/model");
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        await Accounts.getAll()
    } catch (error) {
        
    }
})

