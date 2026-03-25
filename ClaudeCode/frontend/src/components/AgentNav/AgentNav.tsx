import { useState } from 'react';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { AgentType } from '../../types/task';
import { useTaskStore } from '../../stores/taskStore';

const STEPS_MAP: Record<AgentType, { stepName: string; subAgentType: string }[]> = {
  clean_guardian: [
    { stepName: '查询范围确定', subAgentType: 'scope' },
    { stepName: '异常查找', subAgentType: 'scan' },
    { stepName: '异常结果', subAgentType: 'result' },
    { stepName: '智能派单', subAgentType: 'dispatch' },
    { stepName: '报告生成', subAgentType: 'report' },
  ],
  city_patrol: [
    { stepName: '查询范围确定', subAgentType: 'scope' },
    { stepName: '异常查找', subAgentType: 'scan' },
    { stepName: '异常结果', subAgentType: 'result' },
    { stepName: '智能派单', subAgentType: 'dispatch' },
    { stepName: '报告生成', subAgentType: 'report' },
  ],
  parking_watcher: [
    { stepName: '查询范围确定', subAgentType: 'scope' },
    { stepName: '异常查找', subAgentType: 'scan' },
    { stepName: '异常结果', subAgentType: 'result' },
    { stepName: '智能派单', subAgentType: 'dispatch' },
    { stepName: '报告生成', subAgentType: 'report' },
  ],
  data_reporter: [
    { stepName: '查询范围确定', subAgentType: 'scope' },
    { stepName: '数据检索', subAgentType: 'search' },
    { stepName: '报告生成', subAgentType: 'report' },
  ],
};

const AGENT_LABELS: Record<AgentType, string> = {
  clean_guardian: '市容环卫',
  city_patrol: '城市异常事件',
  parking_watcher: '车辆违停',
  data_reporter: '统计报告',
};

const MOCK_CONVERSATIONS = [
  { id: '1', title: '中山路市容巡查', time: '10分钟前', hasTask: true },
  { id: '2', title: '城南区异常事件排查', time: '1小时前', hasTask: true },
  { id: '3', title: '违停车辆处理记录', time: '昨天', hasTask: false },
  { id: '4', title: '3月份统计报告生成', time: '2天前', hasTask: true },
  { id: '5', title: '早高峰市容检查', time: '3天前', hasTask: false },
];

export default function AgentNav() {
  const createTask = useTaskStore(s => s.createTask);
  const [searchVal, setSearchVal] = useState('');
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  const handleAgentClick = (type: AgentType) => {
    createTask(type, `新${AGENT_LABELS[type]}任务`, STEPS_MAP[type]);
  };

  const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 8,
    padding: '0 4px',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: 0,
      background: '#0C0C16',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '18px 16px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #6366F1, #818CF8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
            <line x1="12" y1="2" x2="12" y2="5"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="5" y2="12"/>
            <line x1="19" y1="12" x2="22" y2="12"/>
          </svg>
        </div>
        <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: 14, flex: 1 }}>SeeTime Agent</span>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#475569',
          padding: 4,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      {/* New conversation button */}
      <div style={{ padding: '12px 12px 8px', flexShrink: 0 }}>
        <button
          style={{
            width: '100%',
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 10,
            padding: '9px 14px',
            color: '#818CF8',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'inherit',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.22)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.15)';
          }}
        >
          <PlusOutlined style={{ fontSize: 12 }} />
          新建对话
        </button>
      </div>

      {/* Agent shortcuts */}
      <div style={{ padding: '8px 12px', flexShrink: 0 }}>
        <div style={sectionLabel}>See 智能体</div>
        {(Object.keys(AGENT_LABELS) as AgentType[]).map(type => (
          <button
            key={type}
            style={{
              width: '100%',
              textAlign: 'left',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '7px 12px',
              color: '#94A3B8',
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              marginBottom: 4,
              fontFamily: 'inherit',
            }}
            onClick={() => handleAgentClick(type)}
            onMouseEnter={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = 'rgba(255,255,255,0.09)';
              btn.style.borderColor = 'rgba(99,102,241,0.4)';
              btn.style.color = '#CBD5E1';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = 'rgba(255,255,255,0.05)';
              btn.style.borderColor = 'rgba(255,255,255,0.08)';
              btn.style.color = '#94A3B8';
            }}
          >
            {AGENT_LABELS[type]}
          </button>
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 12px', flexShrink: 0 }} />

      {/* Tabs + list */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '8px 0 0' }}>

        {/* Custom tabs */}
        <div style={{ display: 'flex', gap: 0, padding: '0 12px 8px', flexShrink: 0 }}>
          {(['对话列表', '任务列表'] as const).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i as 0 | 1)}
              style={{
                flex: 1,
                background: activeTab === i ? 'rgba(255,255,255,0.07)' : 'transparent',
                border: 'none',
                borderRadius: 6,
                padding: '6px 8px',
                color: activeTab === i ? '#F1F5F9' : '#475569',
                fontSize: 12,
                fontWeight: activeTab === i ? 500 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s ease',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ padding: '0 12px 8px', flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8,
            padding: '6px 10px',
          }}>
            <SearchOutlined style={{ color: '#475569', fontSize: 12 }} />
            <input
              placeholder="搜索对话..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#F1F5F9',
                fontSize: 12,
                flex: 1,
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* Conversation list */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0 8px' }}>
          {MOCK_CONVERSATIONS.map(conv => (
            <div
              key={conv.id}
              style={{
                padding: '9px 10px',
                borderRadius: 8,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                marginBottom: 2,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: 13,
                  color: '#CBD5E1',
                  fontWeight: 400,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {conv.title}
                </span>
                {conv.hasTask && (
                  <span style={{
                    fontSize: 10,
                    background: 'rgba(99,102,241,0.2)',
                    color: '#818CF8',
                    borderRadius: 4,
                    padding: '1px 5px',
                    flexShrink: 0,
                    marginLeft: 6,
                  }}>
                    任务
                  </span>
                )}
              </div>
              <span style={{ fontSize: 11, color: '#475569' }}>{conv.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer user */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 600,
          color: 'white',
          flexShrink: 0,
        }}>
          张
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#CBD5E1', fontWeight: 500 }}>张**</div>
          <div style={{ fontSize: 11, color: '#475569' }}>指挥调度员</div>
        </div>
      </div>
    </div>
  );
}
