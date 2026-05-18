import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/site";
import { KnowledgeLayout } from "@/components/KnowledgeLayout";

export const metadata = buildPageMetadata({
  title: "ADB 命令使用手册 — Android & iOS",
  description: "Android ADB + iOS libimobiledevice / tidevice 完整参考，120+ 命令覆盖设备管理、应用操控、日志调试、自动化测试等场景",
  path: "/knowledge/adb-commands",
  tags: ["Android", "iOS", "ADB", "测试", "自动化"],
});

export default function AdbCommandsPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <Link
        href="/knowledge"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回手册列表
      </Link>

      <KnowledgeLayout>
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            ADB 命令使用手册
          </h1>
          <p className="text-text-secondary text-lg mb-6">
            Android ADB + iOS libimobiledevice / tidevice 完整参考 — 测试工程师必备设备操控指南
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <span>16 章节</span>
            <span>120+ 命令</span>
            <span>Android & iOS</span>
            <span>12 测试场景</span>
          </div>
        </div>

        {/* ========== 1. 环境准备 ========== */}
        <section id="sec-env" data-knowledge-section className="mb-14">
          <SectionHeader icon="⚙" color="cyan" title="环境准备" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="Android" badgeType="android">
              <CodeBlock title="bash">
{`# 下载 platform-tools 加入 PATH
# https://developer.android.com/studio/releases/platform-tools

adb version
adb devices`}
              </CodeBlock>
            </Card>
            <Card badge="iOS" badgeType="ios">
              <CodeBlock title="bash">
{`# macOS（推荐）
brew install libimobiledevice ideviceinstaller

# Python 版（跨平台，阿里出品）
pip install tidevice

# 验证
idevice_id -l
tidevice list`}
              </CodeBlock>
            </Card>
          </div>
        </section>

        {/* ========== 2. 设备管理 ========== */}
        <section id="sec-dev" data-knowledge-section className="mb-14">
          <SectionHeader icon="📱" color="blue" title="设备管理" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="Android" badgeType="android" title="设备管理">
              <CmdList items={[
                ["adb devices", "列出已连接设备"],
                ["adb devices -l", "列出设备详情（型号/状态）"],
                ["adb connect <ip>:<port>", "无线连接设备"],
                ["adb disconnect", "断开所有无线连接"],
                ["adb -s <serial> shell", "指定设备执行 shell"],
                ["adb root", "以 root 权限重启 adbd"],
                ["adb remount", "重新挂载 /system 为可写"],
                ["adb reboot", "重启设备"],
                ["adb reboot recovery", "重启到 Recovery 模式"],
                ["adb reboot bootloader", "重启到 Bootloader/Fastboot"],
              ]} />
            </Card>
            <Card badge="iOS" badgeType="ios" title="设备管理">
              <CmdList items={[
                ["idevice_id -l", "列出已连接设备 UDID"],
                ["ideviceinfo", "查看设备详细信息"],
                ["ideviceinfo -k ProductType", "查看设备型号"],
                ["ideviceinfo -k DeviceName", "查看设备名称"],
                ["tidevice list", "列出已连接设备"],
                ["tidevice -u <udid> info", "指定设备查看信息"],
                ["idevicesyslog", "实时查看设备系统日志"],
                ["idevicediagnostics restart", "重启设备"],
              ]} />
            </Card>
          </div>
        </section>

        {/* ========== 3. 应用管理 ========== */}
        <section id="sec-app" data-knowledge-section className="mb-14">
          <SectionHeader icon="📦" color="purple" title="应用（App）管理" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="Android" badgeType="android" title="App 管理">
              <CodeBlock title="bash — 安装/卸载">
{`# 安装
adb install app.apk
adb install -r app.apk         # 覆盖安装（保留数据）
adb install -t app.apk         # 允许测试包
adb install -d app.apk         # 降级安装

# 卸载
adb uninstall com.example.app
adb uninstall -k com.example.app  # 卸载但保留数据`}
              </CodeBlock>
              <CodeBlock title="bash — 查询/启动">
{`adb shell pm list packages -3    # 第三方包
adb shell pm path com.tencent.mm # 查看包路径
adb shell pm clear com.example.app # 清除数据
adb shell am force-stop com.example.app
adb shell am start -n com.example.app/.MainActivity
adb shell dumpsys activity activities | grep mResumedActivity`}
              </CodeBlock>
            </Card>
            <Card badge="iOS" badgeType="ios" title="App 管理">
              <CodeBlock title="bash">
{`# 安装
ideviceinstaller -i com.example.app.ipa
tidevice install app.ipa

# 卸载
ideviceinstaller -U com.example.app
tidevice uninstall com.example.app

# 列出已安装
ideviceinstaller -l
tidevice applist

# 启动 / 停止
idevicediagnostics launch com.example.app
idevicediagnostics terminate com.example.app`}
              </CodeBlock>
            </Card>
          </div>
        </section>

        {/* ========== 4. 文件传输 ========== */}
        <section id="sec-file" data-knowledge-section className="mb-14">
          <SectionHeader icon="📁" color="orange" title="文件传输" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="Android" badgeType="android" title="文件传输">
              <CmdList items={[
                ["adb push local.txt /sdcard/", "推送到设备"],
                ["adb push ./assets/ /sdcard/Download/", "推送文件夹"],
                ["adb pull /sdcard/photo.jpg ./", "从设备拉取"],
                ["adb shell ls /sdcard/", "查看存储"],
                ["adb shell df -h", "磁盘空间"],
              ]} />
            </Card>
            <Card badge="iOS" badgeType="ios" title="文件传输">
              <CmdList items={[
                ["afcclient pull /Photo.jpg ./", "拉取文件"],
                ["afcclient push ./test.txt /test.txt", "推送文件"],
                ["afcclient ls /Documents/", "查看沙盒文件"],
                ["afcclient ls /tmp/", "查看临时目录"],
              ]} />
            </Card>
          </div>
        </section>

        {/* ========== 5. Shell 命令 ========== */}
        <section id="sec-shell" data-knowledge-section className="mb-14">
          <SectionHeader icon=">_ " color="cyan" title="Shell 常用命令" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="Android" badgeType="android" title="Shell">
              <CodeBlock title="bash — 系统信息">
{`adb shell getprop ro.build.version.release  # Android 版本
adb shell getprop ro.product.model          # 型号
adb shell getprop ro.serialno               # 序列号
adb shell cat /proc/cpuinfo                 # CPU 信息
adb shell cat /proc/meminfo                 # 内存信息
adb shell dumpsys battery                   # 电池信息
adb shell wm size                           # 屏幕分辨率
adb shell wm density                        # 屏幕密度`}
              </CodeBlock>
              <CodeBlock title="bash — 输入操作">
{`adb shell input text "hello"            # 输入文本
adb shell input keyevent 26             # 电源键
adb shell input keyevent 3              # HOME 键
adb shell input keyevent 4              # 返回键
adb shell input keyevent 66             # 回车键
adb shell input swipe 300 500 300 100   # 滑动
adb shell input tap 500 800             # 点击坐标`}
              </CodeBlock>
            </Card>
            <Card badge="iOS" badgeType="ios" title="Shell（tidevice）">
              <CodeBlock title="bash">
{`# 屏幕截图
tidevice screenshot screen.png

# 录屏（需开发者模式）
tidevice screenrecord screen.mp4

# 屏幕操作
tidevice tap 200 400
tidevice swipe 200 500 200 100
tidevice longpress 200 400
tidevice text "hello"`}
              </CodeBlock>
            </Card>
          </div>
        </section>

        {/* ========== 6. 截图录屏 ========== */}
        <section id="sec-screen" data-knowledge-section className="mb-14">
          <SectionHeader icon="📸" color="yellow" title="屏幕截图与录屏" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="Android" badgeType="android" title="截图/录屏">
              <CodeBlock title="bash">
{`# 截图
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# 一键截图到本地
adb shell screencap -p > screenshot.png

# 录屏（最长 180 秒）
adb shell screenrecord /sdcard/record.mp4 --time-limit 30
adb shell screenrecord /sdcard/record.mp4 --size 720x1280
adb shell screenrecord /sdcard/record.mp4 --bit-rate 4000000

# 结束录屏：Ctrl+C`}
              </CodeBlock>
            </Card>
            <Card badge="iOS" badgeType="ios" title="截图/录屏">
              <CodeBlock title="bash">
{`# 截图
idevicescreenshot screenshot.png
tidevice screenshot screen.png

# 录屏
tidevice screenrecord record.mp4 --time 30

# macOS 可用 QuickTime 实时预览`}
              </CodeBlock>
            </Card>
          </div>
        </section>

        {/* ========== 7. 日志调试 ========== */}
        <section id="sec-log" data-knowledge-section className="mb-14">
          <SectionHeader icon="📋" color="red" title="日志与调试" />
          <div className="mb-4">
            <Card badge="Android" badgeType="android" title="Logcat">
              <CodeBlock title="bash">
{`# 实时查看日志
adb logcat

# 过滤特定标签
adb logcat -s ActivityManager:I *:S
adb logcat | grep -i "error"
adb logcat | grep -i "crash"

# 清除日志
adb logcat -c

# 输出到文件
adb logcat -f /sdcard/logcat.txt

# 按优先级过滤
adb logcat *:E          # 只看 error 及以上
adb logcat *:W          # 只看 warn 及以上

# 查看崩溃日志
adb logcat -b crash
adb logcat -b main -b system -b crash

# 查看 ANR 日志
adb shell cat /data/anr/traces.txt`}
              </CodeBlock>
            </Card>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="iOS" badgeType="ios" title="日志">
              <CmdList items={[
                ["idevicesyslog", "实时查看日志"],
                ["idevicesyslog | grep -i \"error\"", "过滤错误日志"],
                ["idevicesyslog > ios_log.txt", "导出日志"],
              ]} />
            </Card>
            <Card badge="Both" badgeType="both" title="性能分析">
              <CodeBlock title="Android">
{`adb shell top -n 1 | head -20
adb shell dumpsys cpuinfo
adb shell dumpsys meminfo com.example.app`}
              </CodeBlock>
              <p className="text-text-secondary text-sm mt-3">
                iOS 使用 Xcode Instruments 获取详细性能数据。
              </p>
            </Card>
          </div>
        </section>

        {/* ========== 8. 端口转发 ========== */}
        <section id="sec-port" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔌" color="green" title="端口转发与调试桥" />
          <Card badge="Android" badgeType="android" title="端口转发">
            <CodeBlock title="bash">
{`# 本地端口转发
adb forward tcp:8080 tcp:8080
adb forward tcp:9222 localabstract:webview_devtools_remote_0

# 查看所有转发
adb forward --list
adb forward --remove tcp:8080
adb forward --remove-all

# 反向转发（设备访问电脑）
adb reverse tcp:8080 tcp:3000
adb reverse --list
adb reverse --remove-all`}
            </CodeBlock>
            <p className="text-text-secondary text-sm mt-3">
              使用场景：设备上的 App 调试电脑上的 Web 页面。Chrome DevTools 远程调试流程：开启 USB 调试 → forward 9222 端口 → 电脑 Chrome 打开 <code>chrome://inspect</code>。
            </p>
          </Card>
        </section>

        {/* ========== 9. 包管理 ========== */}
        <section id="sec-pm" data-knowledge-section className="mb-14">
          <SectionHeader icon="📦" color="purple" title="Package Manager（包管理）" />
          <Card badge="Android" badgeType="android" title="PM 命令">
            <CodeBlock title="bash">
{`# 查看已安装包
adb shell pm list packages -f     # 包名 + 路径
adb shell pm list packages -3     # 第三方包
adb shell pm list packages -s     # 系统包
adb shell pm list packages -d     # 禁用的包
adb shell pm list packages -e     # 启用的包

# 启用/禁用
adb shell pm disable-user com.example.app
adb shell pm enable com.example.app

# 查看包详情
adb shell dumpsys package com.example.app

# 权限管理
adb shell pm list permissions
adb shell pm list permissions -g

# 清除缓存
adb shell pm clear com.example.app

# APK 信息
aapt dump badging app.apk | head -20`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 10. 活动管理 ========== */}
        <section id="sec-am" data-knowledge-section className="mb-14">
          <SectionHeader icon="🚀" color="orange" title="Activity Manager（活动管理）" />
          <Card badge="Android" badgeType="android" title="AM 命令">
            <CodeBlock title="bash">
{`# 启动 Activity
adb shell am start -n com.example.app/.MainActivity
adb shell am start -a android.intent.action.VIEW -d "https://example.com"
adb shell am start -n com.android.settings/.Settings

# 带参数启动
adb shell am start -n com.example.app/.MainActivity --es key "value"
adb shell am start -n com.example.app/.MainActivity --ei count 42
adb shell am start -n com.example.app/.MainActivity --ez flag true

# 强制停止 / 杀进程
adb shell am force-stop com.example.app
adb shell am kill com.example.app
adb shell am kill-all

# 发送广播
adb shell am broadcast -a com.example.ACTION --es data "test"

# 查看当前 Activity
adb shell dumpsys activity activities | grep mResumedActivity`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 11. 设备信息 ========== */}
        <section id="sec-info" data-knowledge-section className="mb-14">
          <SectionHeader icon="🔧" color="yellow" title="设备信息速查" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="Android" badgeType="android" title="系统属性">
              <CmdList items={[
                ["getprop ro.product.model", "型号"],
                ["getprop ro.product.brand", "品牌"],
                ["getprop ro.product.manufacturer", "制造商"],
                ["getprop ro.serialno", "序列号"],
                ["getprop ro.build.display.id", "构建号"],
                ["getprop ro.build.version.release", "Android 版本"],
                ["getprop ro.build.version.sdk", "SDK 版本"],
                ["getprop ro.product.cpu.abi", "CPU 架构"],
              ]} />
            </Card>
            <Card badge="iOS" badgeType="ios" title="设备信息">
              <CmdList items={[
                ["ideviceinfo -k ProductType", "型号"],
                ["ideviceinfo -k DeviceName", "设备名称"],
                ["ideviceinfo -k ProductVersion", "iOS 版本"],
                ["ideviceinfo -k SerialNumber", "序列号"],
                ["ideviceinfo -k UniqueDeviceID", "UDID"],
                ["ideviceinfo -k ModelNumber", "型号号码"],
                ["ideviceinfo -k RegionInfo", "地区版本"],
                ["ideviceinfo -k All", "查看所有信息"],
              ]} />
            </Card>
          </div>
        </section>

        {/* ========== 12. 自动化辅助 ========== */}
        <section id="sec-auto" data-knowledge-section className="mb-14">
          <SectionHeader icon="🤖" color="pink" title="自动化测试辅助" />
          <div className="mb-4">
            <Card badge="Android" badgeType="android" title="UI Automator & Monkey">
              <CodeBlock title="bash — UI Automator">
{`# 导出 UI 层级（用于 UI 自动化分析）
adb shell uiautomator dump /sdcard/ui.xml
adb pull /sdcard/ui.xml

# 查看 UI 元素
adb shell cat /sdcard/ui.xml | grep -o 'text="[^"]*"'
adb shell cat /sdcard/ui.xml | grep -o 'resource-id="[^"]*"'

# 运行 UI Automator 测试
adb shell am instrument -w com.example.test/android.support.test.runner.AndroidJUnitRunner`}
              </CodeBlock>
              <CodeBlock title="bash — Monkey 测试">
{`# 基本随机测试
adb shell monkey -p com.example.app -v 1000

# 指定事件数和延迟
adb shell monkey -p com.example.app --throttle 500 -v -v 5000

# 伪随机种子（可复现）
adb shell monkey -p com.example.app -s 12345 -v 1000

# 忽略崩溃和超时
adb shell monkey -p com.example.app --ignore-crashes --ignore-timeouts -v 1000

# 触摸事件比例调整
adb shell monkey -p com.example.app --pct-touch 40 --pct-motion 25 -v 500`}
              </CodeBlock>
            </Card>
          </div>
          <Card badge="Both" badgeType="both" title="Appium 对接 — 关闭/恢复动画">
            <CodeBlock title="bash">
{`# 关闭动画（提升自动化稳定性）
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0

# 恢复动画
adb shell settings put global window_animation_scale 1
adb shell settings put global transition_animation_scale 1
adb shell settings put global animator_duration_scale 1`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 13. 无线调试 ========== */}
        <section id="sec-wireless" data-knowledge-section className="mb-14">
          <SectionHeader icon="📶" color="cyan" title="无线调试（Android 11+）" />
          <Card badge="Android" badgeType="android" title="无线调试">
            <CodeBlock title="bash">
{`# 开启无线调试（需在设置中手动开启）
# 设置 → 开发者选项 → 无线调试

# 获取无线调试的 IP 和端口后连接
adb pair <ip>:<pairing_port>    # 配对（输入配对码）
adb connect <ip>:<connect_port>  # 连接

# 查看连接状态
adb devices`}
            </CodeBlock>
          </Card>
        </section>

        {/* ========== 14. 场景速查 ========== */}
        <section id="sec-scenario" data-knowledge-section className="mb-14">
          <SectionHeader icon="📋" color="green" title="常用场景速查表" />
          <div className="card-glow rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-space-border">
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5 w-1/5">场景</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5">Android 命令</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-primary bg-neon-cyan/5">iOS 命令</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["清除 App 数据", "adb shell pm clear com.xx", "卸载重装"],
                    ["强制停止 App", "adb shell am force-stop com.xx", "idevicediagnostics terminate com.xx"],
                    ["模拟返回键", "adb shell input keyevent 4", "不直接支持"],
                    ["模拟 HOME 键", "adb shell input keyevent 3", "不直接支持"],
                    ["模拟音量键", "adb shell input keyevent 24/25", "不直接支持"],
                    ["截图", "adb shell screencap -p > x.png", "idevicescreenshot x.png"],
                    ["录屏", "adb shell screenrecord /sdcard/x.mp4", "tidevice screenrecord x.mp4"],
                    ["查看日志", "adb logcat", "idevicesyslog"],
                    ["安装 App", "adb install app.apk", "ideviceinstaller -i app.ipa"],
                    ["卸载 App", "adb uninstall com.xx", "ideviceinstaller -U com.xx"],
                    ["查看内存", "adb shell dumpsys meminfo com.xx", "idevicediagnostics"],
                    ["远程调试 WebView", "adb forward tcp:9222 localabstract:webview_devtools_remote_0", "Safari 开发者工具"],
                  ].map(([scene, android, ios], i) => (
                    <tr key={i} className="border-b border-space-border last:border-b-0 hover:bg-neon-cyan/[0.02]">
                      <td className="px-4 py-2.5 font-semibold text-neon-yellow whitespace-nowrap">{scene}</td>
                      <td className="px-4 py-2.5"><code className="text-xs">{android}</code></td>
                      <td className="px-4 py-2.5"><code className="text-xs">{ios}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========== 15. 技巧速查 ========== */}
        <section id="sec-tips" data-knowledge-section className="mb-14">
          <SectionHeader icon="⭐" color="orange" title="技巧速查" />
          <div className="grid md:grid-cols-2 gap-4">
            <Card badge="Android" badgeType="android" title="ADB Server 管理">
              <CmdList items={[
                ["adb start-server", "启动 ADB 服务"],
                ["adb kill-server", "停止 ADB 服务"],
                ["adb version", "查看版本"],
              ]} />
            </Card>
            <Card badge="Both" badgeType="both" title="高级技巧">
              <CodeBlock title="bash">
{`# 屏幕常亮
adb shell svc power stayon true

# 关闭屏幕常亮
adb shell svc power stayon usb

# 设置屏幕超时（毫秒）
adb shell settings put system screen_off_timeout 60000

# 切换输入法
adb shell ime list -a
adb shell ime set com.example.ime/.ImeService

# 批量安装 APK
for f in *.apk; do adb install "$f"; done

# 批量卸载
for pkg in com.app1 com.app2 com.app3; do adb uninstall "$pkg"; done`}
              </CodeBlock>
            </Card>
          </div>
        </section>

        {/* ========== 16. 问题排查 ========== */}
        <section id="sec-issues" data-knowledge-section className="mb-14">
          <SectionHeader icon="🚨" color="red" title="常见问题排查" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              ["adb devices 空", "检查 USB 连接 + 开启 USB 调试 + 重新插拔数据线"],
              ["unauthorized", "手机上点击「允许 USB 调试」弹窗"],
              ["device offline", "adb kill-server && adb start-server"],
              ["insufficient storage", "adb shell pm clear com.xx 清缓存"],
              ["INSTALL_FAILED_ALREADY_EXISTS", "adb install -r 覆盖安装"],
              ["INSTALL_FAILED_VERSION_DOWNGRADE", "adb install -d 允许降级安装"],
              ["Permission denied", "adb root 获取 root 权限"],
              ["iOS 设备不可见", "确认「信任此电脑」+ 重装 libimobiledevice"],
              ["tidevice 找不到设备", "确认 USB 信任 + tidevice list 检查"],
            ].map(([title, solution], i) => (
              <div key={i} className="card-glow rounded-xl p-4 hover:border-neon-red/30 transition-colors">
                <div className="text-sm font-semibold text-neon-red mb-1.5">{title}</div>
                <div className="text-text-secondary text-xs">{solution}</div>
              </div>
            ))}
          </div>
        </section>

        {/* References */}
        <section className="mb-14">
          <SectionHeader icon="📖" color="green" title="参考文档" />
          <Card>
            <CmdList items={[
              ["Android ADB 官方文档", "developer.android.com/studio/command-line/adb"],
              ["libimobiledevice", "libimobiledevice.org"],
              ["tidevice（阿里开源）", "github.com/nicehash/tidevice"],
              ["Appium 文档", "appium.io/docs/en/latest"],
            ]} />
          </Card>
        </section>
      </KnowledgeLayout>
    </div>
  );
}

/* ========== Shared Components ========== */

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
      <div className={`w-10 h-10 rounded-xl ${colorMap[color] || colorMap.cyan} flex items-center justify-center text-lg flex-shrink-0`}>
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
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider ${badgeStyles[badgeType]}`}>
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
    <div className="mb-3 last:mb-0 rounded-xl overflow-hidden border border-space-border bg-black/30">
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
