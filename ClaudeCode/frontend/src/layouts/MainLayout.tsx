import { Layout } from "antd";
import AgentNav from "../components/AgentNav/AgentNav";
import ChatPanel from "../components/Chat/ChatPanel";
import CanvasPanel from "../components/Canvas/CanvasPanel";

const { Sider, Content } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={240} theme="light" style={{ borderRight: "1px solid #f0f0f0" }}>
        <AgentNav />
      </Sider>
      <Layout>
        <Content style={{ display: "flex", height: "100%" }}>
          <div style={{ flex: "0 0 400px", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column" }}>
            <ChatPanel />
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <CanvasPanel />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
