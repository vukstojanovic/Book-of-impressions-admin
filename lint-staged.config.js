module.exports = {
  // This will lint and format JavaScript files
  '**/*.(js|jsx)': (filenames) => [
    `npx eslint --fix ${filenames.join(' ')}`,
    `npx prettier --write ${filenames.join(' ')}`,
  ],

  // this will Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `npx prettier --write ${filenames.join(' ')}`,
}
