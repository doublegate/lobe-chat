import { PropsWithChildren } from 'react';
import { Flexbox } from 'react-layout-kit';

import Footer from '@/features/Setting/Footer';

import { SCROLL_PARENT_ID } from '../../../features/const';
import Nav from './Nav';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Nav />
      <Flexbox
        align={'center'}
        flex={1}
        id={SCROLL_PARENT_ID}
        padding={16}
        style={{ overflowX: 'hidden', overflowY: 'scroll', position: 'relative' }}
        width={'100%'}
      >
        <Flexbox
          gap={16}
          style={{ maxWidth: max_width, paddingBlockStart: 64, position: 'relative' }}
          width={'100%'}
        >
          {children}
          <div />
          <Footer />
        </Flexbox>
      </Flexbox>
    </>
  );
};

Layout.displayName = 'DesktopDiscoverStoreLayout';

export default Layout;
