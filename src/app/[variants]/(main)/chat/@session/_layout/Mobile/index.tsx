import { PropsWithChildren } from 'react';

import MobileContentLayout from '@/components/server/MobileNavLayout';

import SessionSearchBar from '../../features/SessionSearchBar';
import SessionHeader from './SessionHeader';

const MobileLayout = ({ children }: PropsWithChildren) => {
  return (
    <MobileContentLayout header={<SessionHeader />} withNav>
      <div style={{ paddingBlock: "8px", paddingInline: "16px" }}>
        <SessionSearchBar mobile />
      </div>
      {children}
      {/* ↓ cloud slot ↓ */}

      {/* ↑ cloud slot ↑ */}
    </MobileContentLayout>
  );
};

export default MobileLayout;
