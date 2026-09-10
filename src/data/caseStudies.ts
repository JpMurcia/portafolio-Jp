import type { CaseStudy } from '../types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'jp-caso-1',
    number: 'Caso 01',
    tags: ['Integración ERP', 'Industria · Báscula', 'Synergy Work'],
    title: 'Del peso en la báscula al asiento en el ERP, sin digitar',
    summary:
      'InfoMetal es la aplicación de supervisión y seguimiento del proceso de báscula. Diseñé la cadena completa: la lectura del instrumento por puerto serial, la aplicación web que la muestra en tiempo real, y las integraciones que empujan la operación hacia Oracle Applications Cloud y la devuelven como reportes de BI.',
    skills: [
      'apex',
      'plsql',
      'oracle',
      'rest',
      'soap',
      'analytics',
      'react',
      'js',
      'socket',
      'node',
      'ts',
      'sql',
    ],
    metaStats: [
      { label: 'Rol', value: 'Ingeniero de Desarrollo' },
      { label: 'Periodo', value: '2021 — hoy' },
      { label: 'Stack', value: 'APEX · React · Express' },
      { label: 'Protocolos', value: 'Serial · Socket · REST · SOAP' },
    ],
    problem:
      'El peso lo lee un instrumento que solo habla por puerto serial. Sin integración, alguien mira el display, lo transcribe a una planilla y más tarde otra persona lo vuelve a digitar en el ERP. Dos transcripciones manuales por operación, y una diferencia de un dígito solo aparece en la conciliación del cierre.',
    constraints: [
      'El ERP es SaaS: no hay acceso a su base de datos, solo servicios publicados.',
      'La báscula no se puede modificar ni reemplazar.',
      'La operación no puede detenerse si el ERP no responde.',
      'El navegador no habla con el puerto serial.',
    ],
    useCaseNote:
      'Quién hace qué y qué sistemas participan. Reemplaza las capturas: describe la funcionalidad sin mostrar datos de la operación.',
    architectureHeading: 'Arquitectura y flujo de datos',
    architectureNote: 'Diagrama conceptual. Cada tramo indica su protocolo y su modo.',
    failureModes: [
      {
        title: 'Falla: puerto caído',
        body: 'El agente reintenta la apertura y la UI marca la lectura como no confiable en vez de mostrar el último valor.',
      },
      {
        title: 'Falla: ERP sin respuesta',
        body: 'La operación se persiste local y queda en cola; el envío se reintenta sin bloquear al operario.',
      },
      {
        title: 'Falla: envío duplicado',
        body: 'Clave de negocio única por operación: el reenvío es idempotente y queda registrado en bitácora.',
      },
    ],
    decisionsHeading: 'Decisiones de diseño',
    decisionsTable: [
      {
        decision: 'Agente local con socket entre la báscula y el navegador',
        discarded: 'Aplicación de escritorio que reemplace la web',
        why: 'El navegador no accede al puerto serial. El agente aísla el driver y deja la UI desplegable y actualizable sin tocar los equipos de planta.',
      },
      {
        decision: 'Cola en base de datos antes de llamar al ERP',
        discarded: 'Llamada síncrona en el momento del pesaje',
        why: 'Un ERP SaaS tiene latencia y ventanas de mantenimiento. La cola da reproceso, trazabilidad y desacopla la operación de la disponibilidad del ERP.',
      },
      {
        decision: 'APEX como capa de integración, no como interfaz de usuario',
        discarded: 'Un microservicio aparte en Node',
        why: 'La lógica vive junto a los datos en PL/SQL, y APEX ya aporta despliegue, autenticación y consumo de servicios sin infraestructura adicional que mantener.',
      },
      {
        decision: 'Reportes sobre modelo SQL en Oracle Analytics',
        discarded: 'Exportar a hoja de cálculo y graficar aparte',
        why: 'El modelo se define una vez y todos los reportes leen la misma definición. Sin versiones divergentes del mismo indicador en distintos escritorios.',
      },
    ],
    implementation: [
      {
        title: 'Contrato del servicio hacia el ERP',
        code: `POST /erp/integrations/weighing-operations
Content-Type: application/json
Authorization: Bearer <token>

{
  "businessKey":  "OP-DEMO-000148",   -- clave idempotente
  "scaleId":      "SCALE_DEMO_01",
  "netWeightKg":  18420.5,
  "capturedAt":   "2026-03-11T09:14:22-05:00",
  "material":     "MAT_DEMO_A",
  "vehiclePlate": "XXX000",
  "source":       "INFOMETAL_AGENT"
}

201 Created  { "erpDocumentId": "DOC-DEMO-77120" }
409 Conflict { "reason": "DUPLICATE_BUSINESS_KEY" }`,
        note: 'La clave de negocio la genera el origen, no el ERP. Eso permite reintentar sin miedo: el segundo envío responde 409 y la cola lo marca como ya aplicado en lugar de duplicar el documento.',
      },
      {
        title: 'Paquete PL/SQL de la cola de envío',
        code: `CREATE OR REPLACE PACKAGE pkg_erp_outbox AS

  -- Encola una operación ya persistida localmente.
  PROCEDURE enqueue (
    p_business_key  IN  VARCHAR2,
    p_payload       IN  CLOB,
    x_queue_id      OUT NUMBER
  );

  -- Toma los pendientes y los envía en lote.
  -- Reintento con espera creciente; nunca pierde el registro.
  PROCEDURE dispatch_pending (
    p_batch_size    IN  NUMBER  DEFAULT 50,
    p_max_attempts  IN  NUMBER  DEFAULT 5
  );

END pkg_erp_outbox;`,
        note: 'Tres estados en la tabla de cola: PENDING, SENT, FAILED. Lo que agota los intentos queda visible en una pantalla de APEX para reproceso manual, con el error del ERP a la vista.',
      },
      {
        title: 'Lectura del puerto serial y difusión a la SPA',
        code: `// Agente local — normaliza la trama y la difunde.
port.on('data', (chunk) => {
  const reading = parseFrame(chunk);        // "ST,GS,+018420.5kg"
  if (!reading.stable) return;              // solo peso estable
  io.emit('weight', {
    scaleId: 'SCALE_DEMO_01',
    netWeightKg: reading.kg,
    capturedAt: new Date().toISOString()
  });
});

port.on('error', () => io.emit('scale:offline'));`,
        note: 'Solo se difunde el peso cuando el instrumento reporta lectura estable. La UI distingue tres estados — estable, inestable y sin conexión — para que el operario nunca registre un valor en movimiento.',
      },
    ],
    outcome: [
      'Se eliminaron las dos transcripciones manuales por operación.',
      'El peso llega al ERP con marca de tiempo y trazabilidad hasta el instrumento.',
      'La supervisión pasó de planillas al Reporteador de InfoMetal sobre Oracle Analytics.',
      'La planta sigue operando cuando el ERP no responde; nada se pierde.',
    ],
    outcomeNote: 'El Reporteador es un sistema interno del cliente; no publico su URL.',
    learnings: [
      'Que la parte difícil de integrar con un ERP corporativo no es la llamada al servicio: es decidir qué pasa cuando falla. La idempotencia y la cola fueron lo que volvió confiable el sistema, no la velocidad.',
      'Y que en planta la interfaz tiene que ser honesta sobre lo que no sabe. Mostrar «sin conexión» es mejor que mostrar un número viejo.',
    ],
  },

  {
    id: 'jp-caso-2',
    number: 'Caso 02',
    tags: ['Sistema legado', 'Sector público · Educación', 'Universidad de la Amazonia'],
    title: 'Sostener y extender «Chaira», el sistema académico-administrativo',
    summary:
      'Como técnico administrativo trabajé sobre un sistema en producción del que dependen procesos institucionales, entre ellos los módulos de contratación. El trabajo fue mitad ingeniería y mitad traducción: levantar el requerimiento con el área que opera el proceso y llevarlo a un código base heredado sin romper lo que ya funcionaba.',
    skills: ['csharp', 'dotnet', 'oracle', 'plsql', 'sql', 'git'],
    metaStats: [
      { label: 'Rol', value: 'Técnico administrativo' },
      { label: 'Periodo', value: '2021 — 2022' },
      { label: 'Stack', value: 'C# · .NET · Ext.NET' },
      { label: 'Base de datos', value: 'Oracle · PL/SQL' },
    ],
    problem:
      'Un sistema con años de historia, capas superpuestas y lógica repartida entre la aplicación y la base de datos. Cada cambio pequeño costaba caro porque nadie sabía con certeza qué más tocaba, y los reportes que pedían las áreas se armaban a mano fuera del sistema.',
    constraints: [
      'Sistema en producción con usuarios institucionales todos los días.',
      'Nada de reescribir: solo mantener, refactorizar y extender.',
      'Procesos con calendario fijo — los cambios entran entre ventanas.',
      'Lógica de negocio dentro de procedimientos, funciones y tipos en Oracle.',
    ],
    useCaseNote: 'Los módulos de contratación desde la perspectiva de quien los usa.',
    architectureHeading: 'Flujo de trabajo',
    architectureNote:
      'Aquí el diagrama no es de arquitectura sino de proceso: así entraba un requerimiento y así salía a producción.',
    decisionsHeading: 'Criterios que apliqué',
    criteriaStyle: 'grid',
    criteria: [
      {
        title: 'Refactor con alcance',
        body: 'Limpio solo el camino que el requerimiento atraviesa. Un refactor amplio en un sistema sin pruebas es un riesgo, no una mejora.',
      },
      {
        title: 'La lógica queda donde vive el dato',
        body: 'Si la regla ya está en un procedimiento de Oracle, la corrijo allí. Duplicarla en C# crea dos verdades.',
      },
      {
        title: 'El reporte, dentro del sistema',
        body: 'Convertir en plantilla lo que se armaba a mano cada mes. Es lo que más tiempo devuelve al área usuaria.',
      },
    ],
    implementation: [],
    outcome: [
      'Nuevas funcionalidades en producción sin interrumpir la operación institucional.',
      'Reportes recurrentes convertidos en plantillas del sistema.',
      'Código y objetos de base de datos más legibles para quien viniera después.',
    ],
    learnings: [
      'A leer código que no escribí y a preguntar antes de cambiarlo. En un sistema legado la habilidad más valiosa no es programar rápido: es entender por qué algo está hecho así antes de decidir que está mal.',
    ],
  },

  {
    id: 'jp-caso-3',
    number: 'Caso 03',
    tags: ['Investigación', 'Móvil sin conexión', 'Grupo GIECOM'],
    title: 'Gestor comunitario de selva: captura en campo sin señal',
    summary:
      'Proyecto de investigación de la Universidad de la Amazonia. Construí la aplicación móvil de captura, la base de datos local, el backend en NestJS y su despliegue. El requisito que definió toda la arquitectura: en la selva no hay conexión, y el dato no puede esperar a tenerla.',
    skills: ['nest', 'ts', 'node', 'postgres', 'unity', 'csharp', 'sqlite', 'swagger', 'aws', 'js'],
    metaStats: [
      { label: 'Rol', value: 'Desarrollador de software' },
      { label: 'Periodo', value: '2020' },
      { label: 'Cliente móvil', value: 'Unity · C# · SQLite' },
      { label: 'Backend', value: 'NestJS · TypeORM · PostgreSQL' },
    ],
    useCaseNote:
      'La captura funciona sin conexión; la sincronización es un caso de uso aparte, no un efecto secundario.',
    architectureHeading: 'Arquitectura',
    decisionsHeading: 'Decisiones',
    decisionsPlacement: 'finalGrid',
    criteriaStyle: 'list',
    criteria: [
      {
        title: 'SQLite como fuente primaria en campo, no como caché',
        body: 'la app funciona completa sin red y sincroniza cuando la hay.',
      },
      {
        title: 'API documentada con Swagger desde el primer día',
        body: 'porque el equipo que consume el dato no es el que lo escribe.',
      },
      {
        title: 'Unity para el cliente móvil',
        body: 'aprovechando el mismo entorno del componente interactivo del proyecto.',
      },
    ],
    implementation: [],
    learnings: [
      'Que diseñar para «sin conexión» obliga a decidir de antemano qué pasa cuando dos versiones del mismo registro se encuentran. Es la misma pregunta que años después me volvió a aparecer en la cola de envío al ERP.',
    ],
  },
]
