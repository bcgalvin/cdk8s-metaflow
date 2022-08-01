import { Chart, Testing } from 'cdk8s';

export function synth(construct: any, { name = 'construct', ...params }: Record<string, unknown> = {}) {
  const app = Testing.app();
  const chart = new Chart(app, 'default');
  new construct(chart, name, params);
  return Testing.synth(chart);
}

export function find(chart: any[], kind: string, name?: string) {
  return chart.find((value) => {
    if (value.kind !== kind) {
      return false;
    }
    if (name && value.metadata?.name !== name) {
      return false;
    }

    return true;
  });
}
