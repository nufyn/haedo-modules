// // // Create a class for the element

// class Header extends HTMLElement {
//     constructor() {
//         super();
//     }
//     // ------- Start Lock --------
//     checkAttribute() {
//         // Element 태그의 속성 값 JSON 만들기
//         let attributeObject = new Object;
//         console.log(this.getAttributeNames());
//         for (var i = 0; i < this.getAttributeNames().length; i++) {
//             let attribute = this.getAttributeNames()[i];
//             // console.log(attribute);
//             attributeObject[attribute] = this.getAttribute(attribute);
//         }

//         return attributeObject;
//     }
//     connectedCallback() {
//         let attrObj = this.checkAttribute();
//         let childObj = this.checkChildElement();

//         this.setModule(this.setElement(attrObj, childObj), this.setStyle(attrObj));
//         this.setEvent(attrObj);
//     }
//     setModule(moduleElement, moduleStyle) {
//         // console.log(moduleElement);
//         // console.log(moduleStyle);
//         const $styledElem = document.createElement("style");
//         $styledElem.textContent = moduleStyle;
//         this.attachShadow({ mode: 'open' });
//         // 기존에 써놓은 element는 삭제
//         this.innerHTML = "";
//         this.shadowRoot.append(moduleElement, $styledElem);
//     }
//     // ------- Finish Lock --------

//     // Element 처리부
//     setElement(_params, _children) {
//         const $headerElem = document.createElement("header");
//         // $headerElem.classList.add("flex-row", "h-between");
//         let $sidOpenButton;
//         let $brandLogo = document.createElement("a");
//         $brandLogo.href = "/";
//         $brandLogo.classList.add("brand-logo", "text-align__center");
//         console.log($brandLogo);
//         let $logoutButton;

//         if (_params.logo === "true") {
//             const $logoElem = document.createElement("img");
//             $logoElem.height = "28";
//             $logoElem.alt = "";
//             $logoElem.src = "";
//             $brandLogo.append($logoElem);
//         } else {
//             const $logoElem = document.createElement("p");
//             const titleText = document.querySelector("title").text;
//             $logoElem.textContent = titleText;
//             $brandLogo.append($logoElem);
//         }

//         if (_params.logout === "true") {
//             const $logoutWrap = document.createElement("div");
//             $logoutWrap.classList.add("flex-row", "h-right");
//             const $buttonElem = document.createElement("button");
//             $buttonElem.type = "button";
//             $buttonElem.id = "do_logout";
//             $buttonElem.classList.add("button-logout");
//             $buttonElem.textContent = "로그아웃";
//             $logoutWrap.append($buttonElem);
//             $headerElem.append($logoutWrap);
//         }

//         $headerElem.append($sidOpenButton, $brandLogo, $logoutButton);
//         return $headerElem;
//     }

//     checkChildElement() {
//         let childObject = new Object;
//         for (var i = 0; i < this.children.length; i++) {
//             let child = this.children[i];
//             childObject[child.localName] = child;
//             console.log(child);
//         };

//         return childObject;
//     }

//     // Style 처리부
//     setStyle(_params) {
//         console.log(_params);
//         let { color, bgcolor, size, align, padding, margin, radius, width, height } = _params;

//         switch (size) {
//             case "small || sm":
//                 padding = "3px 8px";
//             case "middle || md":
//                 padding = "8px 16px";
//             case "lagre || lg":
//                 padding = "8px 32px";
//         }

//         let styleString = `

//         `;


//         return styleString;
//     }

//     // Event 처리부
//     setEvent(_params) {
//         console.log(_params);
//         let { sidenav, logout } = _params;
//         // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
//         const root = this.shadowRoot;
//         // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
//         // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
//         // $Button.addEventListener("click", () => {});
//         if (_params.sidenav === "true") {
//             const $sideOpenButton = root.querySelector("#open_sidenav");
//             $sideOpenButton.addEventListener("click", function () {
//                 console.log("열려라 참깨");
//             });
//         }

//         if (_params.logout === "true") {
//             const $logoutButton = root.querySelector("#do_logout");
//             $logoutButton.addEventListener("click", function () {
//                 console.log("로그아웃");
//             });
//         }

//     }
// }

// // Define the new element
// customElements.define('cms-header', Header);

// class SideNav extends HTMLElement {
//     constructor() {
//         super();
//     }
//     // ------- Start Lock --------
//     checkAttribute() {
//         // Element 태그의 속성 값 JSON 만들기
//         let attributeObject = new Object;
//         console.log(this.getAttributeNames());
//         for (var i = 0; i < this.getAttributeNames().length; i++) {
//             let attribute = this.getAttributeNames()[i];
//             // console.log(attribute);
//             attributeObject[attribute] = this.getAttribute(attribute);
//         }

//         return attributeObject;
//     }
//     connectedCallback() {
//         let attrObj = this.checkAttribute();
//         let childObj = this.checkChildElement();

//         this.setModule(this.setElement(attrObj, childObj), this.setStyle(attrObj));
//         this.setEvent();
//     }
//     setModule(moduleElement, moduleStyle) {
//         // console.log(moduleElement);
//         // console.log(moduleStyle);
//         this.attachShadow({ mode: 'open' });
//         this.shadowRoot.innerHTML = "";
//         this.shadowRoot.append(moduleElement, moduleStyle);
//     }
//     // ------- Finish Lock --------

//     // Element 처리부
//     setElement(_params, _children) {
//         const $asideElem = document.createElement("aside");
//         $asideElem.classList.add("width-division__8");

//         const $navElem = document.createElement("nav");
//         $navElem.classList.add("flex-col");
//         const $anchorElem = document.createElement("a");
//         $anchorElem.href = "/";
//         $anchorElem.textContent = "홈";
//         // $anchorElem.classList.add("sidenav-item");

//         $navElem.append($anchorElem);
//         $asideElem.append($navElem);
//         return $asideElem;
//     }

//     checkChildElement() {
//         let childObject = new Object;
//         for (var i = 0; i < this.children.length; i++) {
//             let child = this.children[i];
//             childObject[child.localName] = child;
//             console.log(child);
//         };

//         return childObject;
//     }

//     // Style 처리부
//     setStyle(_params) {

//         let { color, bgcolor, size, align, padding, margin, radius, width, height } = _params;

//         switch (size) {
//             case "small || sm":
//                 padding = "3px 8px";
//             case "middle || md":
//                 padding = "8px 16px";
//             case "lagre || lg":
//                 padding = "8px 32px";
//         }

//         let styleString = `
//             * {
//                 box-sizing:border-box;
//                 color: inherit;
//                 font: inherit;
//                 background-color: transparent;
//                 padding: 0;
//                 margin: 0;
//                 border: none;
//                 outline: 0;
//                 text-decoration: 0;
//                 list-style: none;
//             }

//             section.content-body {
//                 display: flex;
//                 flex-direction: column;
//             }

//             aside {
//                 padding-top: 16px;
//                 width: 100%;
//                 height: 100%;
//                 background-color: #f5f6f8;
//             }

//             aside nav a {
//                 padding: 16px 20px;
//                 border-bottom: 1px solid #DBDBDB;
//             }

//             @media screen and (min-width:768px) {
//                 aside {
//                     padding-top: 16px;
//                     max-width: 180px;
//                 }
//             }

//             @media screen and (min-width:1366px) {
//                 aside {}
//             }
//         `;

//         const $styledElem = document.createElement("style");
//         $styledElem.textContent = styleString;
//         return $styledElem;
//     }

//     // Event 처리부
//     setEvent() {
//         // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
//         // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
//         // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
//         // $Button.addEventListener("click", () => {});
//     }
// }

// // Define the new element
// customElements.define('cms-sidenav', SideNav);

class CMSBody extends HTMLBodyElement {
    constructor() {
        super();

        let attrObj = this.checkAttribute();
        let childObj = this.checkChildElement();


    };

    // attributeChangedCallback will work
    static get observedAttributes() {
        return ['padding', 'margin', 'logo', 'home'];
    }

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }
    connectedCallback() {
        this.setModule(this.setElement(attrObj, childObj), this.setStyle(attrObj));
        this.setEvent();
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(moduleStyle);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params, _children) {
        console.log(_params);
        console.log(_children);
        let { logo, logout } = _params;

        const $wrapper = document.createElement("section");
        $wrapper.classList.add("content-body");
        // const $headerElem = _children.header;
        const $headerElem = document.createElement("cms-header");
        $headerElem.logo = logo;
        $headerElem.logout = logout;
        console.log($headerElem);
        // const $headerElem.home = "/";
        // const $contentElem = document.createElement("section");
        const $contentElem = document.createElement("section");

        $contentElem.classList.add("content-wrap", "flex-row", "h-left", "flex-1", "gap-row__tenth")
        const $sidenavElem = document.createElement("cms-sidenav");
        const $mainElem = document.createElement("main");
        console.log(this.shadowRoot);

        $contentElem.append($sidenavElem, $mainElem);

        this.append($headerElem, $contentElem);
    }

    checkChildElement() {
        let childObject = new Object;
        for (var i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            childObject[child.localName] = child;
            console.log(child);
        };

        return childObject;
    }
    // Style 처리부
    setStyle(_params) {

        let { color, bgcolor, size, align, padding, margin, radius, width, height } = _params;
        const styleString = `
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
            }

            section.wrapper {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                line-height: 1.35;
                -webkit-text-size-adjust: none;
                overflow-y: auto;
            }

            .wrapper ::-webkit-scrollbar {
                display: none;
            }

            header {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                padding: 16px 20px;
                border-bottom: 1px solid #DBDBDB;
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
            
            .button-logout {
                font-size: 12px;
                line-height: 1.2;
                height: 28px;
                vertical-align: middle;
                background-color: #f5f6f8;
                border-radius: 50px;
                padding: 8px 18px;
            }

            aside {
                padding-top: 16px;
                width: 100%;
                height: 100%;
                background-color: #f5f6f8;
            }
            
            aside nav a {
                padding: 16px 20px;
                border-bottom: 1px solid #DBDBDB;
            }
            
            @media screen and (min-width:768px) {
                aside {
                    padding-top: 16px;
                    max-width: 180px;
                }
            }
            
            @media screen and (min-width:1366px) {
                aside {}
            }
        `;

        const $styledElem = document.createElement("style");
        $styledElem.textContent = styleString;
        return $styledElem;
    }

    // Event 처리부
    setEvent() {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
    }
}

customElements.define('cms-body', CMSBody, { extends: 'body' });