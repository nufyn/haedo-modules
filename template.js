// // Create a class for the element
const resetComponent = `
* {
    box-sizing: border-box;
    color: inherit;
    font: inherit;
    padding: 0;
    margin: 0;
    border: none;
    outline: 0;
    background-color: transparent;
    text-decoration: 0;
    list-style: 0;
}
`;

class Content extends HTMLElement {
    connectedCallback() {
        // ------- Start Lock --------
        // Element 태그의 속성 값 JSON 만들기
        let Attributes = new Object;
        console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            Attributes[this.getAttributeNames()[i]] = this.getAttribute(this.getAttributeNames()[i]);
        }

        for (const keys in Attributes) {
            console.log(Attributes[keys].split(' '));
            console.log(`${keys}: ${Attributes[keys].split(' ')}`);
            console.log("0-------------");
        }
        this.setModule(this.setElement(Attributes), this.setStyle(Attributes));
        this.setEvent();
        // ------- Finish Lock --------
    }
    setModule(moduleElement, moduleStyle) {
        let thisModuleElement = moduleElement;
        let thisModuleStyle = `<style>${moduleStyle}</style>`;
        let thisModule = thisModuleElement + thisModuleStyle;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = thisModule;
    }
    // Element 처리부
    setElement(params) {
        return `
            엘리멘트를 써주세요.
        `;
    }
    // Style 처리부
    setStyle(params) {
        let { color, bgcolor, size } = params;
        let padding, margin = 0;

        return `
            ${resetComponent}

            css형식으로 스타일을 써주세요.
        `;
    }
    // Event 처리부
    setEvent() {
        // 이벤트 트리거는 'this.shadowRoot'밑에서 찾는다.
        // const $Button = this.shadowRoot.querySelector("button"); // 엘리먼트는 '$'를 붙인다.
        // const _form = this.getAttribute("form"); // 속성은 '_'로 시작한다.
        // $Button.addEventListener("click", () => {});
    }
}

// Define the new element
customElements.define('custom-elem', Content);