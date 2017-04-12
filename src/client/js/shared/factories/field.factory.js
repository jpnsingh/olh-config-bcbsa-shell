'use strict';

export function FieldFactory() {
    let Field = function (name) {
        this.name = name;
        return this;
    };

    Field.prototype.type = function (type) {
        this.type = type;
        return this;
    };

    Field.prototype.label = function (label) {
        this.label = label;
        return this;
    };

    Field.prototype.placeholder = function (placeholder) {
        this.placeholder = placeholder;
        return this;
    };

    Field.prototype.value = function (value) {
        this.value = value;
        return this;
    };

    Field.prototype.src = function (src) {
        this.src = src;
        return this;
    };

    return Field;
}
