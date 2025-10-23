import { MessageRoleType } from '@/types/message';

import { RenderAction } from '../types';
import { AssistantActionsBar } from './Assistant';
import { DefaultActionsBar } from './Fallback';
import { ToolActionsBar } from './Tool';
import { UserActionsBar } from './User';

export const renderActions: Record<MessageRoleType, RenderAction> = {
  assistant: AssistantActionsBar,
  supervisor: DefaultActionsBar,
  system: DefaultActionsBar,
  tool: ToolActionsBar,
  user: UserActionsBar,
};
