export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._buttonSubmit = this._form.querySelector(this._config.buttonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    }
    _showInputError(input) {
        const errorSpan = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._config.errorClass);
        errorSpan.textContent = input.validationMessage;
    }
    _hideInputError(input) {
        const errorSpan = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._config.errorClass);
        errorSpan.textContent = '';
    }
    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }
    _toggleButtonState() {
        const isFormValid = this._form.checkValidity();
        this._buttonSubmit.disabled = !isFormValid;
        this._buttonSubmit.classList.toggle(this._config.buttonDisabledClass, !isFormValid);
    }
    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._form.addEventListener('reset', () => {
            this._inputList.forEach((input) => {
                this._hideInputError(input);
            });
            this._toggleButtonState();
        });
    }
    enableValidation() {
        this._setEventListeners();
    }
}