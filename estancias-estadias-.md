
#   Universidad Politécnica de Tlaxcala
<!---
(century gothic, 26, negritas)
---->


<!---
Ingeniería  (century gothic, 18)
---->

<!---
Titulo del proyecto (century gothic, 24)
---->


<!---
---->
<!---
---->
<!---
---->

Participantes: (century gothic, 10, negritas)
Nombre estudiante  (century gothic, 14)
Correo electrónico

Asesor externo
Correo electrónico

Asesor interno
correo electrónico




<!---
(century gothic, 18)
---->
Fecha







<!---
---->
<!---
---->
<!---
---->


Resumen 
El proyecto consiste en el diseño e implementación de un sistema web de inventario con especial énfasis en el control de caducidades, desarrollado como trabajo práctico y educativo. Se partió de una base de datos inicial elaborada en Excel (con fórmulas y control por celdas) que fue convertida a formato JSON y utilizada como fuente única de datos. La aplicación, construida con HTML, CSS y JavaScript puro, carga dinámicamente los productos, genera una tabla de inventario y una tabla específica de caducidades, y persiste cambios en LocalStorage. El sistema fue desplegado en Vercel y simula la operación de la empresa 3E con roles lógicos (administrador, auditor y cajero). Los resultados muestran un control claro de stock y caducidades, facilitan la identificación de productos próximos a expirar y demuestran que soluciones locales y sencillas pueden ser escaladas a SQL/Supabase y autenticación en el futuro.

Planteamiento del problema
En la práctica comercial y educativa, el control de caducidades es una debilidad crítica en inventarios manejados manualmente o con hojas de cálculo estáticas. La falta de un sistema accesible y dinámico provoca errores en registros, pérdidas por productos vencidos y mala toma de decisiones. En contextos de pequeña empresa (simulada aquí como 3E) esto impacta la rotación, pérdidas económicas y prácticas ambientales por desperdicio. Si no se interviene, la situación se agrava conforme crece el surtido o la complejidad del almacén. Se propone una solución web local, sencilla y preparada para escalar, que permita visualizar, alertar y gestionar caducidades sin depender inicialmente de un backend complejo.
Justificación
El proyecto aporta aprendizaje práctico y una solución técnica que reduce pérdidas por caducidad y mejora la organización. Técnicamente, enseña manejo de estructuras de datos (JSON), persistencia en LocalStorage y renderizado dinámico con JavaScript puro. Ambientalmente, disminuye desperdicios al permitir identificar y priorizar productos próximos a expirar. Además, la solución es económicamente accesible para micro y pequeñas empresas, y está diseñada para migrar a SQL/Supabase y autenticación cuando se requiera.


Objetivo general
Desarrollar un sistema web de inventario con control de caducidades, usando HTML, CSS y JavaScript, persistente en LocalStorage y estructurado para futura migración a bases de datos y autenticación, con el fin de mejorar el control de stock y reducir pérdidas por vencimiento.


Objetivos específicos
1. Modelar la base de datos inicial en Excel y generar un archivo JSON como fuente de datos.


2. Implementar una tabla HTML dinámica que muestre el inventario completo.


3. Crear una vista y tabla específica para el control de caducidades con filtros y alertas visuales.


4. Persistir altas, bajas y modificaciones en LocalStorage.


5. Estructurar la aplicación para permitir migración a SQL/Supabase y añadir autenticación en etapas posteriores.


6. Simular roles lógicos (administrador, auditor, cajero) para controlar funcionalidades del POS.


Análisis del contexto

(empresa 3E - simulación)

La solución se desarrolló como práctica aplicada a la simulación de la empresa 3E, pequeña unidad comercial con manejo de productos perecederos. La estructura del proyecto contempla separación de módulos: inventario general, control de caducidades y POS (cajero). Se modelaron tres roles lógicos que permiten diferenciar vistas y permisos a nivel de interfaz, sin integrar aún un sistema de autenticación real. El despliegue en Vercel demuestra viabilidad de publicación y acceso público para revisión.


Desarrollo
1. Modelado inicial (Excel): se creó la plantilla de inventario con columnas clave (ID, nombre, categoría, lote, fecha de caducidad, cantidad, precio). Se implementaron fórmulas para conteos, vencimientos relativos y control por celdas.


2. Conversión a JSON: la tabla de Excel se limpió y exportó a JSON para servir como “base de datos” local.


3. Estructura HTML/CSS: se diseñó la interfaz con un contenedor #app (hash routing básico: #app y rutas internas) y tablas <table> para inventario y caducidades; estilos claros para alertas de proximidad a vencimiento.


4. Lógica JavaScript: lectura del JSON, render dinámico de filas (<tr>/<td>), funciones CRUD a nivel cliente, generación de tabla de caducidades (ordenada por fecha), y gestión de roles lógicos.


5. Persistencia: uso de localStorage para guardar cambios y simular comportamiento de base de datos.


6. Despliegue: publicación en Vercel para acceso y revisión.


7. Pruebas: verificación de consistencia de datos, comprobación de alertas de vencimiento, pruebas de flujo POS (ventas simuladas) y restauración desde JSON.




Resultados y conclusiones
Se obtuvo una aplicación funcional que permite visualizar el inventario y las caducidades en tiempo real desde el navegador.

La conversión desde Excel a JSON demostró ser una vía práctica para transición desde hojas de cálculo a aplicaciones web.

LocalStorage ofreció persistencia suficiente para el prototipo y facilitó pruebas sin backend.

La tabla de caducidades permite identificar lotes próximos a expirar, lo que reduce riesgo de pérdidas y facilita toma de decisiones.

La estructura y documentación facilitan la migración a SQL/Supabase y la incorporación de autenticación en etapas posteriores.
Conclusión: el proyecto demuestra que, con herramientas básicas y lógica clara, se puede construir un sistema de inventario con control de caducidades eficiente y escalable.

---

Distribución del tiempo (Justificación: 3 meses = 500 horas)

Total: 500 horas (aprox. 3 meses de trabajo intensivo).

Planificación y especificación: 40 h

Modelado en Excel y fórmulas (control por celdas): 80 h

Limpieza de datos y conversión a JSON: 60 h

Maquetado HTML/CSS y diseño de tablas: 80 h

Desarrollo JS (render, CRUD, hash routing, tabla de caducidades): 100 h

Persistencia y lógica LocalStorage: 40 h

Pruebas, correcciones y polish UI: 30 h

Despliegue en Vercel y ajustes finales: 30 h

Documentación, escritura del informe y entrega: 40 h

<!---
---->
<!---
---->
<!---
---->
<!---
---->

Este desglose justifica las 500 horas por la amplitud del trabajo: diseño, modelado de datos (Excel+fórmulas), codificación desde cero en JavaScript, pruebas y documentación.


---

Recomendaciones finales (breves)

Mantener la fuente JSON como canonical mientras se prepara la migración a SQL.

Implementar gradualmente autenticación y roles reales (por ejemplo con Supabase).

Añadir notificaciones programadas para caducidades críticas.

Versionar el JSON/backup automático usando export/import para recuperaciones.



—

<!---


Redacción

Anexo 1. Recomendaciones metodológicas, tipográficas e impresión
Redacción:	Escribir siempre con buena ortografía en la tercera persona del singular (impersonal). Evitar errores de concordancia acerca del singular y plural en las oraciones y frases empleadas. Evitar errores de concordancia entre el femenino y masculino. Cuidar el tiempo verbal, de manera que éste no cambie cuando se expresa la misma idea. Deberá usarse en la redacción un lenguaje formal y claro y evitar las expresiones coloquiales. Evitar expresar las ideas principales en frases breves, para luego extenderse en consideraciones acerca de temas secundarios.
Tipo y tamaño de letra:	Century Gothic, 11 puntos, 1.5 de interlineado.
Extensión	Mínima, cuatro cuartillas; máxima, seis cuartillas.
Títulos	Century Gothic, 14 puntos, negritas
Márgenes y espacios:	El tamaño de los márgenes será el siguiente:
Superior:   2.5 cm.
Inferior:     2.5 cm.
Derecho: 2.5 cm.
Izquierdo: 3.0 cm.
Títulos, subtítulos y párrafos subsiguientes:	El espacio entre títulos y texto subsiguiente, usar interlineado doble; entre subtítulos de 1er. y 2do. Orden y texto subsiguiente, usar interlineado 1.5. Entre párrafos, usar un renglón intermedio de 1.5. Textos, sin sangría.
Tablas y figuras con el texto:	El espacio entre las tablas y/o figuras deben colocarse a continuación y tan cerca como sea posible de la primera referencia que a ellas se haga en el texto. Toda tabla que no quepa en el espacio restante de la página debe incluirse en la página siguiente. El título de la tabla o figura se colocará a un espacio sencillo desde la misma, a 9 puntos.


---->
