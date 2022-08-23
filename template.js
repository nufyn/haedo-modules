/**
 * 비상속 element
 */

class MyElement extends HTMLElement {
    constructor() {
        super();
        // element created
    }

    connectedCallback() {
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)
        // ------- Start Lock --------
        // Element 태그의 속성 값 JSON 만들기
        let attrObj = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            let attribute = this.getAttributeNames()[i];
            console.log(attribute);
            attrObj[attribute] = this.getAttribute(attribute);
        }

        this.setModule(this.setElement(attrObj), this.setStyle(attrObj));
        this.setEvent();
        // ------- Finish Lock --------
    }

    setModule(moduleElement, moduleStyle) {
        console.log(moduleElement);
        console.log(moduleStyle);

        // let thisModuleElement = moduleElement;
        // let thisModuleStyle = `<style>${moduleStyle}</style>`;
        // let thisModule = thisModuleElement + thisModuleStyle;
        this.attachShadow({ mode: 'open' });
        // this.shadowRoot.innerHTML = "";
        this.shadowRoot.append(moduleElement, moduleStyle);
    }

    // Element 처리부
    setElement(params) {

        let { } = params;

        let childObj = new Object;
        for (var i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            console.log(child); // 10, 20, 30 출력
            childObj[child.localName] = child
        }
        console.log(this.children)
        console.log(childObj);

        const $wrapper = document.createElement('div');

        return $wrapper;
    }

    setStyle(params) {

        let { } = params;

        let styleString = `
            * {
                box-sizing:border-box;
                color: inherit;
                font: inherit;
                padding: 0;
                margin: 0;
                border: none;
                outline: 0;
                text-decoration: 0;
                list-style: 0;
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

    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }

    static get observedAttributes() {
        return [/* array of attribute names to monitor for changes */];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
    }

    adoptedCallback() {
        // called when the element is moved to a new document
        // (happens in document.adoptNode, very rarely used)
    }

    // there can be other element methods and properties
}

customElements.define("my-element", MyElement);

/**
 * 상속 element
 */

class PlaneImage extends HTMLImageElement {
    constructor() {
        // 항상 super를 생성자에서 먼저 호출합니다
        super();

        // 요소 기능은 여기 작성됩니다

        const $imgElem = document.createElement("img");
        $imgElem.src = "./default.png";
        $imgElem.alt = " default alt";
        $imgElem.style.width = 'auto';
        $imgElem.style.height = '24px';
    }
}

customElements.define('plane-image', PlaneImage, { extends: 'img' });