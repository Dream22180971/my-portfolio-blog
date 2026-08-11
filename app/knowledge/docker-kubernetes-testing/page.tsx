import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, GitBranch } from "lucide-react";
import { KnowledgeLayout, type SectionItem } from "@/components/KnowledgeLayout";
import { buildPageMetadata } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "Docker 与 Kubernetes 测试环境实战教程",
  description: "用容器化方式搭建可重复、可排障的测试环境：镜像与容器、docker-compose 编排、数据初始化、Kubernetes 临时环境与常见排障。",
  path: "/knowledge/docker-kubernetes-testing",
  tags: ["Docker", "Kubernetes", "测试环境", "docker-compose", "容器化"],
});

const sections: SectionItem[] = [
  { id: "why", label: "为什么需要容器" }, { id: "image", label: "镜像与容器基础" },
  { id: "compose", label: "docker-compose 编排" }, { id: "data", label: "数据初始化与清理" },
  { id: "run", label: "容器内执行测试" }, { id: "kubernetes", label: "Kubernetes 环境" },
  { id: "troubleshooting", label: "常见排障" }, { id: "practice", label: "练习与检查" },
];

const envRows = [
  ["环境一致性", "换一台机器就出现行为差异", "构建产物固定镜像，人人拿到相同环境"],
  ["启动速度", "手工安装数据库、配置依赖耗时以小时计", "一条 compose 命令秒级拉起整套服务"],
  ["服务隔离", "测试互相污染，数据残留", "独立容器、独立网络与端口，互不干扰"],
  ["与开发对齐", "测试依赖版本与开发环境漂移", "镜像同时承载运行时与依赖版本"],
  ["清理成本", "卸载残留、进程残留难查", "down 命令一键销毁容器、网络与卷"],
];
const fixRows = [
  ["端口冲突", "报错 address already in use", "docker ps 找占用容器，或换用 13306 之类映射端口"],
  ["容器间网络不通", "连接被拒绝", "容器内必须用服务名 mysql/redis，不要用 localhost"],
  ["数据库没就绪就执行测试", "pytest 连不上数据库", "配置 healthcheck 并用 depends_on 等待健康"],
  ["时间差 8 小时", "时间戳与预期不符", "给容器加 TZ=Asia/Shanghai 环境变量"],
  ["中文乱码", "写入的中文变成问号", "数据库建表指定 utf8mb4，容器设置 LANG 环境"],
];

export default function DockerKubernetesTestingPage() {
  return <div className="mx-auto max-w-5xl animate-fade-in">
      <Link href="/knowledge/tutorials?track=test-development" className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"><ArrowLeft className="h-4 w-4" />返回测试开发模块</Link>
    <KnowledgeLayout sections={sections} searchPlaceholder="搜索 Docker 与 Kubernetes 关键词...">
      <header className="mb-10">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">Test Development / Tutorial 12</div>
        <h1 className="mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-3xl font-bold text-transparent md:text-4xl">Docker 与 Kubernetes 测试环境实战教程</h1>
        <p className="mb-6 text-lg leading-8 text-text-secondary">把测试环境当作工程资产来管理：一键启动、随时排障、用完即毁。围绕「一键启动订单系统测试环境」学会容器化的完整套路。</p>
        <div className="flex flex-wrap gap-6 text-sm text-text-secondary"><span>8 个章节</span><span>订单系统测试环境案例</span><span>Docker + Kubernetes</span></div>
      </header>

      <section id="why" data-knowledge-section className="mb-14">
        <SectionHeader number="01" title="为什么测试需要容器" badge="可重复 · 可排障 · 可销毁" />
        <FlowFigure id="env-lifecycle" title="容器化测试环境的完整生命周期" items={[["构建镜像", "锁定运行环境"], ["一键拉起", "Compose 编排"], ["初始化数据", "SQL 脚本"], ["执行测试", "pytest 用例"], ["销毁清理", "down 清卷"]]} />
        <Card title="测试环境的三个工程目标"><BulletList items={["可重复：同一份镜像与脚本，在任何机器上得到相同结果。", "可排障：日志、健康状态、端口映射都可随时查看。", "可销毁：环境是临时的，删除后不留下任何残留。"]} /></Card>
        <TableCard title="传统环境 vs 容器环境" headers={["维度", "传统方式", "容器方式"]} rows={envRows} />
        <Callout>测试环境不是“搭一次用很久”的基础设施，而是每次执行都能重建的临时资源。判断标准很简单：删掉它，还能不能再花一分钟把它原样拉起来。</Callout>
      </section>

      <section id="image" data-knowledge-section className="mb-14">
        <SectionHeader number="02" title="镜像与容器基础" badge="一次构建，处处运行" />
        <Card title="三个核心概念"><BulletList items={["镜像：只读的模板，包含操作系统、运行时、依赖和应用代码。", "容器：镜像的运行实例，拥有独立的文件系统与网络。", "层：镜像由一层层增量文件组成，复用层让拉取与构建更快。"]} /></Card>
        <CodeBlock title="order-service/Dockerfile">{`FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`}</CodeBlock>
        <CodeBlock title="常用命令速查">{`docker build -t order-service:test .
docker run -d --name order-mysql -e MYSQL_ROOT_PASSWORD=test_root -p 13306:3306 mysql:8.0
docker ps -a
docker logs --tail=50 order-mysql
docker exec -it order-mysql bash`}</CodeBlock>
        <Callout>给镜像固定 tag（如 order-service:test），不要依赖 latest。latest 每次构建结果都可能不同，会直接破坏“可重复”这个目标。</Callout>
      </section>

      <section id="compose" data-knowledge-section className="mb-14">
        <SectionHeader number="03" title="用 docker-compose 编排测试环境" badge="一条命令拉起全家桶" />
        <CodeBlock title="docker-compose.yml">{`services:
  mysql:
    image: mysql:8.0
    container_name: order-mysql
    environment:
      MYSQL_ROOT_PASSWORD: test_root
      MYSQL_DATABASE: order_test
      MYSQL_USER: order
      MYSQL_PASSWORD: order_test
    ports:
      - "13306:3306"
    volumes:
      - ./init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-ptest_root"]
      interval: 5s
      timeout: 3s
      retries: 20

  redis:
    image: redis:7-alpine
    container_name: order-redis
    ports:
      - "16379:6379"

  order-service:
    build: ./order-service
    container_name: order-service
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_started
    environment:
      DB_HOST: mysql
      DB_PORT: "3306"
      DB_USER: order
      DB_PASSWORD: order_test
      REDIS_HOST: redis
    ports:
      - "18000:8000"

  order-tests:
    build: ./order-tests
    container_name: order-tests
    depends_on:
      order-service:
        condition: service_started
    environment:
      ORDER_API: http://order-service:8000
    volumes:
      - ./reports:/app/reports`}</CodeBlock>
        <Card title="这张编排表做了什么"><BulletList items={["MySQL 与 Redis 使用官方镜像，负责存储与缓存。", "order-service 是被测服务，通过服务名访问数据库和缓存。", "order-tests 挂载宿主机 reports 目录，让报告能落盘。", "健康检查保证 MySQL 就绪后被测服务才启动。"]} /></Card>
        <Callout>端口映射把容器端口暴露到宿主机：13306 是宿主机端口，3306 是容器内端口。测试代码在容器内一律使用服务名，只有宿主机工具才用映射端口。</Callout>
      </section>

      <section id="data" data-knowledge-section className="mb-14">
        <SectionHeader number="04" title="测试数据初始化与清理" badge="删掉才能重建" />
        <CodeBlock title="init/init.sql">{`CREATE TABLE IF NOT EXISTS orders (
  order_id VARCHAR(64) PRIMARY KEY,
  status VARCHAR(32) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at DATETIME NOT NULL
);

INSERT IGNORE INTO orders (order_id, status, amount, created_at)
VALUES ('SEED-0001', 'PENDING_PAYMENT', 99.90, NOW());`}</CodeBlock>
        <Card title="初始化脚本的约定"><BulletList items={["MySQL 镜像会在首次建库后自动执行 /docker-entrypoint-initdb.d 下的脚本。", "把 init 目录挂载到该路径，脚本随 compose 一起版本化管理。", "脚本必须幂等：重复执行不会报错、不会产生脏数据。", "只准备最小数据集，具体测试数据由用例自己创建。"]} /></Card>
        <CodeBlock title="测试后的清理策略">{`# 删除容器、网络与数据卷，环境完全归零
docker compose down -v

# 只想清数据、保留服务时，逐表清空
docker compose exec mysql mysql -uorder -porder_test order_test -e "SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE orders;"

# 重启一套全新环境
docker compose up -d`}</CodeBlock>
        <Callout>可重复的关键不在于“手动恢复现场”，而在于“销毁后原样重建”。down -v 删掉的卷会在下次 up 时由初始化脚本重新生成，这才是真正的干净状态。</Callout>
      </section>

      <section id="run" data-knowledge-section className="mb-14">
        <SectionHeader number="05" title="在容器里执行测试并收集结果" badge="退出码即结果" />
        <CodeBlock title="在容器内运行 pytest">{`# 用一次性容器执行测试，跑完自动删除
docker compose run --rm order-tests pytest -q

# 挂载 reports 目录，把 JUnit 与 HTML 报告输出到宿主机
docker compose run --rm -v ./reports:/app/reports order-tests pytest --junitxml=/app/reports/junit.xml --html=/app/reports/report.html`}</CodeBlock>
        <CodeBlock title="整套环境跑完自动退出">{`docker compose up --build --abort-on-container-exit --exit-code-from order-tests
echo "exit code: $?"`}</CodeBlock>
        <Card title="如何判定结果"><BulletList items={["pytest 通过时退出码为 0，失败时非 0。", "--exit-code-from 会把 order-tests 的退出码作为整条命令的退出码。", "CI 里直接以这条命令的退出码决定构建通过或失败。", "JUnit 报告让测试结果能进 CI 平台，HTML 报告方便人工查看。"]} /></Card>
        <Callout>让测试在容器里跑而不是在宿主机跑，意味着任何人只要执行同一条命令，就能拿到完全相同的用例集、依赖版本和初始数据。结果可信的前提是环境可重复。</Callout>
      </section>

      <section id="kubernetes" data-knowledge-section className="mb-14">
        <SectionHeader number="06" title="Kubernetes 临时测试环境" badge="命名空间即隔离边界" />
        <Card title="为什么测试环境要用 Kubernetes"><BulletList items={["命名空间把环境隔离成独立区域，删除命名空间即销毁全部资源。", "Pod 承载服务，Deployment 管理副本与重启，ConfigMap/Secret 存放配置。", "贴近生产调度方式，能发现只在多实例下出现的并发问题。", "临时环境用完即毁，不占用常驻资源。"]} /></Card>
        <CodeBlock title="order-test.yaml（命名空间 + 数据库）">{`apiVersion: v1
kind: Namespace
metadata:
  name: order-test
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-mysql
  namespace: order-test
spec:
  replicas: 1
  selector:
    matchLabels:
      app: order-mysql
  template:
    metadata:
      labels:
        app: order-mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          env:
            - name: MYSQL_ROOT_PASSWORD
              value: test_root
          ports:
            - containerPort: 3306`}</CodeBlock>
        <CodeBlock title="kubectl 常用命令">{`kubectl create namespace order-test
kubectl -n order-test apply -f order-test.yaml
kubectl -n order-test get pods -w
kubectl -n order-test logs deploy/order-mysql --tail=50
kubectl -n order-test describe pod order-mysql
kubectl -n order-test delete deployment order-mysql
kubectl delete namespace order-test`}</CodeBlock>
        <Callout>敏感配置放进 Secret 而不是明文写在 YAML 或环境变量里。临时环境创建快、销毁也快，但排障手段和正式环境完全一致，这正是“可排障”的来源。</Callout>
      </section>

      <section id="troubleshooting" data-knowledge-section className="mb-14">
        <SectionHeader number="07" title="常见排障手册" badge="先看状态再翻日志" />
        <TableCard title="症状与对策速查" headers={["症状", "典型报错", "对策"]} rows={fixRows} />
        <CodeBlock title="排障命令模板">{`docker ps -a
docker compose ps
docker compose logs --tail=50 mysql
docker port order-mysql
docker exec -it order-mysql mysqladmin ping -h localhost
docker exec -it order-service sh -c "curl http://mysql:3306"
docker stats`}</CodeBlock>
        <Card title="排障的顺序"><BulletList items={["先看健康状态：compose ps、kubectl get pods 确认服务是否 Running。", "再看日志：logs 是服务自己留下的证据，比猜测更可靠。", "再验证连通：从被测服务容器内部去访问依赖，而不是从宿主机访问。", "最后检查资源：docker stats 确认 CPU 与内存没有被限制拖垮。"]} /></Card>
        <Callout>容器环境最大的排障陷阱是用宿主机视角看问题：端口映射只对宿主机生效，容器之间永远走服务名。遇到连接失败，先进容器里用 curl 试一次。</Callout>
      </section>

      <section id="practice" data-knowledge-section className="mb-14">
        <SectionHeader number="08" title="练习与完成清单" badge="动手把环境跑起来" />
        <Card title="练习：一键启动订单系统测试环境"><BulletList ordered items={["用 docker build 构建 order-service 镜像，并用 docker images 确认 tag。", "编写 init/init.sql，挂载后首次启动自动建表并插入 SEED-0001 订单。", "用 docker compose config 校验编排文件语法是否正确。", "故意把宿主端口改成 13306，确认宿主机从 13306 可连接、容器内用 3306。", "在容器内运行 pytest 并故意制造一条失败用例，确认退出码非 0。", "执行 docker compose down -v 后再次 up，确认数据回到初始化状态。", "用 kubectl 创建命名空间 order-test 部署 MySQL，验证 Pod 状态 Running。", "执行 kubectl delete namespace order-test，确认资源全部消失。"]} /></Card>
        <div className="grid gap-4 md:grid-cols-3"><ChecklistCard title="可重复" items={["镜像版本固定", "初始化脚本幂等", "启动顺序有依赖", "一条命令拉起全套"]} /><ChecklistCard title="可排障" items={["日志可随时查看", "健康检查有状态", "退出码可判定结果", "端口映射清楚明确"]} /><ChecklistCard title="可销毁" items={["down -v 清理卷", "命名空间级隔离", "数据可原样重建", "宿主机零残留"]} /></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-space-border py-6"><p className="text-sm text-text-secondary">测试环境不是搭一次用很久的设施，而是可重复、可排障、可销毁的工程资产。</p><Link href="/knowledge/tutorials?track=test-development" className="inline-flex items-center gap-2 text-sm text-neon-cyan">返回测试开发模块 <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
    </KnowledgeLayout>
  </div>;
}

function SectionHeader({ number, title, badge }: { number: string; title: string; badge: string }) { return <div className="mb-5 flex items-center gap-3 border-b-2 border-space-border pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 font-mono text-xs text-neon-cyan">{number}</div><div className="flex flex-wrap items-center gap-3"><h2 className="text-xl font-bold text-text-primary">{title}</h2><span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">{badge}</span></div></div>; }
function Card({ title, children }: { title?: string; children: React.ReactNode }) { return <div className="card-glow mb-4 rounded-xl p-5 text-sm leading-7 text-text-secondary">{title && <h3 className="mb-3 text-base font-bold text-text-primary">{title}</h3>}{children}</div>; }
function BulletList({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) { const Tag = ordered ? "ol" : "ul"; return <Tag className={cn("mt-3 space-y-2 pl-5", ordered ? "list-decimal" : "list-disc")}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>; }
function TableCard({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly string[][] }) { return <Card title={title}><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-space-border">{headers.map((header) => <th key={header} className="bg-neon-cyan/5 px-4 py-3 text-left font-semibold text-text-primary">{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("-")} className="border-b border-space-border/50 last:border-b-0">{row.map((cell, index) => <td key={`${cell}-${index}`} className="px-4 py-2.5 text-xs leading-relaxed">{cell}</td>)}</tr>)}</tbody></table></div></Card>; }
function CodeBlock({ title, children }: { title: string; children: string }) { return <div className="knowledge-code-block mb-4 overflow-hidden rounded-xl border border-space-border"><div className="border-b border-space-border bg-space-card/50 px-4 py-2 text-[11px] uppercase tracking-wider text-text-secondary">{title}</div><pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className="text-neon-cyan/80">{children}</code></pre></div>; }
function Callout({ children }: { children: React.ReactNode }) { return <div className="mb-4 border-l-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-sm leading-7 text-text-secondary">{children}</div>; }
function FlowFigure({ id, title, items }: { id: string; title: string; items: readonly (readonly [string, string])[] }) { return <figure className="card-glow mb-4 rounded-xl p-5" aria-labelledby={id}><figcaption id={id} className="mb-5 text-sm font-bold text-text-primary">{title}</figcaption><div className={cn("grid gap-2 md:items-center", items.length === 3 ? "md:grid-cols-[1fr_auto_1fr_auto_1fr]" : "md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]")}>{items.map((item, index) => <div key={item[0]} className="contents"><div className="rounded-lg border border-space-border bg-space-card/50 p-4 text-center"><strong className="block text-sm text-text-primary">{item[0]}</strong><span className="mt-2 block text-xs text-text-secondary">{item[1]}</span></div>{index < items.length - 1 && <GitBranch className="mx-auto hidden h-4 w-4 text-neon-cyan md:block" />}</div>)}</div></figure>; }
function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) { return <Card title={title}><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-neon-cyan" /><span>{item}</span></li>)}</ul></Card>; }
