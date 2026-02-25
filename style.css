// 1. Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

// 2. Intro Sequence
const tl = gsap.timeline();
tl.to("#intro-screen", { backgroundPosition: "55% 50%", duration: 6, ease: "linear" }); 
tl.to("#text-hello", { opacity: 1, scale: 1.1, duration: 1.2, ease: "power3.out" }, 0.5)
  .to("#text-hello", { opacity: 0, scale: 1.2, filter: "blur(20px)", duration: 0.8 }, 2.0)
  .to("#text-hwanhee", { opacity: 1, scale: 1.1, duration: 1.2, ease: "power3.out" }, 2.5)
  .to("#intro-screen", { 
      y: "-100%", 
      duration: 1.5, 
      ease: "expo.inOut",
      onComplete: () => {
          document.getElementById('intro-screen').style.display = 'none';
          document.getElementById('desktop').style.display = 'block';
          initDesktop();
      }
  }, 4.5);

// 3. Desktop Windows
const projects = [
    { name: "ARMAGEDDON_VFX", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600" },
    { name: "CYBER_HEART", img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=600" },
    { name: "NEO_SEOUL", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600" },
    { name: "LIQUID_METAL", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600" }
];

function initDesktop() {
    projects.forEach((p, i) => {
        setTimeout(() => createWindow(p, i), i * 300);
    });
}

function createWindow(project, index) {
    const win = document.createElement('div');
    win.className = 'window';
    const randomX = Math.random() * (window.innerWidth - 350);
    const randomY = Math.random() * (window.innerHeight - 400);
    win.style.left = `${randomX}px`;
    win.style.top = `${randomY}px`;
    win.style.zIndex = index + 10;

    win.innerHTML = `
        <div class="window-header">
            <span>${project.name}.exe</span>
            <div class="flex gap-1">
                <div class="w-3 h-3 bg-yellow-400 rounded-full border border-black/10"></div>
                <div class="w-3 h-3 bg-red-500 rounded-full border border-black/10 cursor-pointer"></div>
            </div>
        </div>
        <div class="window-body" onclick="openDetail('${project.name}', '${project.img}')">
            <div class="project-thumb">
                <img src="${project.img}" alt="">
            </div>
            <div class="flex justify-between items-center">
                <span class="mono text-[9px] opacity-50">VER_2.0.4</span>
                <span class="mono text-[10px] text-white hover:text-green-400 cursor-pointer">EXPLORE →</span>
            </div>
        </div>
    `;
    
    document.getElementById('desktop').appendChild(win);
    makeDraggable(win);
    gsap.from(win, { scale: 0.5, opacity: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
}

function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = el.querySelector('.window-header');
    header.onmousedown = (e) => {
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = 10);
        el.style.zIndex = 100;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = (e) => {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        };
    };
}

// 4. Detail View Logic
function openDetail(name, img) {
    const detail = document.getElementById('detail-view');
    document.getElementById('detail-title').innerText = name;
    document.getElementById('detail-img').src = img;
    detail.style.display = 'block';
    gsap.fromTo(detail, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" });
}

function closeDetail() {
    gsap.to("#detail-view", { opacity: 0, duration: 0.4, onComplete: () => {
        document.getElementById('detail-view').style.display = 'none';
    }});
}

// 5. Clock
setInterval(() => {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);
