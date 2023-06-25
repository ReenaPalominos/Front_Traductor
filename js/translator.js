// Función para acceder al micrófono y convertir la voz a texto
function accessMicrophone() {
  // Comprobar si el navegador admite el reconocimiento de voz meddiante la API de Web Speech
  if (
    !("SpeechRecognition" in window) &&
    !("webkitSpeechRecognition" in window)
  ) {
    alert("El reconocimiento de voz no es compatible con este navegador.");
    return;
  }

  // Crear un nuevo objeto de reconocimiento de voz
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  // Configuración de reconocimiento de voz
  recognition.lang = "es-ES"; // Establece el idioma de entrada, en este caso, se dejo fijo en español
  recognition.continuous = false; // Solo se obtiene un resultado por reconocimiento

  // Evento que se dispara cuando se obtiene un resultado del reconocimiento de voz
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    // Agrega el texto reconocido al cuadro de texto de entrada input-text
    document.getElementById("input-text").value = transcript; 
  };

  // Evento que se dispara si hay un error en el reconocimiento de voz
  recognition.onerror = function (event) {
    console.error("Error en el reconocimiento de voz: ", event.error);
  };

  // Iniciar el reconocimiento de voz
  recognition.start();
}

// Función para que el computador lea el texto escrito en output-text
function speakText() {
  const text = document.getElementById("output-text").value;
  // Esta función se encuentra en proceso de desarrollo
}

// Función para traducir el texto de input-text a output-text
function translateText() {
  // Obtiene los valores iniciales
  // fromLang: idioma de entrada definido en from-lang
  const fromLang = document.getElementById('from-lang').value;
  // toLang: idioma de salida definido en to-lang
  const toLang = document.getElementById('to-lang').value;
  // inputText: texto de entrada escrito en input-text
  const inputText = document.getElementById('input-text').value;
  // outputTextArea: cuadro de texto de salida output-text
  const outputTextArea = document.getElementById('output-text');
  
  // Headers para la petición POST
  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');

  // raw contiene los datos de la petición POST
  var raw = JSON.stringify({
    from: fromLang,
    to: toLang,
    model: 'ml',
    text: inputText
  });

  // Configuración de la petición POST
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Realiza el ingreso de la petición POST al endpoint /translate
  fetch('http://localhost:31415/translate', requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.translation);
      // Agrega el texto traducido al cuadro de texto de salida output-text
      outputTextArea.value = result.translation;
    })
    .catch(error => console.log('error', error));
}
