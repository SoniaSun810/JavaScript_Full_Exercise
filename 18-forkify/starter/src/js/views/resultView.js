import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultView extends View {
  _data = [];
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again :)';

  _generateMarkup() {
    // console.log("resultView._data", this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }

}

export default new ResultView();
