const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function generateThumbnail() {
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const primaryColor = document.getElementById('primaryColor').value;
  const textColor = document.getElementById('textColor').value;
  const pattern = document.getElementById('patternStyle').value;
  
  // 清空画布并设置背景色
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 绘制选中的背景样式
  switch(pattern) {
    case 'gradient':
      drawGradient(primaryColor);
      break;
    case 'geometric':
      drawGeometric(primaryColor);
      break;
    case 'dots':
      drawDots(primaryColor);
      break;
    case 'waves':
      drawWaves(primaryColor);
      break;
  }
  
  // 设置文字样式
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
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
}

// 绘制渐变背景
function drawGradient(color) {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, shiftColor(color, 30));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 绘制几何图案
function drawGeometric(color) {
  ctx.fillStyle = shiftColor(color, 20);
  for(let i = 0; i < 10; i++) {
    const size = Math.random() * 200 + 100;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    drawPolygon(x, y, size, 6);
  }
}

// 绘制点阵图案
function drawDots(color) {
  ctx.fillStyle = shiftColor(color, 15);
  const spacing = 30;
  for(let x = spacing; x < canvas.width; x += spacing) {
    for(let y = spacing; y < canvas.height; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// 绘制波浪图案
function drawWaves(color) {
  ctx.strokeStyle = shiftColor(color, 25);
  ctx.lineWidth = 2;
  for(let i = 0; i < 5; i++) {
    drawWave(canvas.height/6 * i);
  }
}

// 辅助函数
function shiftColor(color, amount) {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;
  return `rgba(${r+amount}, ${g+amount}, ${b+amount}, 0.3)`;
}

function drawPolygon(x, y, size, sides) {
  ctx.beginPath();
  for(let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if(i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

function drawWave(offset) {
  ctx.beginPath();
  for(let x = 0; x < canvas.width; x++) {
    const y = Math.sin(x/100) * 50 + offset;
    if(x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function downloadThumbnail() {
  const link = document.createElement('a');
  link.download = 'course-thumbnail.png';
  link.href = canvas.toDataURL();
  link.click();
}

// 添加事件监听
document.getElementById('primaryColor').addEventListener('input', generateThumbnail);
document.getElementById('textColor').addEventListener('input', generateThumbnail);
document.getElementById('patternStyle').addEventListener('change', generateThumbnail);
document.getElementById('title').addEventListener('input', generateThumbnail);
document.getElementById('subtitle').addEventListener('input', generateThumbnail);

// 初始化时生成一次
generateThumbnail(); 