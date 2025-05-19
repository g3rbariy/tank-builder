const form = document.getElementById('tankForm');
const output = document.getElementById('output');
const button = form.querySelector('button');
const buildSound = new Audio('build.mp3');

document.getElementById('tips').textContent = tips[Math.floor(Math.random() * tips.length)];
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Отримуємо значення
  const nation = document.getElementById('nation').value;
  const tankClass = document.getElementById('class').value;
  const name = document.getElementById('name').value;
  const modules = document.getElementById('modules').value;
  const tips = [
  "Совет: ТТ лучше использовать для удержания направлений",
  "Факт: САУ могут наносить урон через всю карту",
  "Подсказка: СТ эффективны в конце боя",
  "Знаете ли вы: У ПТ-САУ самый высокий урон в игре",
  "Совет: Изучите слабые места танков противника"
];

document.getElementById('tips').textContent = tips[Math.floor(Math.random() * tips.length)];
  // Ефект "збирання"
  button.disabled = true;
  button.innerHTML = 'Збирається... 🔧';
  buildSound.currentTime = 0; // почати з початку
  buildSound.play();

  // Через 2 секунди — показ результату
  setTimeout(() => {
    output.style.display = 'block';
    output.innerHTML = `
      <strong>✅ Танк зібрано!</strong><br><br>
      <b>Нація:</b> ${nation}<br>
      <b>Клас:</b> ${tankClass}<br>
      <b>Назва:</b> ${name}<br>
      <b>Модулі:</b><br>${modules.replace(/\n/g, '<br>')}
    `;

    button.disabled = false;
    button.innerHTML = 'Зібрати танк';
  }, 2000);
});
