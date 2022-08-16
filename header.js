class Header extends HTMLElement {
    connectedCallback() {
        // ------- Start Lock --------
        // Element 태그의 속성 값 JSON 만들기
        let Attributes = new Object;
        // console.log(this.getAttributeNames());
        for (var i = 0; i < this.getAttributeNames().length; i++) {
            Attributes[this.getAttributeNames()[i]] = this.getAttribute(this.getAttributeNames()[i]);
        }
        // console.log(Attributes);
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
        // console.log(JSON.parse(params.links));

        let { title, logo, islogout } = params;
        let homeLink, brand, logoutButton = "";

        console.log(logo);
        if (logo) {
            brand = `<img src="${logo}" alt="${title}" class="brand-logo"/>`;
        } else {
            brand = `<p class="brand-text">${title}</p>`;
        }

        homeLink = `  
            <a href="/" class="brand-logo-wrap">
                ${brand}
            </a>
        `;

        if (islogout === "true") {
            logoutButton = `
                <button type="button" id="do_logout" class="logout-button">
                    로그아웃
                </button>
            `;
        }

        return `
            <header>
                ${homeLink}
                ${logoutButton}
            </header>
        `;
    }
    // Style 처리부
    setStyle(params) {
        return `
        * {
            box-sizing:border-box;
            color: inherit;
            font: inherit;
            padding: 0;
            margin: 0;
            border: none;
            outline: none;
        }
        header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 60px;
            padding: 16px;
            border-bottom: 1px solid #DBDBDB;
        }

        .brand-logo-wrap {
            text-decoration: none;
            display: block;
            width: auto;
            max-height: 28px;
            font-size: 0;
            cursor: pointer;
        }

        .brand-logo-wrap img {
            font-size: 0;
            width: auto;
            height: 28px;
        }

        .brand-logo-wrap p {
            font-size: 24px;
            line-height: 28px;
        }

        .logout-button {
            display: inline-block;
            width: auto;
            height: 28px;
            font-size: 12px;
            font-weight: bold;
            line-height: 14px;
            padding: 8px 16px;
            color: black;
            background-color: rgba(245, 246, 247, 1);
            border-radius: 50px;
        }
        `;
    }
    // Event 처리부
    setEvent() {
        this.shadowRoot.querySelector("#do_logout").addEventListener("click", function () {
            console.log("fhrmndkdnt");
        });
    }
}
customElements.define('cms-header', Header);