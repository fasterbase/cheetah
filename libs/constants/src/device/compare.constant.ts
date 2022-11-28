export enum Compare {
  'Previous' = 'previous',
  'Past30' = 'past30',
  'Past60' = 'past60',
  'Past300' = 'past300',
  'CustomPeriod' = 'customPeriod',
  'CustomValue' = 'customValue',
  'CustomUserInput' = 'customUserInput',
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
