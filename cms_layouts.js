"use strict";

class Header extends HTMLElement {
    constructor() {
        super();
    };

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        // console.log(moduleElement);
        // console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        let { sidenavtoggle, brand, logout } = _params;
        let elemArr = new Array;
        // console.log(sidenavtoggle);
        // console.log(brand);
        if (sidenavtoggle === "true") {
            const $leftWrapper = document.createElement("div");

            $leftWrapper.classList.add("header-wrapper__left", "responsive-mobile");

            const $toggleButton = document.createElement("button");
            $toggleButton.id = "toggle_sidenav";
            $toggleButton.classList.add("toggle-button", "ic-sidenav__open");

            $leftWrapper.append($toggleButton);
            elemArr.push($leftWrapper);
        }

        if (brand) {
            const $brandWrapper = document.createElement("a");
            $brandWrapper.href = "/";
            $brandWrapper.classList.add("header-brand-logo");
            const $brandLogo = document.createElement("img");
            $brandLogo.src = "/public/images/logo/logo_header.png";
            $brandLogo.alt = `${brand} logo image`;
            $brandLogo.classList.add("header-logo-image");
            $brandWrapper.append($brandLogo);
            elemArr.push($brandWrapper);
        }

        if (logout === "true") {
            const $rightWrapper = document.createElement("div");
            $rightWrapper.classList.add("header-wrapper__right");

            const $logoutButton = document.createElement("button");
            $logoutButton.id = "do_logout";
            $logoutButton.classList.add("header-logout-button");
            $logoutButton.textContent = "로그아웃";

            $rightWrapper.append($logoutButton);
            elemArr.push($rightWrapper);
        }

        return elemArr;
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

            .header-wrapper__left {
                flex: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: center;
            }

            .header-wrapper__right {
                flex: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-end;
                align-items: center;
            }

            .responsive-mobile {
                display: none;
            }

            .toggle-button {
                position: relative;
                display: inline-block;
                width: 1.75rem;
                height: 1.75rem;
                line-height: 1.75rem;
                font-size: 0;
            }

            .toggle-button:after {
                content: '';
                position: absolute;
                background-image: url("/public/images/icon/ic_dashboard.svg");
                background-position: center;
                background-repeat: no-repeat;
            }

            .header-brand-logo {
                width: auto;
                height: 1.75rem;
                vertical-align: middle;
                text-align: center;
                font-size: 0;
            }

            .header-logo-image {
                display: block;
                width: auto;
                height: 100%;
            }

            .header-logout-button {
                font-size: 0.75rem;
                font-weight: var(--font_bold);
                line-height: 1.2;
                min-width: 5rem;
                height: 1.75rem;
                vertical-align: middle;
                background-color: var(--color_gray_light);
                border-radius: 3.125rem;
                padding: 0.5rem 1.125rem;
            }

            @media screen and (max-width: 767px) {
                .responsive-mobile {
                    display: inherit;
                }
            }
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
        const $toggleSidenav = this.shadowRoot.querySelector("#toggle_sidenav");
        $toggleSidenav.addEventListener("click", function (e) {
            const $sidenav = document.getElementById("snb_wrapper");
            const $openSidenavButton = document.getElementById("open_sidenav");
            const $contentsWrapper = document.getElementById("contents_wrapper");

            if (this.classList.contains("on")) {
                $sidenav.style.position = "absolute";
                $sidenav.style.width = "50%";
                $sidenav.style.left = "-100%";
                this.classList.remove("on");
                $contentsWrapper.style.overflowY = "auto";
            } else {
                $sidenav.style.position = "absolute";
                $sidenav.style.width = "100%";
                $sidenav.style.left = "0";
                this.classList.add("on");

                $contentsWrapper.style.overflowY = "hidden";
            }
        });

        const $logoutButton = this.shadowRoot.querySelector("#do_logout");
        $logoutButton.addEventListener("click", function () {
            console.log("로그아웃");
        });
    }
}
customElements.define('cms-header', Header);

class SideNav extends HTMLElement {
    constructor() {
        super();
    };

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }

    getChildElement() {
        // Element 태그의 자식 값 JSON 만들기
        let chidrenObject = new Object;
        console.log(this.chidren);
        console.log(typeof this.chidren);
        console.log(this.chidren.length);
        // for (var i in this.chidren) {
        //     let childElem = this.chidren[i];
        //     chidrenObject[childElem.localName] = childElem;
        // }
        for (var i = 0; i < this.chidren.length; i++) {
            let childElem = this.chidren[i];
            chidrenObject[childElem.localName] = childElem;
        }

        return chidrenObject;
    }
    connectedCallback() {
        const attrObj = this.checkAttribute();
        const childObj = this.getChildElement();
        console.log(childObj);
        this.setModule(this.setElement(attrObj, childObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        // console.log(moduleElement);
        // console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
        // this.innerHTML = "";
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params, _children) {
        let { target } = _params;
        console.log(_children);
        let elemArr = new Array;
        const $navWrapper = document.createElement("nav");
        $navWrapper.classList.add("sidenav-wrapper")

        console.log(this.children);

        const childElem = this.children;
        // $navWrapper.append(childElem);
        // console.log(childElem.length)
        // for (var i = 0; i < childElem.length; i++) {
        //     $navWrapper.append(childElem[i]);

        // }
        for (var i in childElem) {
            console.log(childElem[i]);
            $navWrapper.append(childElem[i]);
        }

        elemArr.push($navWrapper);

        return elemArr;
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

            .sidenav-wrapper {
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .sidenav-wrapper cms-sidenav-link,
            .sidenav-wrapper a {
                display: block;
                width: 100%;
            }
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
    }
}
customElements.define('cms-sidenav', SideNav);

class SidenavLink extends HTMLElement {
    constructor() {
        super();
    };

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        // console.log(moduleElement);
        // console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        let { href, name } = _params;
        let elemArr = new Array;

        this.classList.add("full");

        const $anchorWrapper = document.createElement("a");
        $anchorWrapper.href = href;
        $anchorWrapper.dataset.name = this.textContent;
        $anchorWrapper.classList.add("sidenav-link");

        elemArr.push($anchorWrapper);
        return elemArr;
    }
    // Style 처리부
    setStyle(_params) {

        let { icon } = _params;
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

            .sidenav-link {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: flex-end;
                column-gap: 0.5rem;
                width: 100%;
                height: 3.25rem;
                padding: 1rem 1.25rem;
                border-bottom: var(--border_1);
                cursor: alias;
            }
            
            .sidenav-link::before {
                content: '';
                display: inline-block;
                width: 1.25rem;
                height: 1.25rem;
                font-size: 0;
                background-image: url("/public/images/icon/${icon}");
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
            }

            .sidenav-link::after {
                content: attr(data-name);
                font-size: 0.875rem;
                line-height: 1rem;
                align-self: center;
            }
            
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
    }
}
customElements.define('cms-sidenav-link', SidenavLink);

class TabMenu extends HTMLElement {
    constructor() {
        super();
    };

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        // console.log(moduleElement);
        // console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        let { target } = _params;
        const childElem = this.getChildElement();
        console.log(childElem);

        const $wrapper = document.createElement("section");
        $wrapper.classList.add("cms-tab-wrapper");

        for (var i in childElem) {
            childElem[i].classList.add("cms-tab-button");
            console.log(childElem[i].default);
            if (childElem[i].default === "true") {
                childElem[i].classList.add("on");
            };
            $wrapper.append(childElem[i]);
        }

        return $wrapper;
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

            .cms-tab-wrapper {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                juestify-content: flex-start;
                align-items: center;
                column-gap: 1.5rem;
                border-bottom: var(--border_1);
                margin-bottom: 2.25rem;
            }

            .cms-tab-button {
                position: relative;
                bottom: -1px;
                display: inline-block;
                text-align: center;
                font-size: 1.25rem;
                line-height: 1.25;
                padding: 1rem;
                cursor: pointer;
            }

            .cms-tab-button.on:after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 3px;
                background-color: #4ECB71;
            }

            .cms-tab-button.on {
                color: #4ECB71;
                font-weight: bolder;
            }
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
        console.log(this.shadowRoot);
        console.log(this.shadowRoot.querySelectorAll("button"));
        const $buttonElem = this.shadowRoot.querySelectorAll("button");

        // console.log($tabButton.length);
        for (var i = 0; i < $buttonElem.length; i++) {
            const $tabButton = $buttonElem[i];
            $tabButton.addEventListener("click", function () {
                console.log($tabButton.getAttribute("target"));
                console.log($tabButton.classList.add("on"))

                tabHandler($tabButton, $tabButton.getAttribute("target"));
            })
        }
    }

    getChildElement() {
        let childObject = new Object;
        // console.log(this.children);
        for (var i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            // console.log(child);
            childObject[`${child.localName}_${i}`] = child;
            // childObject = this.children[i];
        };

        return childObject;
    }
    getSiblings(target) {
        const children = target.parentElement.children;
        const tempArr = [];

        for (let i = 0; i < children.length; i++) {
            tempArr.push(children[i]);
        }

        return tempArr.filter(function (e) {
            return e != target;
        });
    }
    tabHandler(targetElem, targetName) {

        const $contentSection = document.getElementById(targetName);
        for (var i = 0; i < targetElem.length; i++) {
            const siblingsElem = getSiblings(targetElem);
            console.log(siblingsElem);
            targetElem[i].classList.remove("on");
            $contentSection.classList.remove("show");
        }

        targetElem.classList.add("on");
        $contentSection.classList.add("show");
    }
}
customElements.define('tab-menu', TabMenu);

class TabButton extends HTMLElement {
    constructor() {
        super();
    };

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        // console.log(moduleElement);
        // console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        let { target } = _params;
        let elemArr = new Array;
        const $buttonElem = document.createElement("button");
        $buttonElem.type = "button";
        $buttonElem.name = target;

        if (_params.default === "true") {
            $buttonElem.classList.add("on");
        }

        elemArr.push($buttonElem);
        return elemArr;
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

            .cms-tab-wrapper {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                juestify-content: flex-start;
                align-items: center;
                column-gap: 1.5rem;
                border-bottom: var(--border_1);
                margin-bottom: 2.25rem;
            }

            .cms-tab-button {
                position: relative;
                bottom: -1px;
                display: inline-block;
                text-align: center;
                font-size: 1.25rem;
                line-height: 1.25;
                padding: 1rem;
                cursor: pointer;
            }

            .cms-tab-button.on:after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 3px;
                background-color: #4ECB71;
            }

            .cms-tab-button.on {
                color: #4ECB71;
                font-weight: bolder;
            }
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
        console.log(this.shadowRoot);
        console.log(this.shadowRoot.querySelectorAll("button"));
        const $buttonElem = this.shadowRoot.querySelectorAll("button");

        // console.log($tabButton.length);
        for (var i = 0; i < $buttonElem.length; i++) {
            const $tabButton = $buttonElem[i];
            $tabButton.addEventListener("click", function () {
                console.log($tabButton.getAttribute("target"));
                console.log($tabButton.classList.add("on"))

                tabHandler($tabButton, $tabButton.getAttribute("target"));
            })
        }
    }

    getChildElement() {
        let childObject = new Object;
        // console.log(this.children);
        for (var i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            // console.log(child);
            childObject[`${child.localName}_${i}`] = child;
            // childObject = this.children[i];
        };

        return childObject;
    }
    getSiblings(target) {
        const children = target.parentElement.children;
        const tempArr = [];

        for (let i = 0; i < children.length; i++) {
            tempArr.push(children[i]);
        }

        return tempArr.filter(function (e) {
            return e != target;
        });
    }
    tabHandler(targetElem, targetName) {

        const $contentSection = document.getElementById(targetName);
        for (var i = 0; i < targetElem.length; i++) {
            const siblingsElem = getSiblings(targetElem);
            console.log(siblingsElem);
            targetElem[i].classList.remove("on");
            $contentSection.classList.remove("show");
        }

        targetElem.classList.add("on");
        $contentSection.classList.add("show");
    }
}
customElements.define('tab-button', TabButton);

class TableLayouts extends HTMLElement {
    constructor() {
        super();
    };

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        // console.log(moduleElement);
        // console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        let elemArr = new Array;
        let { } = _params;
        // console.log(sidenavtoggle);
        // console.log(brand);

        const $wrapper = document.createElement("div");
        console.log(this);
        console.log(this.querySelector("colgroup"));
        // console.log(this.querySelectorAll("col"));
        const $tableWrapper = document.createElement("table");
        const $colGroup = this.querySelector("colgroup");
        console.log(this.querySelector("colgroup"));
        if (this.querySelector("colgroup")) {
            console.log($colGroup);
        }

        const $tableHead = document.createElement("thead");
        const $tableHeadRow = document.createElement("tr");
        const $tableHeadCell = document.createElement("th");
        $tableHeadRow.append($tableHeadCell);
        $tableHead.append($tableHeadRow);
        const $tableBody = document.createElement("tbody");
        const $tableBodyRow = document.createElement("tr");
        const $tableDataCell = document.createElement("td");
        $tableBodyRow.append($tableDataCell);
        $tableBody.append($tableBodyRow);

        $tableWrapper.append($colGroup, $tableHead, $tableBody);


        const $rowGroup = this.querySelector("cms-rowgroup");
        console.log($rowGroup);
        const $paginationWrapper = document.createElement("section");
        $paginationWrapper.classList.add("pagination-wrapper");
        $wrapper.append($tableWrapper, $paginationWrapper);
        elemArr.push($wrapper);

        return elemArr;
    }

    // Style 처리부
    setStyle(_params) {

        let { } = _params;
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

            table {
                border-collapse: collapse;
                width: 100%;
            }

            thead {

            }

            tbody {

            }




            .pagination-wrapper {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: center;
                align-items: center;
                column-gap: var(--pixel_5);
            }

            .paging {
                display: inline-block;
                width: var(--pixel_30);
                height: var(--pixel_30);
                line-height: var(--pixel_30);
                border: 1px solid #D9D9D9;
                border-radius: var(--pixel_5);

            }

            .paging.on {

            }
        `;

        return styleString;
    }

    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
    }
}
customElements.define('cms-table', TableLayouts);

class TableRowGroup extends HTMLElement {
    constructor() {
        super();
    };

    // ------- Start Lock --------
    checkAttribute() {
        // Element 태그의 속성 값 JSON 만들기
        let attributeObject = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            // console.log(attribute);
            attributeObject[attribute] = this.getAttribute(attribute);
        }

        return attributeObject;
    }
    connectedCallback() {
        const attrObj = this.checkAttribute();
        // console.log(attrObj);
        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent(attrObj);
        // updateStyle(this);
    }
    setModule(moduleElement, moduleStyle) {
        // console.log(moduleElement);
        // console.log(moduleStyle);
        this.attachShadow({ mode: 'open' });
        if (moduleElement) {
            for (var i = 0; i < moduleElement.length; i++) {
                this.shadowRoot.append(moduleElement[i]);
            }
        };
        const $styledElem = document.createElement("style");
        $styledElem.textContent = moduleStyle;
        this.shadowRoot.append($styledElem);
    }
    // ------- Finish Lock --------

    // Element 처리부
    setElement(_params) {
        let elemArr = new Array;
        let { } = _params;
        // console.log(sidenavtoggle);
        // console.log(brand);



        return elemArr;
    }

    // Style 처리부
    setStyle(_params) {

        let { } = _params;
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

            table {
                border-collapse: collapse;
                width: 100%;
            }

            thead {

            }

            tbody {

            }
        `;

        return styleString;
    }

    // Event 처리부
    setEvent(_params) {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
    }
}
customElements.define('cms-rowgroup', TableRowGroup);