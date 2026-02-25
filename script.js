// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

// Intro Sequence: "Hello" -> "I'm Hwanhee"
const introTl = gsap.timeline();

introTl
    .to("#text-hello", { opacity: 1, y: -20, duration: 1, ease: "power4.out" })
    .to("#text-hello", { opacity: 0, y: -40, duration: 0.8, ease: "power4.in" }, "+=0.5")
    .to("#text-hwanhee", { opacity: 1, y: -20, duration: 1, ease: "power4.out" })
    .to("#glass-layer", { backdropFilter: "blur(20px)", duration: 1.5 }, "-=1")
    .to("#loading-screen", { 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", 
        duration: 1.2, 
        ease: "expo.inOut",
        onComplete: () => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('desktop').style.display = 'block';
            initDesktop();
        }
    }, "+=0.3");

// Clock Function
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// Desktop Windows Data
const projects = [
    { name: "ARMAGEDDON", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" },
    { name: "CHROME_HEARTS", img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1000" },
    { name: "NEO_SEOUL", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1000" },
    { name: "LIQUID_DATA", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000" }
];

function initDesktop() {
    projects.forEach((p, i) => {
        setTimeout(() => createWindow(p, i), i * 200);
    });
}

function createWindow(project, index) {
    const win = document.createElement('div');
    win.className = 'window';
    const randomX = Math.random() * (window.innerWidth - 350);
    const randomY = Math.random() * (window.innerHeight - 350);
    win.style.left = `${randomX}px`;
    win.style.top = `${randomY}px`;
    win.style.zIndex = index + 10;

    win.innerHTML = `
        <div class="window-header">
            <span>${project.name}.exe</span>
            <div class="flex gap-1">
                <div class="w-3 h-3 bg-[#ffbd2e] rounded-full border border-black/10"></div>
                <div class="w-3 h-3 bg-[#ff5f56] rounded-full border border-black/10 cursor-pointer"></div>
            </div>
        </div>
        <div class="window-body" onclick="openDetail('${project.name}', '${project.img}')">
            <div class="project-thumb">
                <img src="${project.img}" alt="">
            </div>
            <div class="flex justify-between items-center">
                <span class="mono text-[9px] text-white/50">BUILD_0${index+1}</span>
                <span class="mono text-[10px] text-green-400 glitch-text cursor-pointer">OPEN_ARCHIVE →</span>
            </div>
        </div>
    `;
    
    document.getElementById('desktop').appendChild(win);
    makeDraggable(win);
    gsap.from(win, { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.7)" });
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

function openDetail(name, img) {
    const detail = document.getElementById('detail-view');
    document.getElementById('detail-title').innerText = name;
    document.getElementById('detail-img').src = img;
    detail.style.display = 'block';
    gsap.fromTo(detail, { opacity: 0, filter: "blur(20px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.6 });
}

function closeDetail() {
    gsap.to("#detail-view", { opacity: 0, duration: 0.4, onComplete: () => {
        document.getElementById('detail-view').style.display = 'none';
    }});
}
