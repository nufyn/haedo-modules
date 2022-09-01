/**
 * 본 스크립트는 백엔드 API 입니다.
 * 프로젝트에 적절한 라우팅을 부탁드립니다. 
 * 
 * 설치 필요 모듈 리스트
 * mysql
 * bycrypt
 *  */

const bcrypt = require('bcrypt');


/**
 * DB 설정 부탁드립니다.
 */
const pool = require("../../../../config/dbconfig");

module.exports = {
    /**
     * Signin Router
     * @param {*} req 
     * @param {*} res 
     */
    signin(req, res) {
        const saltRounds = 10;
        console.log("req.body", req.body)
        //JSON.parse를 이용해 jsontext를 파싱해 contact 변수에 넣어준다. 	        
        var body = JSON.parse(req.body);
        console.log("body", body)
        /**
         * id, pw 값은 필수입니다
         */
        pool.getConnection((err, connection) => {
            const sql = `SELECT COUNT(*) cnt FROM Users WHERE id=?;`;
            const data = [req.body.id];
            connection.query(sql, data, (err, results) => {
                console.log("results", results)
                res.json({
                    tmp: "tmp"
                })
                return;
                if (results[0].cnt == 0) {
                    bcrypt.hash(req.body.pw, saltRounds, function (err, hash) {
                        req.body.pw = hash;
                        /**
                         * req.body로 전달되는 컬럼을 자동으로 insert 합니다
                         */
                        let data = []
                        let sql = `INSERT INTO Users(`;
                        for (var i = 0; i < body.length; i++) {
                            sql += `?,`;
                        }
                        sql = sql.slice(0, -1) + `) VALUES (`;
                        for (var i = 0; i < body.length; i++) {
                            sql += `?,`;
                            data.push(body[i])
                        }
                        sql = sql.slice(0, -1) + `);`

                        connection.query(sql, data, (err, results) => {
                            console.log(sql);
                            console.log(data);

                            if (results) {
                                console.log(results);
                                res.json(
                                    //Response - 200
                                    {
                                        // Nufyn Error Code. 아래 에러코드를 참고해주세요.
                                        "status": {
                                            "status_code": 200,
                                            "status_msg": null,
                                            "status_err": null
                                        },
                                        // API처리 결과 반환은 아래 results 변수에 담아주세요.
                                        "results": null
                                    }
                                )
                            } else {
                                console.log(err.sql);
                                console.log(err.sqlMessage);
                                res.json({
                                    // Nufyn Error Code. 아래 에러코드를 참고해주세요.
                                    "status": {
                                        "status_code": 601,
                                        "status_msg": "Signin 에러입니다.",
                                        "status_err": err
                                    },
                                    // API처리 결과 반환은 아래 results 변수에 담아주세요.
                                    "results": null
                                })
                            }
                        })
                    })
                } else {
                    res.json(
                        //Response - 604
                        {
                            // Nufyn Error Code. 아래 에러코드를 참고해주세요.
                            "status": {
                                "status_code": 604,
                                "status_msg": "유저가 존재합니다",
                                "status_err": null
                            },
                            // API처리 결과 반환은 아래 results 변수에 담아주세요.
                            "results": null
                        }
                    )
                }
            })
        })
    },
    /**
     * Signout Router
     * @param {*} req 
     * @param {*} res 
     */
    signout(req, res) {

    }
}
