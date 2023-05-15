import jsHtmlencode from 'js-htmlencode';
import constants from './constants.js';

function escapeAttr(str) {
  return jsHtmlencode.htmlEncode(str);
}

function isValidAccessCode(value) {
  if (typeof value !== 'string') return false;

  return value.trim() === constants.accessCode;
}

function generateDateId(name) {
  return `${name}_${new Date().getMinutes()}_${new Date().getDate()}_${
    // +1 because first month starts from 0
    new Date().getMonth() + 1
  }_${new Date().getFullYear()}`;
}

function wrapInHtmlTemplate(html) {
  return `
  <html lang='en'>
    <head>
      <meta charset='UTF-8' />
      <title>Onout - deploy SpeechGPT</title>
      <link rel='stylesheet' href='/index.css' />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="theme-color" content="#5f48b0" />
      <meta
        name="description"
        content="Deploy your own SpeechGPT app in one-click"
      />
      <meta name="keywords" content="speechgpt, chatgpt speech, earn on ai, onout" />
    </head>
    <body>
      ${html}
    </body>
    <footer>
      <div class='supportWrapper'>
        Support:
        <a
          href="mailto:support@onout.org"
          target="_blank"
          rel="noreferrer"
        >
          Email
        </a> or
        <a
          href="https://t.me/onoutsupportbot"
          target="_blank"
          rel="noreferrer"
        >
          Telegram
        </a>
      </div>
    </footer>
  </html>
  `;
}

function returnErrorsHtmlPage({ title, description }) {
  return wrapInHtmlTemplate(`
    <header>
      <h2>${title}</h2>
    </header>
    <main class='centered'>
      ${description ? `<div>${description}</div>` : ''}
      <a href='/'>
        <strong>Go back</strong>
      </a>
    </main>
  `);
}

export default {
  escapeAttr,
  isValidAccessCode,
  generateDateId,
  wrapInHtmlTemplate,
  returnErrorsHtmlPage,
};
