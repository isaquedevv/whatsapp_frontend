const { Router } = require("express")
const conn = require("../db/connection");

const router = Router();

router.post("/auth", async (req, res) =>{

    let isAuth = false;
    const { telefone, senha } = req.query
    const cmd = "select * from utilizadores where telefone = ? and senha = ?;"
    const query = await conn.query(cmd,[telefone, senha]);

if(query[0].length > 0)
{
    isAuth = true
}


    res.json({
        isAuth: isAuth
    })
});


module.exports = router;