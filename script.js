/**
 * ============================================================================
 * 迪士尼/皮克斯大片级 520 数据大脑
 * 在这里你可以任性地增删文字、更改长短，界面绝不会发生挤压变形
 * ============================================================================
 */
const romanticSpeeches = [
    "每次翻到这张照片，我都会想起那天见你之前的忐忑。可看到你的第一眼，所有的不安都变成了踏实。你就那样真实、自然地出现在我的生命里，比我想象中还要美好。谢谢你，让我的这份初印象，一直延续到了今天，而且越来越深。",
    "其实比起电影本身，我更喜欢和你不用跨越几百公里去见面，只是像普通情侣一样，在周末的午后看场电影、散散步。这种平平淡淡的相处，就是我最想要的以后。",
    "以前总觉得幸福要靠什么惊天动地的大事来证明。可那天晚上，看着你举着伞、拿着相机跑去请人帮忙，还耐心地教人家怎么用，幸福感突然就撞进了我心里。为了记录下我们的瞬间变得这么勇敢又主动，那一刻我心里全都是被你宠着的踏实感。",
    "因为有你在身边，连这种随手一拍的瞬间都变得像电影画面。那天晚上灯光很暗，风也不小，但我心里却暖得不像话。我想，所谓的浪漫大概就是：不管环境多简陋、头发多凌乱，只要我们站在一起，就是最好的场景。",
    "谢谢你愿意陪我走进这片阳光里。未来的日子，我们也像现在这样，都要一起奔向有光的地方。",
    "晚上的校园很安静，偶尔有路过的学生说话声，但我听得最清楚的，是你在我耳边的呼吸声。你靠在我肩膀上睡着的样子，像个卸下防备的小朋友。我不敢乱动，怕惊扰了你的美梦，也怕惊醒了这一刻只属于我们的、平凡又奢侈的幸福。",
    "在别人眼里，这可能只是一次普通的江边散步，但在我心里，这是跨越山海才换来的浪漫。泽泽，谢谢你把我拍得这么开心，因为只有在你面前，我才敢这样毫无保留地张开双臂，去迎接所有的美好。",
    "不许动，让我再盯五分钟，我还能再流一碗口水。😁",
    "你的眼睛里，有我想要的所有生活。",
    "我单方面宣布，这是我手机相册里年度最萌的抓拍，不接受反驳。",
    "在屏幕里见了一万次，都不及这一刻真实。贴着你的手臂，感受着你的体温，闻着你身上熟悉的味道，那些因为距离而产生的不安和焦虑终于彻底安静了下来。",
    "火锅很香，你很甜。谢谢你包容我的幼稚，也谢谢你出现在我的餐桌对面。",
    "完美的女神气质，你一定要知道自己有多好，知道吗，不知道我就一直让你知道。",
    "女王陛下，请收下这根至高无上的权杖，还有我这颗只想围着你转的心。",
    "颜值不定，发型决定；其实紧张害怕全由你给的踏实兜住了✌️✌️✌️",
    "我的镜头总是下意识地只想捕捉你的脸，就是觉得你特别好看，想把这种鲜活的、真实的你留在相册里。坐地铁通勤很累，但对我来说，只要你在身旁，每一站都是风景。",
    "开心到模糊的你（别管我，我就喜欢，好颠好抽好喜欢）",
    "我想请问你低头找什么呢，视线被挡得严严的，啥也看不见啊",
    "“人生很长，我要慢慢整理和纪念”",
    "泽泽，520快乐！愿我的小公主永远天真烂漫，无忧无虑，愿你在成为厉害的大人的同时，也依然会是万事胜意的小孩子哦，爱你！"
];

const paletteColors = ['#ffeaf0', '#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0'];
const disStickers = ['⭐', '🎀', '🌸', '🪄', '💖', '👑', '🕊️', '🍭', '🧸', '🍿'];
const shapePool = ['shape-polaroid', 'shape-mickey', 'shape-magic-rect', 'shape-cloud', 'shape-star-cut'];

let audioTriggered = false;
const audioBGM = document.getElementById('bg-music');

// 全局唤醒锁
document.body.addEventListener('click', () => {
    if (!audioTriggered) {
        audioBGM.play().catch(e => console.log("音频流激活被拦截:", e));
        if(document.querySelector('.disney-toast')) document.querySelector('.disney-toast').style.opacity = '0';
        audioTriggered = true;
    }
});

// ==========================================
// 核心逻辑：好莱坞大片级全屏绝对等比防遮挡矩阵
// ==========================================
const screenMatrix = document.querySelector('.responsive-screen-matrix');
function runMatrixAutoAdapt() {
    if (!screenMatrix) return;
    const designW = 480;
    const designH = 680;
    const safeMargin = 16; 
    
    // 动态计算长宽极限缩放值，确保绝不爆框、绝不遮挡
    const ratioX = (window.innerWidth - safeMargin) / designW;
    const ratioY = (window.innerHeight - safeMargin) / designH;
    const currentScale = Math.min(ratioX, ratioY, 1); 
    
    screenMatrix.style.transform = `scale(${currentScale})`;
}
window.addEventListener('resize', runMatrixAutoAdapt);
runMatrixAutoAdapt();
setTimeout(runMatrixAutoAdapt, 150);

// ==========================================
// 核心逻辑：第一幕 · 皮克斯弹性物理碰撞引擎
// ==========================================
const avatarNode = document.getElementById('moving-avatar');
let locX = Math.random() * (window.innerWidth - 160);
let locY = Math.random() * (window.innerHeight - 160);
let vecX = 3.2; 
let vecY = 2.2; 
let squashTime = 0;

function renderAvatarPhysics() {
    if (document.getElementById('stage-1').classList.contains('active') && avatarNode) {
        locX += vecX;
        locY += vecY;
        
        let didCollide = false;

        // 右边缘/左边缘碰撞
        if (locX + avatarNode.clientWidth >= window.innerWidth || locX <= 0) {
            vecX = -vecX;
            didCollide = true;
        }
        // 下边缘/上边缘碰撞
        if (locY + avatarNode.clientHeight >= window.innerHeight || locY <= 0) {
            vecY = -vecY;
            didCollide = true;
        }

        // 触发皮克斯经典的碰撞挤压弹性变形（Squash）
        if (didCollide) {
            squashTime = 10; 
        }

        if (squashTime > 0) {
            avatarNode.style.transform = `scale(1.1, 0.85)`;
            squashTime--;
        } else {
            avatarNode.style.transform = `scale(1, 1)`;
        }

        avatarNode.style.left = locX + 'px';
        avatarNode.style.top = locY + 'px';
    }
    requestAnimationFrame(renderAvatarPhysics);
}
requestAnimationFrame(renderAvatarPhysics);

// 抓到头像切换到第二幕
avatarNode.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('stage-1').classList.remove('active');
    document.getElementById('stage-2').classList.add('active');
});

function transitionToNotebook() {
    document.getElementById('stage-2').classList.remove('active');
    document.getElementById('stage-3').classList.add('active');
    runMatrixAutoAdapt(); // 强行校准舞台
}

// ==========================================
// 核心逻辑：第三幕 · 批量工业化搭建 2 ~ 22 页
// ==========================================
const mainNotebook = document.getElementById('love-notebook');

for (let i = 2; i <= 21; i++) {
    const pageElement = document.createElement('div');
    pageElement.className = 'page';
    pageElement.style.zIndex = 22 - i; // 锁定严格的物理空间覆盖层级

    const bgVal = paletteColors[i % paletteColors.length];
    const stickerVal = disStickers[i % disStickers.length];
    const shapeVal = shapePool[i % shapePool.length];
    const contentSpeech = romanticSpeeches[i - 2] || "我们的甜蜜故事正在无限蔓延...";
    
    // 绑定本地绝对路径：assets/2.jpg, assets/3.jpg... 
    const localImgPath = `assets/${i}.jpg`; 

    pageElement.innerHTML = `
        <div class="front" style="background: ${bgVal}">
            <div class="photo-zone">
                <div class="frame-style ${shapeVal}">
                    <img src="${localImgPath}" alt="Our Love ${i}">
                </div>
                <span class="cartoon-sticker" style="top: 10px; right: 10px;">${stickerVal}</span>
            </div>
            <div class="text-zone">
                <p class="romantic-prose">${contentSpeech}</p>
            </div>
            <div class="page-footer-index">${i} / 22</div>
        </div>
        <div class="back">
            <div style="font-size: 55px; margin-top: 150px; text-align:center; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.05));">🧚‍♀️</div>
            <div class="romantic-prose" style="opacity: 0.2; font-size: 1.1rem; text-align:center; margin-top:15px; font-family:'Pacifico'">Chapter ${i}<br>The Magic Story</div>
            <div class="page-footer-index">${i} / 22</div>
        </div>
    `;
    mainNotebook.appendChild(pageElement);
}

// 追加完美谢幕最终页 (Page 22)
const closurePage = document.createElement('div');
closurePage.className = 'page';
closurePage.style.zIndex = 0;
closurePage.innerHTML = `
    <div class="front" style="background: linear-gradient(to bottom, #ffffff, #ffeaf0); justify-content: center;">
        <h2 style="font-family: 'Pacifico'; color: #ff4d6d; font-size: 1.9rem; text-align:center; margin:0;">
            ...And they lived happily ever after
        </h2>
        <p style="letter-spacing: 2px; color: #a69296; margin-top:15px; font-family:'ZCOOL KuaiLe'; font-size:0.9rem;">故事未完待续 · 开启终章录音</p>
        <div class="page-footer-index">22 / 22</div>
    </div>
    <div class="back disney-cover" style="border-radius: 24px 0 0 24px;">
        <h1 class="main-title" style="font-size: 3.5rem;">THE END</h1>
        <p style="letter-spacing: 5px; color: var(--magic-gold); font-family:'Pacifico'; font-size:1rem;">LOVE YOU FOREVER</p>
    </div>
`;
mainNotebook.appendChild(closurePage);

// 3D精密翻页控制器
document.querySelectorAll('.page').forEach((pageObj, pageIndex) => {
    pageObj.addEventListener('click', function() {
        this.classList.toggle('flipped');
        
        // 翻页后重组整本书的z-index层级物理堆叠[cite: 4]
        const allPages = document.querySelectorAll('.page');
        allPages.forEach((p, idx) => {
            if (p.classList.contains('flipped')) p.style.zIndex = idx + 1;
            else p.style.zIndex = allPages.length - idx;
        });

        // 核心判定：如果翻开了最后一页（即点击了倒数第二页正文）
        if (pageIndex === allPages.length - 1) {
            setTimeout(() => {
                // 唤醒好莱坞独立录音舱门
                document.getElementById('hollywood-voice-cabin').classList.add('reveal');
            }, 500);
        }
    });
});

// ==========================================
// 全局粒子引擎：迪士尼粉红高光泡泡 + 仙子星尘爱心
// ==========================================
const spaceCanvas = document.getElementById('disney-canvas');
const drawCtx = spaceCanvas.getContext('2d');
let dynamicParticles = [];

function calibrateCanvas() {
    spaceCanvas.width = window.innerWidth;
    spaceCanvas.height = window.innerHeight;
}
window.addEventListener('resize', calibrateCanvas);
calibrateCanvas();

class DisneyParticle {
    constructor() { this.revive(); }
    revive() {
        this.x = Math.random() * spaceCanvas.width;
        this.y = spaceCanvas.height + 40;
        this.radius = Math.random() * 14 + 6;
        this.velY = Math.random() * 1.1 + 0.3;
        this.velX = Math.sin(Math.random() * 4) * 0.35;
        this.kind = Math.random() > 0.45 ? 'bubble' : 'heart';
        this.opacity = Math.random() * 0.4 + 0.15;
    }
    move() {
        this.y -= this.velY;
        this.x += this.velX;
        if (this.y < -40) this.revive();
    }
    paint() {
        drawCtx.save();
        drawCtx.globalAlpha = this.opacity;
        if (this.kind === 'bubble') {
            // 画带有皮克斯高光感的梦幻泡泡
            let gradient = drawCtx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
            gradient.addColorStop(0.6, 'rgba(255, 143, 163, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 77, 109, 0.05)');
            drawCtx.beginPath();
            drawCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            drawCtx.fillStyle = gradient;
            drawCtx.fill();
        } else {
            // 画浪漫星尘爱心
            drawCtx.fillStyle = '#ff4d6d';
            drawCtx.shadowBlur = this.radius;
            drawCtx.shadowColor = '#ff758f';
            drawCtx.beginPath();
            let size = this.radius;
            drawCtx.moveTo(this.x, this.y + size / 4);
            drawCtx.bezierCurveTo(this.x, this.y, this.x - size / 2, this.y, this.x - size / 2, this.y + size / 4);
            drawCtx.bezierCurveTo(this.x - size / 2, this.y + size * 0.6, this.x, this.y + size, this.x, this.y + size);
            drawCtx.bezierCurveTo(this.x, this.y + size, this.x + size / 2, this.y + size * 0.6, this.x + size / 2, this.y + size / 4);
            drawCtx.bezierCurveTo(this.x + size / 2, this.y, this.x, this.y, this.x, this.y + size / 4);
            drawCtx.fill();
        }
        drawCtx.restore();
    }
}

for (let i = 0; i < 55; i++) dynamicParticles.push(new DisneyParticle());

function startCinemaLoop() {
    drawCtx.fillStyle = 'rgba(18, 5, 8, 0.18)'; // 保持大片暗部残影
    drawCtx.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);
    dynamicParticles.forEach(p => { p.move(); p.paint(); });
    requestAnimationFrame(startCinemaLoop);
}
startCinemaLoop();