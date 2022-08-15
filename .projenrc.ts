import { cdk8s, TextFile } from 'projen';
import { ArrowParens, TrailingComma } from 'projen/lib/javascript/prettier';

const commonIgnore = ['.idea', '.Rproj', '.vscode', 'cdk.context.json', '.DS_Store'];
const cdk8sVersion = '2.3.84';
const cdk8sPlusVersion = '2.0.0-rc.83';
const constructsVersion = '10.1.76';
const projenVersion = 'v0.61.10';
const nodejsVersion = 'v16.16.0';

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
  deps: [`cdk8s-plus-22@^${cdk8sPlusVersion}`],
  devDeps: [
    '@types/jest',
    '@types/node',
    `cdk8s@^${cdk8sVersion}`,
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
  jestOptions: {
    jestConfig: {
      testPathIgnorePatterns: ['<rootDir>/test/mappedTransformer'],
    },
  },

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
  eslintOptions: {
    dirs: ['src'],
    ignorePatterns: ['**/node_modules/**', '**/test/imports/**', '**/examples/**'],
  },
  tsconfig: {
    exclude: ['examples'],
    compilerOptions: {},
  },
  gitignore: [...commonIgnore, '**/examples/**/imports'],
  npmignore: [...commonIgnore, 'examples'],
});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});
project.addTask('d', {
  exec: 'npx ts-node test/main.ts && kubectl apply -f dist/',
});
project.testTask.prependExec('helm repo add bitnami https://charts.bitnami.com/bitnami');
const installHelm = project.addTask('install-helm', {
  exec: 'curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash',
  description: 'Install helm3',

  // will exit with non-zero if helm is not installed or has the wrong version
  condition: '! (helm version | grep "v3.")',
});
project.testTask.prependSpawn(installHelm);
project.synth();
