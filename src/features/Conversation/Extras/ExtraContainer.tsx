import { Divider } from 'antd';
import { PropsWithChildren, memo } from 'react';

const ExtraContainer = memo<PropsWithChildren>(({ children }) => {
  return (
    <div>
      <Divider style={{ marginBlock: "0 8px", marginInline: "0" }} />
      {children}
    </div>
  );
});

export default ExtraContainer;
