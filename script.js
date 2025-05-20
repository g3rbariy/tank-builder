// Елементи DOM
const form = document.getElementById('tankForm');
const output = document.getElementById('output');
const buttons = document.querySelectorAll('button');
const buildSound = new Audio('build.mp3');
const completeSound = new Audio('complete.mp3');

// Константи
const tips = [
  "Порада: ТТ краще використовувати для утримання напрямків",
  "Факт: САУ можуть завдавати урон через всю карту",
  "Підказка: СТ ефективні в кінці бою",
  "Знаєте що: У ПТ-САУ найвищий урон у грі",
  "Порада: Вивчіть слабкі місця танків супротивника"
];

const tankEmojis = {
  "СРСР": { "ТТ": "🇷🇺🐘", "СТ": "🇷🇺⚡", "ПТ-САУ": "🇷🇺🎯", "САУ": "🇷🇺☄️" },
  "Німеччина": { "ТТ": "🇩🇪🦏", "СТ": "🇩🇪🐆", "ПТ-САУ": "🇩🇪🏹", "САУ": "🇩🇪💥" },
  "США": { "ТТ": "🇺🇸🦅", "СТ": "🇺🇸⚡", "ПТ-САУ": "🇺🇸🎯", "САУ": "🇺🇸☄️" },
  "Франція": { "ТТ": "🇫🇷🐓", "СТ": "🇫🇷🏎", "ПТ-САУ": "🇫🇷🏹", "САУ": "🇫🇷💥" },
  "Китай": { "ТТ": "🇨🇳🐉", "СТ": "🇨🇳⚡", "ПТ-САУ": "🇨🇳🎯", "САУ": "🇨🇳☄️" },
  "Японія": { "ТТ": "🇯🇵🗻", "СТ": "🇯🇵⚡", "ПТ-САУ": "🇯🇵🎯", "САУ": "🇯🇵☄️" },
  "Італія": { "ТТ": "🇮🇹🍕", "СТ": "🇮🇹🏎", "ПТ-САУ": "🇮🇹🏹", "САУ": "🇮🇹💥" },
  "Чехія": { "ТТ": "🇨🇿🦁", "СТ": "🇨🇿⚡", "ПТ-САУ": "🇨🇿🎯", "САУ": "🇨🇿☄️" },
  "Швеція": { "ТТ": "🇸🇪🦌", "СТ": "🇸🇪⚡", "ПТ-САУ": "🇸🇪🎯", "САУ": "🇸🇪☄️" },
  "Польща": { "ТТ": "🇵🇱🦅", "СТ": "🇵🇱⚡", "ПТ-САУ": "🇵🇱🎯", "САУ": "🇵🇱☄️" }
};

const tankDescriptions = {
  "ТТ": "Важкий танк - сталева стіна!",
  "СТ": "Швидкий та маневрений",
  "ПТ-САУ": "Смерть здалеку",
  "САУ": "Арта готова до удару!"
};

const secretCodes = {
  "idqd": "Безсмертя увімкнено!",
  "idkfa": "Повне озброєння",
  "tiger": "Тигр у твоїх руках!"
};

// Ініціалізація
document.getElementById('tips').textContent = tips[Math.floor(Math.random() * tips.length)];

// Функція для створення іскр
function createSparks(event) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  
  for (let i = 0; i < 15; i++) {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 30 + 20;
    const sparkX = Math.cos(angle) * distance;
    const sparkY = Math.sin(angle) * distance;
    
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--spark-x', `${sparkX}px`);
    spark.style.setProperty('--spark-y', `${sparkY}px`);
    
    const size = Math.random() * 4 + 3;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.background = `hsl(${Math.random() * 60 + 20}, 100%, 50%)`;
    
    button.appendChild(spark);
    
    setTimeout(() => spark.remove(), 500);
  }
}

// Оновлення прев'ю танка
function updateTankPreview() {
  const nation = document.getElementById('nation').value;
  const tankClass = document.getElementById('class').value;
  
  if (nation && tankClass && tankEmojis[nation]?.[tankClass]) {
    document.getElementById('tankModel').textContent = tankEmojis[nation][tankClass];
    document.getElementById('tankDescription').textContent = tankDescriptions[tankClass];
  }
}

// Генерація випадкового танка
function generateRandomTank() {
  const nations = Object.keys(tankEmojis);
  const classes = Object.keys(tankDescriptions);
  const tankNames = {
    "СРСР": ["Т-34", "ІС-7", "КВ-2", "Об'єкт 268"],
    "Німеччина": ["Tiger II", "Leopard 1", "Maus", "Jagdpanther"],
    "США": ["Sherman", "Pershing", "T110E5", "T95"],
    "Франція": ["AMX 50B", "Bat.-Châtillon 25 t", "AMX 13 105", "AMX 50 Foch"],
    "Китай": ["121", "113", "WZ-111", "Type 5 Heavy"],
    "Японія": ["Type 5 Heavy", "STB-1", "Type 61", "Ho-Ri"],
    "Італія": ["Progetto 65", "P.44 Pantera", "Rinoceronte", "Minotauro"],
    "Чехія": ["TVP T 50/51", "Skoda T 56", "Vz. 55", "ShPTK-TVP 100"],
    "Швеція": ["Kranvagn", "UDES 15/16", "Strv 103B", "Strv K"],
    "Польща": ["60TP Lewandowskiego", "CS-63", "50TP Tyszkiewicza", "B.U.G.I."]
  };
  
  const randomNation = nations[Math.floor(Math.random() * nations.length)];
  const randomClass = classes[Math.floor(Math.random() * classes.length)];
  
  document.getElementById('nation').value = randomNation;
  document.getElementById('class').value = randomClass;
  document.getElementById('name').value = tankNames[randomNation]?.[Math.floor(Math.random() * tankNames[randomNation].length)] || "Випадковий танк";
  document.getElementById('year').value = Math.floor(Math.random() * (2023 - 1915 + 1)) + 1915;
  
  updateTankPreview();
}

// Обробка форми
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nation = document.getElementById('nation').value;
  const tankClass = document.getElementById('class').value;
  const name = document.getElementById('name').value;
  const year = document.getElementById('year').value;
  const modules = document.getElementById('modules').value;

  // Початок збирання
  buttons.forEach(btn => btn.disabled = true);
  form.querySelector('button[type="submit"]').innerHTML = 'Збирається... 🔧';
  document.querySelector('.container').classList.add('shake');
  buildSound.currentTime = 0;
  buildSound.play();

  // Прогрес-бар
  document.getElementById('progressContainer').style.display = 'block';
  const progressBar = document.getElementById('progressBar');
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 5;
    progressBar.style.width = `${progress}%`;
    if (progress >= 100) clearInterval(progressInterval);
  }, 100);

  // Завершення збирання
  setTimeout(() => {
    clearInterval(progressInterval);
    document.querySelector('.container').classList.remove('shake');
    document.getElementById('progressContainer').style.display = 'none';
    progressBar.style.width = '0%';
    completeSound.play();

    // Вивід результату
    output.style.display = 'block';
    output.innerHTML = `
      <strong>✅ Танк зібрано!</strong><br><br>
      <b>Нація:</b> ${nation}<br>
      <b>Клас:</b> ${tankClass}<br>
      <b>Назва:</b> ${name || "Без назви"}<br>
      <b>Рік виробництва:</b> ${year || "Невідомо"}<br>
      <b>Модулі:</b><br>${modules.replace(/\n/g, '<br>') || "Немає інформації"}
      <div class="tank-fact">Цікавинка: ${tips[Math.floor(Math.random() * tips.length)]}</div>
    `;

    buttons.forEach(btn => btn.disabled = false);
    form.querySelector('button[type="submit"]').innerHTML = 'Зібрати танк';
  }, 2000);
});

// Події
document.getElementById('class').addEventListener('change', updateTankPreview);
document.getElementById('nation').addEventListener('change', updateTankPreview);
document.getElementById('randomTank').addEventListener('click', generateRandomTank);
buttons.forEach(btn => btn.addEventListener('mousedown', createSparks));

// Секретні коди
let inputBuffer = "";
document.addEventListener('keydown', (e) => {
  inputBuffer += e.key.toLowerCase();
  Object.keys(secretCodes).forEach(code => {
    if (inputBuffer.endsWith(code)) {
      alert(`Секретний код: ${secretCodes[code]}`);
      inputBuffer = "";
    }
  });
  if (inputBuffer.length > 20) inputBuffer = "";
});
