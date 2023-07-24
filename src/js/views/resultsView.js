import View from './View';
import icons from 'url:../../img/icons.svg';

class resultsView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No recipes available from your query! Please try again.';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join();
  }

  _generateMarkupPreview(res) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${res.id}">
            <figure class="preview__fig">
                <img src="${res.image}" alt="${res.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${res.title}</h4>
                <p class="preview__publisher">${res.publisher}</p>
            </div>
            </a>
        </li>
    `;
  }
}

export default new resultsView();
