import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { cn } from "@/lib/cn";

type TableRow = readonly string[];

export const metadata = buildPageMetadata({
  title: "性能压测与性能分析实战手册",
  description: "面向 Web 接口、数据库、缓存、消息队列、微服务和云原生环境的性能测试实战参考，覆盖压测方案设计、工具选型、监控采集、瓶颈定位和测试报告输出。",
  path: "/knowledge/performance-testing-analysis",
  tags: ["性能测试", "压测", "性能分析", "k6", "JMeter", "Locust"],
});

const sections: SectionItem[] = [
  { id: "sec-overview", label: "测试概览" },
  { id: "sec-metrics", label: "核心指标" },
  { id: "sec-types", label: "测试类型" },
  { id: "sec-process", label: "测试流程" },
  { id: "sec-tools", label: "压测工具" },
  { id: "sec-http", label: "接口压测" },
  { id: "sec-database", label: "数据库缓存" },
  { id: "sec-monitoring", label: "监控采集" },
  { id: "sec-bottleneck", label: "瓶颈定位" },
  { id: "sec-scenarios", label: "实战场景" },
  { id: "sec-report", label: "报告模板" },
  { id: "sec-checklist", label: "检查清单" },
];

const scenarioRows: TableRow[] = [
  ["新系统上线前", "验证系统是否达到上线容量要求", "吞吐量、响应时间、错误率、资源水位"],
  ["大促或活动前", "评估高峰流量承载能力", "峰值 QPS、限流降级、缓存命中率"],
  ["架构改造后", "验证改造是否带来性能收益", "优化前后对比、资源成本变化"],
  ["故障复盘后", "复现瓶颈并验证修复效果", "瓶颈链路、容量边界、稳定性"],
  ["容量规划", "推算机器数量、连接池、队列长度", "单机能力、横向扩展效率、成本"],
];

const throughputRows: TableRow[] = [
  ["QPS", "Queries Per Second，每秒查询数", "常用于 HTTP 查询接口、搜索接口、读多写少场景"],
  ["TPS", "Transactions Per Second，每秒事务数", "常用于下单、支付、写入类业务事务"],
  ["RPS", "Requests Per Second，每秒请求数", "HTTP 压测工具常见输出指标"],
  ["吞吐量", "单位时间内系统处理的数据量或请求量", "可用请求数、字节数、消息数、订单数衡量"],
  ["并发数", "同一时间正在处理或保持连接的用户/请求数", "并发数不等于 QPS，需要结合响应时间理解"],
];

const latencyRows: TableRow[] = [
  ["Avg RT", "平均响应时间", "容易被极端值掩盖，只适合做粗略参考"],
  ["P50", "50% 请求的响应时间低于该值", "代表普通用户体验"],
  ["P90", "90% 请求的响应时间低于该值", "代表大多数用户体验"],
  ["P95", "95% 请求的响应时间低于该值", "接口性能验收常用指标"],
  ["P99", "99% 请求的响应时间低于该值", "用于观察长尾延迟和稳定性问题"],
  ["Max RT", "最大响应时间", "用于辅助判断异常请求，不应单独作为验收标准"],
];

const testTypeRows: TableRow[] = [
  ["基准测试", "获得系统在固定条件下的基础性能数据", "固定并发、固定数据集、固定环境，记录基线结果"],
  ["负载测试", "验证目标业务负载下系统是否稳定", "按预期流量模型逐步加压，观察 SLA 是否达标"],
  ["压力测试", "寻找系统极限和性能拐点", "持续增加并发或 QPS，直到错误率上升或响应时间恶化"],
  ["稳定性测试", "验证系统长时间运行是否可靠", "按中高负载持续运行 4 小时、8 小时、24 小时或更久"],
  ["容量测试", "评估当前配置可支撑的业务规模", "结合峰值流量、资源水位和扩容策略进行推算"],
  ["突刺测试", "验证瞬时流量冲击下的保护能力", "短时间内快速升高并发，观察限流、熔断、降级效果"],
];

const toolRows: TableRow[] = [
  ["ab", "快速验证单个 HTTP 接口", "简单、轻量、参数少", "临时测试可用"],
  ["wrk", "高并发 HTTP 压测", "性能强，支持 Lua 脚本", "推荐"],
  ["k6", "接口压测、CI 集成、脚本化场景", "JavaScript 编写脚本，结果清晰", "强烈推荐"],
  ["JMeter", "企业级复杂场景压测", "图形化、插件多、学习资料丰富", "推荐"],
  ["Locust", "Python 场景化用户行为压测", "代码表达能力强，适合复杂流程", "推荐"],
  ["hey", "轻量 HTTP 压测", "命令简单，输出直观", "临时测试推荐"],
  ["sysbench", "CPU、内存、磁盘、MySQL 基准测试", "适合系统与数据库基准评估", "推荐"],
  ["redis-benchmark", "Redis 性能测试", "Redis 官方自带工具", "推荐"],
  ["iperf3", "网络带宽与吞吐测试", "定位网络瓶颈常用", "推荐"],
];

const designRows: TableRow[] = [
  ["用户行为", "登录 1 次、查询商品 10 次、创建订单 1 次"],
  ["请求比例", "读接口 80%，写接口 20%"],
  ["数据分布", "热门商品 20% 承担 80% 请求"],
  ["思考时间", "用户两次操作之间等待 1 到 3 秒"],
  ["断言规则", "HTTP 200 且业务 code 为 0 才算成功"],
];

const linuxRows: TableRow[] = [
  ["top / htop", "查看 CPU、内存、进程", "top"],
  ["vmstat", "查看 CPU、内存、上下文切换", "vmstat 1"],
  ["iostat", "查看磁盘 IO", "iostat -x 1"],
  ["sar", "采集系统历史性能数据", "sar -u 1"],
  ["ss", "查看网络连接", "ss -s"],
  ["pidstat", "查看进程级 CPU、内存、IO", "pidstat -p <pid> 1"],
  ["free", "查看内存", "free -h"],
  ["dmesg", "查看内核与 OOM 信息", "dmesg -T | tail"],
];

const bottleneckRows: TableRow[] = [
  ["CPU 瓶颈", "CPU 长期高位，Load 升高", "火焰图、热点函数、线程状态", "减少计算、缓存结果、异步化、扩容"],
  ["内存瓶颈", "内存持续上涨，GC 频繁，OOM", "Heap Dump、对象分配、缓存大小", "修复泄漏、限制缓存、调整 GC"],
  ["数据库瓶颈", "慢 SQL 增多，连接池耗尽", "执行计划、索引、锁等待、事务", "建索引、改 SQL、分库分表、读写分离"],
  ["缓存瓶颈", "命中率下降，Redis CPU 高", "热 Key、大 Key、过期策略", "本地缓存、拆分 Key、限流、预热"],
  ["网络瓶颈", "延迟高、重传、连接失败", "带宽、连接数、丢包、DNS", "连接复用、压缩、就近访问、扩带宽"],
  ["线程池瓶颈", "请求排队，RT 增加，CPU 不高", "队列长度、活跃线程、拒绝策略", "调参、拆池、异步处理、限流"],
];

const reportRows: TableRow[] = [
  ["测试系统", "填写系统名称、版本、测试环境"],
  ["测试目标", "例如核心接口 P95 小于 500ms，错误率小于 1%"],
  ["测试结论", "通过 / 不通过 / 有条件通过"],
  ["最大稳定吞吐", "例如 800 QPS，P95 420ms，错误率 0.2%"],
  ["系统瓶颈", "例如数据库 CPU 高、订单表行锁等待明显"],
  ["优化建议", "例如补充索引、拆分热点数据、增加缓存预热"],
];

const resultRows: TableRow[] = [
  ["商品查询", "200 并发", "10 分钟", "99.9%", "180ms", "350ms", "1200", "通过"],
  ["创建订单", "100 并发", "10 分钟", "99.2%", "680ms", "1200ms", "300", "需优化"],
];

export default function PerformanceTestingAnalysisPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link
        href="/knowledge"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回手册列表
      </Link>

      <KnowledgeLayout sections={sections}>
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            性能压测与性能分析实战手册
          </h1>
          <p className="text-text-secondary text-lg mb-6">
            面向 Web 接口、数据库、缓存、消息队列、微服务和云原生环境的性能测试实战参考，覆盖压测方案设计、工具选型、脚本编写、监控采集、瓶颈定位、优化验证与测试报告输出。
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <span>12 章节</span>
            <span>9 类工具</span>
            <span>5 类实战场景</span>
            <span>报告模板</span>
          </div>
        </div>

        <section id="sec-overview" data-knowledge-section className="mb-14">
          <SectionHeader icon="📈" color="cyan" title="性能测试概览" badge="目标与适用场景" />
          <Card>
            <p className="mb-4 text-sm leading-7 text-text-secondary">
              性能测试不是简单地“把并发打上去”，而是通过可控的压力模型验证系统在不同负载下的响应能力、稳定性、资源消耗和容量边界。一次有效的性能测试，应该回答以下问题：
            </p>
            <BulletList items={[
              "系统在目标并发下是否能稳定提供服务？",
              "核心接口的平均响应时间、P95、P99 是否满足业务要求？",
              "系统最大吞吐量是多少？拐点在哪里？",
              "瓶颈出现在应用、数据库、缓存、网络、磁盘还是第三方服务？",
              "当前资源配置能支撑多少用户量、订单量或请求量？",
              "优化前后性能是否有可量化提升？",
            ]} />
          </Card>
          <TableCard title="性能测试适用场景" headers={["场景", "目标", "关注点"]} rows={scenarioRows} />
        </section>

        <section id="sec-metrics" data-knowledge-section className="mb-14">
          <SectionHeader icon="🎯" color="purple" title="核心性能指标" badge="QPS / P95 / 资源水位" />
          <TableCard title="请求与吞吐指标" headers={["指标", "含义", "说明"]} rows={throughputRows} />
          <TableCard title="响应时间指标" headers={["指标", "含义", "判断方式"]} rows={latencyRows} />
          <Card title="稳定性与资源指标">
            <BulletList items={[
              "错误率：HTTP 5xx、业务失败码、超时、连接失败占比。",
              "CPU 使用率：长期高于 80% 需要关注，长期 90% 以上通常存在风险。",
              "内存使用率：关注 RSS、Heap、缓存、Swap、OOM 风险。",
              "磁盘 IO：关注 IOPS、吞吐、await、util、日志写入压力。",
              "网络：关注带宽、连接数、TIME_WAIT、丢包、重传。",
              "数据库：关注慢 SQL、锁等待、连接数、Buffer 命中率、主从延迟。",
              "缓存：关注命中率、内存碎片、热 Key、大 Key、淘汰策略。",
            ]} />
          </Card>
        </section>

        <section id="sec-types" data-knowledge-section className="mb-14">
          <SectionHeader icon="🧪" color="green" title="常见测试类型" badge="基准 / 负载 / 压力 / 稳定性" />
          <TableCard headers={["类型", "目标", "典型做法"]} rows={testTypeRows} />
        </section>

        <section id="sec-process" data-knowledge-section className="mb-14">
          <SectionHeader icon="🧭" color="blue" title="标准测试流程" badge="从目标到复测" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card title="1. 明确测试目标">
              <BulletList items={[
                "目标接口或业务链路是什么？",
                "目标 QPS/TPS、并发数、响应时间是多少？",
                "允许的错误率是多少？",
                "测试环境是否等比例接近生产？",
                "本次测试是上线验收、瓶颈定位、容量评估还是优化对比？",
              ]} />
            </Card>
            <Card title="2. 准备测试环境">
              <BulletList items={[
                "确认测试环境配置：CPU、内存、磁盘、网络、容器限制。",
                "确认应用配置：线程池、连接池、JVM 参数、Node.js 进程数。",
                "确认数据库配置：最大连接数、索引、缓存、慢查询日志。",
                "确认中间件配置：Redis、MQ、Nginx、网关、限流规则。",
                "提前配置监控面板，避免压测后才发现没有数据。",
              ]} />
            </Card>
          </div>
          <TableCard title="场景设计要素" headers={["设计项", "示例"]} rows={designRows} />
          <Card title="3. 执行压测与复测">
            <BulletList ordered items={[
              "先用小流量进行脚本冒烟，确认请求成功、断言正确、数据可用。",
              "再进行阶梯加压，例如 50、100、200、500、1000 并发。",
              "每个压力档位保持足够时间，至少覆盖缓存预热、GC、连接池稳定过程。",
              "记录每个档位的 QPS、RT、错误率和资源水位。",
              "出现大量错误、资源打满或业务异常时，及时停止并保留现场。",
              "优化后使用同样脚本、数据、环境和压力模型复测，避免结论失真。",
            ]} />
          </Card>
        </section>

        <section id="sec-tools" data-knowledge-section className="mb-14">
          <SectionHeader icon="🛠" color="orange" title="常用压测工具" badge="ab / wrk / k6 / JMeter / Locust" />
          <TableCard headers={["工具", "适合场景", "特点", "推荐程度"]} rows={toolRows} />
          <div className="grid md:grid-cols-2 gap-4">
            <Card title="ab 快速压测">
              <CodeBlock title="bash">
{`# 1000 个请求，100 并发
ab -n 1000 -c 100 http://127.0.0.1:3000/api/products

# POST JSON 请求
ab -n 1000 -c 50 \
  -p body.json \
  -T "application/json" \
  http://127.0.0.1:3000/api/orders`}
              </CodeBlock>
            </Card>
            <Card title="wrk 高并发压测">
              <CodeBlock title="bash">
{`# 8 线程，200 连接，持续 60 秒
wrk -t8 -c200 -d60s http://127.0.0.1:3000/api/products

# 输出延迟分布
wrk -t8 -c200 -d60s --latency http://127.0.0.1:3000/api/products`}
              </CodeBlock>
            </Card>
          </div>
          <Card title="k6 阶梯加压脚本">
            <CodeBlock title="javascript">
{`import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "3m", target: 200 },
    { duration: "1m", target: 0 }
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"]
  }
};

export default function () {
  const res = http.get("https://example.com/api/products");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "body not empty": (r) => r.body.length > 0
  });

  sleep(1);
}`}
            </CodeBlock>
            <CodeBlock title="bash">{`k6 run load-test.js`}</CodeBlock>
          </Card>
        </section>

        <section id="sec-http" data-knowledge-section className="mb-14">
          <SectionHeader icon="🌐" color="cyan" title="HTTP 接口压测实战" badge="GET / POST / 登录态" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card title="GET 接口压测">
              <CodeBlock title="bash">
{`wrk -t4 -c100 -d60s --latency \
  "https://example.com/api/products?page=1&size=20"`}
              </CodeBlock>
            </Card>
            <Card title="POST JSON 接口压测">
              <CodeBlock title="javascript">
{`import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 100,
  duration: "2m",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<800"]
  }
};

export default function () {
  const payload = JSON.stringify({ productId: 1001, quantity: 1 });
  const params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer your-token"
    }
  };

  const res = http.post("https://example.com/api/orders", payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "business success": (r) => r.json("code") === 0
  });
}`}
              </CodeBlock>
            </Card>
          </div>
          <Card title="登录态压测注意事项">
            <p className="mb-4 text-sm leading-7 text-text-secondary">
              登录态压测不要让所有虚拟用户共用同一个账号，否则会引入锁、风控、Session 覆盖、缓存热点等干扰。建议准备账号池，并让每个虚拟用户使用独立账号或独立 Token。
            </p>
            <BulletList items={[
              "只校验 HTTP 200，不校验业务返回码，会掩盖真实失败。",
              "所有请求使用同一条测试数据，会导致缓存命中率虚高。",
              "没有设置超时时间，慢请求堆积后容易误判系统吞吐。",
              "压测机性能不足时，瓶颈可能出现在客户端而不是服务端。",
              "只压单接口，不压真实业务链路，结论通常偏乐观。",
            ]} />
          </Card>
        </section>

        <section id="sec-database" data-knowledge-section className="mb-14">
          <SectionHeader icon="🗄" color="purple" title="数据库与缓存压测" badge="MySQL / Redis" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card title="MySQL 基准测试">
              <CodeBlock title="bash">
{`# 准备测试数据
sysbench oltp_read_write \
  --mysql-host=127.0.0.1 \
  --mysql-port=3306 \
  --mysql-user=root \
  --mysql-password=your-password \
  --mysql-db=test \
  --tables=10 \
  --table-size=100000 \
  prepare

# 执行读写压测
sysbench oltp_read_write \
  --mysql-host=127.0.0.1 \
  --mysql-user=root \
  --mysql-password=your-password \
  --mysql-db=test \
  --tables=10 \
  --table-size=100000 \
  --threads=32 \
  --time=300 \
  run`}
              </CodeBlock>
            </Card>
            <Card title="Redis 压测">
              <CodeBlock title="bash">
{`# 100 并发，100000 请求，测试 set/get
redis-benchmark -h 127.0.0.1 -p 6379 -c 100 -n 100000 -t set,get

# 指定 value 大小
redis-benchmark -h 127.0.0.1 -p 6379 -c 100 -n 100000 -d 1024 -t get,set

# 测试 pipeline
redis-benchmark -h 127.0.0.1 -p 6379 -c 100 -n 100000 -P 16 -t get,set`}
              </CodeBlock>
            </Card>
          </div>
          <Card title="数据库压测关注点">
            <BulletList items={[
              "慢 SQL 数量是否增加，索引是否命中，是否出现全表扫描。",
              "连接池是否耗尽，是否存在连接泄漏。",
              "锁等待、死锁、事务耗时是否异常。",
              "Buffer Pool 命中率是否下降，主从复制延迟是否扩大。",
              "磁盘 IO 是否成为瓶颈。",
            ]} />
          </Card>
        </section>

        <section id="sec-monitoring" data-knowledge-section className="mb-14">
          <SectionHeader icon="📡" color="green" title="监控与数据采集" badge="主机 / 应用 / 数据库 / 链路" />
          <TableCard title="Linux 常用监控命令" headers={["命令", "用途", "示例"]} rows={linuxRows} codeColumn={2} />
          <Card title="压测期间建议采集的数据">
            <BulletList items={[
              "压测工具输出：QPS、P95、P99、错误率、请求总数。",
              "应用监控：接口耗时、错误日志、线程池、连接池、GC。",
              "主机监控：CPU、内存、磁盘 IO、网络连接。",
              "数据库监控：慢 SQL、连接数、锁等待、缓存命中率。",
              "缓存监控：命中率、内存使用、QPS、大 Key、热 Key。",
              "链路追踪：慢 Span、下游调用耗时、外部依赖耗时。",
            ]} />
          </Card>
          <Card title="Prometheus 常用观察指标">
            <CodeBlock title="promql">
{`# HTTP 请求 QPS
sum(rate(http_requests_total[1m])) by (path)

# HTTP P95 响应时间
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, path))

# HTTP 错误率
sum(rate(http_requests_total{status=~"5.."}[1m])) / sum(rate(http_requests_total[1m]))

# 容器 CPU 使用率
sum(rate(container_cpu_usage_seconds_total[1m])) by (pod)

# 容器内存使用
container_memory_working_set_bytes`}
            </CodeBlock>
          </Card>
        </section>

        <section id="sec-bottleneck" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔎" color="orange" title="性能瓶颈定位" badge="曲线解读与优化方向" />
          <Card title="瓶颈判断口诀">
            <BulletList items={[
              "QPS 上不去，CPU 打满：优先看应用计算、序列化、锁竞争、热点代码。",
              "QPS 上不去，CPU 不高：优先看 IO、数据库、外部依赖、连接池、锁等待。",
              "RT 升高，错误率不高：可能是排队、慢 SQL、GC、下游延迟。",
              "RT 升高，错误率升高：可能是资源耗尽、连接失败、超时、限流。",
              "平均响应时间正常，P99 很高：重点排查长尾请求、锁、GC、网络抖动。",
              "单机性能正常，集群性能不线性：关注负载均衡、共享资源、数据库瓶颈。",
            ]} />
          </Card>
          <TableCard title="常见瓶颈与处理方向" headers={["瓶颈类型", "表现", "排查方向", "优化方向"]} rows={bottleneckRows} />
          <Card title="压测曲线解读">
            <BulletList items={[
              "理想阶段：并发增加，QPS 线性增加，RT 稳定。",
              "临界阶段：QPS 增长变慢，RT 开始上升，资源接近高水位。",
              "拐点阶段：QPS 不再增长，RT 快速上升，错误率开始增加。",
              "崩溃阶段：大量超时或 5xx，服务不可用，资源耗尽或保护策略触发。",
            ]} />
            <p className="mt-4 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 p-4 text-sm leading-7 text-text-secondary">
              容量评估一般不要取系统极限值，而应取拐点之前的稳定区间，并预留安全水位。例如系统极限为 1000 QPS，建议线上容量按 600 到 700 QPS 规划，再配合限流、降级和扩容策略。
            </p>
          </Card>
        </section>

        <section id="sec-scenarios" data-knowledge-section className="mb-14">
          <SectionHeader icon="🏢" color="blue" title="企业实战场景" badge="从登录到微服务链路" />
          <div className="grid md:grid-cols-2 gap-4">
            <ScenarioCard title="登录接口压测" items={[
              "准备独立账号池，避免单账号锁定或风控。",
              "关注密码校验、Token 生成、Session 写入、Redis 访问。",
              "检查错误率中是否包含验证码、限流、账号锁定等业务失败。",
              "关注数据库用户表查询、登录日志写入、审计日志异步队列。",
            ]} />
            <ScenarioCard title="商品查询接口压测" items={[
              "区分热门商品、普通商品、无库存商品。",
              "关注缓存命中率、搜索服务耗时、数据库回源比例。",
              "避免所有请求命中同一个商品导致结果过于乐观。",
              "观察 P99 是否因缓存击穿或慢查询出现长尾。",
            ]} />
            <ScenarioCard title="下单链路压测" items={[
              "链路通常包含库存校验、价格计算、优惠券、订单写入、消息发送。",
              "必须设计测试数据清理策略，避免库存被打空后大量业务失败。",
              "关注数据库事务、行锁、唯一索引冲突、MQ 积压。",
              "压测后需要核对订单数据一致性。",
            ]} />
            <ScenarioCard title="消息队列消费能力测试" items={[
              "分别测试生产速度、消费速度和堆积恢复能力。",
              "关注消费者线程数、批量消费大小、失败重试、死信队列。",
              "记录堆积量从峰值恢复到正常水位所需时间。",
              "确认扩容消费者是否能线性提升消费能力。",
            ]} />
            <div className="md:col-span-2">
              <ScenarioCard title="微服务链路压测" items={[
                "关注网关、认证服务、业务服务、数据库、缓存、外部依赖的完整链路。",
                "必须开启链路追踪，否则很难定位慢点。",
                "检查超时配置是否逐层递减，避免请求长时间占用资源。",
                "验证限流、熔断、降级是否符合预期。",
              ]} />
            </div>
          </div>
        </section>

        <section id="sec-report" data-knowledge-section className="mb-14">
          <SectionHeader icon="📝" color="purple" title="性能测试报告模板" badge="结论 / 环境 / 场景 / 建议" />
          <TableCard title="测试结论" headers={["项目", "填写说明"]} rows={reportRows} />
          <Card title="环境信息">
            <BulletList items={[
              "应用版本、Git Commit、配置文件版本。",
              "服务器规格：CPU、内存、磁盘、网络。",
              "部署方式：物理机、虚拟机、Docker、Kubernetes。",
              "数据库与中间件版本、规格和参数。",
              "压测机规格、网络位置、压测工具版本。",
            ]} />
          </Card>
          <TableCard
            title="测试场景记录"
            headers={["场景", "并发/速率", "持续时间", "成功率", "P95", "P99", "QPS/TPS", "结论"]}
            rows={resultRows}
          />
        </section>

        <section id="sec-checklist" data-knowledge-section className="mb-14">
          <SectionHeader icon="✅" color="green" title="压测检查清单" badge="压测前 / 中 / 后" />
          <div className="grid md:grid-cols-3 gap-4">
            <Card title="压测前">
              <BulletList items={[
                "已明确测试目标、验收标准和停止条件。",
                "已确认压测范围，不会误压生产或第三方服务。",
                "已准备独立测试数据、账号池和清理方案。",
                "已配置应用、主机、数据库、缓存、链路追踪监控。",
                "已完成小流量冒烟，确认脚本和断言正确。",
                "已通知相关团队，避免误报故障。",
              ]} />
            </Card>
            <Card title="压测中">
              <BulletList items={[
                "逐步加压，不直接打满系统。",
                "实时观察错误率、P95、P99 和资源水位。",
                "发现异常及时记录时间点、压力档位和监控截图。",
                "触发停止条件时立即停止压测。",
                "不要在同一轮压测中频繁修改配置，否则结果不可对比。",
              ]} />
            </Card>
            <Card title="压测后">
              <BulletList items={[
                "导出压测结果、监控数据、日志和链路追踪。",
                "清理测试数据，恢复环境配置。",
                "整理瓶颈结论和优化建议。",
                "优化后使用相同模型复测。",
                "沉淀容量基线，为后续上线和扩容提供依据。",
              ]} />
            </Card>
          </div>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

function SectionHeader({ icon, color, title, badge }: { icon: string; color: string; title: string; badge?: string }) {
  const colorMap: Record<string, string> = {
    cyan: "bg-neon-cyan/10",
    blue: "bg-neon-cyan/10",
    purple: "bg-neon-purple/10",
    orange: "bg-[rgba(255,171,64,0.12)]",
    green: "bg-neon-green/10",
  };

  return (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-space-border">
      <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg", colorMap[color] || colorMap.cyan)}>
        {icon}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan font-medium">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="card-glow rounded-xl p-5 mb-4">
      {title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}
      {children}
    </div>
  );
}

function TableCard({
  title,
  headers,
  rows,
  codeColumn,
}: {
  title?: string;
  headers: readonly string[];
  rows: readonly TableRow[];
  codeColumn?: number;
}) {
  return (
    <Card title={title}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-space-border">
              {headers.map((header) => (
                <th key={header} className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-space-border/50 last:border-b-0 hover:bg-neon-cyan/[0.02]">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-2.5 text-text-secondary text-xs leading-relaxed">
                    {cellIndex === codeColumn ? <code>{cell}</code> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function BulletList({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className={cn("space-y-2 pl-5 text-sm leading-7 text-text-secondary", ordered ? "list-decimal" : "list-disc")}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ListTag>
  );
}

function ScenarioCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <Card title={title}>
      <BulletList items={items} />
    </Card>
  );
}

function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="knowledge-code-block rounded-xl overflow-hidden border border-space-border mb-4 last:mb-0">
      <div className="px-4 py-2 border-b border-space-border bg-space-card/50">
        <span className="text-[11px] text-text-secondary uppercase tracking-wider">{title}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        <code className="text-neon-cyan/80">{children}</code>
      </pre>
    </div>
  );
}
