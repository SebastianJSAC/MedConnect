# MedConnect

Aplicación web de telemedicina que permite a los pacientes agendar citas médicas y realizar videoconsultas desde el navegador.

## Funcionalidades

- **Login** — autenticación con validación de formulario
- **Onboarding** — tutorial de 5 pasos para nuevos usuarios
- **Dashboard** — resumen de citas próximas y estadísticas del paciente
- **Agendar cita** — flujo de 3 pasos: especialidad → horario → confirmación
- **Historial médico** — consultas anteriores con descarga de recetas
- **Videoconsulta** — llamada simulada con control de micrófono y cámara, temporizador en tiempo real

## Tecnologías

- React 18
- Vite 6
- Estilos inline (sin librerías CSS externas)

## Instalación y uso

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

### Otros comandos

```bash
npm run build    # genera la build de producción en /dist
npm run preview  # sirve la build de producción localmente
```

## Credenciales de prueba

Cualquier correo con `@` y contraseña de al menos 4 caracteres permite ingresar (datos simulados, sin backend real).
