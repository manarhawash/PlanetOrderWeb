const correctOrder = [
  'mercury','venus','earth','mars',
  'jupiter','saturn','uranus','neptune'
];

const planetContainer = document.getElementById('planetContainer');
const dropArea = document.getElementById('dropArea');
const btnCheck   = document.getElementById('btnCheck');

// 1. تحميل الكواكب بترتيب عشوائي
function loadPlanets() {
  const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
  shuffled.forEach(name => {
    const img = document.createElement('img');
    img.src = `images/${name}.jpg`;
    img.id  = name;
    img.classList.add('planet');
    img.draggable = true;
    img.addEventListener('dragstart', onDragStart);
    img.addEventListener('dragend',  onDragEnd);
    planetContainer.appendChild(img);
  });
}

// 2. أحداث السحب والإفلات
function onDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add('dragging');
}
function onDragEnd(e) {
  e.target.classList.remove('dragging');
}

dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.style.background = '#e0ffe0';
});
dropArea.addEventListener('dragleave', e => {
  dropArea.style.background = '#fafafa';
});
dropArea.addEventListener('drop', e => {
  e.preventDefault();
  dropArea.style.background = '#fafafa';
  const id = e.dataTransfer.getData('text/plain');
  const img = document.getElementById(id);
  if (img && !dropArea.contains(img)) {
    dropArea.appendChild(img);
  }
});

// 3. التحقق من الترتيب
btnCheck.addEventListener('click', () => {
  const userOrder = Array.from(dropArea.querySelectorAll('.planet'))
                         .map(img => img.id);
  if (userOrder.length !== correctOrder.length) {
    alert('يرجى سحب كل الكواكب أولاً!');
    return;
  }
  const ok = correctOrder.every((name, i) => name === userOrder[i]);
  alert(ok ? '✅ أحسنت! الترتيب صحيح.' 
           : '❌ الترتيب غير صحيح، حاول مرة أخرى.');
});

// 4. بدء اللعبة
loadPlanets();
