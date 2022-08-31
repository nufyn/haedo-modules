class HaedoSearchingBox extends HTMLElement {
    connectedCallback() {
        // ------- Start Lock --------
        // Element 태그의 속성 값 JSON 만들기
        let Attributes = new Object;
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            Attributes[this.getAttributeNames()[i]] = this.getAttribute(this.getAttributeNames()[i]);
        }
        this.setModule(this.setElement(Attributes), this.setStyle());
        this.setEvent();
        // ------- Finish Lock --------
    }
    setModule(moduleElement, moduleStyle) {
        let thisModuleElement = moduleElement;
        let thisModuleStyle = moduleStyle;
        let thisModule = thisModuleElement + thisModuleStyle;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = thisModule;
    }
    // Element 처리부
    setElement(params) {
        console.log(params)
        return `
            <input type = 'text' >
            <button>search</button>
        `;
    }
    // Style 처리부
    setStyle() {
        return ``;
    }
    // Event 처리부
    setEvent() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            alert("test")
        })
    }
}
customElements.define('haedo-searching-box', HaedoSearchingBox);



