export enum Compare {
  'Previous' = 1,
  'Past30' = 2,
  'Past60' = 3,
  'Past300' = 4,
  'CustomPeriod' = 5,
  'CustomValue' = 6,
  'CustomUserInput' = 7,
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
