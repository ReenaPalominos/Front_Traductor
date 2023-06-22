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

  const inputText = document.getElementById("input-text").value;

  // Realizar la solicitud al backend
  fetch('localhost:8000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromLang,
      to: toLang,
      text: inputText
    })
  })
    .then(response => response.json())
    .then(data => {
      // Aquí puedes manejar la respuesta del backend y actualizar el cuadro de texto de salida con la traducción
      const translatedText = data.translation;
      document.getElementById('output-text').value = translatedText;
    })
    .catch(error => {
      // Maneja los errores de la solicitud al backend
      console.error('Error al obtener la traducción:', error);
    });
  
}
