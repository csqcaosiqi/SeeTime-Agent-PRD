import { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { useChatStore } from '../../stores/chatStore';
import MessageList from './MessageList';

export default function ChatPanel() {
  const activeTaskId = useTaskStore(s => s.activeTaskId);
  const addMessage = useChatStore(s => s.addMessage);
  const activeTask = useTaskStore(s => s.getActiveTask());
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || !activeTaskId) return;
    addMessage(activeTaskId, {
      taskId: activeTaskId,
      role: 'user',
      type: 'text',
      content: input.trim(),
    });
    const userMsg = input.trim();
    setInput('');
    // Mock AI response with thinking + task card structure
    setTimeout(() => {
      addMessage(activeTaskId, {
        taskId: activeTaskId,
        role: 'agent',
        type: 'thinking',
        content: `正在分析用户指令：${userMsg}\n识别任务类型为：${activeTask?.agentLabel ?? '巡查任务'}\n确认步骤编排，开始执行...`,
      });
    }, 400);
    setTimeout(() => {
      addMessage(activeTaskId, {
        taskId: activeTaskId,
        role: 'agent',
        type: 'text',
        content: `已收到指令，正在处理中...`,
      });
    }, 1200);
  };

  if (!activeTaskId) {
    // Welcome state
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        background: '#08080F',
      }}>
        <h2 style={{
          fontSize: 22,
          fontWeight: 600,
          color: '#F1F5F9',
          marginBottom: 8,
          textAlign: 'center',
        }}>
          你好，有哪些任务需要处理
        </h2>
        <p style={{
          fontSize: 13,
          color: '#475569',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          选择左侧 See 智能体开始，或直接描述你的任务
        </p>
        <div style={{ width: '100%', maxWidth: 480, position: 'relative' }}>
          <textarea
            placeholder="给我布置任务..."
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              padding: '14px 16px 48px 16px',
              color: '#F1F5F9',
              minHeight: 100,
              resize: 'none',
              fontFamily: 'inherit',
              fontSize: 14,
              outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          />
          <div style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>
              <span style={{
                fontSize: 11,
                color: '#6366F1',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: 20,
                padding: '2px 10px',
                cursor: 'pointer',
              }}>
                智能体矩阵
              </span>
            </div>
            <button style={{
              width: 28,
              height: 28,
              background: '#6366F1',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#08080F',
    }}>
      {/* Chat header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#22C55E',
          boxShadow: '0 0 6px rgba(34,197,94,0.6)',
        }} />
        <span style={{ fontSize: 13, fontWeight: 500, color: '#F1F5F9' }}>
          {activeTask?.agentLabel} — {activeTask?.description}
        </span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <MessageList />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: '#08080F',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 10,
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="输入指令..."
            rows={1}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#F1F5F9',
              fontSize: 13,
              fontFamily: 'inherit',
              resize: 'none',
              lineHeight: '20px',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              width: 30,
              height: 30,
              background: input.trim() ? '#6366F1' : 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: 8,
              cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
