import View from './View';
import previewView from './previewView';

class bookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks');
  _errMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';
  _message = '';

  addHandlerBookmarks(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join();
  }
}

export default new bookmarkView();
