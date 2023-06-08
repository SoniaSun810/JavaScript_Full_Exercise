import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2


class ResultView extends View {
    _data = [];
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again :)';

    _generateMarkup() {
        // console.log("resultView._data", this._data);
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
        return `
        <li class="preview">
          <a class="preview__link" href="#${result.id}">
            <figure class="preview__fig">
              <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
            </div>
          </a>
        </li>
        `;
    }





}

export default new ResultView();