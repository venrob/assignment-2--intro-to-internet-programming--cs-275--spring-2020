# Spring 2020 Intro to Internet Programming — Assignment 2

* **Do not start this project until you have read these instructions carefully.**  
* **Read these instructions repeatedly until you understand, then begin your project. If something is not clear, ask.**  

## ❖・Introduction・❖
Create a *single* web page consisting of HTML, CSS, and JavaScript that provides a user with the instructions for creating rice. The user must be given the choice to cook white rice or sprouted California rice. If the user chooses white rice, then only instructions on how to make white rice should be rendered on the page. Similarly, if the user chooses sprouted California rice, then only instructions regarding how to make sprouted rice should appear on the page. The instructions for making both recipes may be found in the included `rice-recipes.md` file.

In both cases, the user must be able to enter into an input box how much rice they would like to make and the page must respond in real time, as the user types, with how much water to use. A ratio of rice to water must be indicated in all pages.

_You may **only** work within the confines of the included scaffold._

## ❖・Rules・❖
### General
* Use lowercase, combined with kebab case, to name folders and files (`do-this` or `do-this.html`); no spaces in folder or file names (`not this`); no camel case (`notThis`); no snake case (`not_this`).
* Do not alter the scaffold of this project.
* Do not add images.

### HTML
* Place all your markup in `index.html`.

### CSS
* Place all your styles in `style.css`.

## JavaScript
* Place all your JavaScript in `app.js`.

### Git
* Do not alter or remove any of the `.gitignore` files.

### Libraries
* No CSS or JavaScript libraries may be used.

### Task Running with Gulp
You must employ Gulp as the task runner with workflows for development and production.

#### Development
* Ensure your editor is configured to use the enclosed `.editorconfig` file.
* Your HTML must validate via the `gulp-html` module.
* Your CSS must validate via the `gulp-stylelint` module using the enclosed `.stylelintrc.json` file.
* Your JavaScript must validate via the `gulp-eslint` module using the included `.eslintrc.json` file.
* Your JavaScript must transpile using `gulp-babel`, and, possibly, `@babel/core` and `babel-present-env`.
* The development track must lint/validate HTML, CSS, and JavaScript each time you save an `.html`, `.css`, or `.js` file. It must also refresh the browser when any of these files have changed.
* `gulp dev` must trigger the development track.

#### Production
* The production track must compress all the aforementioned languages. *Do not lint them*, as they have already been linted in the development track.
* `gulp build` should load the entire production environment into a folder called `prod`.

## ❖・Due・❖
Tuesday, 28 April 2020, at 10:00 AM.

## ❖・Grading・❖
| Item                                       | Points |
|--------------------------------------------|:------:|
| *Project implemented following directions* | `20`   |
| *UI is logical and intuitive*              | `20`   |
| *Gulp development scaffold in place*       | `20`   |
| *Gulp production scaffold in place*        | `20`   |
| *Code quality*                             | `20`   |

## ❖・Submission・❖
You will need to issue a pull request back into the original repo, the one from which your fork was created for this project. See the **Issuing Pull Requests** section of [this site](http://code-warrior.github.io/tutorials/git/github/index.html) for help on how to submit your assignment.

**Note**: This assignment may *only* be submitted via GitHub. **No other form of submission will be accepted**.
