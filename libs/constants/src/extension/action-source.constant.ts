export enum ActionSource {
  'MQTT' = 'mqtt',
  'TCP' = 'tcp',
  'UDP' = 'udp',
}

export const ActionSourceMapper: { [key in ActionSource]: string } = {
  [ActionSource.MQTT]: 'MQTT',
  [ActionSource.TCP]: 'TCP',
  [ActionSource.UDP]: 'UDP',
};
