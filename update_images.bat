@echo off
chcp 65001 >nul
echo.
echo ========================================
echo           图片列表更新工具
echo ========================================
echo.

:: 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到Node.js，请先安装Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

:: 检查static目录
if not exist "static" (
    echo ❌ static目录不存在，正在创建...
    mkdir static
    echo ✅ static目录已创建
    echo.
    echo 📁 请将图片文件放入static目录，然后重新运行此脚本
    pause
    exit /b 0
)

:: 运行图片列表生成器
echo 🔍 正在扫描static目录中的图片...
echo.
node generate_image_list.js

echo.
echo ========================================
echo 📝 使用说明：
echo 1. 复制上面生成的代码
echo 2. 打开carousel.html文件
echo 3. 找到"this.images = ["这一行
echo 4. 替换整个images数组
echo 5. 保存文件并刷新浏览器
echo ========================================
echo.
pause