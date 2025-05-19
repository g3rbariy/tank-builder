const form = document.getElementById('tankForm');
const output = document.getElementById('output');
const button = form.querySelector('button');
const buildSound = new Audio('build.mp3');

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
  "Франція": { "ТТ": "🇫🇷🐓", "СТ": "🇫🇷🏎", "ПТ-САУ": "🇫🇷🏹", "САУ": "🇫🇷💥" }
};

const tankDescriptions = {
  "ТТ": "Важкий танк - сталева стіна!",
  "СТ": "Швидкий та маневрений",
  "ПТ-САУ": "Смерть здалеку",
  "САУ": "Арта готова до удару!"
};

// Випадкова підказка при завантаженні
document.getElementById('tips').textContent = tips[Math.floor(Math.random() * tips.length)];

// Оновлення прев'ю при зміні класу
document.getElementById('class').addEventListener('change', function() {
  const nation = document.getElementById('nation').value;
  const tankClass = this.value;
  if (nation && tankClass && tankEmojis[nation]?.[tankClass]) {
    document.getElementById('tankModel').textContent = tankEmojis[nation][tankClass];
    document.getElementById('tankDescription').textContent = tankDescriptions[tankClass];
  }
});

// Обробка форми
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Отримуємо значення
  const nation = document.getElementById('nation').value;
  const tankClass = document.getElementById('class').value;
  const name = document.getElementById('name').value;
  const modules = document.getElementById('modules').value;

  // Ефект "збирання"
  button.disabled = true;
  button.innerHTML = 'Збирається... 🔧';
  buildSound.currentTime = 0;
  buildSound.play();

  // Додаємо ефект трясіння
  document.querySelector('.container').classList.add('shake');

  // Прогрес-бар
  document.getElementById('progressContainer').style.display = 'block';
  const progressBar = document.getElementById('progressBar');
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 5;
    progressBar.style.width = progress + '%';
    if (progress >= 100) clearInterval(progressInterval);
  }, 100);

  // Через 2 секунди - показ результату
  setTimeout(() => {
    // Зупиняємо ефекти
    clearInterval(progressInterval);
    document.querySelector('.container').classList.remove('shake');
    document.getElementById('progressContainer').style.display = 'none';
    progressBar.style.width = '0%';

    // Показуємо результат
    output.style.display = 'block';
    output.innerHTML = `
      <strong>✅ Танк зібрано!</strong><br><br>
      <b>Нація:</b> ${nation}<br>
      <b>Клас:</b> ${tankClass}<br>
      <b>Назва:</b> ${name}<br>
      <b>Модулі:</b><br>${modules.replace(/\n/g, '<br>')}
      <div style="margin-top: 15px; font-size: 0.8em;">Цікавинка: ${tips[Math.floor(Math.random()*tips.length)]}</div>
    `;

    button.disabled = false;
    button.innerHTML = 'Зібрати танк';
  }, 2000);
});

// Випадковий танк
document.getElementById('randomTank').addEventListener('click', function() {
  const nations = ["СРСР", "Німеччина", "США", "Франція"];
  const classes = ["ТТ", "СТ", "ПТ-САУ", "САУ"];
  const names = {
    "СРСР": ["Т-34", "ІС-7", "СУ-100", "Об'єкт 268"],
    "Німеччина": ["Tiger II", "Leopard 1", "Jagdpanther", "GW Tiger"],
    "США": ["Maus", "Sherman", "T95", "T92 HMC"],
    "Франція": ["AMX 50B", "Bat.-Châtillon 25 t", "AMX 50 Foch", "Bat.-Châtillon 155"]
  };
  
  const randomNation = nations[Math.floor(Math.random()*nations.length)];
  const randomClass = classes[Math.floor(Math.random()*classes.length)];
  
  document.getElementById('nation').value = randomNation;
  document.getElementById('class').value = randomClass;
  document.getElementById('name').value = names[randomNation][Math.floor(Math.random()*names[randomNation].length)];
  
  // Оновлюємо прев'ю
  document.getElementById('class').dispatchEvent(new Event('change'));
});

// Секретні коди
const secretCodes = {
  "idqd": "Безсмертя увімкнено!",
  "idkfa": "Повне озброєння",
  "tiger": "Тигр у твоїх руках!"
};

let inputBuffer = "";
document.addEventListener('keydown', (e) => {
  inputBuffer += e.key.toLowerCase();
  Object.keys(secretCodes).forEach(code => {
    if (inputBuffer.endsWith(code)) {
      alert(secretCodes[code]);
      inputBuffer = "";
    }
  });
  if (inputBuffer.length > 20) inputBuffer = "";
});
  // Додаємо цю функцію в будь-яке місце вашого script.js
function createSparks(event) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  
  // Створюємо 10 іскр
  for (let i = 0; i < 10; i++) {
    const spark = document.createElement('div');
    spark.classList.add('spark');
    
    // Випадкові позиції навколо точки кліку
    const x = event.clientX - rect.left + (Math.random() - 0.5) * 20;
    const y = event.clientY - rect.top + (Math.random() - 0.5) * 20;
    
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    
    // Випадковий розмір та колір
    const size = Math.random() * 3 + 2;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.background = `hsl(${Math.random() * 30 + 30}, 100%, 50%)`;
    
    button.appendChild(spark);
    
    // Видаляємо іскру після анімації
    setTimeout(() => {
      spark.remove();
    }, 500);
  }
}

// Додаємо обробник подій до кнопки
document.querySelector('button[type="submit"]').addEventListener('mousedown', createSparks);
document.getElementById('randomTank').addEventListener('mousedown', createSparks);
