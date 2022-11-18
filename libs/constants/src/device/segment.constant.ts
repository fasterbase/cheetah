export enum Segment {
  'Itself' = '0',
  'Same' = '1',
  'Against' = '2',
  'Custom' = '3',
}

export const SegmentMapper: { [key in Segment]: string } = {
  [Segment.Itself]: 'Segment Itself',
  [Segment.Same]: 'Same Group',
  [Segment.Against]: 'Against Of Group',
  [Segment.Custom]: 'From User Input',
};
