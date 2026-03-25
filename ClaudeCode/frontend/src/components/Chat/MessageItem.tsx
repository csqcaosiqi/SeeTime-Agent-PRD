import { useState } from 'react';
import type { ChatMessage } from '../../stores/chatStore';

interface Props { message: ChatMessage; }

export default function MessageItem({ message }: Props) {
  const [thinkingOpen, setThinkingOpen] = useState(false);

  if (message.role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12, padding: '0 16px' }}>
        <div style={{
          maxWidth: '75%',
          background: 'rgba(99,102,241,0.2)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '14px 14px 4px 14px',
          padding: '9px 14px',
          fontSize: 13,
          color: '#E0E0F0',
          lineHeight: 1.5,
        }}>
          {message.content}
        </div>
      </div>
    );
  }

  // Agent messages
  if (message.type === 'thinking') {
    return (
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{
          background: '#0F0F1A',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setThinkingOpen(o => !o)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              color: '#475569',
              fontFamily: 'inherit',
            }}
          >
            {/* Brain icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v1a3 3 0 0 1 3 3c0 1.5-1 2.8-2.4 3.3A4 4 0 0 1 12 17v5M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3c0 1.5 1 2.8 2.4 3.3A4 4 0 0 0 12 17"/>
            </svg>
            <span style={{ fontSize: 12, color: '#6366F1', fontWeight: 500 }}>Thinking</span>
            <span style={{ fontSize: 11, color: '#475569', flex: 1, textAlign: 'left', marginLeft: 4 }}>
              {thinkingOpen ? '点击收起' : '点击查看推理过程'}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transform: thinkingOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {thinkingOpen && (
            <div style={{
              padding: '8px 12px 12px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              fontSize: 12,
              color: '#475569',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}>
              {message.content}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (message.type === 'task_card') {
    let cardData: { agentLabel?: string; taskName?: string; stepName?: string; docName?: string } = {};
    try { cardData = JSON.parse(message.content ?? '{}'); } catch { cardData = {}; }
    return (
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{
          background: '#1C183A',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 12,
          padding: '12px 14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366F1' }} />
            <span style={{ fontSize: 12, color: '#818CF8', fontWeight: 600 }}>
              {cardData.agentLabel ?? '智能体'}
            </span>
            <span style={{ fontSize: 12, color: '#475569' }}>创建任务</span>
          </div>
          <div style={{ fontSize: 13, color: '#E0E0F0', fontWeight: 500, marginBottom: 4 }}>
            {cardData.taskName ?? '新任务'}
          </div>
          <div style={{ fontSize: 12, color: '#6366F1' }}>
            进入 {cardData.stepName ?? '步骤1'}
          </div>
          {cardData.docName && (
            <div style={{ marginTop: 8, fontSize: 11, color: '#818CF8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              {cardData.docName} ↗
            </div>
          )}
        </div>
      </div>
    );
  }

  if (message.type === 'skill_progress') {
    let progressData: { skillName?: string; progress?: number } = {};
    try { progressData = JSON.parse(message.content ?? '{}'); } catch { progressData = { skillName: message.content, progress: 100 }; }
    return (
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>
          执行进度 ({progressData.skillName ?? 'Skill'})
        </div>
        <div style={{
          height: 4,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progressData.progress ?? 100}%`,
            background: 'linear-gradient(90deg, #6366F1, #818CF8)',
            borderRadius: 2,
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>
    );
  }

  if (message.type === 'progress' && message.progress) {
    const pct = Math.round((message.progress.current / message.progress.total) * 100);
    return (
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 6 }}>{message.content}</div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #6366F1, #818CF8)',
            borderRadius: 2,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{ fontSize: 11, color: '#475569' }}>
          {message.progress.current}/{message.progress.total} · 已发现 {message.progress.found} 处疑似异常
        </div>
      </div>
    );
  }

  if (message.type === 'step_complete') {
    return (
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            fontSize: 11,
            color: '#22C55E',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 4,
            padding: '2px 7px',
          }}>
            步骤完成
          </div>
          <span style={{ fontSize: 13, color: '#CBD5E1' }}>{message.content}</span>
        </div>
      </div>
    );
  }

  if (message.type === 'error') {
    return (
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            fontSize: 11,
            color: '#EF4444',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 4,
            padding: '2px 7px',
          }}>
            异常
          </div>
          <span style={{ fontSize: 13, color: '#CBD5E1' }}>{message.content}</span>
        </div>
      </div>
    );
  }

  // Default text / conclusion
  return (
    <div style={{ padding: '0 16px', marginBottom: 8 }}>
      <div style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.6 }}>
        {message.content}
      </div>
    </div>
  );
}
