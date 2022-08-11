class HaedoSearchingBox extends HTMLElement {
    connectedCallback() {
        // ------- Start Lock --------
        // Element 태그의 속성 값 JSON 만들기
        let Attributes = new Object;
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            Attributes[this.getAttributeNames()[i]] = this.getAttribute(this.getAttributeNames()[i]);
        }
        // 초기화
        let elementTemp = ``;
        let styleTemp = ``;
        // ------- Finish Lock --------

        // 엘리멘트 처리부
        elementTemp = `
        <input type='text'>
        <button>search</button>
        `

        //스타일 처리부
        styleTemp = ``;


        // ------- Start Lock --------
        this.setModule(elementTemp, styleTemp);
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

    // Event 처리부
    setEvent() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            alert("test")
        })
    }
}
customElements.define('haedo-searching-box', HaedoSearchingBox);



