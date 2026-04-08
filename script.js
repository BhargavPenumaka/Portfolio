const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 220; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      a: Math.random()
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,170,${s.a})`;
    ctx.fill();
    s.a += (Math.random() - 0.5) * 0.01;
    s.a = Math.max(0.1, Math.min(1, s.a));
  });
  requestAnimationFrame(drawStars);
}

resize(); initStars(); drawStars();
window.addEventListener('resize', () => { resize(); initStars(); });

// TERMINAL
const output = document.getElementById('terminal-output');
const input = document.getElementById('terminal-input');

const files = {
  'about.txt': `Name       : Bhargav Penumaka
Role       : Software Engineer – Mobile Automation
Company    : Cavisson
Skills     : Appium, Java, TestNG, Cucumber, Maven, Allure
Platforms  : Android, iOS
Email      : bhargavpenumakabhargavpenumaka@gmail.com
Phone      : +91-9949435979`,

  'skills.txt': `Automation : Appium, Selenium WebDriver, Appium Inspector
Languages  : Java, JavaScript, Python
Frameworks : TestNG, Cucumber (BDD), Gherkin
Build      : Maven
Reporting  : Allure Reports
Platforms  : Android, iOS
Tools      : Git, Android Studio, VS Code`,

  'education.txt': `B.Tech CSE  : Manav Rachna International Institute – 70%
12th Grade  : NRI Junior College – 94%
10th Grade  : Vijaya High School – 97%`,

  'contact.txt': `Email    : bhargavpenumakabhargavpenumaka@gmail.com
Phone    : +91-9949435979
LinkedIn : linkedin.com/in/bhargavpenumaka
GitHub   : github.com/bhargavpenumaka`
};

const commands = {
  help: () => `Available commands:
  help              — show this help menu
  ls                — list available files
  whoami            — who is Bhargav?
  cat [file]        — read a file
  clear             — clear terminal
  date              — current date/time
  skills            — print skills summary`,

  ls: () => `about.txt     skills.txt     education.txt     contact.txt`,

  whoami: () => `bhargav@kali — Software Engineer specializing in Mobile Automation Testing
                 Currently @ Cavisson | Appium • Java • TestNG • Cucumber • Allure`,

  skills: () => files['skills.txt'],

  date: () => new Date().toString(),

  clear: () => { output.innerHTML = ''; return null; }
};

function addLine(text, cls = '') {
  if (text == null) return;
  const lines = text.split('\n');
  lines.forEach(line => {
    const el = document.createElement('div');
    el.className = 'out-line ' + cls;
    el.textContent = line;
    output.appendChild(el);
  });
}

function addPrompt(cmd) {
  const el = document.createElement('div');
  el.className = 'out-line';
  el.innerHTML = `<span style="color:var(--green)">bhargav@kali:~$</span> ${cmd}`;
  output.appendChild(el);
}

input.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const raw = input.value.trim();
  input.value = '';
  if (!raw) return;

  addPrompt(raw);

  const parts = raw.split(' ');
  const cmd = parts[0].toLowerCase();
  const arg = parts[1];

  if (cmd === 'cat') {
    if (!arg) { addLine('Usage: cat [filename]', 'muted'); }
    else if (files[arg]) { addLine(files[arg], 'cyan'); }
    else { addLine(`cat: ${arg}: No such file or directory. Try 'ls' to list files.`, 'muted'); }
  } else if (commands[cmd]) {
    const result = commands[cmd]();
    if (result) addLine(result, cmd === 'whoami' || cmd === 'skills' ? 'cyan' : '');
  } else {
    addLine(`Command not found: '${cmd}'. Type 'help' for available commands.`, 'muted');
  }

  document.getElementById('terminal-body').scrollTop = 9999;
});

input.focus();