import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  render(data) {
    console.log("View.render", data);
    if (!data || (Array.isArray(data) && data.length === 0)) 
        return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {

    this._data = data;
    const newMarkup = this._generateMarkup();
    // console.log(newMarkup);
    // convert the string into real DOM node object, like a virtual DOM in memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // update changed TEXT      
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
      // update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr => {
          // console.log(attr);
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    // console.log(this._parentElement);
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `;
    this._clear();
    // console.log(this._parentElement);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}_icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}_icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}
