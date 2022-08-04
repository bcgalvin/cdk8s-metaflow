const { cdk8s } = require('projen');
const commonIgnore = ['.idea', '.Rproj', '.vscode', 'cdk.context.json', '.DS_Store'];
const cdk8sVersion = '2.3.73';
const constructsVersion = '10.1.64';
const projenVersion = 'v0.60.12';

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
  devDeps: [
    `cdk8s@^${cdk8sVersion}`,
    'cdk8s-cli@^2.0.70',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'prettier',
    '@types/jest',
    '@types/cfn-response',
  ],
  projenVersion: projenVersion,
  depsUpgradeOptions: {
    ignoreProjen: false,
  },
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
  readme: true,
  mergify: true,
  codeCov: true,
  eslint: true,
  jestOptions: {},
  docgen: true,
  docsDirectory: 'docs',
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

project.testTask.prependExec(
  'helm repo add bitnami https://charts.bitnami.com/bitnami && helm repo add metaflow https://bcgalvin.github.io/metaflow-charts && helm repo update metaflow',
);
const installHelm = project.addTask('install-helm', {
  exec: 'curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash',
  description: 'Install helm3',

  // will exit with non-zero if helm is not installed or has the wrong version
  condition: '! (helm version | grep "v3.")',
});
project.testTask.prependSpawn(installHelm);
project.upgradeWorkflow.postUpgradeTask.spawn(project.tasks.tryFind('integ:snapshot-all'));

project.synth();
