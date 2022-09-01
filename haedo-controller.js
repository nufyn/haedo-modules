/**
 * 본 스크립트는 백엔드 API 입니다.
 * 프로젝트에 적절한 라우팅을 부탁드립니다. 
 * 
 * 설치 필요 모듈 리스트
 * mysql
 * bycrypt
 *  */

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


/**
 * DB 설정 부탁드립니다.
 */
const pool = require("../../../../config/dbconfig");

module.exports = {
    /**
     * Function Router
     * @param {*} req 
     * @param {*} res 
     */
    login(req, res) {
        pool.getConnection((err, connection) => {
            const sql = `SELECT id, pw FROM Users WHERE id=?;`;
            const data = [req.body.id];
            connection.query(sql, data, (err, results) => {
                console.log("results", results)
                if (results.length != 0) {
                    bcrypt.compare(req.body.pw, results[0].pw, function (err, pwd_confirm) {
                        if (pwd_confirm) {
                            res.json({
                                // Nufyn Error Code. 아래 에러코드를 참고해주세요.
                                "status": {
                                    "status_code": 200,
                                    "status_msg": null,
                                    "status_err": null
                                },
                                // API처리 결과 반환은 아래 results 변수에 담아주세요.
                                "results": results
                            })
                        } else {
                            res.json({
                                // Nufyn Error Code. 아래 에러코드를 참고해주세요.
                                "status": {
                                    "status_code": 601,
                                    "status_msg": "Login 에러입니다.",
                                    "status_err": ERROR
                                },
                                // API처리 결과 반환은 아래 results 변수에 담아주세요.
                                "results": null
                            })
                        }
                    });
                } else {
                    res.json({
                        // Nufyn Error Code. 아래 에러코드를 참고해주세요.
                        "status": {
                            "status_code": 602,
                            "status_msg": "User가 없습니다.",
                            "status_err": ERROR
                        },
                        // API처리 결과 반환은 아래 results 변수에 담아주세요.
                        "results": null
                    })
                }
            })
        })
    }
}
