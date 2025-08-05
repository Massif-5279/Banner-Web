// 图片列表生成器
// 这个脚本可以帮助您自动生成static目录下的图片列表
// 使用方法：在Node.js环境中运行此脚本

const fs = require('fs');
const path = require('path');

// 支持的图片格式
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];

function generateImageList() {
    const staticDir = './static';
    
    try {
        // 检查static目录是否存在
        if (!fs.existsSync(staticDir)) {
            console.log('❌ static目录不存在');
            return;
        }
        
        // 读取目录中的所有文件
        const files = fs.readdirSync(staticDir);
        
        // 过滤出图片文件
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });
        
        if (imageFiles.length === 0) {
            console.log('❌ static目录中没有找到图片文件');
            return;
        }
        
        // 生成图片路径数组
        const imagePaths = imageFiles.map(file => `'./static/${file}'`);
        
        console.log('✅ 找到以下图片文件：');
        imageFiles.forEach((file, index) => {
            console.log(`   ${index + 1}. ${file}`);
        });
        
        console.log('\n📋 请将以下代码复制到carousel.html中的images数组：');
        console.log('this.images = [');
        imagePaths.forEach((path, index) => {
            const comma = index < imagePaths.length - 1 ? ',' : '';
            console.log(`    ${path}${comma}`);
        });
        console.log('];');
        
        // 生成完整的JavaScript代码片段
        const jsCode = `// 自动生成的图片列表 - ${new Date().toLocaleString()}
this.images = [
${imagePaths.map(path => `    ${path}`).join(',\n')}
];`;
        
        // 保存到文件
        fs.writeFileSync('./image_list.js', jsCode);
        console.log('\n💾 图片列表已保存到 image_list.js 文件');
        
    } catch (error) {
        console.error('❌ 生成图片列表时出错：', error.message);
    }
}

// 运行生成器
generateImageList();