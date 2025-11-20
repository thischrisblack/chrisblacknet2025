class SiteHeader extends HTMLElement {
    // Fires when an instance of the element is created or updated
    constructor() {
        super();
    }

    handleLocation = (shadow) => {
        let element;

        const { pathname } = window.location;

        switch (pathname) {
            case "/music/":
                element = shadow.getElementById("music");
                shadow.getElementById("summary").textContent = "Music";
                break;
            case "/":
                element = shadow.getElementById("home");
                shadow.getElementById("summary").textContent = "Home";
                break;
            default:
                break;
        }

        element.classList.add("current-page");

        console.log("EL", pathname, element);
    };

    // Fires when an instance was inserted into the document
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        console.log(window.location);

        // Set content.
        const wrapper = document.createElement("header");
        const markupResponse = await fetch(
            "/components/site-header/site-header-markup.html"
        );
        wrapper.innerHTML = await markupResponse.text();

        // Set styles.
        const style = document.createElement("style");
        const resp = await fetch(
            "/components/site-header/site-header-style.css"
        );
        style.textContent = await resp.text();

        // Attach elements.
        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        this.handleLocation(shadow);
    }

    // Fires when an instance was removed from the document
    disconnectedCallback() {}

    // Fires when an attribute was added, removed, or updated
    attributeChangedCallback(attrName, oldVal, newVal) {}

    // Fires when an element is moved to a new document
    adoptedCallback() {}
}

// Registers custom element
window.customElements.define("site-header", SiteHeader);
