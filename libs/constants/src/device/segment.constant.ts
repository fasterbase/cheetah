export enum Segment {
  'Itself' = 'itSelf',
  'Same' = 'same',
  'Against' = 'against',
  'Custom' = 'custom',
}

export const SegmentMapper: { [key in Segment]: string } = {
  [Segment.Itself]: 'Segment Itself',
  [Segment.Same]: 'Same Group',
  [Segment.Against]: 'Against Of Group',
  [Segment.Custom]: 'From User Input',
};
