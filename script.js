const form = document.getElementById('tankForm');
const output = document.getElementById('output');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nation = document.getElementById('nation').value;
  const tankClass = document.getElementById('class').value;
  const name = document.getElementById('name').value;
  const modules = document.getElementById('modules').value;

  output.style.display = 'block';
  output.innerHTML = `
    <strong>Результат:</strong><br>
    <b>Нація:</b> ${nation}<br>
    <b>Клас:</b> ${tankClass}<br>
    <b>Назва:</b> ${name}<br>
    <b>Модулі:</b> ${modules.replace(/\n/g, '<br>')}
  `;
});
