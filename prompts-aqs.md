# Prompt 1:

Eres el experto desarrollador full-stack que va a realizar un ticket con una solicitud de cambio en la aplicación

Esta es la historia de usuario que hay que trabajar:
# Ticket: Añadir Candidato al Sistema

El reclutador, quiere tener la capacidad de añadir candidatos al sistema ATS, para que pueda gestionar sus datos y procesos de selección de manera eficiente.

# Criterios de Aceptación:

1. Accesibilidad de la función: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.
2. Formulario de ingreso de datos: Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
3. Validación de datos: El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.
4. Carga de documentos: El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.
5. Confirmación de añadido: Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.
6. Errores y manejo de excepciones: En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.
7. Accesibilidad y compatibilidad: La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.

# Notas:

La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.
Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.

# Tareas Técnicas:

1. Implementar la interfaz de usuario para el formulario de añadir candidato.
2. Desarrollar el backend necesario para procesar la información ingresada en el formulario.
3. Asegurar la seguridad y privacidad de los datos del candidato.

Necesito que realices lo siguiente:
* Hazme la preguntas que consideres necesarias para mejorar la comprensión de tarea.
* Definir detalladamente las tres tareas de trabajo.
* Define los pasos a seguir para completar cada una de las tareas requeridas correctamente.
* Aplicar la solución paso a paso, de modo que podamos ir revisando que la ejecución se realiza sin problemas, y si se presentan, poder revisarlos juntos.

# Respuesta 2:

¡Perfecto! Antes de definir y ejecutar las tareas, te hago algunas preguntas para asegurarme de que la solución cumpla exactamente con tus expectativas:

**Preguntas para Mejorar la Comprensión

1. ¿Qué campos son obligatorios en el formulario de candidato? (¿Todos los mencionados o solo algunos?)
2. ¿El dashboard del reclutador ya existe? Si es así, ¿en qué archivo o ruta se encuentra?
3. ¿Dónde y cómo se almacenarán los documentos (CVs)? ¿En el sistema de archivos, en la base de datos como BLOB, o en un servicio externo?
4. ¿Hay algún límite de tamaño para los archivos de CV?
5. ¿El backend ya tiene un modelo de "Candidato" en Prisma o hay que crearlo?
6. ¿Qué datos existen actualmente para autocompletar educación y experiencia laboral?
7. ¿Hay algún diseño o estilo UI que deba seguirse (por ejemplo, Material UI, Bootstrap, etc.)?
8 .¿El sistema debe enviar algún correo o notificación tras añadir un candidato, o solo mostrar el mensaje en pantalla?

**Definición Detallada de las Tareas

1. Implementar la interfaz de usuario para el formulario de añadir candidato
* Crear un botón/enlace visible en el dashboard del reclutador.
* Al hacer clic, mostrar un formulario modal o en página.
* Incluir campos: nombre, apellido, correo electrónico, teléfono, dirección, educación, experiencia laboral y carga de CV.
* Validar los datos en frontend (campos obligatorios, formato de email, tipo de archivo).
* Mostrar mensajes de éxito o error.

2. Desarrollar el backend necesario para procesar la información ingresada en el formulario
* Crear endpoint para recibir los datos y el archivo.
* Validar datos en backend.
* Guardar la información del candidato en la base de datos.
* Almacenar el archivo de CV de forma segura.
* Responder con éxito o error.

3. Asegurar la seguridad y privacidad de los datos del candidato
* Validar y sanitizar los datos recibidos.
* Limitar el tamaño y tipo de archivo subido.
* Proteger el endpoint con autenticación/autorización.
* No exponer rutas directas a los archivos subidos.
* Cumplir con normativas de protección de datos (GDPR/LFPDPPP si aplica).

Pasos para Completar Cada Tarea
**1. Interfaz de Usuario**
	1. Identificar el archivo del dashboard del reclutador.
	2. Añadir el botón/enlace "Añadir Candidato".
	3. Crear el formulario con los campos requeridos y carga de archivo.
	4. Implementar validaciones en frontend.
	5. Conectar el formulario al endpoint backend.
	6. Mostrar mensajes de éxito/error.
**2. Backend**
	1. Revisar/crear el modelo "Candidato" en Prisma.
	2. Crear endpoint POST /api/candidatos para recibir datos y archivo.
	3. Validar datos y archivo en backend.
	4. Guardar datos en la base de datos y archivo en el sistema.
	5. Responder con mensaje adecuado.
**3. Seguridad y Privacidad**
	1. Validar y sanitizar datos en backend.
	2. Limitar tamaño y tipo de archivo.
	3. Proteger endpoint con autenticación/autorización.
	4. Revisar permisos de acceso a archivos subidos.
	5. Documentar medidas de seguridad implementadas.

¿Te gustaría responder las preguntas iniciales para afinar la solución, o avanzo con la primera tarea (UI) asumiendo los valores por defecto?

# Prompt 2:

Sobre las preguntas que me haces, estas son las respuestas:
1. Todos los campos son obligatorios, nombre, apellido, correo electrónico, telefono y dirección deben validarse. en el caso del campo educación debe contener los campos mes/años de inicio y fin (puede ser una fecha o hasta el día de hoy), nombre institución y titulo asociado. en el caso del campo experiencia laboral debe contener los campos mes/años de inicio y fin, nombre empresa y cargo asociado, considera agregar otro campos que consideres pueden ser importantes para el caso.
2. El dashboard del reclutador no existe, debe crearse.
3. Los documentos almacenalos en la base de datos como BLOB por el momento.
4. El limite de tamaño para los archivos cv es de 20 MB.
5. El backend no cuenta con modelo en Primsa, debe crearse.
6. No hay datos actualmente para autocompletar. Crear un modelo que permita almacenar estos datos, en caso que en el futuro se proporcionen. Los nuevos ingresos deben ir poblando esta tabla de datos.
7. Utiliza bootstrap para los diseños y estilos.
8. Envíar un correo al cantidato cuando ingrese su postulación. Considera que mientras se encuentre la aplicación en modo de prueba o desarrollo, los correos se envien a una casilla especifica, como por ejemplo correo_pruebas@lti-dev.com. Tambien mostrar un mensaje en pantalla al momento de enviar la postulación exitosamente.


# Respuesta 2:
**1. Implementar la interfaz de usuario para el formulario de añadir candidato**
**Pasos**:

	1. Crear el dashboard del reclutador en el frontend (src), usando Bootstrap.
	2. Añadir un botón visible "Añadir Candidato".
	3. Al hacer clic, mostrar un formulario (modal o página) con los siguientes campos obligatorios:
		* Nombre, Apellido, Correo electrónico, Teléfono, Dirección.
		* Educación: inicio, fin, institución, título.
		* Experiencia laboral: inicio, fin, empresa, cargo (puedes agregar área, descripción, etc.).
		* Carga de CV (PDF/DOCX, máx. 20MB).
	4. Validar todos los campos en frontend.
	5. Mostrar mensajes de éxito o error tras enviar.
**2. Desarrollar el backend necesario para procesar la información ingresada en el formulario**
**Pasos**:

	1. Crear modelos en Prisma para Candidato, Educación, ExperienciaLaboral, AutocompleteData y Documento (CV como BLOB).
	2. Crear endpoint en Express para recibir los datos y el archivo.
	3. Validar datos y archivo (tipo y tamaño) en backend.
	4. Guardar datos y archivo en la base de datos.
	5. Enviar correo al candidato (redirigir a correo_pruebas@lti-dev.com en desarrollo).
	6. Responder con éxito o error.
**3. Asegurar la seguridad y privacidad de los datos del candidato**
**Pasos:**

	1. Validar y sanitizar datos en backend.
	2. Limitar tamaño y tipo de archivo.
	3. Proteger endpoint (autenticación/autorización si aplica).
	4. No exponer rutas directas a los archivos.
	5. Documentar medidas de seguridad.
	
Siguiente paso:
Voy a crear la estructura inicial del dashboard del reclutador en el frontend, con el botón "Añadir Candidato". ¿Te gustaría que sea una página nueva o un componente dentro de App.tsx? Si no tienes preferencia, lo haré como una nueva página y la enlazaré desde el menú principal.
¿Avanzo con esto?

# Prompt 3:

