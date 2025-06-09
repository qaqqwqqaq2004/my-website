// 练习弹窗
// 显示联系表单
function showContactForm() {
    document.querySelector("#contactModal").style.display = 'flex';

}

// 关闭联系表单
function closeContactForm() {
    document.querySelector("#contactModal").style.display = 'none';

}

// 如果点击弹窗外的区域，关闭弹窗
window.onclick = function(event) {

    
}




// 图片
// 获取弹出框和图片元素
const modal = document.getElementById("modal-1");
const modalImage = document.getElementById("modalImage");
const thumbnails = document.querySelectorAll(".thumbnail");
const closeBtn = document.getElementById("closeBtn-1");

// 当点击缩略图时，显示弹出框，并设置弹出图片的来源
thumbnails.forEach(function(thumbnail) {
    thumbnail.onclick = function() {
      modal.style.display = "flex"; // 显示弹出框
      modalImage.src = this.src;   // 设置弹出框中图片的源
    };
  });


// 当点击关闭按钮时，关闭弹出框
closeBtn.onclick = function() {
  modal.style.display = "none";
};

// 当点击弹出框外部区域时，也关闭弹出框
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};



// 视频
// 获取元素
const playButton = document.getElementById("playButton");
const modall = document.getElementById("modal-2");
const closeButton = document.getElementById("closeButton-2");
const videoPlayer = document.getElementById("videoPlayer");
const progressBar = document.getElementById("progressBar");
const muteButton = document.getElementById("muteButton");
const volumeBar = document.getElementById("volumeBar");

// 打开弹窗
playButton.addEventListener("click", function() {
  modall.style.display = "flex";
  videoPlayer.play();
});

// 关闭弹窗
closeButton.addEventListener("click", function() {
  modall.style.display = "none";
  videoPlayer.pause();
  videoPlayer.currentTime = 0; // 重置视频到开头
});

// 当点击弹出框外部区域时，也关闭弹出框
window.onclick = function(event) {
    if (event.target === modall) {
      modall.style.display = "none";
    }
};



// 滚动图
function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageSrc;
}
  
// 使缩略图容器可以竖向拖动
const thumbnailContainer = document.getElementById('thumbnailContainer');
let isDown = false;
let startY;
let scrollTop;

thumbnailContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startY = e.pageY - thumbnailContainer.offsetTop;
  scrollTop = thumbnailContainer.scrollTop;
});

thumbnailContainer.addEventListener('mouseleave', () => {
  isDown = false;
});

thumbnailContainer.addEventListener('mouseup', () => {
  isDown = false;
});

thumbnailContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const y = e.pageY - thumbnailContainer.offsetTop;
  const walk = (y - startY) * 3; // 控制拖动速度
  thumbnailContainer.scrollTop = scrollTop - walk;
});



// 视频
// 获取元素
const playButtonn = document.getElementById("playButton-1");
const modalll = document.getElementById("modal-3");
const closeButtonn = document.getElementById("closeButton-3");
const videoPlayerr = document.getElementById("videoPlayer-1");


// 打开弹窗
playButtonn.addEventListener("click", function() {
  modalll.style.display = "flex";
  videoPlayerr.play();
});

// 关闭弹窗
closeButtonn.addEventListener("click", function() {
  modalll.style.display = "none";
  videoPlayerr.pause();
  videoPlayerr.currentTime = 0; // 重置视频到开头
});

// 当点击弹出框外部区域时，也关闭弹出框
window.onclick = function(event) {
    if (event.target === modalll) {
      modalll.style.display = "none";
    }
};

/* ===================================================
   3.1 先拿到“圆点”和 Canvas 元素，及其上下文
   =================================================== */
const cursor = document.querySelector('.custom-cursor');
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');

/* ===================================================
   3.2 让 Canvas 尺寸始终等于视口尺寸
   =================================================== */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // 初始化调用一次

/* ===================================================
   3.3 准备一个数组，用来存储最近一段时间的鼠标坐标
   =================================================== */
let positions = [];      // 数组里存放 {x, y} 对象
const maxPositions = 30; // 最多保留多少个历史坐标（数值越大，尾巴越长，但可能性能稍微费一点）

/* ===================================================
   3.4 滚动时切换颜色的核心变量
   =================================================== */
let currentColor = '#000000'; // 默认黑色。后面会用 IntersectionObserver 或 scroll 逻辑来修改它

/* ===================================================
   3.5 监听 mousemove：  
         1) 将当前鼠标坐标 push 到 positions 数组  
         2) 保证 positions 不超出 maxPositions  
         3) 让圆点（cursor）瞬间移动到鼠标位置  
   =================================================== */
window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  // 推入历史坐标
  positions.push({ x, y });
  // 如果数组过长，就把最前面的扔掉
  if (positions.length > maxPositions) {
    positions.shift();
  }
  // 圆点瞬移
  cursor.style.transform = `translate(${x}px, ${y}px)`;
});

/* ===================================================
   3.6 用 requestAnimationFrame 循环绘制“渐变尾巴线”
   =================================================== */
function drawTrail() {
  // 清空整个画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 如果 positions 数组里至少有 2 个点，我们就画线段
  if (positions.length > 1) {
    for (let i = 0; i < positions.length - 1; i++) {
      const p1 = positions[i];
      const p2 = positions[i + 1];

      // 计算这一段线的“透明度”或“渐变值”：
      // i=0（最旧）对应 alpha 最小，i=positions.length-2（最新）对应 alpha 接近 1
      const t = i / (positions.length - 1); // 0 ～ 1
      // 使用当前区块颜色，生成一个“透明度随 t 变化”的 RGBA 字符串
      ctx.strokeStyle = hexToRgba(currentColor, t * 0.8); 
      // *0.8 是为了尾部最深也不超过 0.8 的不透明度，你可以改成 t 本身或者改其他值

      ctx.lineWidth = 4; // 线宽，可以按需调大/小
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  }
  // 下一帧继续
  requestAnimationFrame(drawTrail);
}
// 启动绘制循环
requestAnimationFrame(drawTrail);

/* ===================================================
   3.7 IntersectionObserver：根据“区块进入视口”来切换 currentColor
   =================================================== */
/*
   HTML 中，在你想改变鼠标颜色的每个容器元素（比如 #first、#about、#project、#section1、...）
   上加一个属性 data-cursor-color="#rrggbb"。例如：
     <div id="first" class="profile" data-cursor-color="#000000"> … </div>
     <div id="about" data-cursor-color="#ff0000"> … </div>
     <section id="project" data-cursor-color="#0000ff"> … </section>
     <div id="section1" data-cursor-color="#00aa00"> … </div>
   以此类推。

   然后下面代码就会：当某个区块有 50% 可见时，读取它的 data-cursor-color，把 currentColor 更新为该值。
   这样在绘制尾巴时，就能自动用最新的 currentColor 生成“炫彩渐变尾巴线”。
*/

const colorSections = document.querySelectorAll('[data-cursor-color]');
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // 50% 可见就触发
};

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const newColor = entry.target.getAttribute('data-cursor-color') || '#000000';
      if (newColor !== currentColor) {
        currentColor = newColor;
        // 同时更新“圆点”的填充色
        cursor.style.backgroundColor = currentColor;
      }
    }
  });
}, observerOptions);

// 对每个带 data-cursor-color 属性的区块都观察
colorSections.forEach(sec => io.observe(sec));

/* ===================================================
   3.8 辅助函数：把十六进制颜色转成 RGBA
   传入 '#rrggbb' 或 '#rgb'，输出 'rgba(r,g,b,alpha)'
   =================================================== */
function hexToRgba(hex, alpha) {
  let r, g, b;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else {
    // 如果格式不对，就返回默认黑色的 RGBA
    return `rgba(0,0,0,${alpha})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


// 文字左移：箭头 hover 时给 .project-info 添加/移除微位移
const arrowLink = document.querySelector('.project-arrow .arrow-link');
const projectInfo = document.querySelector('.project-3d-row .project-info');

if (arrowLink && projectInfo) {
  arrowLink.addEventListener('mouseenter', () => {
    projectInfo.style.transition = 'transform .3s ease';
    projectInfo.style.transform = 'translateX(-10px)';
  });
  arrowLink.addEventListener('mouseleave', () => {
    projectInfo.style.transform = '';
  });
}

