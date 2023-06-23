// Función para acceder al micrófono y convertir la voz a texto
function accessMicrophone() {
  // Comprobar si el navegador admite el reconocimiento de voz
  if (
    !("SpeechRecognition" in window) &&
    !("webkitSpeechRecognition" in window)
  ) {
    alert("El reconocimiento de voz no es compatible con este navegador.");
    return;
  }

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  // Configuración de reconocimiento de voz
  recognition.lang = "es-ES"; // Establece el idioma de entrada, en este caso, español
  recognition.continuous = false; // Reconocimiento de voz único en lugar de continuo

  // Evento que se dispara cuando se obtiene un resultado del reconocimiento de voz
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("input-text").value = transcript; // Agrega el texto reconocido al cuadro de texto de entrada
  };

  // Evento que se dispara si hay un error en el reconocimiento de voz
  recognition.onerror = function (event) {
    console.error("Error en el reconocimiento de voz: ", event.error);
  };

  // Iniciar el reconocimiento de voz
  recognition.start();
}

// Función para que el computador lea el texto escrito en el segundo textarea
function speakText() {
  const text = document.getElementById("output-text").value;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

function translateText() {
  const fromLang = document.getElementById('from-lang').value;
  const toLang = document.getElementById('to-lang').value;
  const inputText = document.getElementById('input-text').value;
  const outputTextArea = document.getElementById('output-text');
  
  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    from: fromLang,
    to: toLang,
    model: 'ml',
    text: inputText
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('http://localhost:31415/translate', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.translation);
      outputTextArea.value = result.translation;
    })
    .catch(error => console.log('error', error));
}
