/* eslint-disable indent */
import { exec } from 'node:child_process';
import fs from 'node:fs';
import express from 'express';
import { body, validationResult } from 'express-validator';
import constants from './constants.js';
import appVars from './appVars.js';
import utils from './utils.js';

const router = new express.Router();

router.post(
  '/',
  [
    body('access_code')
      .trim()
      .notEmpty()
      .escape()
      .matches(new RegExp(constants.accessCode))
      .withMessage('Enter a valid code'),
  ],
  async (req, res) => {
    const result = validationResult(req);

    if (result.errors.length) {
      return res.status(401).send(
        utils.returnErrorsHtmlPage({
          title: 'Not allowed',
        })
      );
    }

    res.send(
      utils.wrapInHtmlTemplate(
        `
      <header>
        <h2 class='deploymentPageTitle'>Create own SpeechGPT</h2>
      </header>
      <main>
        <section class="deploymentSection">
          <form method="post" action="app/deploy">
            <div class="row">
              <label for="appNameInput">
                App name:
              </label>
              <input type='text' name='app_name' placeholder='My speech app' id='appNameInput' required>
            </div>
            <div class="row">
              <label for="appLogoInput">
                Logo URL:
              </label>
              <input type='text' name='app_logo' id='appLogoInput' required>
            </div>

            <input type='submit' value='Generate your app!' class='primaryBtn'>
          </form>
        </section>
      </main>
    `
      )
    );
  }
);

router.post(
  '/deploy',
  [body('app_name').notEmpty().withMessage('Please specify a name')],
  [body('app_logo').notEmpty().withMessage('Please specify a logo')],
  async (req, res) => {
    const result = validationResult(req);

    if (result.errors.length) {
      return res.status(400).send(
        utils.returnErrorsHtmlPage({
          title: 'Something went wrong',
          description: JSON.stringify(errors.array()),
        })
      );
    }

    const appName = utils.escapeAttr(req.body.app_name);
    const appLogo = utils.escapeAttr(req.body.app_logo);
    const branchId = utils.generateDateId(appName.replace(/ /g, '_'));

    exec(`git checkout -b ${branchId}`, (branchError, stdout) => {
      if (branchError) {
        return res.status(500).send(
          utils.returnErrorsHtmlPage({
            title: 'Something went wrong with branch creation',
            description: branchError.message,
          })
        );
      }

      const { name, logo, titleAndLogo } = appVars;

      fs.readFile(name.filePath, 'utf8', (readError, data) => {
        if (readError) {
          return res.status(500).send(
            utils.returnErrorsHtmlPage({
              title: 'Something went wrong with file reading',
              description: readError.message,
            })
          );
        }

        const match = data.match(name.regex);

        if (!match) {
          console.error('No match!');
          return res.status(500).send(
            utils.returnErrorsHtmlPage({
              title: 'Something went wrong with Regex',
            })
          );
        }

        const newData = data.replace(name.regex, name.newContent(appName));

        fs.writeFile(name.filePath, newData, (writeError, data) => {
          if (writeError) {
            return res.status(500).send(
              utils.returnErrorsHtmlPage({
                title: 'Something went wrong with file writing',
                description: writeError.message,
              })
            );
          }

          res.send(
            utils.wrapInHtmlTemplate(`
                <header>
                  <h2>Succesful creation!</h2>
                </header>
              `)
          );
        });
      });
    });
  }
);

export default router;
