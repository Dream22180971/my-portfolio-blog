import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import { KnowledgeLayout } from "@/components/KnowledgeLayout";
import type { SectionItem } from "@/components/KnowledgeLayout";

export const metadata = buildPageMetadata({
  title: "企业级数据库命令手册 — 5大数据库 350+ 命令",
  description: "MySQL/PostgreSQL/Redis/MongoDB/Elasticsearch 企业级命令一站式参考，覆盖连接管理、CRUD、索引优化、备份恢复、高可用、性能调优等场景",
  path: "/knowledge/database-commands",
  tags: ["MySQL", "PostgreSQL", "Redis", "MongoDB", "Elasticsearch", "数据库"],
});

const sections: SectionItem[] = [
  { id: "sec-mysql", label: "MySQL" },
  { id: "sec-mysql-ddl", label: "MySQL DDL" },
  { id: "sec-mysql-dml", label: "MySQL DML" },
  { id: "sec-mysql-index", label: "MySQL 索引" },
  { id: "sec-mysql-admin", label: "MySQL 管理" },
  { id: "sec-pg", label: "PostgreSQL" },
  { id: "sec-pg-adv", label: "PG 高级特性" },
  { id: "sec-pg-admin", label: "PG 管理" },
  { id: "sec-redis", label: "Redis" },
  { id: "sec-redis-data", label: "Redis 数据类型" },
  { id: "sec-redis-cluster", label: "Redis 集群" },
  { id: "sec-mongo", label: "MongoDB" },
  { id: "sec-mongo-agg", label: "MongoDB 聚合" },
  { id: "sec-mongo-admin", label: "MongoDB 管理" },
  { id: "sec-es", label: "Elasticsearch" },
  { id: "sec-es-search", label: "ES 搜索" },
  { id: "sec-es-admin", label: "ES 管理" },
  { id: "sec-backup", label: "备份恢复" },
  { id: "sec-perf", label: "性能调优" },
  { id: "sec-troubleshoot", label: "故障排查" },
];

/* ─── helper components ─── */

function SectionHeader({
  icon,
  color,
  title,
}: {
  icon: string;
  color: string;
  title: string;
}) {
  const colorMap: Record<string, string> = {
    cyan: "from-neon-cyan to-neon-cyan/60",
    purple: "from-neon-purple to-neon-purple/60",
    green: "from-neon-green to-neon-green/60",
    yellow: "from-neon-yellow to-neon-yellow/60",
    red: "from-neon-red to-neon-red/60",
  };
  return (
    <h2 className="flex items-center gap-3 text-xl font-bold mb-5">
      <span
        className={`bg-gradient-to-r ${colorMap[color] || colorMap.cyan} bg-clip-text text-transparent`}
      >
        {icon}
      </span>
      <span className="text-text-primary">{title}</span>
    </h2>
  );
}

function Card({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-glow rounded-xl p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function CodeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="knowledge-code-block rounded-lg border border-space-border overflow-hidden">
      <div className="px-4 py-2 border-b border-space-border bg-space-card/50">
        <span className="text-xs text-text-muted font-mono">{title}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-text-secondary font-mono whitespace-pre cursor-pointer hover:text-neon-cyan transition-colors">
          {children}
        </code>
      </pre>
    </div>
  );
}

function CmdList({ items }: { items: [string, string][] }) {
  return (
    <div className="space-y-2">
      {items.map(([cmd, desc], i) => (
        <div key={i} className="flex items-start gap-3 text-sm">
          <code className="shrink-0 font-mono text-neon-cyan bg-neon-cyan/5 px-2 py-0.5 rounded">
            {cmd}
          </code>
          <span className="text-text-secondary">{desc}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ─── */

export default function DatabaseCommandsPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link
        href="/knowledge"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回知识库
      </Link>

      <KnowledgeLayout sections={sections}>
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            企业级数据库命令手册
          </h1>
          <p className="text-text-secondary text-lg mb-6">
            MySQL / PostgreSQL / Redis / MongoDB / Elasticsearch — 连接管理、CRUD、索引优化、备份恢复、高可用、性能调优一站式参考
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <span>20 章节</span>
            <span>350+ 命令</span>
            <span>5 大数据库</span>
            <span>15 企业场景</span>
          </div>
        </div>

        {/* ================================================================
            MySQL
        ================================================================ */}
        <section id="sec-mysql" data-knowledge-section className="mb-14">
          <SectionHeader icon="🐬" color="cyan" title="MySQL / MariaDB — 连接与基础" />
          <Card title="连接与认证">
            <CodeBlock title="bash">
{`# 命令行连接
mysql -u root -p                              # 交互式登录
mysql -u admin -p -h 192.168.1.100 -P 3306    # 指定主机端口
mysql -u root -p -D mydb                       # 直接进入指定库
mysql -u root -p --ssl-mode=REQUIRED           # 强制 SSL 连接

# 连接信息
STATUS                                         # 查看当前连接详情
SELECT VERSION();                              # 服务器版本
SELECT USER();                                 # 当前用户
SELECT DATABASE();                             # 当前数据库
SHOW PROCESSLIST;                              # 当前所有连接
SHOW FULL PROCESSLIST;                         # 含 SQL 文本的完整列表`}
            </CodeBlock>
          </Card>
          <Card title="服务器管理">
            <CodeBlock title="bash">
{`# 服务控制（systemd）
systemctl start mysqld                         # 启动
systemctl stop mysqld                          # 停止
systemctl restart mysqld                       # 重启
systemctl status mysqld                        # 状态
systemctl enable mysqld                        # 开机自启

# 配置文件位置
cat /etc/my.cnf                                # CentOS 主配置
cat /etc/mysql/my.cnf                          # Ubuntu 主配置
cat /etc/mysql/mysql.conf.d/mysqld.cnf         # Ubuntu 服务配置

# 安全初始化（首次安装后必跑）
mysql_secure_installation`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── MySQL DDL ── */}
        <section id="sec-mysql-ddl" data-knowledge-section className="mb-14">
          <SectionHeader icon="📐" color="purple" title="MySQL — DDL 数据定义" />
          <Card title="数据库操作">
            <CodeBlock title="sql">
{`-- 创建数据库
CREATE DATABASE mydb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 查看数据库
SHOW DATABASES;
SHOW CREATE DATABASE mydb;

-- 选择 / 删除
USE mydb;
DROP DATABASE IF EXISTS mydb;

-- 修改字符集
ALTER DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`}
            </CodeBlock>
          </Card>
          <Card title="表操作">
            <CodeBlock title="sql">
{`-- 建表（企业级模板）
CREATE TABLE users (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username    VARCHAR(64)  NOT NULL UNIQUE,
  email       VARCHAR(128) NOT NULL UNIQUE,
  password    CHAR(60)     NOT NULL COMMENT 'bcrypt hash',
  status      TINYINT      NOT NULL DEFAULT 1 COMMENT '0=禁用 1=正常',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at  DATETIME     DEFAULT NULL,
  INDEX idx_email (email),
  INDEX idx_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='用户表';

-- 查看表
SHOW TABLES;
SHOW CREATE TABLE users;
DESC users;                                     -- 列信息
SHOW COLUMNS FROM users FROM mydb;              -- 指定库

-- 修改表
ALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER email;
ALTER TABLE users MODIFY COLUMN username VARCHAR(128) NOT NULL;
ALTER TABLE users DROP COLUMN phone;
ALTER TABLE users RENAME COLUMN username TO user_name;
ALTER TABLE users ADD INDEX idx_phone (phone);
ALTER TABLE users DROP INDEX idx_phone;
ALTER TABLE users ENGINE=InnoDB;

-- 截断 / 删除
TRUNCATE TABLE users;                           -- 清空（不可回滚）
DROP TABLE IF EXISTS users;`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── MySQL DML ── */}
        <section id="sec-mysql-dml" data-knowledge-section className="mb-14">
          <SectionHeader icon="✏️" color="green" title="MySQL — DML 数据操作" />
          <Card title="CRUD 操作">
            <CodeBlock title="sql">
{`-- 插入
INSERT INTO users (username, email, password)
VALUES ('alice', 'alice@example.com', '$2a$10$...');

-- 批量插入（性能提升 5-10 倍）
INSERT INTO users (username, email, password) VALUES
  ('bob',   'bob@example.com',   '$2a$10$...'),
  ('carol', 'carol@example.com', '$2a$10$...');

-- UPSERT（存在则更新，不存在则插入）
INSERT INTO users (username, email, password)
VALUES ('alice', 'alice@example.com', '$2a$10$...')
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- 查询
SELECT * FROM users WHERE status = 1 ORDER BY created_at DESC LIMIT 10;
SELECT username, COUNT(*) as cnt FROM users GROUP BY username HAVING cnt > 1;

-- 更新
UPDATE users SET status = 0, updated_at = NOW() WHERE id = 100;

-- 删除（软删除优先）
UPDATE users SET deleted_at = NOW() WHERE id = 100;
-- 硬删除
DELETE FROM users WHERE id = 100;`}
            </CodeBlock>
          </Card>
          <Card title="事务与锁">
            <CodeBlock title="sql">
{`-- 事务控制
START TRANSACTION;                              -- 或 BEGIN
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;                                         -- 提交
-- ROLLBACK;                                    -- 回滚

-- 保存点
SAVEPOINT sp1;
DELETE FROM temp WHERE id = 1;
ROLLBACK TO sp1;                                -- 回滚到保存点

-- 自动提交控制
SET autocommit = 0;                             -- 关闭自动提交
SET autocommit = 1;                             -- 恢复

-- 查看锁
SHOW ENGINE INNODB STATUS\G                     -- InnoDB 引擎状态
SELECT * FROM information_schema.INNODB_LOCKS;   -- 当前锁（MySQL 5.7）
SELECT * FROM performance_schema.data_locks;    -- 当前锁（MySQL 8.0+）
SHOW OPEN TABLES WHERE In_use > 0;              -- 正在使用的表`}
            </CodeBlock>
          </Card>
          <Card title="JSON 字段操作（MySQL 5.7+/8.0+）">
            <CodeBlock title="sql">
{`-- 创建含 JSON 字段的表
CREATE TABLE events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  payload JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 插入 JSON
INSERT INTO events (payload) VALUES ('{"type":"click","x":100,"y":200}');

-- 查询 JSON 字段
SELECT payload->>'$.type' AS event_type FROM events;
SELECT * FROM events WHERE JSON_EXTRACT(payload, '$.type') = 'click';

-- 更新 JSON 字段
UPDATE events SET payload = JSON_SET(payload, '$.x', 150) WHERE id = 1;
UPDATE events SET payload = JSON_REMOVE(payload, '$.y') WHERE id = 1;

-- JSON 聚合
SELECT JSON_ARRAYAGG(payload->>'$.type') FROM events;`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── MySQL Index ── */}
        <section id="sec-mysql-index" data-knowledge-section className="mb-14">
          <SectionHeader icon="⚡" color="yellow" title="MySQL — 索引与查询优化" />
          <Card title="索引类型与创建">
            <CodeBlock title="sql">
{`-- B-Tree 索引（最常用）
CREATE INDEX idx_email ON users (email);
CREATE INDEX idx_status_created ON users (status, created_at);

-- 唯一索引
CREATE UNIQUE INDEX idx_username ON users (username);

-- 前缀索引（长字符串优化）
CREATE INDEX idx_email_prefix ON users (email(20));

-- 全文索引
ALTER TABLE articles ADD FULLTEXT INDEX ft_content (title, content);
SELECT * FROM articles WHERE MATCH(title, content) AGAINST('keyword' IN BOOLEAN MODE);

-- 空间索引（GIS 数据）
CREATE SPATIAL INDEX idx_location ON places (location);

-- 联合索引最左前缀原则
-- idx(a, b, c) 可用于 WHERE a=1 / WHERE a=1 AND b=2 / WHERE a=1 AND b=2 AND c=3
-- 不能用于 WHERE b=2 或 WHERE b=2 AND c=3`}
            </CodeBlock>
          </Card>
          <Card title="查询分析 EXPLAIN">
            <CodeBlock title="sql">
{`-- 基本分析
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- 详细分析（含实际执行统计）
EXPLAIN ANALYZE SELECT * FROM users WHERE status = 1;

-- 格式化输出
EXPLAIN FORMAT=JSON SELECT * FROM users WHERE status = 1;
EXPLAIN FORMAT=TREE SELECT * FROM users WHERE status = 1;

-- 关键字段解读
-- type: system > const > eq_ref > ref > range > index > ALL（越左越好）
-- rows: 预估扫描行数（越小越好）
-- Extra: Using index(覆盖索引) | Using filesort(需优化) | Using temporary(需优化)

-- 慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;                 -- 超过 1 秒记录
SHOW VARIABLES LIKE 'slow_query_log_file';      -- 日志路径`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── MySQL Admin ── */}
        <section id="sec-mysql-admin" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔧" color="red" title="MySQL — 用户与安全管理" />
          <Card title="用户与权限">
            <CodeBlock title="sql">
{`-- 创建用户
CREATE USER 'app_user'@'192.168.1.%' IDENTIFIED BY 'StrongP@ss123!';
CREATE USER 'readonly'@'%' IDENTIFIED BY 'ReadP@ss!' WITH MAX_CONNECTIONS_PER_HOUR 100;

-- 授权
GRANT SELECT, INSERT, UPDATE ON mydb.* TO 'app_user'@'192.168.1.%';
GRANT ALL PRIVILEGES ON mydb.* TO 'admin'@'localhost' WITH GRANT OPTION;
GRANT SELECT ON mydb.users TO 'readonly'@'%';

-- 撤销权限
REVOKE INSERT ON mydb.* FROM 'app_user'@'192.168.1.%';

-- 刷新权限
FLUSH PRIVILEGES;

-- 查看权限
SHOW GRANTS FOR 'app_user'@'192.168.1.%';

-- 修改密码
ALTER USER 'app_user'@'192.168.1.%' IDENTIFIED BY 'NewP@ss456!';

-- 删除用户
DROP USER 'app_user'@'192.168.1.%';`}
            </CodeBlock>
          </Card>
          <Card title="备份与恢复（mysqldump）">
            <CodeBlock title="bash">
{`# 备份单库
mysqldump -u root -p mydb > mydb_backup.sql

# 备份所有库
mysqldump -u root -p --all-databases > all_backup.sql

# 备份指定表
mysqldump -u root -p mydb users orders > tables_backup.sql

# 只导出结构
mysqldump -u root -p --no-data mydb > schema_only.sql

# 只导出数据
mysqldump -u root -p --no-create-info mydb > data_only.sql

# 带时间戳备份
mysqldump -u root -p mydb | gzip > "mydb_$(date +%Y%m%d_%H%M%S).sql.gz"

# 恢复
mysql -u root -p mydb < mydb_backup.sql

# 从 gzip 恢复
gunzip < mydb_backup.sql.gz | mysql -u root -p mydb

# xtrabackup（企业级热备份）
xtrabackup --backup --target-dir=/backup/full -u root -p
xtrabackup --prepare --target-dir=/backup/full
xtrabackup --copy-back --target-dir=/backup/full`}
            </CodeBlock>
          </Card>
          <Card title="主从复制">
            <CodeBlock title="sql">
{`-- === 主库配置 ===
-- /etc/my.cnf
-- server-id=1
-- log-bin=mysql-bin
-- binlog-format=ROW
-- binlog-do-db=mydb

-- 创建复制用户
CREATE USER 'repl'@'192.168.1.%' IDENTIFIED BY 'ReplP@ss!';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'192.168.1.%';

-- 查看主库状态
SHOW MASTER STATUS;                              -- 记录 File 和 Position

-- === 从库配置 ===
-- /etc/my.cnf
-- server-id=2
-- relay-log=relay-bin
-- read-only=1

-- 配置从库指向主库（MySQL 8.0+）
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='192.168.1.100',
  SOURCE_USER='repl',
  SOURCE_PASSWORD='ReplP@ss!',
  SOURCE_LOG_FILE='mysql-bin.000001',
  SOURCE_LOG_POS=154;

-- 启动复制
START REPLICA;

-- 检查状态
SHOW REPLICA STATUS\G
-- 关键字段：Replica_IO_Running=Yes, Replica_SQL_Running=Yes`}
            </CodeBlock>
          </Card>
        </section>

        {/* ================================================================
            PostgreSQL
        ================================================================ */}
        <section id="sec-pg" data-knowledge-section className="mb-14">
          <SectionHeader icon="🐘" color="purple" title="PostgreSQL — 连接与基础" />
          <Card title="连接与认证">
            <CodeBlock title="bash">
{`# 命令行连接
psql -U postgres                                 # 超级用户
psql -U admin -d mydb -h 192.168.1.100 -p 5432  # 指定主机端口
psql "postgresql://admin:pass@host:5432/mydb"    # URI 格式

# psql 内置命令
\\l                       # 列出所有数据库
\\c mydb                  # 切换数据库
\\dt                      # 列出当前 schema 所有表
\\dt *.*                  # 列出所有 schema 的表
\\d users                 # 表结构详情
\\di                      # 列出索引
\\du                      # 列出所有用户/角色
\\dn                      # 列出所有 schema
\\! ls                    # 执行 shell 命令
\\q                       # 退出

# 连接信息
SELECT version();                              -- 服务器版本
SELECT current_user;                            -- 当前用户
SELECT current_database();                      -- 当前数据库
SELECT inet_server_addr();                      -- 服务器 IP`}
            </CodeBlock>
          </Card>
          <Card title="数据库与 Schema 操作">
            <CodeBlock title="sql">
{`-- 创建数据库
CREATE DATABASE mydb
  WITH ENCODING 'UTF8'
  LC_COLLATE = 'zh_CN.UTF-8'
  LC_CTYPE = 'zh_CN.UTF-8'
  TEMPLATE template0;

-- 创建 Schema（多租户隔离）
CREATE SCHEMA tenant_a;
CREATE SCHEMA tenant_b;

-- 设置搜索路径
SET search_path TO tenant_a, public;

-- 查看当前 Schema
SHOW search_path;

-- 删除 Schema（级联删除内部所有对象）
DROP SCHEMA IF EXISTS tenant_a CASCADE;

-- 重命名
ALTER DATABASE mydb RENAME TO mydb_v2;`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── PG Advanced ── */}
        <section id="sec-pg-adv" data-knowledge-section className="mb-14">
          <SectionHeader icon="🧬" color="green" title="PostgreSQL — 高级特性" />
          <Card title="高级数据类型">
            <CodeBlock title="sql">
{`-- JSONB（推荐，二进制存储 + 索引支持）
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- JSONB 查询
SELECT payload->>'type' AS event_type FROM events;
SELECT * FROM events WHERE payload @> '{"type": "click"}';
SELECT * FROM events WHERE payload->>'type' = 'click';

-- JSONB 索引
CREATE INDEX idx_payload ON events USING GIN (payload);

-- 数组类型
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name TEXT,
  labels TEXT[] NOT NULL DEFAULT '{}'
);
SELECT * FROM tags WHERE 'urgent' = ANY(labels);
SELECT * FROM tags WHERE labels @> ARRAY['urgent'];

-- 范围类型（日期范围、数值范围）
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  room_id INT,
  during TSTZRANGE NOT NULL,
  EXCLUDE USING GIST (room_id WITH =, during WITH &&)  -- 防止重叠
);

-- hstore（键值对）
CREATE EXTENSION IF NOT EXISTS hstore;
SELECT hstore('key1', 'value1') || hstore('key2', 'value2');`}
            </CodeBlock>
          </Card>
          <Card title="窗口函数与 CTE">
            <CodeBlock title="sql">
{`-- 窗口函数
SELECT
  department,
  name,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
  SUM(salary) OVER (PARTITION BY department) AS dept_total,
  salary - LAG(salary) OVER (ORDER BY salary) AS diff_prev,
  AVG(salary) OVER (ORDER BY created_at ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg
FROM employees;

-- CTE（公共表表达式）
WITH RECURSIVE org_tree AS (
  SELECT id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, t.level + 1
  FROM employees e JOIN org_tree t ON e.manager_id = t.id
)
SELECT * FROM org_tree ORDER BY level, name;

-- 物化视图（可手动刷新）
CREATE MATERIALIZED VIEW mv_monthly_sales AS
SELECT date_trunc('month', created_at) AS month, SUM(amount) AS total
FROM orders GROUP BY 1;
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_monthly_sales;`}
            </CodeBlock>
          </Card>
          <Card title="扩展（Extensions）">
            <CodeBlock title="sql">
{`-- 常用扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";     -- UUID 生成
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- 模糊搜索（LIKE '%xx%' 用索引）
CREATE EXTENSION IF NOT EXISTS "pgcrypto";        -- 加密函数
CREATE EXTENSION IF NOT EXISTS "btree_gist";      -- GIST 索引支持
CREATE EXTENSION IF NOT EXISTS "hstore";          -- 键值对类型
CREATE EXTENSION IF NOT EXISTS "postgis";         -- 地理空间

-- 查看已安装扩展
SELECT * FROM pg_extension;

-- pg_trgm 模糊搜索加速
CREATE INDEX idx_name_trgm ON users USING GIN (name gin_trgm_ops);
SELECT * FROM users WHERE name % 'alice';         -- 相似度匹配
SELECT * FROM users WHERE name ILIKE '%alice%';   -- 现在能走索引了`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── PG Admin ── */}
        <section id="sec-pg-admin" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔧" color="yellow" title="PostgreSQL — 管理与备份" />
          <Card title="用户与权限">
            <CodeBlock title="sql">
{`-- 创建角色/用户
CREATE ROLE app_user LOGIN PASSWORD 'StrongP@ss!';
CREATE ROLE readonly_user LOGIN PASSWORD 'ReadP@ss!';

-- 创建受限用户（不能创建对象）
CREATE ROLE limited_user LOGIN PASSWORD 'LimitP@ss!'
  CONNECTION LIMIT 50
  VALID UNTIL '2027-01-01';

-- 授权
GRANT CONNECT ON DATABASE mydb TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly_user;

-- 撤销
REVOKE INSERT ON ALL TABLES IN SCHEMA public FROM app_user;

-- 修改密码
ALTER ROLE app_user WITH PASSWORD 'NewP@ss!';

-- 查看权限
\\du+ app_user`}
            </CodeBlock>
          </Card>
          <Card title="备份与恢复">
            <CodeBlock title="bash">
{`# 逻辑备份
pg_dump -U postgres -d mydb -f mydb_backup.sql
pg_dump -U postgres -d mydb -Fc -f mydb.dump      # 自定义格式（可并行恢复）
pg_dump -U postgres -d mydb -Ft -f mydb.tar        # tar 格式
pg_dumpall -U postgres -f all_backup.sql            # 所有数据库

# 只备份结构
pg_dump -U postgres --schema-only -d mydb -f schema.sql

# 恢复
psql -U postgres -d mydb < mydb_backup.sql
pg_restore -U postgres -d mydb -Fc mydb.dump        # 自定义格式恢复
pg_restore -U postgres -d mydb -j 4 -Fc mydb.dump   # 并行恢复（4线程）

# 物理备份（pg_basebackup）
pg_basebackup -U repl -D /backup/base -Fp -Xs -P   # 流式备份

# 时间点恢复（PITR）
# 1. 恢复基础备份
# 2. 配置 recovery.conf / postgresql.auto.conf
# 3. 设置 restore_command + recovery_target_time
recovery_target_time = '2026-05-20 14:30:00'`}
            </CodeBlock>
          </Card>
        </section>

        {/* ================================================================
            Redis
        ================================================================ */}
        <section id="sec-redis" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔴" color="red" title="Redis — 连接与基础" />
          <Card title="连接与服务管理">
            <CodeBlock title="bash">
{`# 连接
redis-cli                                        # 本地连接
redis-cli -h 192.168.1.100 -p 6379 -a password   # 远程连接
redis-cli --tls -h redis.example.com              # TLS 连接
redis-cli -u redis://user:pass@host:6379/0        # URI 格式

# 服务管理
redis-server /etc/redis/redis.conf                # 启动
redis-cli SHUTDOWN NOSAVE                        # 立即关闭
redis-cli SHUTDOWN SAVE                          # 保存后关闭
redis-cli PING                                   # 测试连通 → PONG

# 服务信息
redis-cli INFO                                    # 全部信息
redis-cli INFO server                             # 服务器信息
redis-cli INFO memory                             # 内存信息
redis-cli INFO replication                        # 复制信息
redis-cli INFO clients                            # 客户端信息
redis-cli DBSIZE                                  # 键总数
redis-cli LASTSAVE                                # 上次保存时间戳`}
            </CodeBlock>
          </Card>
          <Card title="键操作（Keys）">
            <CodeBlock title="redis">
{`# 基础操作
SET key "value"                                  # 设置键值
SET key "value" EX 3600                          # 设置并指定过期（秒）
SET key "value" PX 3600000                       # 过期（毫秒）
SETNX key "value"                                # 不存在时设置（分布式锁基础）
MSET k1 "v1" k2 "v2" k3 "v3"                    # 批量设置
GET key                                          # 获取值
MGET k1 k2 k3                                   # 批量获取
APPEND key "extra"                               # 追加字符串
STRLEN key                                       # 字符串长度

# 过期与删除
EXPIRE key 3600                                  # 设置过期时间
TTL key                                          # 查看剩余秒数（-1=永不过期 -2=已删除）
PERSIST key                                      # 移除过期时间
DEL key1 key2                                    # 删除键
UNLINK key1 key2                                 # 异步删除（大键推荐）
EXISTS key                                       # 判断键是否存在

# 扫描（线上禁用 KEYS *）
SCAN 0 MATCH "user:*" COUNT 100                  # 迭代扫描
TYPE key                                         # 查看键类型
OBJECT ENCODING key                              # 查看内部编码
DEBUG OBJECT key                                 # 内存编码详情`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── Redis Data Types ── */}
        <section id="sec-redis-data" data-knowledge-section className="mb-14">
          <SectionHeader icon="📦" color="cyan" title="Redis — 数据类型详解" />
          <Card title="Hash（哈希）">
            <CodeBlock title="redis">
{`# 适合存储对象
HSET user:1001 name "Alice" age 30 email "alice@example.com"
HGET user:1001 name                              # 获取单个字段
HMGET user:1001 name email                       # 获取多个字段
HGETALL user:1001                                # 获取所有字段
HDEL user:1001 email                             # 删除字段
HLEN user:1001                                   # 字段数量
HINCRBY user:1001 age 1                          # 字段自增
HEXISTS user:1001 name                           # 字段是否存在

# 小对象优化（ziplist 编码）
# hash-max-ziplist-entries 128
# hash-max-ziplist-value 64`}
            </CodeBlock>
          </Card>
          <Card title="List（列表）">
            <CodeBlock title="redis">
{`# 消息队列 / 最新列表
LPUSH notifications "msg1" "msg2" "msg3"         # 左侧插入
RPUSH queue "task1" "task2"                       # 右侧插入
LPOP notifications                                # 左侧弹出
RPOP queue                                        # 右侧弹出
BLPOP notifications 30                            # 阻塞弹出（30秒超时）
BRPOP queue 30                                    # 阻塞右侧弹出
LRANGE notifications 0 9                          # 获取前10条
LLEN notifications                                # 列表长度
LTRIM notifications 0 99                          # 保留前100条（固定窗口）

# 阻塞消息队列模式
LPUSH channel "msg"                               # 生产者
BRPOP channel 0                                   # 消费者（永久阻塞等待）`}
            </CodeBlock>
          </Card>
          <Card title="Set（集合）& ZSet（有序集合）">
            <CodeBlock title="redis">
{`# Set — 去重、交并差
SADD tags "redis" "mysql" "docker"
SMEMBERS tags                                     # 所有成员
SISMEMBER tags "redis"                            # 是否存在
SCARD tags                                        # 成员数
SINTER tag1 tag2                                  # 交集（共同标签）
SUNION tag1 tag2                                  # 并集
SDIFF tag1 tag2                                   # 差集

# ZSet — 排行榜、延迟队列
ZADD leaderboard 100 "alice" 85 "bob" 92 "carol"
ZREVRANGE leaderboard 0 9 WITHSCORES             # Top 10（倒序）
ZRANGE leaderboard 0 -1 WITHSCORES               # 全部（正序）
ZRANK leaderboard "alice"                         # 排名（从0开始）
ZSCORE leaderboard "alice"                        # 分数
ZINCRBY leaderboard 10 "bob"                      # 加分
ZRANGEBYSCORE leaderboard 80 100                  # 分数范围查询
ZREM leaderboard "carol"                          # 删除成员
ZREMRANGEBYSCORE leaderboard 0 50                 # 移除分数≤50的成员

# 延迟队列
ZADD delay_queue 1716200000 "task:123"            # score=执行时间戳
ZRANGEBYSCORE delay_queue 0 $(date +%s)           # 取出到期任务`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── Redis Cluster ── */}
        <section id="sec-redis-cluster" data-knowledge-section className="mb-14">
          <SectionHeader icon="🌐" color="purple" title="Redis — 集群与高可用" />
          <Card title="哨兵（Sentinel）">
            <CodeBlock title="bash">
{`# sentinel.conf
# sentinel monitor mymaster 192.168.1.100 6379 2
# sentinel down-after-milliseconds mymaster 5000
# sentinel failover-timeout mymaster 60000

# 连接哨兵
redis-cli -p 26379
SENTINEL masters                                   # 查看主节点
SENTINEL get-master-addr-by-name mymaster         # 获取主节点地址
SENTINEL replicas mymaster                        # 查看从节点
SENTINEL failover mymaster                        # 手动故障转移`}
            </CodeBlock>
          </Card>
          <Card title="Cluster 集群">
            <CodeBlock title="bash">
{`# 创建集群（3主3从）
redis-cli --cluster create \\
  192.168.1.101:6379 192.168.1.102:6379 192.168.1.103:6379 \\
  192.168.1.104:6379 192.168.1.105:6379 192.168.1.106:6379 \\
  --cluster-replicas 1

# 集群操作
redis-cli -c -h 192.168.1.101                     # 连接集群（-c 集群模式）
redis-cli --cluster info 192.168.1.101:6379       # 集群信息
redis-cli --cluster check 192.168.1.101:6379      # 检查槽位平衡

# 添加节点
redis-cli --cluster add-node new_host:6379 existing_host:6379

# 迁移槽位
redis-cli --cluster reshard 192.168.1.101:6379

# 删除节点
redis-cli --cluster del-node host:6379 node_id

# 内存优化
redis-cli MEMORY USAGE key                        # 单个键内存占用
redis-cli MEMORY DOCTOR                            # 内存诊断建议
redis-cli --bigkeys                                # 查找大键
redis-cli --memkeys                                # 内存分析`}
            </CodeBlock>
          </Card>
        </section>

        {/* ================================================================
            MongoDB
        ================================================================ */}
        <section id="sec-mongo" data-knowledge-section className="mb-14">
          <SectionHeader icon="🍃" color="green" title="MongoDB — 连接与 CRUD" />
          <Card title="连接与基础">
            <CodeBlock title="bash">
{`# 连接
mongosh                                            # 新版 Shell
mongo                                              # 旧版 Shell
mongosh "mongodb://user:pass@host:27017/mydb"      # URI 连接
mongosh --host replica0,replica1,replica2          # 副本集

# 基础操作
show dbs                                           # 列出数据库
use mydb                                           # 切换数据库
show collections                                   # 列出集合
db.stats()                                         # 数据库统计
db.collection.stats()                              # 集合统计
db.collection.getIndexes()                         # 查看索引
db.serverStatus()                                  # 服务器状态`}
            </CodeBlock>
          </Card>
          <Card title="CRUD 操作">
            <CodeBlock title="javascript">
{`// 插入
db.users.insertOne({ name: "Alice", age: 30, email: "alice@example.com", tags: ["admin"] })
db.users.insertMany([
  { name: "Bob", age: 25, email: "bob@example.com" },
  { name: "Carol", age: 28, email: "carol@example.com" }
])

// 查询
db.users.find({ age: { $gte: 25 } })                           // 大于等于
db.users.find({ tags: { $in: ["admin", "moderator"] } })       // 包含
db.users.find({ email: { $regex: /example\\.com$/ } })          // 正则
db.users.findOne({ _id: ObjectId("...") })                      // 单条查询
db.users.find({ age: { $gte: 25 } }).sort({ age: -1 }).limit(10).projection({ name: 1, age: 1 })

// 更新
db.users.updateOne({ name: "Alice" }, { $set: { age: 31 } })
db.users.updateMany({ age: { $lt: 18 } }, { $set: { status: "minor" } })
db.users.updateOne({ _id: id }, { $inc: { login_count: 1 } })            // 自增
db.users.updateOne({ name: "Bob" }, { $push: { tags: "new" } })          // 数组追加
db.users.updateOne({ name: "Bob" }, { $pull: { tags: "old" } })          // 数组删除
db.users.updateOne({ name: "Bob" }, { $addToSet: { tags: "unique" } })   // 去重追加

// Upsert
db.users.updateOne({ email: "new@example.com" }, { $setOnInsert: { name: "New" } }, { upsert: true })

// 删除
db.users.deleteOne({ name: "Alice" })
db.users.deleteMany({ status: "inactive" })`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── MongoDB Aggregation ── */}
        <section id="sec-mongo-agg" data-knowledge-section className="mb-14">
          <SectionHeader icon="📊" color="yellow" title="MongoDB — 聚合管道" />
          <Card title="聚合管道">
            <CodeBlock title="javascript">
{`// 基本聚合
db.orders.aggregate([
  { $match: { status: "completed", created_at: { $gte: ISODate("2026-01-01") } } },
  { $group: {
      _id: "$category",
      total: { $sum: "$amount" },
      avg: { $avg: "$amount" },
      count: { $sum: 1 },
      max_price: { $max: "$amount" }
  }},
  { $sort: { total: -1 } },
  { $limit: 10 }
])

// 关联查询（类似 JOIN）
db.orders.aggregate([
  { $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
  }},
  { $unwind: "$user" },
  { $project: { order_id: 1, user_name: "$user.name", amount: 1 } }
])

// 数组展开
db.posts.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 20 }
])

// 日期分组
db.events.aggregate([
  { $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
      count: { $sum: 1 }
  }},
  { $sort: { _id: -1 } }
])`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── MongoDB Admin ── */}
        <section id="sec-mongo-admin" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔧" color="cyan" title="MongoDB — 管理与备份" />
          <Card title="用户与权限">
            <CodeBlock title="javascript">
{`// 创建管理员
use admin
db.createUser({
  user: "admin",
  pwd: "StrongP@ss!",
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWriteAnyDatabase", db: "admin" }
  ]
})

// 创建应用用户
use mydb
db.createUser({
  user: "app_user",
  pwd: "AppP@ss!",
  roles: [
    { role: "readWrite", db: "mydb" }
  ]
})

// 查看用户
db.getUsers()
db.getUser("app_user")

// 认证
db.auth("admin", "StrongP@ss!")

// 修改密码
db.changeUserPassword("app_user", "NewP@ss!")`}
            </CodeBlock>
          </Card>
          <Card title="备份与恢复">
            <CodeBlock title="bash">
{`# mongodump 备份
mongodump -u admin -p "P@ss!" --authenticationDatabase admin -d mydb -o /backup/
mongodump -u admin -p "P@ss!" --authenticationDatabase admin --allDatabases -o /backup/
mongodump --uri="mongodb://user:pass@host:27017/mydb" -o /backup/

# 压缩备份
mongodump -d mydb --gzip -o /backup/

# 恢复
mongorestore -u admin -p "P@ss!" --authenticationDatabase admin -d mydb /backup/mydb/
mongorestore --gzip -d mydb /backup/mydb/

# 只恢复指定集合
mongorestore -d mydb -c users /backup/mydb/users.bson

# 持久化配置
# /etc/mongod.conf
# storage:
#   dbPath: /data/db
#   journal:
#     enabled: true
#   wiredTiger:
#     engineConfig:
#       journalCompressor: snappy`}
            </CodeBlock>
          </Card>
          <Card title="副本集管理">
            <CodeBlock title="javascript">
{`// 查看副本集状态
rs.status()
rs.conf()
rs.printReplicationInfo()                        // 主节点 oplog
rs.printSecondaryReplicationInfo()               // 从节点同步延迟

// 初始化副本集
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "192.168.1.101:27017", priority: 10 },
    { _id: 1, host: "192.168.1.102:27017", priority: 5 },
    { _id: 2, host: "192.168.1.103:27017", priority: 0, hidden: true }  // 隐藏从节点
  ]
})

// 强制主节点切换
rs.stepDown(60)                                   // 60秒内不选主

// 添加从节点
rs.add("192.168.1.104:27017")

// Oplog 大小
db.adminCommand({ setParameter: 1, oplogSizeMB: 10240 })`}
            </CodeBlock>
          </Card>
        </section>

        {/* ================================================================
            Elasticsearch
        ================================================================ */}
        <section id="sec-es" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔍" color="red" title="Elasticsearch — 索引与文档" />
          <Card title="集群与索引管理">
            <CodeBlock title="bash">
{`# 集群健康
curl -s "localhost:9200/_cluster/health?pretty"
curl -s "localhost:9200/_cat/nodes?v"               # 节点列表
curl -s "localhost:9200/_cat/indices?v&s=store.size:desc"  # 索引列表（按大小排序）

# 创建索引（带映射）
curl -X PUT "localhost:9200/articles" -H 'Content-Type: application/json' -d '{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1,
    "analysis": {
      "analyzer": {
        "ik_max_analyzer": { "type": "custom", "tokenizer": "ik_max_word" },
        "ik_smart_analyzer": { "type": "custom", "tokenizer": "ik_smart" }
      }
    }
  },
  "mappings": {
    "properties": {
      "title":     { "type": "text", "analyzer": "ik_max_analyzer", "search_analyzer": "ik_smart" },
      "content":   { "type": "text", "analyzer": "ik_max_analyzer" },
      "status":    { "type": "keyword" },
      "created_at":{ "type": "date" },
      "view_count":{ "type": "integer" },
      "tags":      { "type": "keyword" }
    }
  }
}'

# 查看映射
curl -s "localhost:9200/articles/_mapping?pretty"

# 删除索引
curl -X DELETE "localhost:9200/articles"

# 重建索引（修改映射后必须）
curl -X POST "localhost:9200/_reindex" -H 'Content-Type: application/json' -d '{
  "source": { "index": "articles_v1" },
  "dest":   { "index": "articles_v2" }
}'`}
            </CodeBlock>
          </Card>
          <Card title="文档操作">
            <CodeBlock title="bash">
{`# 新增文档
curl -X POST "localhost:9200/articles/_doc" -H 'Content-Type: application/json' -d '{
  "title": "Elasticsearch 入门指南",
  "content": "ES 是一个分布式搜索和分析引擎...",
  "status": "published",
  "created_at": "2026-05-20",
  "view_count": 0,
  "tags": ["elasticsearch", "搜索"]
}'

# 指定 ID 新增
curl -X PUT "localhost:9200/articles/_doc/1" -H 'Content-Type: application/json' -d '{
  "title": "指定 ID 的文档"
}'

# 更新文档
curl -X POST "localhost:9200/articles/_update/1" -H 'Content-Type: application/json' -d '{
  "doc": { "view_count": 100 }
}'

# 按条件更新
curl -X POST "localhost:9200/articles/_update_by_query" -H 'Content-Type: application/json' -d '{
  "query": { "match": { "status": "draft" } },
  "script": { "source": "ctx._source.status = 'archived'" }
}'

# 获取文档
curl -s "localhost:9200/articles/_doc/1?pretty"

# 删除文档
curl -X DELETE "localhost:9200/articles/_doc/1"

# 批量操作（_bulk）
curl -X POST "localhost:9200/_bulk" -H 'Content-Type: application/json' -d '
{"index":{"_index":"articles","_id":"1"}}
{"title":"文章1","status":"published"}
{"index":{"_index":"articles","_id":"2"}}
{"title":"文章2","status":"draft"}
{"delete":{"_index":"articles","_id":"1"}}
'`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── ES Search ── */}
        <section id="sec-es-search" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔎" color="green" title="Elasticsearch — 搜索查询" />
          <Card title="查询 DSL">
            <CodeBlock title="bash">
{`# 全文搜索
curl -s "localhost:9200/articles/_search" -H 'Content-Type: application/json' -d '{
  "query": {
    "multi_match": {
      "query": "Elasticsearch 入门",
      "fields": ["title^3", "content"]
    }
  }
}'

# 精确查询
curl -s "localhost:9200/articles/_search" -H 'Content-Type: application/json' -d '{
  "query": {
    "bool": {
      "must": [
        { "match": { "content": "搜索" } },
        { "match": { "title": "入门" } }
      ],
      "filter": [
        { "term": { "status": "published" } },
        { "range": { "created_at": { "gte": "2026-01-01" } } }
      ],
      "must_not": [
        { "term": { "status": "draft" } }
      ],
      "should": [
        { "range": { "view_count": { "gte": 100 } } }
      ],
      "minimum_should_match": 0
    }
  }
}'

# 聚合分析
curl -s "localhost:9200/articles/_search" -H 'Content-Type: application/json' -d '{
  "size": 0,
  "aggs": {
    "by_status": { "terms": { "field": "status", "size": 10 } },
    "avg_views": { "avg": { "field": "view_count" } },
    "views_over_time": {
      "date_histogram": { "field": "created_at", "calendar_interval": "month" }
    }
  }
}'

# 高亮
curl -s "localhost:9200/articles/_search" -H 'Content-Type: application/json' -d '{
  "query": { "match": { "content": "搜索" } },
  "highlight": {
    "fields": {
      "content": { "fragment_size": 100, "number_of_fragments": 3 }
    }
  }
}'

# 分页 + 排序
curl -s "localhost:9200/articles/_search" -H 'Content-Type: application/json' -d '{
  "from": 0,
  "size": 20,
  "sort": [
    { "view_count": { "order": "desc" } },
    { "_score": { "order": "desc" } }
  ]
}'`}
            </CodeBlock>
          </Card>
        </section>

        {/* ── ES Admin ── */}
        <section id="sec-es-admin" data-knowledge-section className="mb-14">
          <SectionHeader icon="⚙️" color="purple" title="Elasticsearch — 集群管理" />
          <Card title="快照与恢复">
            <CodeBlock title="bash">
{`# 注册快照仓库
curl -X PUT "localhost:9200/_snapshot/my_backup" -H 'Content-Type: application/json' -d '{
  "type": "fs",
  "settings": { "location": "/mount/backups/es", "compress": true }
}'

# 创建快照
curl -X PUT "localhost:9200/_snapshot/my_backup/snap_20260520?wait_for_completion=true"

# 查看快照
curl -s "localhost:9200/_snapshot/my_backup/_all?pretty"
curl -s "localhost:9200/_snapshot/my_backup/snap_20260520?pretty"

# 恢复快照
curl -X POST "localhost:9200/_snapshot/my_backup/snap_20260520/_restore"

# 恢复指定索引
curl -X POST "localhost:9200/_snapshot/my_backup/snap_20260520/_restore" -d '{
  "indices": "articles"
}'`}
            </CodeBlock>
          </Card>
          <Card title="索引生命周期（ILM）">
            <CodeBlock title="bash">
{`# 创建 ILM 策略
curl -X PUT "localhost:9200/_ilm/policy/logs_policy" -H 'Content-Type: application/json' -d '{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": { "max_size": "50GB", "max_age": "1d" },
          "set_priority": { "priority": 100 }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "shrink": { "number_of_shards": 1 },
          "forcemerge": { "max_num_segments": 1 },
          "set_priority": { "priority": 50 }
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "freeze": {},
          "set_priority": { "priority": 0 }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": { "delete": {} }
      }
    }
  }
}'

# 查看 ILM 状态
curl -s "localhost:9200/_ilm/explain?pretty"

# 模板应用 ILM
curl -X PUT "localhost:9200/_index_template/logs_template" -H 'Content-Type: application/json' -d '{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": { "index.lifecycle.name": "logs_policy", "index.lifecycle.rollover_alias": "logs" }
  }
}'`}
            </CodeBlock>
          </Card>
        </section>

        {/* ================================================================
            备份恢复
        ================================================================ */}
        <section id="sec-backup" data-knowledge-section className="mb-14">
          <SectionHeader icon="💾" color="cyan" title="备份恢复策略速查" />
          <Card title="各数据库备份命令汇总">
            <CmdList
              items={[
                ["mysqldump -u root -p --all-databases | gzip > backup.sql.gz", "MySQL 逻辑备份"],
                ["xtrabackup --backup --target-dir=/backup", "MySQL 物理热备份"],
                ["pg_dump -U postgres -d mydb -Fc -f mydb.dump", "PostgreSQL 自定义格式备份"],
                ["pg_dumpall -U postgres > all.sql", "PostgreSQL 全量逻辑备份"],
                ["redis-cli BGSAVE", "Redis 后台保存 RDB 快照"],
                ["redis-cli -a pass --rdb /backup/dump.rdb", "Redis 远程备份 RDB"],
                ["mongodump -d mydb --gzip -o /backup/", "MongoDB 逻辑备份"],
                ["curl -X PUT localhost:9200/_snapshot/bk/snap1", "Elasticsearch 快照备份"],
              ]}
            />
          </Card>
          <Card title="定时备份脚本模板">
            <CodeBlock title="bash — /etc/cron.d/db-backup.sh">
{`#!/bin/bash
set -euo pipefail

BACKUP_DIR="/backup/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# MySQL
mysqldump -u root -p"\$MYSQL_PWD" --all-databases --single-transaction \\
  | gzip > "$BACKUP_DIR/mysql_all.sql.gz"

# PostgreSQL
pg_dump -U postgres -d mydb -Fc -f "$BACKUP_DIR/pg_mydb.dump"

# Redis
redis-cli -a "\$REDIS_PWD" --rdb "$BACKUP_DIR/redis_dump.rdb"

# MongoDB
mongodump -u admin -p "\$MONGO_PWD" --authenticationDatabase admin \\
  --allDatabases --gzip -o "$BACKUP_DIR/mongo/"

# 清理 7 天前的备份
find /backup -maxdepth 1 -type d -mtime +7 -exec rm -rf {} +

echo "[$(date)] Backup completed: $BACKUP_DIR"`}
            </CodeBlock>
          </Card>
        </section>

        {/* ================================================================
            性能调优
        ================================================================ */}
        <section id="sec-perf" data-knowledge-section className="mb-14">
          <SectionHeader icon="🚀" color="yellow" title="性能调优速查" />
          <Card title="MySQL 关键参数">
            <CmdList
              items={[
                ["innodb_buffer_pool_size = 物理内存 70-80%", "InnoDB 缓存池（最重要的参数）"],
                ["innodb_log_file_size = 1G", "Redo Log 大小"],
                ["innodb_flush_log_at_trx_commit = 1", "事务日志刷盘策略（1=最安全）"],
                ["sync_binlog = 1", "Binlog 同步频率"],
                ["max_connections = 500", "最大连接数"],
                ["innodb_io_capacity = 2000", "磁盘 I/O 能力（SSD 设 2000+）"],
                ["query_cache_type = 0", "关闭查询缓存（8.0 已移除）"],
                ["slow_query_log = ON / long_query_time = 1", "慢查询日志"],
              ]}
            />
          </Card>
          <Card title="PostgreSQL 关键参数">
            <CmdList
              items={[
                ["shared_buffers = 物理内存 25%", "共享缓冲区"],
                ["effective_cache_size = 物理内存 75%", "查询规划器缓存估算"],
                ["work_mem = 256MB", "排序/哈希操作内存"],
                ["maintenance_work_mem = 1GB", "维护操作内存（VACUUM/CREATE INDEX）"],
                ["max_connections = 200", "最大连接数"],
                ["wal_buffers = 64MB", "WAL 缓冲区"],
                ["random_page_cost = 1.1", "随机读代价（SSD 设 1.1）"],
                ["effective_io_concurrency = 200", "I/O 并发（SSD 设 200）"],
              ]}
            />
          </Card>
          <Card title="Redis 内存优化">
            <CmdList
              items={[
                ["maxmemory 8gb", "最大内存限制"],
                ["maxmemory-policy allkeys-lru", "内存淘汰策略（LRU）"],
                ["hash-max-ziplist-entries 128", "小哈希用 ziplist 编码"],
                ["list-max-ziplist-size -2", "小列表用 ziplist 编码"],
                ["set-max-intset-entries 512", "小整数集合用 intset 编码"],
                ["zset-max-ziplist-entries 128", "小有序集合用 ziplist 编码"],
                ["lazyfree-lazy-eviction yes", "LRU 淘汰时异步删除"],
                ["activedefrag yes", "主动内存碎片整理"],
              ]}
            />
          </Card>
        </section>

        {/* ================================================================
            故障排查
        ================================================================ */}
        <section id="sec-troubleshoot" data-knowledge-section className="mb-14">
          <SectionHeader icon="🩺" color="red" title="常见故障排查" />
          <Card title="MySQL 排查">
            <CodeBlock title="sql">
{`-- 连接数暴增
SHOW PROCESSLIST;
SELECT COUNT(*) FROM information_schema.PROCESSLIST;
-- 杀掉慢连接
KILL <processlist_id>;

-- 死锁排查
SHOW ENGINE INNODB STATUS\G
-- 找 LATEST DETECTED DEADLOCK 部分

-- 表空间暴涨（碎片整理）
SELECT table_name, ROUND(data_length/1024/1024, 2) AS data_mb,
       ROUND(data_free/1024/1024, 2) AS free_mb
FROM information_schema.TABLES
WHERE table_schema = 'mydb' AND data_free > 10485760;

OPTIMIZE TABLE users;                            -- 回收碎片

-- binlog 清理
SHOW BINARY LOGS;
PURGE BINARY LOGS BEFORE '2026-05-01 00:00:00';
SET GLOBAL expire_logs_days = 7;                 -- 自动清理 7 天前`}
            </CodeBlock>
          </Card>
          <Card title="Redis 排查">
            <CodeBlock title="bash">
{`# 内存分析
redis-cli INFO memory
redis-cli --bigkeys                              # 大键扫描
redis-cli --memkeys                              # 内存分布
redis-cli MEMORY DOCTOR                          # 优化建议

# 慢日志
redis-cli SLOWLOG GET 10                         # 最近 10 条慢命令
redis-cli SLOWLOG LEN                            # 慢日志数量
redis-cli SLOWLOG RESET                          # 清空慢日志

# 延迟分析
redis-cli --latency                              # 持续延迟测试
redis-cli --latency-history -i 5                 # 每5秒输出延迟
redis-cli --intrinsic-latency 5                  # 系统固有延迟（5秒采样）

# 客户端排查
redis-cli CLIENT LIST                            # 所有连接的客户端
redis-cli CLIENT KILL id <client-id>             # 杀掉指定客户端`}
            </CodeBlock>
          </Card>
          <Card title="Elasticsearch 排查">
            <CodeBlock title="bash">
{`# 集群健康
curl -s "localhost:9200/_cluster/health?pretty"
# status: green/yellow/red
# unassigned_shards > 0 表示有分片未分配

# 查看未分配原因
curl -s "localhost:9200/_cluster/allocation/explain?pretty"

# 索引健康
curl -s "localhost:9200/_cat/indices?v&health=red"

# 节点磁盘水位线
curl -s "localhost:9200/_cluster/settings" | grep -A5 watermark
# low: 85% / high: 90% / flood_stage: 95%

# 线程池状态
curl -s "localhost:9200/_cat/thread_pool?v&h=node_name,name,active,queue,rejected"

# 清理已删除索引的磁盘占用
curl -X POST "localhost:9200/_forcemerge?max_num_segments=1"

# JVM 堆内存
curl -s "localhost:9200/_cat/nodes?v&h=name,heap.percent,ram.percent,cpu,load_1m"`}
            </CodeBlock>
          </Card>
        </section>
      </KnowledgeLayout>
    </div>
  );
}
