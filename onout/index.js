import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import utils from './utils.js';
import constants from './constants.js';
import appRouter from './appRouter.js';

// Fix ReferenceError, because we cannot set __dirname directly in ES module.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.disable('x-powered-by');
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/app', appRouter);

app.get('/', (req, res) => {
  res.send(
    utils.wrapInHtmlTemplate(`
    <header class="">
      <h2>Log into deployment page</h2>
    </header>
    <main>
      <section class="accessSection">
        <p>Enter your license code</p>
        <form method="post" action="app" class='accessForm'>
          <input type='text' name='access_code' placeholder='License' required>
          <br />
          <input type='submit' value='Login' class='primaryBtn'>
        </form>

        <p>
          Do not have a license?
          <a href="${constants.accessCodePaymentLink}" target=_blank>
            <strong>Get it here</strong>
          </a>
        </p>
      </section>
    </main>
  `)
  );
});

app.listen(3006, () => {
  console.log('Server running on port 3006');
});
