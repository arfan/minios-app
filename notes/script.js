let textarea = document.getElementById('noteArea');

// Load saved note
window.onload = () => {
  let saved = localStorage.getItem('minios_note');
  if (saved) textarea.value = saved;
}

function saveNote() {
  localStorage.setItem('minios_note', textarea.value);
  alert('Note saved!');
}
