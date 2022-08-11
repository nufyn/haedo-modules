class HaedoSidebar extends HTMLElement {
    connectedCallback() {
        // ------- Start Lock --------
        // Element 태그의 속성 값 JSON 만들기
        let Attributes = new Object;
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            Attributes[this.getAttributeNames()[i]] = this.getAttribute(this.getAttributeNames()[i]);
        }

        let elementTemp;
        let styleTemp;
        // ------- Finish Lock --------

        // 엘리멘트 처리부
        for (var i = 0; Attributes.menu.length; i++) {
            console.log(Attributes.menu[i]);
        }


        //스타일 처리부
        styleTemp = ``;


        // ------- Start Lock --------
        this.setModule(elementTemp, styleTemp);
        // ------- Finish Lock --------
    }
    setModule(moduleElement, moduleStyle) {
        let thisModuleElement = moduleElement;
        let thisModuleStyle = moduleStyle;
        let thisModule = thisModuleElement + thisModuleStyle;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = thisModule;
    }
}
customElements.define('haedo-sidebar', HaedoSidebar);