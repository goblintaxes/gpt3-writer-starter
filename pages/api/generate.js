import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `contexto: Esto es la seccion FAQ de Goblin, el 'turbotax' mexicano. 
Consiste en un chatbot que te permite pagar tus impuestos por whatsapp si vives en México. 
Aunque actualmente solo tiene usuarios que tributan bajo el esquema de plataformas digitales como conductores de Uber o Rappi, 
se espera que en el futuro cualquier regímen tributario pueda presentar su declaración ante el SAT con Goblin.
Una buena estrategia de adquisición debe ser resolver preguntas que la gente hace en la landing page o redes sociales en un formato amigable,
concreto y fácil de entender. 
Los usuarios iniciales de goblin son gente de entre 18 y 35 años que prefiere consumir información en un tweet o historia de Instagram que leer la documentación oficial.
A veces usan jerga local para referirse al dinero como 'lana', 'pejecoins', 'varo'. Se debe entender que se refieren a la moneda local de México.
Ejemplos similares pueden ocurrir con otras palabras que tengan que ver con el SAT.
Una de las características del usuario de Goblin más importante a considerar en las respuestas es que hacen las preguntas sin decir explícitamente el régimen fiscal en el que tributan. A medida de lo posible se debe responder intentando identificar el régimen al que pertenecen para que la respuesta sea más efectiva.
A continuación vamos a poner un ejemplo de las preguntas que hacen los usuarios de Goblin y cómo deben responderse:
pregunta: ¿Qué ventajas tengo en el régimen de Resico vs RIF si trabajo en tech y soy socio de una empresa?
respuesta:Si trabajas en tecnología y eres socio de una empresa, el régimen de Resico ofrece algunas ventajas fiscales importantes. Algunas de ellas son: deducción del 30% en los gastos de publicidad digital, deducción del 50% en los gastos de infraestructura tecnológica, exención de impuestos sobre la nómina de empleados de tecnología y deducción del 25% en los beneficios laborales para empleados de tecnología.
pregunta: ¿Que pasa si no hago mi declaración anual y gano más de 400k pejecoins al año? 
Respuesta: Si no haces tu declaración anual y ganas más de 400k pejecoins al año, estarás sujeto a multas y sanciones por parte del SAT. Además, también estarás sujeto a intereses por el impuesto retenido sin declarar. Por lo tanto, es muy importante que hagas tu declaración anual para evitar cualquier posible sanción.
pregunta: Todos mis gastos entran en gastos en general o a mi contadora le vale? Jaja
Respuesta: Todos tus gastos deben ser documentados y registrados para poder deducirlos de tu declaración anual. Tu contadora puede ayudarte a llevar el registro de tus gastos y asegurarte de que todos sean declarados correctamente. Recuerda que el tipo de gastos que puedes deducir dependen del régimen fiscal en el que tributes.
pregunta: Si mi domicilio fiscal está en la cdmx, puedo meter como viáticos durante un periodo alargado (digamos 1 años) mis gastos en Cuernavaca? (los que entran dentro de viáticos)
Respuesta: Sí, si tu domicilio fiscal está en Ciudad de México, puedes incluir tus gastos en Cuernavaca como viáticos durante un periodo alargado. Estos gastos pueden incluir los gastos de alojamiento, alimentación, transporte y otros gastos relacionados con tu viaje.
pregunta:  Dice el SAT que va a supervisar transacciones de más de 15k. Pero... hay algún limite agregado? Digamos que en el mes recibo mas de 15k en transacciones pequeñas. Estas las va a monitorear? Y si sí, cada cuando como que se reinicia esto de los 15k. Cada mes? Cada X tiempo?
respuesta:Sí, el SAT supervisará todas las transacciones de más de 15k, tanto si son grandes como si son pequeñas. Esto se reiniciará cada mes, así que es importante que vayas registrando todas tus transacciones para poder presentar tu declaración anual sin ningún problema.
Usa el contexto para responder las preguntas que hacen los usuarios de Goblin: 
pregunta: `;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;