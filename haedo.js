/**
 * Haedo Front Modules
 * 
 * JQuery import 필수
 */
class Haedo {
    /**
     * 회원 가입
     * @version 1.0 // 버전 명시
     * @param {string} id // 
     * @param {string} pw
     * @param {string} redirect_url
     */
    signin(id, pw, pw_confirm, redirect_url = "/") {
        if (pw != pw_confirm) {
            alert("비밀번호를 확인해주세요.")
            return;
        }

        $.ajax({
            // 파라미터로 받는게 좋을까 우리 모듈에서 무조건 지정하는 것이 좋을까
            url: '/apis/v1/sign/in',
            type: 'POST',
            dataType: 'json',
            data: {
                /**
                 * DB 컬럼에 맞춰 Key-Value를 넘겨주세요
                 */
                id: id,
                pw: pw
            },
            success: (res) => {
                // set cookie 등 로그인 완료 세팅
                console.log("회원가입 성공");
                console.log(res);
                // 리다이렉션
                location.href = redirect_url;
            },
            error: (err) => {

            }
        });
    }
}

var haedo = new Haedo();