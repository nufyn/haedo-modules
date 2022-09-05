"use strict";

let formData = new FormData;

class ContentTitle extends HTMLElement {
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
        // console.log(_params);
        let { level, goback, title } = _params;

        if (!level) {
            level = 1;
        }

        let elemArr = new Array;
        let $anchorBack = "";

        const $wrapper = document.createElement("div");
        $wrapper.classList.add("contents-title-wrap");

        if (goback === "true") {
            const $backButton = document.createElement("button");
            $backButton.id = "go_back";
            $backButton.classList.add("go-back");
            $wrapper.append($backButton);
        };

        const $hyperText = document.createElement(`h${level}`);
        $hyperText.classList.add(`contents-title__${level}`);
        $hyperText.textContent = title;
        $wrapper.append($hyperText);


        if (this.children) {
            let childObject = new Object;
            for (var i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                childObject[child.localName] = child;
                console.log(child);
                $wrapper.append(child);
            };
        }
        elemArr.push($wrapper);

        return elemArr
    }
    // Style 처리부
    setStyle(_params) {

        let { marginbottom } = _params;

        if (!marginbottom) {
            marginbottom = "32px";
        }
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

            .contents-title-wrap {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: center;
                column-gap: 0.25rem;
                width: auto;
                height: auto;
                margin-bottom: ${marginbottom};
            }

            .contents-title__1 {
                font-size: 2rem;
                font-weight: bolder;
                line-height: 1;
                margin-right: var(--pixel_12);
            }

            .contents-title__2 {
                font-size: 1.5rem;
                font-weight: bolder;
                line-height: 1;
            }

            .small-panel {
                display: inline-block;
                width: auto;
                height: auto;
                padding: 0.5rem 1rem;
                font-size: 13px;
                font-weight: var(--font_bold);
                line-height: 16px;
                text-align: center;
                border-radius: var(--pixel_5);
            }

            .small-panel.user-type__normal {
                background-color: var(--color_gray_light);
                color: var(--color_text_paragraph);
            }

            .small-panel.user-type__farm {
                background-color: var(--color_primary_light);
                color: var(--color_primary);
            }

            .go-back {
                display: block;
                width: 2rem;
                height: 2rem;
                font-size: 0;
                background-image: url("/public/images/icon/ic_back.svg");
                background-repeat: no-repeat;
                background-size: cover;
                background-position: left;
                cursor: pointer;
            }
        `;


        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        let { goback } = _params;
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
        if (goback === "true") {
            const $backAnchor = this.shadowRoot.querySelector("#go_back");
            $backAnchor.addEventListener("click", function (e) {
                e.preventDefault();
                history.back();
            });
        }
    }
}
customElements.define('content-title', ContentTitle);

class CMSInputBox extends HTMLElement {
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
    setElement(_params, _children) {
        // console.log(_params);
        // console.log(_children);
        let { type, label, name, id } = _params;
        let elemArr = new Array;

        const $wrapper = document.createElement("div");
        const $labelElem = document.createElement("label");
        $labelElem.for = id;
        $labelElem.textContent = label;
        const $inputElem = document.createElement("input");
        $inputElem.placeholder = this.textContent;
        $inputElem.name = name;
        $inputElem.id = id;
        switch (type) {
            case "text":
                $wrapper.classList.add("input-box");
                $inputElem.type = type;
                $wrapper.append($labelElem, $inputElem);
                break;
            case "search":
                $wrapper.classList.add("cms-search-box");
                $inputElem.classList.add("search-input");
                const $searchButton = document.createElement("button");
                $searchButton.type = "button";
                $searchButton.id = "do_search";
                $searchButton.classList.add("search-button");
                const $searchIcon = document.createElement("i");
                $searchIcon.classList.add("ic-search");
                $searchButton.append($searchIcon);
                $wrapper.append($labelElem, $inputElem, $searchButton);
                break;
            default:
                break;
        }

        elemArr.push($wrapper);

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

            .input-box {
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: flex-start;
                width: auto;
                height: auto;
                margin-bottom: 2rem;
            }
            
            .input-box label {
                font-size: 13px;
                font-weight: var(--font_bold);
                line-height: 1;
                margin-bottom: var(--pixel_8);
            }

            .input-box input {
                display: block;
                max-width: calc(25rem - 1.25rem);
                width: 100%;
                padding: 1rem;
                font-size: 1rem;
                line-height: var(--pixel_18);
                background-color: var(--color_gray_light);
                border: var(--border_1);
                border-radius: var(--pixel_5);
            }

            .cms-search-box {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: center;
                column-gap: 0.5rem;
                border: var(--border_1);
                border-radius: 6px;
                padding: 1rem;
            }
            
            .cms-search-box label {
                display: none;
            }
            
            .cms-search-box input {
                max-width: 6.25rem;
                flex: 1;
                font-size: 1rem;
                line-height: 1rem;
                height: 1.125rem;
            }
            
            .cms-search-box button {
                display: inline-block;
                width: 1.5rem;
                height: 1.5rem;
            }

            .ic-search {
                display: block;
                width: 100%;
                height: 100%;
                background-image: url("/public/images/icon/ic_search.svg");
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
                cursor: pointer;
            }
            
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        let { type } = _params;
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
        const $inputElem = this.shadowRoot.querySelector("input");
        $inputElem.addEventListener("change", function (e) {
            const inputValue = e.target.value;
            formData[e.target.name] = inputValue;
            console.log(inputValue);
        });

        if (type === "search") {
            const $searchButton = document.querySelector("#do_search");
            const $searchInput = document.querySelector("#search_value");
            $searchButton.addEventListener("click", function () {
                formData[$searchInput.name] = $searchInput.value;
            });
        }

    };
}
customElements.define('input-box', CMSInputBox);

class TextButton extends HTMLElement {
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
    setElement(_params, _children) {
        // console.log(_params);
        // console.log(_children);
        let { text, name, id, } = _params;
        let elemArr = new Array;

        const $buttonElem = document.createElement("button");
        $buttonElem.classList.add();
        $buttonElem.textContent = this.textContent;
        $buttonElem.name = name;

        elemArr.push($buttonElem);

        return elemArr;
    }
    // Style 처리부
    setStyle(_params) {

        let { padding, bgcolor } = _params;

        if (!padding) {
            padding = "1rem";
        }

        let color = "white";
        switch (bgcolor) {
            case "black":
                bgcolor = "#323232";
                color = "white";
                break;
            case "primary":
                bgcolor = "#4ECB71";
                color = "white";
                break;
            default:
                color = "white";
                break;
        }

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

            button {
                display: inline-block;
                min-width: calc(5rem + 2rem);
                width: 100%;
                height: auto;
                font-size: var(--pixel_15);
                font-weight: var(--font_bold);
                line-height: var(--pixel_20);
                padding: ${padding};
                background-color: ${bgcolor};
                color: ${color};
                border-radius: var(--pixel_5);
                cursor: pointer;
            }
        `;

        return styleString;
    }
    // Event 처리부
    setEvent(_params) {
        let { type } = _params;
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
    };
}
customElements.define('text-button', TextButton);