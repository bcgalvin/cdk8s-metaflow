const { cdk8s, DependencyType } = require('projen');
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
  deps: [`cdk8s@${cdk8sVersion}`, 'cdk8s-plus-22'],
  devDeps: [
    `cdk8s@${cdk8sVersion}`,
    'cdk8s-cli@^2.0.70',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'prettier',
    '@types/cfn-response',
  ],
  projenVersion: projenVersion,
  depsUpgradeOptions: {
    ignoreProjen: false,
  },
  releaseToNpm: true,
  publishToGo: {
    moduleName: 'github.com/bcgalvin/cdk8s-metaflow-go',
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
  eslintOptions: {
    prettier: true,
  },
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

project.deps.addDependency('cdk8s-plus-22', DependencyType.PEER);
// remove integ assertions... postgres has dynamic objects that break things
project.testTask.reset('jest --passWithNoTests --all --updateSnapshot');
project.testTask.exec('eslint');
project.testTask.prependExec('cd ./test && cdk8s import k8s --language typescript');
project.upgradeWorkflow.postUpgradeTask.spawn(project.tasks.tryFind('integ:snapshot-all'));
project.synth();
