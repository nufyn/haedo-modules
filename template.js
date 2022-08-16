// // Create a class for the element
class Content extends HTMLElement {
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



        return `
            <article>

            </article>
        `;
    }
    // Style 처리부
    setStyle(params) {

        let { color, bgcolor, size } = params;
        let padding, margin = 0;

        switch (size) {
            case "small || sm":
                padding = "3px 8px";
            case "middle || md":
                padding = "8px 16px";;
            case "lagre || lg":
                padding = "8px 32px";
        }

        if (size == "small") {
            padding = "3px 8px";
        } else {

        }

        if (!color) {
            color = "black";
        }

        if (!bgcolor) {
            bgcolor = "white";
        }

        return `
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
    
        h1 {
            font-size: 24px;
            line-height: 1.5;
        }

        ellipsis {
            display: inline-block;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
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
customElements.define('haedo-elem', Content);

// // Create a class for the element
// class ContentCard extends HTMLElement {
//     constructor() {
//         // Always call super first in constructor
//         super();

//         // Create a shadow root
//         var shadow = this.attachShadow({ mode: 'open' });

//         // Create spans
//         var wrapper = document.createElement('span');
//         wrapper.setAttribute('class', 'wrapper');
//         var icon = document.createElement('span');
//         icon.setAttribute('class', 'icon');
//         icon.setAttribute('tabindex', 0);
//         var info = document.createElement('span');
//         info.setAttribute('class', 'info');

//         // Take attribute content and put it inside the info span
//         var text = this.getAttribute('text');
//         info.textContent = text;

//         // Insert icon
//         var imgUrl;
//         if (this.hasAttribute('img')) {
//             imgUrl = this.getAttribute('img');
//         } else {
//             imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbNugHKt-xZSOXgn3HoMIs9BXVQiHXf4xmQ&usqp=CAU';
//         }
//         var img = document.createElement('img');
//         img.src = imgUrl;
//         icon.appendChild(img);

//         // Create some CSS to apply to the shadow dom
//         var style = document.createElement('style');

//         style.textContent = '.wrapper {' +
//             'position: relative;' +
//             '}' +

//             '.info {' +
//             'font-size: 0.8rem;' +
//             'width: 200px;' +
//             'display: inline-block;' +
//             'border: 1px solid black;' +
//             'padding: 10px;' +
//             'background: white;' +
//             'border-radius: 10px;' +
//             'opacity: 0;' +
//             'transition: 0.6s all;' +
//             'position: absolute;' +
//             'top: 20px;' +
//             'left: 10px;' +
//             'z-index: 3;' +
//             '}' +

//             'img {' +
//             'width: 1.2rem' +
//             '}' +

//             '.icon:hover + .info, .icon:focus + .info {' +
//             'opacity: 1;' +
//             '}';

//         // attach the created elements to the shadow dom

//         shadow.appendChild(style);
//         shadow.appendChild(wrapper);
//         wrapper.appendChild(icon);
//         wrapper.appendChild(info);
//     }
// }