const resetStyled = `
    * {
        box-sizing: border-box;
        color: inherit;
        font: inherit;
        background-color: transparent;
        padding: 0;
        margin: 0;
        border: none;
        outline: 0;
        text-decoration: 0;
        list-style: none;
        cursor: default;
        -webkit-tap-highlight-color: transparent;
        -webkit-text-size-adjust: none;
    }
`;

/**
 * <cms-body></cms-body>
 */
class CMSBody extends HTMLBodyElement {
    static get observedAttributes() {
        return ['project', 'logo', 'navs', 'logout'];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        this.setElement(attributeObject);
        this.setStyle();
        this.setEvent();
        // this.innerHTML = "";
    }

    //요소가 DOM에 추가될 때마다 실행됩니다
    connectedCallback() {
        console.log('Custom element added to page.');
    }

    //언제 요소가 DOM에서 제거되었는지
    disconnectedCallback() {
        console.log('Custom element removed from page.');
    }
    //다른 페이지로 이동되었는지
    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }
    // attribute를 변경하면 적용
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom element attributes changed.');
    }

    setElement(_params) {
        const $headerElem = document.createElement("cms-header");
        // cdn 스크립트를 동적으로 불러올 수 있다면?????
        // $headerElem.setAttribute("vesion", 1);
        if (_params.breadcrumb === "true") {
            const $breadcrumb = document.createElement("cms-breadcrumb");
            $headerElem.append($breadcrumb);
        }
        const $contentElem = document.createElement("section");
        $contentElem.classList.add("contents-wrap");
        const $sideNav = document.querySelector("nav[role=sidenav]");
        // console.log($sideNavBar);
        if ($sideNav) {
            const $sideNavBar = document.createElement("aside");
            $sideNavBar.classList.add("sidenav-wrap");
            $sideNavBar.append($sideNav);
            $sideNav.classList.add("sidenav");
            $contentElem.append($sideNavBar);
        }
        const $mainElem = this.querySelector("main");
        if ($mainElem) {
            $contentElem.append($mainElem);
        }
        this.shadowRoot.append($headerElem, $contentElem);
    }

    setStyle(_params) {
        const $styledElem = document.createElement("style");
        $styledElem.textContent = `
            ${resetStyled}
            .contents-wrap {
                position: relative;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: flex-start;
                width: 100%;
                height: 100%;
            }

            cms-header {
                height: 60px;
            }

            .contents-wrap::-webkit-scrollbar {
                display: none;
            }

            .sidenav-wrap {
                position: absolute;
                padding-top: 16px;
                width: 100%;
                height: 100%;
                background-color: #f5f6f8;
                margin-right: 60px;
                transition: left 0.5s ease-out;
            }

            main {
                flex-grow: 1;
                height: 100%;
                padding-top: 56px;
                padding-left: 20px;
                padding-right: 20px;
                margin-right: 60px;
            }

            @media screen and (min-width:768px) {
                aside {
                    max-width: 180px;
                }

                main {
                    margin-left: 240px;
                }
            }
            
            @media screen and (min-width:1366px) {
                aside {}
            }
        `;
        this.shadowRoot.append($styledElem);
    }
    setEvent() {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const root = this.shadowRoot;
    }
};

customElements.define("cms-body", CMSBody, { extends: "body" });

/**
 * <cms-header></cms-header>
 */
class Header extends HTMLElement {
    static get observedAttributes() {
        return ['project', 'logo', 'navs', 'logout'];
    }

    constructor() {
        super();
        // console.log(this.setElement());
        // const $wrapper = ;

        this.attachShadow({ mode: "open" });
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        this.setElement(attributeObject);
        this.setStyle(attributeObject);
        this.setEvent();
    }

    //요소가 DOM에 추가될 때마다 실행됩니다
    connectedCallback() {
        console.log('Custom element added to page.');
    }

    //언제 요소가 DOM에서 제거되었는지
    disconnectedCallback() {
        console.log('Custom element removed from page.');
    }
    //다른 페이지로 이동되었는지
    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }
    // attribute를 변경하면 적용
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom element attributes changed.');
    }

    setElement(_params) {
        const $wrapper = document.createElement("header");

        const $buttonOpenSidenav = document.createElement("button");
        $buttonOpenSidenav.type = "button";
        $buttonOpenSidenav.id = "open_sidenav";
        $buttonOpenSidenav.classList.add("open-sidenav-button");
        const $iconOpen = document.createElement("img");
        $iconOpen.src = "https://w7.pngwing.com/pngs/626/110/png-transparent-black-logo-computer-icons-hamburger-button-menu-new-menu-angle-text-rectangle.png";
        $iconOpen.alt = "Open side navgation bar";
        $buttonOpenSidenav.append($iconOpen);
        $wrapper.append($buttonOpenSidenav);

        const $anchorHome = document.createElement("a");
        $anchorHome.href = "/";
        $anchorHome.classList.add("brand-logo");
        const $imageLogo = document.createElement("img");
        $imageLogo.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png";
        $imageLogo.alt = "brand logo";
        $anchorHome.append($imageLogo);
        $wrapper.append($anchorHome);

        const $buttonLogout = document.createElement("button");
        $buttonLogout.type = "button";
        $buttonLogout.id = "do_logout";
        $buttonLogout.classList.add("logout-button");
        $buttonLogout.textContent = "로그아웃";
        $wrapper.append($buttonLogout)

        this.shadowRoot.append($wrapper);
    }

    setStyle(_params) {
        const $styledElem = document.createElement("style");
        $styledElem.textContent = `
        ${resetStyled}
        header {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            padding: 16px 20px;
            border-bottom: 1px solid #DBDBDB;
        }
        
        .open-sidenav-button {
            width: auto;
            height: 28px;
            vertical-align: middle;
            text-align: center;
            font-size: 0;
        }
        
        .open-sidenav-button img {
            display: block;
            width: auto;
            height: 100%;
        }

        .brand-logo {
            width: auto;
            height: 28px;
            vertical-align: middle;
            text-align: center;
            font-size: 0;
        }
        
        .brand-logo img {
            display: block;
            width: auto;
            height: 100%;
        }
        
        .logout-button {
            font-size: 12px;
            line-height: 1.2;
            height: 28px;
            vertical-align: middle;
            background-color: #f5f6f8;
            border-radius: 50px;
            padding: 8px 18px;
        }

        @media screen and (min-width: 768px) {
            .open-sidenav-button {
                display: none;
            }
        }
        `;
        this.shadowRoot.append($styledElem);
    }

    setEvent() {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        const root = this.shadowRoot;

        const $sideOpenButton = root.querySelector("#open_sidenav");
        $sideOpenButton.addEventListener("click", function () {
            console.log("열려라 참깨");
        });

        const $logoutButton = root.querySelector("#do_logout");
        $logoutButton.addEventListener("click", function () {
            console.log("로그아웃");
        });
    }
};

customElements.define("cms-header", Header);

// /**
//  * <cms-sidenav></cms-sidenav>
//  */
// class SideNavBar extends HTMLElement {
//     static get observedAttributes() {
//         return ['project', 'logo', 'navs', 'logout'];
//     }

//     constructor() {
//         super();

//         // Element 태그의 속성 값 JSON 만들기
//         let attributeObject = new Object;
//         console.log(this.getAttributeNames());
//         for (var i = 0; i < this.getAttributeNames().length; i++) {
//             let attribute = this.getAttributeNames()[i];
//             // console.log(attribute);
//             attributeObject[attribute] = this.getAttribute(attribute);
//         }

//         this.attachShadow({ mode: "open" });
//         this.setElement(attributeObject);
//         this.setStyle();
//         this.setEvent();
//     }

//     //요소가 DOM에 추가될 때마다 실행됩니다
//     connectedCallback() {
//         console.log('Custom element added to page.');
//     }

//     //언제 요소가 DOM에서 제거되었는지
//     disconnectedCallback() {
//         console.log('Custom element removed from page.');
//     }
//     //다른 페이지로 이동되었는지
//     adoptedCallback() {
//         console.log('Custom element moved to new page.');
//     }
//     // attribute를 변경하면 적용
//     attributeChangedCallback(name, oldValue, newValue) {
//         console.log('Custom element attributes changed.');
//     }

//     setElement(_params) {
//         const $wrapper = document.createElement("aside");
//         console.log(document.querySelector("nav[role=sidenav]"))
//         const $navs = document.querySelector("nav[role=sidenav]");
//         $wrapper.append($navs);
//         this.shadowRoot.append($wrapper);
//     }

//     setStyle(_params) {
//         const $styledElem = document.createElement("style");
//         $styledElem.textContent = `
//             ${resetStyled}
//             aside {

//             }
//         `;
//         this.shadowRoot.append($styledElem);
//     }
//     setEvent() {
//         // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
//         const root = this.shadowRoot;
//     }
// };

// customElements.define("cms-sidenav", SideNavBar);

/**
 * <IconAnchor icon="" name="" gap=""></IconAnchor>
 */
class IconAnchor extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'gap', 'href', 'iconsize', 'height', 'fontsize'];
    }

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        this.setElement(attributeObject);
        this.setStyle(attributeObject);
        this.setEvent();
        // this.innerHTML = "";
    }

    //요소가 DOM에 추가될 때마다 실행됩니다
    connectedCallback() {
        console.log('Custom element added to page.');
    }

    //언제 요소가 DOM에서 제거되었는지
    disconnectedCallback() {
        console.log('Custom element removed from page.');
    }
    //다른 페이지로 이동되었는지
    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }
    // attribute를 변경하면 적용
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom element attributes changed.');
    }

    setElement(_params) {
        let { icon, name, href } = _params;
        const $wrapper = document.createElement("a");
        $wrapper.href = href;

        const $imageIcon = document.createElement("img");
        $imageIcon.src = _params.icon;

        $wrapper.prepend($imageIcon);

        const $text = document.createElement("span");
        $text.textContent = name;

        $wrapper.append($text);

        this.shadowRoot.append($wrapper);
    }

    setStyle(_params) {

        let { iconsize, height, gap, fontsize } = _params;

        if (!iconsize) {
            iconsize = 20;
        }
        if (!height) {
            height = 48;
        }
        if (!gap) {
            gap = 0;
        }
        if (!fontsize) {
            fontsize = 14;
        }

        const $styledElem = document.createElement("style");
        $styledElem.textContent = `
            ${resetStyled}
            a {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: center;
                gap: ${gap}px;
                font-size: 0;
                height: ${height}px;
                padding-left: 16px;
                vertical-align: middle;
                border-bottom: 1px solid #dbdbdb;
                cursor: pointer;
            }

            a img {
                display: inline-block;
                width: ${iconsize}px;
                height: ${iconsize}px;
            }

            a span {
                display: inline-block;
                font-size: ${fontsize}px;
                font-weight: 600;
                line-height: ${iconsize}px;
                height: ${iconsize}px;
            }
        `;
        this.shadowRoot.append($styledElem);
    }
    setEvent() {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        const root = this.shadowRoot;
    }
};

customElements.define("icon-anchor", IconAnchor);