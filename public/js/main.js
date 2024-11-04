const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let currentPattern = 'circuit';
let currentColor = '#1e88e5';
let currentTextColor = '#ffffff';

// 颜色选择
document.querySelectorAll('.color-preset').forEach(preset => {
  preset.addEventListener('click', function() {
    currentColor = this.dataset.color;
    currentTextColor = '#ffffff';
    generateThumbnail();
  });
});

// 背景样式选择
document.querySelectorAll('.tech-pattern').forEach(pattern => {
  pattern.addEventListener('click', function() {
    currentPattern = this.dataset.pattern;
    document.querySelectorAll('.tech-pattern').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    generateThumbnail();
  });
});

// 绘制电路图案
function drawCircuitPattern() {
  const lineColor = shiftColor(currentColor, 30);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  
  for(let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    drawCircuitElement(x, y);
  }
}

function drawCircuitElement(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  
  for(let i = 0; i < 4; i++) {
    const length = Math.random() * 100 + 50;
    const direction = Math.floor(Math.random() * 4);
    
    switch(direction) {
      case 0: // 向右
        ctx.lineTo(x + length, y);
        x += length;
        break;
      case 1: // 向左
        ctx.lineTo(x - length, y);
        x -= length;
        break;
      case 2: // 向下
        ctx.lineTo(x, y + length);
        y += length;
        break;
      case 3: // 向上
        ctx.lineTo(x, y - length);
        y -= length;
        break;
    }
    
    ctx.arc(x, y, 3, 0, Math.PI * 2);
  }
  
  ctx.stroke();
}

// 绘制网格图案
function drawGridPattern() {
  const lineColor = shiftColor(currentColor, 20);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;
  
  const spacing = 50;
  for(let x = 0; x < canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  for(let y = 0; y < canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// 绘制点阵图案
function drawDotsPattern() {
  const dotColor = shiftColor(currentColor, 25);
  ctx.fillStyle = dotColor;
  
  const spacing = 30;
  for(let x = spacing; x < canvas.width; x += spacing) {
    for(let y = spacing; y < canvas.height; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// 绘制六边形图案
function drawHexPattern() {
  const hexColor = shiftColor(currentColor, 15);
  ctx.strokeStyle = hexColor;
  ctx.lineWidth = 1;
  
  const size = 40;
  const h = size * Math.sqrt(3);
  
  for(let x = 0; x < canvas.width + size; x += size * 1.5) {
    for(let y = 0; y < canvas.height + h; y += h) {
      drawHexagon(x + (Math.floor(y / h) % 2) * size * 0.75, y, size);
    }
  }
}

function drawHexagon(x, y, size) {
  ctx.beginPath();
  for(let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if(i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
}

// 颜色处理函数
function shiftColor(color, amount) {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  return `rgba(${r+amount}, ${g+amount}, ${b+amount}, 0.3)`;
}

// 生成缩略图
function generateThumbnail() {
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  
  // 清空画布并设置背景色
  ctx.fillStyle = currentColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制选中的科技背景
  switch(currentPattern) {
    case 'circuit':
      drawCircuitPattern();
      break;
    case 'grid':
      drawGridPattern();
      break;
    case 'dots':
      drawDotsPattern();
      break;
    case 'hex':
      drawHexPattern();
      break;
  }
  
  // 设置文字样式
  ctx.fillStyle = currentTextColor;
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // 绘制主标题
  ctx.font = 'bold 60px Arial';
  ctx.fillText(title || '输入课程标题', canvas.width/2, canvas.height/2 - 20);
  
  // 绘制副标题
  if (subtitle) {
    ctx.font = '30px Arial';
    ctx.fillText(subtitle, canvas.width/2, canvas.height/2 + 40);
  }
  
  // 清除阴影
  ctx.shadowColor = 'transparent';
}

// 下载功能
function downloadThumbnail() {
  const link = document.createElement('a');
  link.download = 'course-thumbnail.png';
  link.href = canvas.toDataURL();
  link.click();
}

// 添加标题输入事件监听
document.getElementById('title').addEventListener('input', generateThumbnail);
document.getElementById('subtitle').addEventListener('input', generateThumbnail);

// 初始化时生成一次
generateThumbnail();