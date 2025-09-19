import { RunCommandParams } from '@lobechat/electron-client-ipc';
import { Terminal } from '@xterm/xterm';
import { memo, useEffect, useRef } from 'react';

// CSS imports handled through dynamic loading to avoid Vercel build issues

import { LocalReadFileState } from '@/tools/local-system/type';
import { ChatMessagePluginError } from '@/types/message';

interface RunCommandProps {
  args: RunCommandParams;
  messageId: string;
  pluginError: ChatMessagePluginError;
  pluginState: LocalReadFileState;
}

const RunCommand = memo<RunCommandProps>(({ args }) => {
  const terminalRef = useRef(null);

  // Dynamically load xterm CSS to avoid Vercel build issues
  useEffect(() => {
    const loadXtermCSS = async () => {
      try {
        // @ts-ignore - CSS modules don't have type declarations
        await import('@xterm/xterm/css/xterm.css');
      } catch (error) {
        console.warn('Failed to load xterm CSS:', error);
      }
    };
    loadXtermCSS();
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({ cols: 80, cursorBlink: true, rows: 30 });

    term.open(terminalRef.current);
    term.write(args.command);

    return () => {
      term.dispose();
    };
  }, []);

  return <div ref={terminalRef} />;
});

export default RunCommand;
