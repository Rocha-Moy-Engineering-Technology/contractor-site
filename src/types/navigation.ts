export enum SectionId {
  Hero = 'hero',
  Resume = 'resume',
  Interests = 'interests',
  Contact = 'contact',
}

export interface NavLink {
  readonly label: string;
  readonly sectionId: SectionId;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', sectionId: SectionId.Hero },
  { label: 'Resume', sectionId: SectionId.Resume },
  { label: 'Interests', sectionId: SectionId.Interests },
  { label: 'Contact', sectionId: SectionId.Contact },
] as const;
