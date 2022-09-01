class Haedo {
    /**
     * 기능 설명
     * @version 1.0 // 버전 명시
     * @param {string} id // 
     * @param {string} pw
     * @param {string} redirect_url
     */
    login(id, pw, redirect_url = "/") {
        $.ajax({
            // 파라미터로 받는게 좋을까 우리 모듈에서 무조건 지정하는 것이 좋을까
            url: '/apis/v1/login',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                pw: pw
            },
            success: (res) => {
                // set cookie 등 로그인 완료 세팅
                alert("로그인입니다");
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