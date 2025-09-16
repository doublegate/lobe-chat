import { ScrollShadow } from '@lobehub/ui';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useQuery } from '@/hooks/useQuery';
import { AssistantNavKey } from '@/types/discover';

import ActionButton from './ActionButton';
import Related from './Related';
import Summary from './Summary';
import TocList from './TocList';

const Sidebar = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { activeTab = AssistantNavKey.Overview } = useQuery() as { activeTab: AssistantNavKey };

  if (mobile) {
    return (
      <Flexbox gap={32}>
        <ActionButton mobile />
      </Flexbox>
    );
  }

  return (
    <ScrollShadow
      flex={'none'}
      gap={32}
      hideScrollBar
      size={4}
      style={{
        insetBlockStart: 0,
        maxHeight: 'calc(100vh - 76px)',
        paddingBlockEnd: 24,
        position: 'sticky',
      }}
      width={360}
    >
      <ActionButton />
      {activeTab !== AssistantNavKey.Overview && <Summary />}
      {activeTab === AssistantNavKey.SystemRole && <TocList />}
      {activeTab !== AssistantNavKey.Related && <Related />}
    </ScrollShadow>
  );
});

export default Sidebar;
