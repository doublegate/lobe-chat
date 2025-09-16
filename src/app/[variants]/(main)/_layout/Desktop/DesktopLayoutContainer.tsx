import { useTheme } from 'antd-style';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import SideBar from './SideBar';

const DesktopLayoutContainer = memo<PropsWithChildren>(({ children }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const hideSideBar = pathname.startsWith('/settings');
  return (
    <>
      {!hideSideBar && <SideBar />}
      <Flexbox
        style={{
          background: theme.colorbglayout,
          borderBlockStart: `1px solid ${theme.colorBorderSecondary}`,
          borderInlineStart: `1px solid ${theme.colorBorderSecondary}`,
          borderStartStartRadius: !hidesidebar ? 12 : undefined,
          overflow: 'hidden',
        }}
        width={'100%'}
      >
        {children}
      </Flexbox>
    </>
  );
});
export default DesktopLayoutContainer;
