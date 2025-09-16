import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { ActionIcon, Icon, Text } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { UploadIcon, XIcon } from 'lucide-react';
import { lighten } from 'polished';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { fileManagerSelectors, useFileStore } from '@/store/file';

import Item from './Item';

const useStyles = createStyles(({ css, token }) => {
  return {
    body: css`
      height: 400px;
      border-radius: 8px;
      background: ${lighten(0.05, token.colorbglayout)};
    `,
    container: css`
      position: fixed;
      z-index: 100;
      inset-block-end: 24px;
      inset-inline-end: 24px;

      overflow: hidden;

      width: 360px;
      border: 1px solid ${token.colorSplit};
      border-radius: 8px;

      box-shadow: ${token.boxShadow};
    `,
    header: css`
      cursor: pointer;

      padding-block: 8px;
      padding-inline: 24px 12px;
      border-radius: 8px;

      background: ${token.colorBgContainer};

      transition: all 0.3s ease-in-out;

      &:hover {
        background: ${convertalphatosolid(token.colorfilltertiary, token.colorbgcontainer)};
      }
    `,
    progress: css`
      pointer-events: none;

      position: absolute;
      inset-block: 0 0;
      inset-inline: 0 1%;

      height: 100%;
      border-block-end: 3px solid ${token.geekblue};

      background: ${token.colorFillTertiary};
    `,
    title: css`
      height: 36px;
      font-size: 16px;
      color: ${token.colorText};
    `,
  };
});

const UploadDock = memo(() => {
  const { styles, theme } = useStyles();
  const { t } = useTranslation('file');
  const [expand, setExpand] = useState(true);
  const [show, setShow] = useState(true);

  const dispatchDockFileList = useFileStore((s) => s.dispatchDockFileList);
  const totalUploadingProgress = useFileStore(fileManagerSelectors.overviewUploadingProgress);
  const fileList = useFileStore(fileManagerSelectors.dockFileList, isEqual);
  const overviewUploadingStatus = useFileStore(
    fileManagerSelectors.overviewUploadingStatus,
    isEqual,
  );
  const isUploading = overviewUploadingStatus === 'uploading';

  const icon = useMemo(() => {
    switch (overviewUploadingStatus) {
      case 'success': {
        return <CheckCircleFilled style={{ color: theme.colorsuccess }} />;
      }
      case 'error': {
        return <CloseCircleFilled style={{ color: theme.colorerror }} />;
      }

      default: {
        return <Icon icon={UploadIcon} />;
      }
    }
  }, [overviewUploadingStatus]);

  const count = fileList.length;

  useEffect(() => {
    if (show) return;
    if (isUploading) setShow(true);
  }, [isUploading, show]);

  if (count === 0 || !show) return;

  return (
    <Flexbox className={styles.container}>
      <Flexbox
        align={'center'}
        className={styles.header}
        horizontal
        justify={'space-between'}
        onClick={() => {
          setExpand(!expand);
        }}
        style={{
          borderBlockEnd: expand ? `1px solid ${theme.colorSplit}` : undefined,
          borderEndEndRadius: expand ? 0 : undefined,
          borderEndStartRadius: expand ? 0 : undefined,
        }}
      >
        <Flexbox align={'center'} className={styles.title} gap={16} horizontal>
          {icon}
          {t(`uploadDock.uploadStatus.${overviewUploadingStatus}`)} ·{' '}
          {t('uploadDock.totalCount', { count })}
        </Flexbox>
        {!isUploading && (
          <ActionIcon
            icon={XIcon}
            onClick={() => {
              setShow(false);
              dispatchDockFileList({ ids: fileList.map((item) => item.id), type: 'removeFiles' });
            }}
          />
        )}
      </Flexbox>

      {expand ? (
        <Flexbox className={styles.body} justify={'space-between'}>
          <Flexbox gap={8} paddingBlock={16} style={{ overflowY: 'scroll' }}>
            {fileList.map((item) => (
              <Item key={item.id} {...item} />
            ))}
          </Flexbox>
          <Center style={{ height: 40, minHeight: 40 }}>
            <Text
              onClick={() => {
                setExpand(false);
              }}
              style={{ cursor: 'pointer' }}
              type={'secondary'}
            >
              {t('uploadDock.body.collapse')}
            </Text>
          </Center>
        </Flexbox>
      ) : (
        overviewUploadingStatus !== 'pending' && (
          <div
            className={styles.progress}
            style={{
              borderColor:
                overviewuploadingstatus === 'success'
                  ? theme.colorsuccess
                  : overviewuploadingstatus === 'error'
                    ? theme.colorerror
                    : undefined,
              insetInlineEnd: `${100 - totaluploadingprogress}%`,
            }}
          />
        )
      )}
    </Flexbox>
  );
});

export default UploadDock;
