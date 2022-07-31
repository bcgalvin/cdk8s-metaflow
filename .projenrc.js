const { cdk8s } = require('projen');
const commonIgnore = ['.idea', '.Rproj', '.vscode', 'cdk.context.json', '.DS_Store'];
const cdk8sVersion = '2.2.74';
const constructsVersion = '10.0.5';

const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'Bryan Galvin',
  authorAddress: 'bcgalvin@gmail.com',
  name: 'cdk8s-metaflow',
  keywords: ['cdk8s', 'cdk', 'metaflow'],
  repositoryUrl: 'https://github.com/bcgalvin/cdk8s-metaflow.git', // Dependencies
  cdk8sVersion: cdk8sVersion,
  deps: ['cdk8s-plus-22'],
  bundledDeps: ['cdk8s-plus-22'],
  devDeps: ['eslint-config-prettier', 'eslint-plugin-prettier', 'prettier', '@types/cfn-response'],
  constructsVersion: constructsVersion, // Release
  defaultReleaseBranch: 'main',
  release: false,
  releaseToNpm: false,
  githubOptions: {
    pullRequestLint: false,
  },
  depsUpgrade: false,
  dependabot: false,
  pullRequestTemplate: false,
  clobber: false,
  readme: true,
  mergify: true, // Testing & Linting
  codeCov: true,
  eslint: true,
  eslintOptions: {
    prettier: true,
  },
  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      trailingComma: 'all',
      arrowParens: 'always',
      singleQuote: true,
    },
  },
  eslintOptions: {
    dirs: ['src'],
    ignorePatterns: ['**/node_modules/**', '**/test/imports/**'],
  },
  gitignore: commonIgnore,
  npmignore: commonIgnore,
});

project.testTask.prependExec(`cd ./test && cdk8s import k8s --language typescript`);

project.synth();
