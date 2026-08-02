import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import { KnowledgeLayout } from "@/components/KnowledgeLayout";
import type { SectionItem } from "@/components/KnowledgeLayout";
import { cn } from "@/lib/cn";

export const metadata = buildPageMetadata({
  title: "Linux 企业级命令手册 — 22章 260+命令",
  description: "服务器运维、DevOps自动化、安全审计、性能调优一站式参考，覆盖CentOS/Ubuntu/RHEL，18个企业实战场景",
  path: "/knowledge/linux-commands",
  tags: ["Linux", "运维", "DevOps", "Docker", "Kubernetes", "Nginx"],
});

const sections: SectionItem[] = [
  { id: "sec-sysinfo", label: "系统信息" },
  { id: "sec-user", label: "用户权限" },
  { id: "sec-files", label: "文件操作" },
  { id: "sec-network", label: "网络管理" },
  { id: "sec-packages", label: "包管理" },
  { id: "sec-process", label: "进程服务" },
  { id: "sec-logs", label: "日志管理" },
  { id: "sec-ssh", label: "SSH安全" },
  { id: "sec-disk", label: "磁盘存储" },
  { id: "sec-docker", label: "Docker" },
  { id: "sec-monitor", label: "性能监控" },
  { id: "sec-security", label: "安全加固" },
  { id: "sec-cron", label: "定时任务" },
  { id: "sec-troubleshoot", label: "排查速查" },
  { id: "sec-k8s", label: "Kubernetes" },
  { id: "sec-nginx", label: "Nginx" },
  { id: "sec-git", label: "Git工作流" },
  { id: "sec-netplan", label: "网络配置" },
  { id: "sec-faq", label: "问题排查" },
  { id: "sec-tips", label: "效率技巧" },
];

export default function LinuxCommandsPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link
        href="/knowledge"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回手册列表
      </Link>

      <KnowledgeLayout sections={sections}>
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Linux 企业级命令手册
          </h1>
          <p className="text-text-secondary text-lg mb-6">
            服务器运维、DevOps 自动化、安全审计、性能调优一站式参考 — 面向测试工程师、运维工程师、后端开发者
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <span>22 章节</span>
            <span>260+ 命令</span>
            <span>CentOS/Ubuntu/RHEL</span>
            <span>18 企业场景</span>
          </div>
        </div>

        {/* ========== 01 系统信息与基础 ========== */}
        <section id="sec-sysinfo" data-knowledge-section className="mb-14">
          <SectionHeader icon="⚙" color="cyan" title="系统信息与基础" />
          <Card title="系统概览">
            <CodeBlock title="bash">
{`# 基本信息
uname -a                    # 完整内核与系统信息
cat /etc/os-release         # 发行版详情（ID/版本/代号）
hostnamectl                 # 主机名、架构、操作系统信息
uptime                      # 运行时间 + 负载均值（1/5/15分钟）
date '+%Y-%m-%d %H:%M:%S'  # 系统当前时间（脚本常用格式）
timedatectl                 # 时区、NTP同步状态

# 硬件信息
lscpu                       # CPU 型号/核数/线程/缓存
cat /proc/cpuinfo | grep "model name" | head -1  # 仅取 CPU 型号
free -h                     # 内存总量/已用/可用（-h 人类可读）
lsblk                       # 块设备列表（磁盘分区挂载）
df -hT                      # 磁盘使用率 + 文件系统类型
du -sh /var/log/*           # 目录实际占用大小
lspci | grep -i vga         # 显卡/GPU 信息
dmidecode -t memory | grep Size  # 物理内存条详情

# 内核参数
sysctl -a | head -30        # 查看前30个内核参数
sysctl net.ipv4.ip_forward  # 查看特定参数值
cat /proc/version           # 内核编译信息`}
            </CodeBlock>
          </Card>
          <Card title="环境变量">
            <CodeBlock title="bash">
{`# 查看
env                         # 全部环境变量
echo $PATH                  # 可执行文件搜索路径
echo $HOME                  # 当前用户主目录
printenv | grep -i proxy    # 查看代理相关变量

# 设置（临时）
export EDITOR=vim           # 当前终端会话生效

# 设置（永久 — 用户级）
echo 'export MY_VAR="hello"' >> ~/.bashrc
source ~/.bashrc            # 立即生效

# 设置（永久 — 全局）
echo 'export MY_VAR="hello"' >> /etc/profile.d/custom.sh`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 02 用户与权限管理 ========== */}
        <section id="sec-user" data-knowledge-section className="mb-14">
          <SectionHeader icon="👤" color="purple" title="用户与权限管理" />
          <Card title="用户操作">
            <CodeBlock title="bash — 创建/删除">
{`useradd -m -s /bin/bash deploy     # 创建用户（-m 建家目录 -s 指定shell）
passwd deploy                       # 设置密码
userdel -r olduser                  # 删除用户及家目录
usermod -aG docker deploy           # 追加到 docker 组（-a 追加 -G 附加组）
chage -l deploy                     # 查看密码过期策略`}
            </CodeBlock>
            <CodeBlock title="bash — 切换与认证">
{`su - deploy                         # 切换用户（加载目标环境）
sudo -u deploy whoami               # 以指定用户执行命令
sudo -l                             # 查看当前用户 sudo 权限`}
            </CodeBlock>
          </Card>
          <Card title="权限管理">
            <CodeBlock title="bash — 数字模式（推荐脚本使用）">
{`chmod 755 /opt/app                  # rwxr-xr-x（目录常用）
chmod 644 /etc/config.yml           # rw-r--r--（配置文件常用）
chmod 600 /etc/shadow               # rw-------（敏感文件）
chmod 700 /home/deploy/.ssh         # rwx------（SSH 目录）`}
            </CodeBlock>
            <CodeBlock title="bash — 符号模式">
{`chmod u+x deploy.sh                 # 给所有者加执行权限
chmod g-w /shared/data              # 去掉组写权限
chmod o-rwx /private                # 去掉其他用户所有权限
chmod -R 755 /opt/app/bin           # 递归改目录下所有文件`}
            </CodeBlock>
            <CodeBlock title="bash — 归属变更与特殊权限">
{`chown deploy:deploy /opt/app -R     # 递归改所有者和组
chown :www-data /var/www -R         # 仅改组
chmod u+s /usr/bin/passwd           # SUID（以文件所有者身份执行）
chmod g+s /shared                   # SGID（新建文件继承组）
chmod +t /tmp                       # Sticky bit（仅所有者可删文件）`}
            </CodeBlock>
          </Card>
          <Card title="sudo 配置">
            <CodeBlock title="bash">
{`visudo                              # 安全编辑 /etc/sudoers

# 常见配置项
# deploy ALL=(ALL) NOPASSWD: ALL                    # 无需密码 sudo
# deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl *   # 仅 systemctl 免密
# %docker ALL=(ALL) NOPASSWD: ALL                    # docker 组免密`}
            </CodeBlock>
          </Card>
          <Card title="ACL 细粒度控制">
            <CodeBlock title="bash">
{`# 查看
getfacl /shared/data               # 查看 ACL 规则

# 设置
setfacl -m u:deploy:rw /shared/data       # 给 deploy 用户读写
setfacl -m g:qa:r /shared/data            # 给 qa 组只读
setfacl -Rm g:dev:rwx /shared/code        # 递归设置
setfacl -d -m g:dev:rwx /shared/code      # 默认 ACL（新建文件自动继承）`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 03 文件与目录操作 ========== */}
        <section id="sec-files" data-knowledge-section className="mb-14">
          <SectionHeader icon="📁" color="orange" title="文件与目录操作" />
          <Card title="查找与定位">
            <CodeBlock title="bash — find（最强大）">
{`find / -name "*.log" -mtime -7 -size +100M     # 7天内 >100M 的日志
find /var/log -name "*.log" -mtime +30 -delete  # 删除30天前日志
find / -user deploy -type f -perm 777           # deploy 拥有的 777 文件
find / -type f -newer /tmp/timestamp            # 比时间戳更新的文件
find . -empty -type d                           # 查找空目录
find / -mtime -1 -name "*.conf" -exec grep -l "password" {} \\;  # 24h内改过的含密码配置`}
            </CodeBlock>
            <CodeBlock title="bash — locate / which">
{`updatedb                        # 更新索引（locate）
locate nginx.conf               # 快速定位文件
which python3                   # 查找命令路径
type ls                         # 判断命令类型（alias/内置/外部）`}
            </CodeBlock>
          </Card>
          <Card title="文本处理三剑客">
            <CmdList items={[
              ['grep -rn "ERROR" /var/log/ --include="*.log"', '递归搜所有 .log'],
              ['grep -A5 -B2 "Exception" app.log', '匹配行前后各显示'],
              ['grep -v "^#" /etc/ssh/sshd_config | grep -v "^$"', '去掉注释和空行'],
              ['grep -P "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}" access.log', 'Perl正则匹配IP'],
              ['grep -c "404" access.log', '统计404次数'],
            ]} />
            <CodeBlock title="bash — sed 流编辑">
{`sed -i 's/old/new/g' config.yml                 # 原地替换（-i）
sed -i '5d' file.txt                            # 删除第5行
sed -n '10,20p' file.txt                        # 打印10-20行
sed -i '/^#/d' config.yml                       # 删除所有注释行
sed -i '1i\\# Auto-generated' file.txt           # 首行插入`}
            </CodeBlock>
            <CodeBlock title="bash — awk 结构化处理">
{`awk '{print $1, $7}' access.log                 # 提取第1列和第7列
awk '$9 >= 500 {print $0}' access.log           # 筛选5xx状态码
awk -F: '{print $1, $3}' /etc/passwd            # 指定分隔符，取用户名和UID
awk '{sum+=$1} END {print sum}' numbers.txt     # 求和
awk '/ERROR/{count++} END{print count}' app.log # 统计 ERROR 行数`}
            </CodeBlock>
          </Card>
          <Card title="文件传输与同步">
            <CodeBlock title="bash — scp">
{`scp -P 2222 deploy@server:/opt/app/logs/app.log ./  # 远程拉取
scp -r ./dist/ deploy@server:/opt/app/               # 递归上传目录
scp -o ConnectTimeout=5 large.tar.gz deploy@server:/tmp/  # 超时控制`}
            </CodeBlock>
            <CodeBlock title="bash — rsync（增量同步，推荐）">
{`rsync -avz --delete ./dist/ deploy@server:/opt/app/  # 镜像同步
rsync -avz --exclude="*.log" --exclude="node_modules" ./ deploy@server:/opt/app/
rsync -avzP large_file.tar.gz deploy@server:/tmp/     # -P 显示进度 + 断点续传`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 04 网络管理 ========== */}
        <section id="sec-network" data-knowledge-section className="mb-14">
          <SectionHeader icon="🌐" color="blue" title="网络管理" />
          <Card title="网络信息">
            <CodeBlock title="bash">
{`# 连接与接口
ip addr show                         # 查看所有网络接口 IP
ip route show                        # 查看路由表
ip link show eth0                    # 查看网卡状态
cat /etc/resolv.conf                 # DNS 配置

# 连接状态
ss -tlnp                             # 监听中的 TCP 端口 + 进程名
ss -s                                # 连接统计摘要
ss -tunp                             # 所有 TCP/UDP 连接

# DNS 查询
dig example.com                      # A 记录查询
dig +short example.com               # 精简输出
dig @8.8.8.8 example.com             # 指定 DNS 服务器

# 连通性
ping -c 4 8.8.8.8                    # 发4个包测试连通
traceroute example.com               # 追踪路由路径
mtr example.com                      # 实时路由诊断（ping + traceroute）
curl -o /dev/null -s -w "%{http_code} %{time_total}s\\n" https://example.com`}
            </CodeBlock>
          </Card>
          <Card title="防火墙管理">
            <CodeBlock title="bash — firewalld（CentOS/RHEL 默认）">
{`firewall-cmd --state                          # 检查状态
firewall-cmd --list-all                       # 查看当前规则
firewall-cmd --permanent --add-port=8080/tcp  # 永久开放端口
firewall-cmd --permanent --add-service=http   # 永久开放 HTTP 服务
firewall-cmd --reload                         # 重载规则
firewall-cmd --list-rich-rules                # 查看富规则`}
            </CodeBlock>
            <CodeBlock title="bash — ufw（Ubuntu 默认）">
{`ufw status verbose                            # 查看状态+规则
ufw allow 8080/tcp                            # 允许端口
ufw allow from 10.0.0.0/8 to any port 3306    # 限制来源
ufw deny 23                                   # 禁止 telnet
ufw delete allow 80                           # 删除规则`}
            </CodeBlock>
            <CodeBlock title="bash — iptables（底层）">
{`iptables -L -n --line-numbers                 # 查看规则+行号
iptables -I INPUT 5 -s 10.0.0.0/8 -p tcp --dport 3306 -j ACCEPT  # 插入规则
iptables -D INPUT 5                           # 删除第5条规则`}
            </CodeBlock>
          </Card>
          <Card title="网络排查实战">
            <CodeBlock title="bash">
{`# 端口占用
ss -tlnp | grep :80                           # 谁在用 80 端口
lsof -i :80                                   # 进程级端口占用详情

# 抓包分析
tcpdump -i eth0 port 80 -nn -c 100            # 抓 100 个 80 端口包
tcpdump -i any host 10.0.0.5 -w capture.pcap  # 抓包写入文件
tcpdump -r capture.pcap | head -20             # 读取分析`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 05 包管理与软件安装 ========== */}
        <section id="sec-packages" data-knowledge-section className="mb-14">
          <SectionHeader icon="📦" color="green" title="包管理与软件安装" />
          <Card title="CentOS/RHEL（yum/dnf）">
            <CodeBlock title="bash">
{`# 信息查询
yum list installed | grep nginx           # 已安装的包
yum info nginx                            # 包详细信息
yum provides /usr/bin/python3             # 哪个包提供该文件
yum history                               # 安装/卸载历史

# 安装/卸载
yum install -y nginx                      # 安装（-y 跳过确认）
yum remove nginx                          # 卸载
yum update nginx                          # 更新指定包

# 源管理
yum repolist enabled                      # 启用的仓库
yum install epel-release                  # 安装 EPEL 扩展源
yum clean all && yum makecache            # 清缓存重建索引

# dnf（CentOS 8+ / RHEL 8+）
dnf install -y docker-ce                  # 替代 yum，语法兼容`}
            </CodeBlock>
          </Card>
          <Card title="Ubuntu/Debian（apt）">
            <CodeBlock title="bash">
{`# 信息查询
apt list --installed | grep nginx         # 已安装的包
apt show nginx                            # 包详细信息
apt-cache search "reverse proxy"          # 搜索关键词

# 安装/卸载
apt install -y nginx                      # 安装
apt remove nginx                          # 卸载（保留配置）
apt purge nginx                           # 彻底删除（含配置）
apt autoremove                            # 清理无用依赖

# 源管理
apt update                                # 刷新包索引（必须先执行）
cat /etc/apt/sources.list                 # 源列表`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 06 进程与服务管理 ========== */}
        <section id="sec-process" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔧" color="cyan" title="进程与服务管理" />
          <Card title="进程管理">
            <CodeBlock title="bash — 查看进程">
{`ps aux                                  # 所有进程（BSD 风格）
ps -ef --forest                         # 树状进程树
ps -eo pid,ppid,user,%cpu,%mem,cmd --sort=-%cpu | head -20  # CPU Top 20
top -bn1 | head -20                     # 非交互式快照（脚本可用）
htop                                    # 交互式进程监控（需安装）`}
            </CodeBlock>
            <CodeBlock title="bash — 进程操作">
{`kill -15 PID                            # 优雅终止（SIGTERM，允许清理）
kill -9 PID                             # 强制终止（SIGKILL，最后手段）
killall nginx                           # 按名称杀进程
pkill -f "python.*server"               # 按命令行模式杀
kill -0 PID                             # 检查进程是否存活（不发送信号）

# 后台任务
nohup ./long-task.sh > /dev/null 2>&1 &  # 后台运行，断开不退出
jobs -l                                  # 查看后台任务
disown %1                                # 脱离终端控制`}
            </CodeBlock>
          </Card>
          <Card title="systemd 服务管理">
            <CodeBlock title="bash — 基本操作">
{`systemctl status nginx                   # 查看服务状态
systemctl start nginx                    # 启动
systemctl stop nginx                     # 停止
systemctl restart nginx                  # 重启
systemctl reload nginx                   # 重载配置（不中断连接）
systemctl enable nginx                   # 开机自启
systemctl disable nginx                  # 取消自启`}
            </CodeBlock>
            <CodeBlock title="bash — 高级操作">
{`systemctl daemon-reload                  # 重载 unit 文件（修改 .service 后必须）
systemctl list-units --type=service --state=running  # 运行中的服务
systemctl list-unit-files | grep enabled # 已启用的服务
systemctl mask nginx                     # 彻底禁用（连手动都无法启动）
systemctl unmask nginx                   # 解除禁用`}
            </CodeBlock>
            <CodeBlock title="bash — 服务日志">
{`journalctl -u nginx --since "1 hour ago"    # 最近1小时日志
journalctl -u nginx -f                       # 实时跟踪
journalctl -u nginx -p err                   # 仅错误级别
journalctl -u nginx --disk-usage             # 日志占用空间`}
            </CodeBlock>
            <CodeBlock title="bash — 自定义服务（创建 .service 文件）">
{`cat > /etc/systemd/system/myapp.service << 'EOF'
[Unit]
Description=My Application
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/bin/start.sh
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable --now myapp`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 07 日志管理 ========== */}
        <section id="sec-logs" data-knowledge-section className="mb-14">
          <SectionHeader icon="📝" color="yellow" title="日志管理" />
          <Card title="日志查看">
            <CodeBlock title="bash">
{`# 系统日志
tail -f /var/log/syslog                 # Ubuntu 实时跟踪
tail -f /var/log/messages               # CentOS/RHEL 实时跟踪
journalctl -f                           # systemd 全局日志
dmesg -T | tail -20                     # 内核环形缓冲区（带时间戳）
last -20                                # 最近20次登录记录
lastb -10                               # 最近10次失败登录

# 应用日志
tail -1000 /opt/app/logs/app.log | grep ERROR   # 最近1000行中的错误
journalctl -u myapp.service --since today       # 今天的服务日志`}
            </CodeBlock>
          </Card>
          <Card title="日志轮转配置">
            <CodeBlock title="bash — 自定义轮转（示例：应用日志）">
{`cat > /etc/logrotate.d/myapp << 'EOF'
/opt/app/logs/*.log {
    daily               # 每天轮转
    missingok           # 文件不存在不报错
    rotate 30           # 保留30天
    compress            # gzip 压缩
    delaycompress       # 最近一个不压缩
    notifempty          # 空文件不轮转
    create 0644 deploy deploy  # 新文件权限
    dateext             # 按日期后缀命名
}
EOF

logrotate -d /etc/logrotate.d/myapp     # 预演模式（不实际执行）
logrotate -f /etc/logrotate.d/myapp     # 强制立即执行`}
            </CodeBlock>
          </Card>
          <Card title="日志分析实战">
            <CodeBlock title="bash">
{`# 统计 HTTP 状态码分布
awk '{print $9}' access.log | sort | uniq -c | sort -rn

# 统计每小时请求量
awk '{print $4}' access.log | cut -d: -f1-2 | sort | uniq -c

# 统计 TOP 10 访问 IP
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# 统计 404 的 URL
awk '$9 == 404 {print $7}' access.log | sort | uniq -c | sort -rn | head -20

# 实时错误监控
tail -f app.log | grep --line-buffered -E "ERROR|WARN|Exception|Traceback"`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 08 SSH 与安全 ========== */}
        <section id="sec-ssh" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔐" color="red" title="SSH 与安全" />
          <Card title="SSH 连接管理">
            <CodeBlock title="bash">
{`# 基础连接
ssh -p 2222 deploy@192.168.1.100                # 指定端口
ssh -i ~/.ssh/id_ed25519 deploy@server           # 指定密钥
ssh -o ConnectTimeout=5 deploy@server             # 超时控制
ssh -fN -L 3306:db.internal:3306 deploy@server   # 本地端口转发

# 远程执行命令（非交互式）
ssh deploy@server "systemctl status nginx"        # 查看远程服务状态
ssh deploy@server "df -h" | grep -v tmpfs        # 挂载点使用情况`}
            </CodeBlock>
          </Card>
          <Card title="SSH 配置优化">
            <CodeBlock title="bash — 全局配置（/etc/ssh/sshd_config）">
{`# Port 2222                           # 修改默认端口
# PermitRootLogin no                  # 禁止 root 登录
# PasswordAuthentication no           # 禁用密码登录（仅密钥）
# MaxAuthTries 3                      # 最大认证尝试次数
# ClientAliveInterval 300             # 5分钟无活动断开
# AllowUsers deploy admin             # 仅允许特定用户
systemctl restart sshd`}
            </CodeBlock>
            <CodeBlock title="bash — 用户配置（~/.ssh/config）">
{`Host production
    HostName 192.168.1.100
    User deploy
    Port 2222
    IdentityFile ~/.ssh/id_ed25519

Host staging
    HostName 192.168.1.200
    User deploy
    ProxyJump production            # 跳板机
# 之后可直接：ssh production`}
            </CodeBlock>
          </Card>
          <Card title="密钥管理">
            <CodeBlock title="bash">
{`# 生成密钥对
ssh-keygen -t ed25519 -C "deploy@company.com"    # 推荐 ed25519
ssh-keygen -t rsa -b 4096 -C "backup@company.com" # RSA 4096（兼容旧系统）

# 部署公钥
ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@server

# 代理转发（跳板机场景）
ssh -A deploy@jump-server           # 转发认证到跳板机
ssh deploy@internal-server          # 通过跳板机连内网`}
            </CodeBlock>
          </Card>
          <Card title="fail2ban 防暴力破解">
            <CodeBlock title="bash">
{`# 安装
yum install -y fail2ban      # CentOS
apt install -y fail2ban      # Ubuntu

# 配置
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
backend = systemd

[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
EOF
systemctl enable --now fail2ban

# 查看封禁状态
fail2ban-client status sshd`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 09 磁盘与存储管理 ========== */}
        <section id="sec-disk" data-knowledge-section className="mb-14">
          <SectionHeader icon="💾" color="orange" title="磁盘与存储管理" />
          <Card title="磁盘操作">
            <CodeBlock title="bash">
{`# 查看磁盘信息
fdisk -l                                # 所有磁盘分区详情
lsblk -f                                # 块设备树（含文件系统和UUID）
blkid                                   # 所有块设备 UUID 和类型

# 分区操作（谨慎！）
fdisk /dev/sdb                          # 交互式分区
parted /dev/sdb mklabel gpt             # 创建 GPT 分区表

# 格式化与挂载
mkfs.ext4 /dev/sdb1                     # 格式化为 ext4
mount /dev/sdb1 /data                   # 临时挂载

# 永久挂载（/etc/fstab）
echo 'UUID=xxxx-xxxx /data ext4 defaults,noatime 0 2' >> /etc/fstab
mount -a                                # 测试 fstab 配置`}
            </CodeBlock>
          </Card>
          <Card title="LVM 逻辑卷管理">
            <CodeBlock title="bash — 创建流程">
{`pvcreate /dev/sdb /dev/sdc              # 创建物理卷
vgcreate data-vg /dev/sdb /dev/sdc      # 创建卷组
lvcreate -L 100G -n data-lv data-vg     # 创建逻辑卷
mkfs.ext4 /dev/data-vg/data-lv          # 格式化
mount /dev/data-vg/data-lv /data        # 挂载`}
            </CodeBlock>
            <CodeBlock title="bash — 扩容（LVM 最大优势）">
{`lvextend -L +50G /dev/data-vg/data-lv   # 扩展逻辑卷
resize2fs /dev/data-vg/data-lv          # ext4 扩容文件系统
xfs_growfs /data                        # xfs 扩容文件系统

# 查看状态
pvs / vgs / lvs                         # 简洁视图`}
            </CodeBlock>
          </Card>
          <Card title="磁盘健康与清理">
            <CodeBlock title="bash">
{`# 健康检查
smartctl -a /dev/sda                     # SMART 详细信息
smartctl -H /dev/sda                     # 快速健康判断

# 清理磁盘
du -sh /* | sort -rh | head -10          # 找出根目录下最大的目录
find /var/log -name "*.gz" -mtime +30 -delete  # 删除30天前压缩日志
docker system prune -af                  # 清理 Docker 无用资源
journalctl --vacuum-size=500M            # 限制 journald 占用 500M`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 10 Docker 容器管理 ========== */}
        <section id="sec-docker" data-knowledge-section className="mb-14">
          <SectionHeader icon="🐳" color="blue" title="Docker 容器管理" />
          <Card title="镜像与容器">
            <CodeBlock title="bash — 镜像管理">
{`docker images                           # 查看本地镜像
docker pull nginx:1.24-alpine           # 拉取指定版本
docker rmi nginx:1.24-alpine            # 删除镜像
docker image prune -a                   # 清理无用镜像
docker tag myapp:latest myapp:1.0       # 打标签`}
            </CodeBlock>
            <CodeBlock title="bash — 容器生命周期">
{`docker run -d --name web -p 80:80 nginx           # 后台运行
docker run -it --rm ubuntu bash                    # 交互式（退出即删除）
docker stop web && docker rm web                   # 停止并删除
docker rm -f web                                   # 强制删除`}
            </CodeBlock>
            <CodeBlock title="bash — 日志与调试">
{`docker logs -f --tail 100 web                      # 实时跟踪最近100行
docker exec -it web bash                           # 进入容器
docker inspect web | jq '.[0].State'               # 容器详细状态
docker top web                                     # 容器内进程
docker stats --no-stream                           # 资源使用快照`}
            </CodeBlock>
          </Card>
          <Card title="Docker Compose">
            <CodeBlock title="bash">
{`docker compose up -d                      # 后台启动所有服务
docker compose down                       # 停止并删除所有服务
docker compose ps                         # 服务状态
docker compose logs -f web                # 跟踪指定服务日志
docker compose exec web bash              # 进入指定服务容器
docker compose pull                       # 拉取最新镜像
docker compose restart web                # 重启指定服务
docker compose build --no-cache           # 无缓存构建
docker compose up -d --build              # 构建并启动`}
            </CodeBlock>
          </Card>
          <Card title="Dockerfile 最佳实践">
            <CodeBlock title="dockerfile — 多阶段构建（减小镜像体积）">
{`FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production             # 只安装生产依赖
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
USER node                               # 非 root 用户运行
CMD ["node", "dist/server.js"]`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 11 系统性能监控 ========== */}
        <section id="sec-monitor" data-knowledge-section className="mb-14">
          <SectionHeader icon="🚀" color="green" title="系统性能监控" />
          <Card title="CPU 与内存">
            <CodeBlock title="bash">
{`# CPU 监控
top -bn1 | head -5                      # CPU 使用率快照
mpstat -P ALL 1 3                       # 每秒采样，共3次
vmstat 1 5                              # 系统级 CPU/内存/IO 概览
pidstat -u 1 3                          # 按进程统计 CPU

# 内存监控
free -h                                 # 内存概览
slabtop                                 # 内核 slab 缓存占用
ps aux --sort=-%mem | head -10           # 内存占用 TOP 10 进程`}
            </CodeBlock>
          </Card>
          <Card title="IO 监控">
            <CodeBlock title="bash">
{`# 磁盘 IO
iostat -xz 1 3                          # 每秒采样，关注 await 和 %util
iotop                                   # 按进程查看 IO（需 root）
pidstat -d 1 3                          # 按进程统计 IO

# 文件系统 IO
lsof +D /var/log                        # 谁在读写该目录
fuser -v /mnt/data                      # 谁在使用该挂载点`}
            </CodeBlock>
          </Card>
          <Card title="综合监控脚本">
            <CodeBlock title="bash — 服务器健康快照">
{`#!/bin/bash
echo "=== $(date) ==="
echo "--- CPU ---"
uptime
echo ""
echo "--- Memory ---"
free -h
echo ""
echo "--- Disk ---"
df -hT | grep -v tmpfs
echo ""
echo "--- Top 5 CPU ---"
ps aux --sort=-%cpu | head -6
echo ""
echo "--- Top 5 Memory ---"
ps aux --sort=-%mem | head -6
echo ""
echo "--- Listening Ports ---"
ss -tlnp | head -15
echo ""
echo "--- Recent Errors ---"
journalctl -p err --since "1 hour ago" --no-pager | tail -10`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 12 系统安全加固 ========== */}
        <section id="sec-security" data-knowledge-section className="mb-14">
          <SectionHeader icon="🛡" color="red" title="系统安全加固" />
          <Card title="审计与合规">
            <CodeBlock title="bash">
{`# 登录审计
lastlog                                  # 所有用户最后登录
last -20                                 # 最近登录记录
lastb -10                                # 失败登录记录
who                                      # 当前登录用户
w                                        # 当前用户 + 活动

# 文件完整性
find / -perm -4000 -type f 2>/dev/null   # 查找 SUID 文件
find / -perm -2000 -type f 2>/dev/null   # 查找 SGID 文件
rpm -Va                                  # RPM 包完整性校验`}
            </CodeBlock>
          </Card>
          <Card title="安全基线配置">
            <CodeBlock title="bash — 内核安全参数">
{`cat > /etc/sysctl.d/99-security.conf << 'EOF'
net.ipv4.ip_forward = 0
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
kernel.randomize_va_space = 2
EOF
sysctl --system

# 文件权限加固
chmod 600 /etc/shadow /etc/gshadow
chmod 644 /etc/passwd /etc/group
chmod 700 /root`}
            </CodeBlock>
          </Card>
          <Card title="定期安全检查">
            <CodeBlock title="bash">
{`# 检查异常进程
ps auxf | grep -v "\\[" | sort -nrk 3 | head

# 检查异常网络连接
ss -tnp | grep -v "127.0.0.1"
curl -s https://ipinfo.io/json

# 检查异常定时任务
for user in $(cut -d: -f1 /etc/passwd); do
    echo "--- $user ---"
    crontab -u $user -l 2>/dev/null
done

# 检查最近修改的文件
find /etc -mmin -60 -type f 2>/dev/null
find /usr/bin /usr/sbin -mtime -7 -type f`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 13 定时任务 ========== */}
        <section id="sec-cron" data-knowledge-section className="mb-14">
          <SectionHeader icon="⏰" color="yellow" title="定时任务（Cron）" />
          <Card title="Crontab 操作">
            <CodeBlock title="bash">
{`# 基本操作
crontab -l                               # 查看当前用户 cron
crontab -e                               # 编辑 cron
crontab -r                               # 删除所有 cron（危险！）
crontab -u deploy -l                     # 查看其他用户 cron

# Cron 表达式
# ┌───── 分 (0-59)
# │ ┌───── 时 (0-23)
# │ │ ┌───── 日 (1-31)
# │ │ │ ┌───── 月 (1-12)
# │ │ │ │ ┌───── 周 (0-7, 0和7都是周日)
# * * * * * command

# 常用示例
0 2 * * * /opt/scripts/backup.sh             # 每天凌晨 2 点
*/5 * * * * /opt/scripts/health-check.sh     # 每 5 分钟
0 9 * * 1-5 /opt/scripts/report.sh           # 工作日 9 点
0 0 1 * * /opt/scripts/monthly-cleanup.sh    # 每月 1 号`}
            </CodeBlock>
          </Card>
          <Card title="Systemd Timer（替代 Cron）">
            <CodeBlock title="bash">
{`# 创建 timer
cat > /etc/systemd/system/backup.timer << 'EOF'
[Unit]
Description=Daily backup timer

[Timer]
OnCalendar=daily
Persistent=true
RandomizedDelaySec=600

[Install]
WantedBy=timers.target
EOF

cat > /etc/systemd/system/backup.service << 'EOF'
[Unit]
Description=Backup service

[Service]
Type=oneshot
ExecStart=/opt/scripts/backup.sh
User=deploy
EOF

systemctl enable --now backup.timer
systemctl list-timers                    # 查看所有 timer`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 14 排查速查 ========== */}
        <section id="sec-troubleshoot" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔍" color="cyan" title="进程与端口排查速查" />
          <Card title="高频排查场景">
            <CodeBlock title="bash">
{`# 谁占用了 80 端口？
ss -tlnp | grep :80
lsof -i :80

# 谁在吃 CPU？
top -bn1 | head -15
ps aux --sort=-%cpu | head -5

# 谁在吃内存？
ps aux --sort=-%mem | head -5
smem -t -k -s pss | head -10

# 僵尸进程清理
ps aux | awk '$8=="Z" {print $2}' | xargs kill -9
ps -eo pid,ppid,stat,cmd | grep -w Z

# 磁盘满了怎么查？
df -h                                      # 确认哪个分区满
du -sh /* | sort -rh | head -10            # 找大目录
lsof +L1                                   # 已删除但未释放的文件

# OOM Killer 记录
dmesg -T | grep -i "out of memory"
journalctl -k | grep -i "oom"

# 网络不通排查顺序
ping gateway                               # 1. 先看网关
ping 8.8.8.8                               # 2. 外网
dig example.com                            # 3. DNS
curl -v https://example.com                # 4. 应用层`}
            </CodeBlock>
          </Card>
          <Card title="性能瓶颈定位流程">
            <CodeBlock title="bash">
{`# 1. 快速概览
uptime                    # 负载是否过高
dmesg -T | tail           # 内核告警
vmstat 1 5                # CPU/内存/IO 概览

# 2. CPU 瓶颈
mpstat -P ALL 1 3         # 是否单核满载
pidstat -u 1 5            # 哪个进程

# 3. 内存瓶颈
free -h                   # 是否耗尽
slabtop                   # 内核缓存

# 4. IO 瓶颈
iostat -xz 1 5            # await > 10ms 或 %util > 80% 说明慢
iotop                     # 哪个进程在 IO

# 5. 网络瓶颈
sar -n DEV 1 5            # 网卡流量
ss -s                     # 连接数统计`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 15 Kubernetes ========== */}
        <section id="sec-k8s" data-knowledge-section className="mb-14">
          <SectionHeader icon="🎯" color="purple" title="Kubernetes 基础命令" />
          <Card title="集群与节点">
            <CodeBlock title="bash">
{`# 集群信息
kubectl cluster-info                        # 集群 API 地址
kubectl get nodes                           # 节点列表
kubectl describe node node-name             # 节点详情
kubectl top nodes                           # 节点资源使用率

# 上下文管理（多集群切换）
kubectl config get-contexts                 # 查看所有集群上下文
kubectl config use-context production       # 切换到生产集群
kubectl config set-context --current --namespace=app-prod

# 命名空间
kubectl get namespaces                      # 列出所有命名空间
kubectl create namespace staging            # 创建命名空间`}
            </CodeBlock>
          </Card>
          <Card title="Pod 管理">
            <CodeBlock title="bash">
{`kubectl get pods -o wide                    # Pod 列表（含节点和 IP）
kubectl get pods -A                         # 所有命名空间的 Pod
kubectl get pods -l app=nginx               # 按标签筛选
kubectl describe pod pod-name               # Pod 详情
kubectl logs -f pod-name                    # 实时日志
kubectl logs pod-name -c sidecar            # 多容器 Pod 指定容器
kubectl logs --previous pod-name            # 上一次崩溃的日志
kubectl exec -it pod-name -- bash           # 进入 Pod
kubectl port-forward pod-name 8080:80       # 端口转发到本地
kubectl delete pod pod-name --grace-period=0 --force  # 强制删除`}
            </CodeBlock>
          </Card>
          <Card title="Deployment 管理">
            <CodeBlock title="bash">
{`kubectl get deployments                     # Deployment 列表
kubectl rollout status deployment myapp     # 滚动更新状态
kubectl rollout history deployment myapp    # 版本历史
kubectl scale deployment myapp --replicas=5 # 扩容到 5 副本
kubectl autoscale deployment myapp --min=2 --max=10 --cpu-percent=70  # HPA
kubectl set image deployment myapp app=myapp:2.0     # 更新镜像
kubectl rollout undo deployment myapp                 # 回滚到上一版本
kubectl rollout undo deployment myapp --to-revision=3 # 回滚到指定版本
kubectl rollout restart deployment myapp              # 重启所有 Pod`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 16 Nginx ========== */}
        <section id="sec-nginx" data-knowledge-section className="mb-14">
          <SectionHeader icon="🌐" color="green" title="Nginx/Apache 配置速查" />
          <Card title="Nginx 基础操作">
            <CodeBlock title="bash">
{`# 安装与检查
nginx -t                                    # 测试配置语法
nginx -T                                    # 测试并打印完整配置
nginx -s reload                             # 平滑重载（不断连接）
nginx -s stop                               # 停止

# 配置文件位置
cat /etc/nginx/nginx.conf                   # 主配置
ls /etc/nginx/conf.d/                       # 站点配置目录

# 日志查看
tail -f /var/log/nginx/access.log           # 访问日志
tail -f /var/log/nginx/error.log            # 错误日志`}
            </CodeBlock>
          </Card>
          <Card title="反向代理配置">
            <CodeBlock title="nginx">
{`server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}
            </CodeBlock>
            <CodeBlock title="nginx — WebSocket 代理">
{`location /ws {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
}`}
            </CodeBlock>
          </Card>
          <Card title="SSL 配置">
            <CodeBlock title="bash — Let's Encrypt 免费证书">
{`# 安装
apt install -y certbot python3-certbot-nginx
certbot --nginx -d app.example.com              # 自动配置

# 手动 SSL
server {
    listen 443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/app.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    add_header Strict-Transport-Security "max-age=31536000" always;
}

# HTTP 跳转 HTTPS
server {
    listen 80;
    return 301 https://$host$request_uri;
}

# 证书自动续期
certbot renew --dry-run
echo "0 3 * * * certbot renew --quiet" | crontab -`}
            </CodeBlock>
          </Card>
          <Card title="负载均衡">
            <CodeBlock title="nginx">
{`# 轮询（默认）
upstream backend {
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
    server 10.0.0.3:8080;
}

# 加权轮询
upstream backend {
    server 10.0.0.1:8080 weight=3;
    server 10.0.0.2:8080 weight=2;
    server 10.0.0.3:8080 weight=1;
}

# IP 哈希（会话保持）
upstream backend {
    ip_hash;
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
}

# 被动健康检查
upstream backend {
    server 10.0.0.1:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.2:8080 max_fails=3 fail_timeout=30s;
}`}
            </CodeBlock>
          </Card>
          <Card title="限流与安全">
            <CodeBlock title="nginx">
{`http {
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_conn_zone $binary_remote_addr zone=conn:10m;

    server {
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            limit_conn conn 50;
        }
    }
}

# IP 黑白名单
location /admin {
    allow 10.0.0.0/8;
    deny all;
}

autoindex off;                # 禁止目录浏览
server_tokens off;            # 隐藏版本号
client_max_body_size 100M;    # 请求体大小限制`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 17 Git 企业工作流 ========== */}
        <section id="sec-git" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔀" color="cyan" title="Git 企业工作流" />
          <Card title="分支管理">
            <CodeBlock title="bash">
{`git branch                                  # 查看本地分支
git branch -r                               # 查看远程分支
git branch -a                               # 查看所有分支
git checkout -b feature/login origin/develop  # 创建并追踪远程分支
git switch -c feature/payment               # Git 2.23+ 新语法
git branch -d feature/old                   # 删除已合并分支
git branch -D feature/abandoned             # 强制删除未合并分支
git push origin --delete feature/old        # 删除远程分支`}
            </CodeBlock>
          </Card>
          <Card title="提交与暂存">
            <CodeBlock title="bash">
{`git status                                  # 工作区状态
git diff                                    # 未暂存的变更
git diff --cached                           # 已暂存的变更
git diff main..feature                      # 分支间差异

git add file.txt                            # 暂存指定文件
git add -p                                  # 交互式选择暂存（hunk 级别）
git restore --staged file.txt               # 取消暂存

git commit -m "feat: add login page"        # 常规提交
git commit -am "fix: resolve null pointer"  # 暂存+提交一步完成
git commit --amend                           # 修改最近一次提交`}
            </CodeBlock>
          </Card>
          <Card title="Rebase 与合并策略">
            <CodeBlock title="bash — Merge（保留分支历史）">
{`git checkout develop
git merge feature/login                     # 合并到 develop
git merge --no-ff feature/login             # 强制创建合并提交`}
            </CodeBlock>
            <CodeBlock title="bash — Rebase（线性历史，推荐）">
{`git checkout feature/login
git rebase develop                          # 将 feature 变基到 develop
# 解决冲突后
git rebase --continue                       # 继续
git rebase --abort                          # 放弃 rebase`}
            </CodeBlock>
            <CodeBlock title="bash — Cherry-pick（提取特定提交）">
{`git cherry-pick abc1234                     # 将指定提交应用到当前分支
git cherry-pick --no-commit abc1234         # 只应用变更不自动提交`}
            </CodeBlock>
          </Card>
          <Card title="Bisect 与调试">
            <CodeBlock title="bash — 二分查找 bug">
{`git bisect start                            # 开始二分
git bisect bad                              # 当前版本有 bug
git bisect good v1.0                        # v1.0 没有 bug
# Git 自动切换到中间提交，测试后标记
git bisect good                             # 这个版本没问题
git bisect bad                              # 这个版本有问题
git bisect reset                            # 结束并恢复`}
            </CodeBlock>
            <CodeBlock title="bash — Stash（临时保存工作区）">
{`git stash                                   # 保存当前工作
git stash list                              # 查看所有 stash
git stash pop                               # 恢复并删除最近一次
git stash apply stash@{2}                   # 恢复指定 stash
git stash drop stash@{0}                    # 删除指定 stash`}
            </CodeBlock>
          </Card>
          <Card title="企业 Git 规范">
            <CmdList items={[
              ['feature/TICKET-123-login-page', '功能分支命名'],
              ['bugfix/TICKET-456-null-pointer', '修复分支命名'],
              ['hotfix/TICKET-789-production-crash', '紧急修复分支'],
              ['git commit -m "feat(auth): add OAuth2 login"', 'Conventional Commits'],
              ['git shortlog -sn --no-merges | head -10', '查看项目贡献者'],
              ['git blame file.txt', '逐行查看谁改的'],
            ]} />
          </Card>
        </section>

        {/* ========== 18 nmcli / netplan ========== */}
        <section id="sec-netplan" data-knowledge-section className="mb-14">
          <SectionHeader icon="📡" color="blue" title="systemd 网络配置（nmcli / netplan）" />
          <Card title="nmcli（NetworkManager 命令行）">
            <CodeBlock title="bash — 网络概览">
{`nmcli general status                        # NetworkManager 状态
nmcli device status                         # 所有网络设备状态
nmcli device show eth0                      # 指定设备详细信息
nmcli connection show                       # 所有连接配置`}
            </CodeBlock>
            <CodeBlock title="bash — 静态 IP 配置">
{`nmcli connection modify eth0 \\
    ipv4.method manual \\
    ipv4.addresses 192.168.1.100/24 \\
    ipv4.gateway 192.168.1.1 \\
    ipv4.dns "8.8.8.8 8.8.4.4"
nmcli connection up eth0                    # 使配置生效`}
            </CodeBlock>
            <CodeBlock title="bash — Bonding（链路聚合）">
{`nmcli connection add type bond con-name bond0 ifname bond0 \\
    bond.options "mode=active-backup,miimon=100"
nmcli connection add type ethernet slave-type bond master bond0 \\
    ifname eth0 con-name bond0-slave1
nmcli connection up bond0`}
            </CodeBlock>
          </Card>
          <Card title="netplan（Ubuntu 18.04+）">
            <CodeBlock title="yaml — /etc/netplan/01-static.yaml">
{`network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: false
      addresses:
        - 192.168.1.100/24
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4`}
            </CodeBlock>
            <CodeBlock title="bash">
{`netplan generate                            # 验证配置生成
netplan try                                 # 试运行（超时自动回滚）
netplan apply                               # 应用配置`}
            </CodeBlock>
          </Card>
          <Card title="路由管理">
            <CodeBlock title="bash">
{`# 静态路由
ip route add 10.0.0.0/8 via 192.168.1.254      # 添加路由
ip route del 10.0.0.0/8 via 192.168.1.254      # 删除路由
ip route get 10.0.0.1                           # 查看到达某网段的路由

# 持久化路由（nmcli）
nmcli connection modify eth0 +ipv4.routes "10.0.0.0/8 192.168.1.254"
nmcli connection up eth0`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 19 常见问题排查 ========== */}
        <section id="sec-faq" data-knowledge-section className="mb-14">
          <SectionHeader icon="🚨" color="red" title="常见问题排查" />
          <Card title="服务无法启动">
            <CodeBlock title="bash">
{`systemctl status 服务名                   # 查看状态和最近日志
journalctl -xeu 服务名                     # 查看详细错误
cat /var/log/服务名/error.log              # 应用日志
ss -tlnp | grep :端口                     # 端口是否被占用`}
            </CodeBlock>
          </Card>
          <Card title="SSH 连接失败">
            <CodeBlock title="bash">
{`ssh -v deploy@server                      # 开启 verbose 调试
tail -20 /var/log/auth.log                # 认证日志
systemctl status sshd                     # 服务状态
# 检查防火墙、密钥权限（600）、sshd_config 配置`}
            </CodeBlock>
          </Card>
          <Card title="磁盘空间不足">
            <CodeBlock title="bash">
{`df -hT                                    # 确认分区
du -sh /* 2>/dev/null | sort -rh | head    # 找大目录
find / -size +1G -type f 2>/dev/null       # 找大文件
# 已删除但被进程占用的文件
lsof +L1 | awk '$7 > 1073741824 {print}'   # >1GB 的已删文件
# 解决：重启占用进程释放文件句柄`}
            </CodeBlock>
          </Card>
          <Card title="内存不足 / OOM">
            <CodeBlock title="bash">
{`dmesg -T | grep -i "oom"                  # 确认 OOM
ps aux --sort=-%mem | head -10             # 内存大户
free -h                                    # 当前可用
# 调整 OOM 分数保护关键进程
echo -1000 > /proc/$(pgrep sshd)/oom_score_adj`}
            </CodeBlock>
          </Card>
          <Card title="网络不通排查顺序">
            <CodeBlock title="bash">
{`ip route show                             # 1. 默认网关是否存在
ping -c 2 网关IP                          # 2. 网关可达
ping -c 2 8.8.8.8                         # 3. 外网可达
dig example.com                           # 4. DNS 解析正常
curl -v URL                               # 5. 应用层可达
# 如有问题：检查防火墙、安全组、DNS 配置`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 20 Bash 效率技巧 ========== */}
        <section id="sec-tips" data-knowledge-section className="mb-14">
          <SectionHeader icon="💡" color="green" title="Bash 实用技巧" />
          <Card title="Bash 快捷操作">
            <CodeBlock title="bash">
{`# 历史命令搜索
Ctrl+R                                   # 反向搜索历史命令
!!                                       # 重复上一条命令
!$                                       # 上一条命令的最后一个参数
!grep                                    # 重复最近一次 grep 命令

# 快捷操作
Ctrl+C                                   # 终止当前命令
Ctrl+Z                                   # 挂起当前命令
fg                                       # 恢复前台
bg                                       # 恢复后台

# 命令组合
command1 && command2                      # command1 成功才执行 command2
command1 || command2                      # command1 失败才执行 command2
command1 ; command2                       # 无条件依次执行
command1 | tee output.log                 # 同时输出到终端和文件`}
            </CodeBlock>
          </Card>
          <Card title="效率别名与函数">
            <CodeBlock title="bash — ~/.bashrc 别名">
{`alias ll='ls -alF'
alias ports='ss -tlnp'
alias df='df -hT'
alias free='free -h'
alias myip='curl -s https://ipinfo.io/json | jq -r ".ip"'`}
            </CodeBlock>
            <CodeBlock title="bash — ~/.bashrc 函数">
{`mkcd() { mkdir -p "$1" && cd "$1"; }
backup() { cp "$1" "$1.bak.$(date +%Y%m%d)"; }
extract() {
  case $1 in
    *.tar.bz2) tar xjf $1 ;;
    *.tar.gz)  tar xzf $1 ;;
    *.tar.xz)  tar xJf $1 ;;
    *.zip)     unzip $1 ;;
    *.gz)      gunzip $1 ;;
  esac
}`}
            </CodeBlock>
            <CodeBlock title="bash — 批量操作">
{`for host in web{01..05}; do ssh $host "uptime"; done    # 批量执行
for f in *.log; do echo "=== $f ==="; head -5 "$f"; done  # 批量查看`}
            </CodeBlock>
          </Card>
        </section>

      </KnowledgeLayout>
    </div>
  );
}

function SectionHeader({ icon, color, title }: { icon: string; color: string; title: string }) {
  const colorMap: Record<string, string> = {
    cyan: "bg-neon-cyan/10",
    blue: "bg-neon-cyan/10",
    purple: "bg-neon-purple/10",
    orange: "bg-[rgba(255,171,64,0.12)]",
    red: "bg-[rgba(255,82,82,0.12)]",
    yellow: "bg-[rgba(255,215,64,0.12)]",
    green: "bg-neon-green/10",
    pink: "bg-[rgba(255,128,171,0.12)]",
  };
  return (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-space-border">
      <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg", colorMap[color] || colorMap.cyan)}>
        {icon}
      </div>
      <h2 className="text-xl font-bold text-text-primary">{title}</h2>
    </div>
  );
}

function Card({
  badge,
  badgeType,
  title,
  children,
}: {
  badge?: string;
  badgeType?: "android" | "ios" | "both";
  title?: string;
  children: React.ReactNode;
}) {
  const badgeStyles = {
    android: "bg-neon-green/10 text-neon-green",
    ios: "bg-neon-cyan/10 text-neon-cyan",
    both: "bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 text-neon-cyan",
  };
  return (
    <div className="card-glow rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        {title && <div className="font-semibold text-text-primary text-sm">{title}</div>}
        {badge && badgeType && (
          <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", badgeStyles[badgeType])}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="knowledge-code-block mb-3 last:mb-0 rounded-xl overflow-hidden border border-space-border">
      <div className="px-4 py-2 border-b border-space-border bg-space-card/50">
        <span className="text-[11px] text-text-secondary uppercase tracking-wider">{title}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        <code className="text-neon-cyan/80">{children}</code>
      </pre>
    </div>
  );
}

function CmdList({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-2">
      {items.map(([cmd, desc], i) => (
        <li key={i} className="flex gap-3 items-baseline text-sm border-b border-space-border/50 pb-2 last:border-b-0 last:pb-0">
          <code className="flex-shrink-0 text-xs">{cmd}</code>
          <span className="text-text-secondary text-xs truncate">{desc}</span>
        </li>
      ))}
    </ul>
  );
}
