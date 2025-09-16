import { PropsWithChildren } from 'react';

import MobileContentLayout from '@/components/server/MobileNavLayout';
import Footer from '@/features/Setting/Footer';

import { SCROLL_PARENT_ID } from '../../../features/const';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <MobileContentLayout
      gap={16}
      header={<Header />}
      id={SCROLL_PARENT_ID}
      style={{ paddingBlockStart: 8, paddingInline: 16 }}
      withNav
    >
      {children}
      <div />
      <Footer />
    </MobileContentLayout>
  );
};

Layout.displayName = 'MobileDiscoverLayout';

export default Layout;
