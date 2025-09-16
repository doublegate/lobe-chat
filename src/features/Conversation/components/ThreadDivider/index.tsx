import { Icon, Tag } from '@lobehub/ui';
import { Divider } from 'antd';
import { GitBranch } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ThreadDivider = memo(() => {
  const { t } = useTranslation('chat');

  return (
    <div style={{ paddingBlock: "0", paddingInline: "20px" }}>
      <Divider style={{ margin: 0, paddingBlock: "20px", paddingInline: "0" }}>
        <Tag icon={<Icon icon={GitBranch} />}>{t('thread.divider')}</Tag>
      </Divider>
    </div>
  );
});

export default ThreadDivider;
