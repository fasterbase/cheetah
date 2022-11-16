export enum Compare {
  'Previous',
  'Past30',
  'Past60',
  'Past300',
  'CustomPeriod',
  'CustomValue',
  'CustomUserInput',
}

export const CompareMapper: { [key in Compare]: string } = {
  [Compare.Previous]: 'Previous Data',
  [Compare.Past30]: 'Past 30 Seconds Average',
  [Compare.Past60]: 'Past 1 Minute Average',
  [Compare.Past300]: 'Past 5 Minutes Average',
  [Compare.CustomPeriod]: 'Custom Period',
  [Compare.CustomValue]: 'Custom Value',
  [Compare.CustomUserInput]: 'Custom User Input',
};
