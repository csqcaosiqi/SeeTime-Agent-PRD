AGENT_TYPE_MAP = {
    "clean_guardian": ["垃圾", "环卫", "清洁", "市容"],
    "city_patrol": ["店外经营", "游商", "小贩", "乱停", "共享单车", "非机动车", "城市异常"],
    "parking_watcher": ["违停", "违章停车", "占道", "占用便道", "机动车"],
    "data_reporter": ["统计", "报告", "报表", "数据", "汇总", "提取", "最近"],
}

async def resolve_intent(user_input: str) -> dict:
    for agent_type, keywords in AGENT_TYPE_MAP.items():
        if any(kw in user_input for kw in keywords):
            return {"agent_type": agent_type, "description": user_input}
    return {"agent_type": "clean_guardian", "description": user_input}
