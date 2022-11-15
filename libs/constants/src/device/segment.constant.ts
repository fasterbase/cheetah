export enum Segment {
  'Itself',
  'Same',
  'Against',
  'Custom',
}

export const SegmentMapper: { [key in Segment]: string } = {
  [Segment.Itself]: 'Segment Itself',
  [Segment.Same]: 'Same Group',
  [Segment.Against]: 'Against Of Group',
  [Segment.Custom]: 'From User Input',
};
