module.exports = {
  testEnvironment: `jsdom`,
  testEnvironmentOptions: {
    url: `http://localhost`,
  },
  setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"],
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    "@fontsource/kosugi-maru": `identity-obj-proxy`,
    "@fortawesome/react-fontawesome": `<rootDir>/__mocks__/react-fontawesome.js`,
    "gatsby-plugin-image": `<rootDir>/__mocks__/gatsby-plugin-image.js`,
    "gatsby-plugin-mdx": `<rootDir>/__mocks__/gatsby-plugin-mdx.js`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `cypress`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
}
