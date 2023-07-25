import View from './View';
import previewView from './previewView';

class resultsView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No recipes available from your query! Please try again.';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join();
  }
}

export default new resultsView();
