import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useUserProfile';
import LoginButton from '../auth/LoginButton';
import SaveDesignButton from './persistence/SaveDesignButton';
import SavedDesignsSheet from './persistence/SavedDesignsSheet';
import type { DesignState } from '../../state/dripify/designState';

interface HeaderBarProps {
  designState: DesignState;
  onLoadDesign: (state: DesignState) => void;
}

export default function HeaderBar({ designState, onLoadDesign }: HeaderBarProps) {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/dripify-logo.dim_1024x256.png"
            alt="Dripify"
            className="h-8 w-auto"
          />
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <>
              {userProfile && (
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {userProfile.name}
                </span>
              )}
              <SaveDesignButton designState={designState} />
              <SavedDesignsSheet onLoadDesign={onLoadDesign} />
            </>
          )}
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
