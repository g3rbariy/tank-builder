const form = document.getElementById('tankForm');
const output = document.getElementById('output');
const button = form.querySelector('button');
const buildSound = new Audio('build.mp3');

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
