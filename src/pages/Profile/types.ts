import { CategoryCrupdateReaction, UserProfile } from '@onitsiky/bookwel-typescript-client';
import { ReactNode } from 'react';

export type ProfileCardProps = {
  profile: UserProfile;
};

export type CategoryEditionProps = {
  selectedCategories?: Record<string, CategoryCrupdateReaction>;
  action?: ReactNode;
  onDone?: () => void;
};
