import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView.js';

class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler){
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log("resultView._data", this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }

}

export default new BookMarksView();
