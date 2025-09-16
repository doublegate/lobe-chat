import { css, cx } from 'antd-style';

export const oneLineEllipsis = cx(css`
  overflow: hidden;
  display: box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  text-overflow: ellipsis;
`);
