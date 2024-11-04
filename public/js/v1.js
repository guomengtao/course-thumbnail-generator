const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function generateThumbnail() {
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const bgColor = document.getElementById('bgColor').value;
  const textColor = document.getElementById('textColor').value;
  
  // 清空画布
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 设置文字样式
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 10;
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
  
  // 添加装饰元素
  drawDecoration();
}

function drawDecoration() {
  // 添加简单的装饰线条
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 2;
  
  // 左上角装饰
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.lineTo(140, 40);
  ctx.moveTo(40, 40);
  ctx.lineTo(40, 140);
  ctx.stroke();
  
  // 右下角装饰
  ctx.beginPath();
  ctx.moveTo(canvas.width - 40, canvas.height - 40);
  ctx.lineTo(canvas.width - 140, canvas.height - 40);
  ctx.moveTo(canvas.width - 40, canvas.height - 40);
  ctx.lineTo(canvas.width - 40, canvas.height - 140);
  ctx.stroke();
}

function downloadThumbnail() {
  const link = document.createElement('a');
  link.download = 'course-thumbnail.png';
  link.href = canvas.toDataURL();
  link.click();
}

// 添加颜色选择事件监听
document.getElementById('bgColor').addEventListener('input', generateThumbnail);
document.getElementById('textColor').addEventListener('input', generateThumbnail);

// 添加标题输入事件监听
document.getElementById('title').addEventListener('input', generateThumbnail);
document.getElementById('subtitle').addEventListener('input', generateThumbnail);

// 初始化时生成一次
generateThumbnail(); 