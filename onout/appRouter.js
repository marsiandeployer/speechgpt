/* eslint-disable indent */
import fs from 'fs';
import request from 'request';
import { exec } from 'child_process';
import express from 'express';
import { body, validationResult } from 'express-validator';
import constants from './constants.js';
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
        <h2 class='deploymentPageTitle'>Deploy SpeechGPT</h2>
      </header>
      <main>
        <section class="deploymentSection">
          <form method="post" action="bot/deploy">
            <div class="row">
              <label for="">
                Title
              </label>
              <input type='text' name='' placeholder='' id='' required>
            </div>

            <input type='submit' value='Create Telegram bot' class='primaryBtn'>
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
  [body('').notEmpty().withMessage('Please specify ?')],
  async (req, res) => {
    // 
  }
);

export default router;
