// Framework component (button)

(function () {
    'use strict';

    // Check framework availability
    if (typeof _framework === "undefined") {
        console.log("_button.js : No '_framework' module found! Be sure to load it up first!");
        return;
    }

    function Button(root) {
        var self = this;

        this.schema_name = '';
        this.elements = {
            root: root
        };

        // Get schema name
        this.schema_name = root.getAttribute("framework-schema");
        if (!_framework.schemas[this.schema_name]) {
            console.error("No schema defined for '" + this.schema_name + "' !");
        }

        this._bind_schema();
        this._generate_elements();

        this.elements.button.addEventListener("click", this.schema.methods.click);
    }

    Button.prototype._bind_schema = function() {
        this.schema = _framework.schemas[this.schema_name];
    };

    Button.prototype._generate_elements = function () {
        // Generate elements
        this.elements.button = document.createElement("BUTTON");
        this.elements.label = document.createTextNode(this.schema.data.label);
        this.elements.button.appendChild(this.elements.label);
        this.elements.root.appendChild(this.elements.button);

        // Add classes
        this.elements.button.className += this.schema.classes.toString().split(",").join(" ");
    };

    _framework.register({
        constructor: Button,
        tag: 'framework-button'
    });

})();
