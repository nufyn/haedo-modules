/**
 * 본 스크립트는 백엔드 API 입니다.
 * 프로젝트에 적절한 라우팅을 부탁드립니다. 
 * 
 *  */

const express = require('express');
const router = express.Router();
const pool = require("../../../../config/dbconfig");

module.exports = {
    /**
     * Function Router
     * @param {*} req 
     * @param {*} res 
     */
    tempFunction(req, res) {
        pool.getConnection((err, connection) => {
            const sql = `SELECT * FROM Accidents;`
            const data = []
            connection.query(sql, data, (err, results) => {
                console.log("results", results)
            })
        })
        res.json({
            // Nufyn Error Code. 아래 에러코드를 참고해주세요.
            "status": {
                "status_code": 200,
                "status_msg": null,
                "status_err": null
            },
            // API처리 결과 반환은 아래 results 변수에 담아주세요.
            "results": {
                "accidents": [{
                    "title": "홍길동",
                    "code": "rlfehd12!@",
                    "ddd_date": "2022-08-15",
                    "participants": 26515,
                    "opinions": 12442,
                    "hot_comment": {
                        "user_image_path": "/uploads/...",
                        "comment": "",
                        "likes": "1.2k"
                    }
                }]
            }
        })
    }
}
