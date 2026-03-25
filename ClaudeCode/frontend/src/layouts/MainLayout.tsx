import { useTaskStore } from '../stores/taskStore';
import AgentNav from '../components/AgentNav/AgentNav';
import ChatPanel from '../components/Chat/ChatPanel';
import CanvasPanel from '../components/Canvas/CanvasPanel';

export default function MainLayout() {
  const canvasVisible = useTaskStore(s => (s as any).canvasVisible ?? false);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--color-bg-base)',
      overflow: 'hidden',
    }}>
      {/* Left sidebar */}
      <div style={{
        width: 'var(--sidebar-width)',
        flexShrink: 0,
        background: 'var(--color-bg-sidebar)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}>
        <AgentNav />
      </div>

      {/* Chat panel - fixed width when canvas open, flex-1 when closed */}
      <div style={{
        width: canvasVisible ? 'var(--chat-width)' : undefined,
        flex: canvasVisible ? 'none' : '1',
        flexShrink: 0,
        borderRight: canvasVisible ? '1px solid var(--color-border)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        transition: 'width 0.25s ease-out',
      }}>
        <ChatPanel />
      </div>

      {/* Canvas panel - conditionally shown */}
      {canvasVisible && (
        <div
          className="canvas-slide-in"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            background: 'var(--color-bg-base)',
          }}
        >
          <CanvasPanel />
        </div>
      )}
    </div>
  );
}
