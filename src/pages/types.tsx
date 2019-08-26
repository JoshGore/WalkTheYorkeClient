export interface TrailSectionProps {
  name: string;
  shortName: string;
  id: number;
  // note if expanding to multiple trails this should include 'undefined'
  type: 'trail' | 'stage' | 'short';
}

export interface TrailObjectProps {
  name: string | undefined;
  id: number | undefined;
  type: 'issue' | 'campsite' | 'interest' | undefined
}
