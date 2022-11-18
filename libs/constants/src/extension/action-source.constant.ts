export enum ActionSource {
  'MQTT',
  'TCP',
  'UDP',
}

export const ActionSourceMapper: { [key in ActionSource]: string } = {
  [ActionSource.MQTT]: 'MQTT',
  [ActionSource.TCP]: 'TCP',
  [ActionSource.UDP]: 'UDP',
};
