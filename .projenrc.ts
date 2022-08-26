import { cdk8s, TextFile } from 'projen';
import { ArrowParens, TrailingComma } from 'projen/lib/javascript/prettier';

const commonIgnore = ['.idea', '.Rproj', '.vscode', 'cdk.context.json', '.DS_Store'];
const cdk8sVersion = '2.4.7';
const cdk8sPlusVersion = '2.0.0-beta.12';
const constructsVersion = '10.1.83';
const projenVersion = 'v0.61.28';
const nodejsVersion = 'v16.16.0';
const deps = [`cdk8s-plus-21@${cdk8sPlusVersion}`, 'ts-deepmerge'];

const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'Bryan Galvin',
  authorAddress: 'bcgalvin@gmail.com',
  name: 'cdk8s-metaflow',
  keywords: ['cdk8s', 'cdk', 'metaflow'],
  repositoryUrl: 'https://github.com/bcgalvin/cdk8s-metaflow.git',
  stability: 'experimental',
  defaultReleaseBranch: 'main',
  cdk8sVersion: cdk8sVersion,
  constructsVersion: constructsVersion,
  deps: deps,
  bundledDeps: ['ts-deepmerge'],
  devDeps: [
    '@types/jest',
    '@types/node',
    `cdk8s@^${cdk8sVersion}`,
    `cdk8s-plus-21@${cdk8sPlusVersion}`,
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'prettier',
  ],
  projenVersion: projenVersion,
  projenrcTs: true,
  releaseToNpm: true,
  publishToGo: {
    moduleName: 'github.com/bcgalvin/cdk8s-metaflow-go',
    githubTokenSecret: 'PROJEN_GITHUB_TOKEN',
  },
  publishToPypi: {
    distName: 'cdk8s-metaflow',
    module: 'cdk8s_metaflow',
  },
  catalog: { announce: false },
  githubOptions: {
    pullRequestLint: false,
  },
  dependabot: false,
  pullRequestTemplate: false,
  clobber: false,
  mergify: true,
  codeCov: true,
  eslint: true,
  docgen: true,
  docsDirectory: 'docs',
  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      trailingComma: TrailingComma.ALL,
      arrowParens: ArrowParens.ALWAYS,
      singleQuote: true,
    },
  },
  gitignore: [...commonIgnore],
  npmignore: [...commonIgnore],
});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});
project.addTask('d', {
  exec: 'rm -rf dist/ && npx ts-node test/main.ts && kubectl apply -f dist/',
});
project.addTask('r', {
  exec: 'kubectl delete -f dist/ ',
});
project.addTask('minikube', {
  exec: 'minikube start --kubernetes-version=v1.21.13 --addons=metrics-server,ingress',
});
project.addTask('dashboard', {
  exec: 'minikube dashboard --port=8800',
});
project.synth();
