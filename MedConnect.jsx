import { useState, useEffect } from "react";

const COLORS = {
  bg: "#F4F7F6",
  primary: "#2A5C82",
  primaryDark: "#1E4360",
  primaryLight: "#EBF2F8",
  accent: "#3A9E7E",
  danger: "#C0392B",
  dangerDark: "#96281B",
  text: "#1A2B3C",
  textMuted: "#5A6E7F",
  border: "#D4E2EC",
  white: "#FFFFFF",
  success: "#27AE60",
  cardShadow: "0 2px 12px rgba(42,92,130,0.08)",
};

const MOCK_USER = { name: "Juan", email: "juan@correo.com" };

const ESPECIALIDADES = [
  { id: 1, icon: "🫀", label: "Cardiología", desc: "Corazón y circulación" },
  { id: 2, icon: "🧠", label: "Neurología", desc: "Sistema nervioso" },
  { id: 3, icon: "🦴", label: "Traumatología", desc: "Huesos y articulaciones" },
  { id: 4, icon: "👁️", label: "Oftalmología", desc: "Salud visual" },
  { id: 5, icon: "🫁", label: "Neumología", desc: "Pulmones y respiración" },
  { id: 6, icon: "🧬", label: "Medicina General", desc: "Atención integral" },
];

const FECHAS = [
  { id: 1, dia: "Lunes 14 de julio", hora: "09:00 am", doctor: "Dra. María López" },
  { id: 2, dia: "Lunes 14 de julio", hora: "11:30 am", doctor: "Dr. Carlos Ruiz" },
  { id: 3, dia: "Martes 15 de julio", hora: "08:00 am", doctor: "Dra. María López" },
  { id: 4, dia: "Miércoles 16 de julio", hora: "03:00 pm", doctor: "Dr. Andrés Mora" },
  { id: 5, dia: "Jueves 17 de julio", hora: "10:00 am", doctor: "Dra. Sofía Castro" },
];

const HISTORIAL = [
  { id: 1, fecha: "02 jun 2025", especialidad: "Cardiología", doctor: "Dra. María López", diagnostico: "Hipertensión leve", receta: true },
  { id: 2, fecha: "15 may 2025", especialidad: "Medicina General", doctor: "Dr. Carlos Ruiz", diagnostico: "Resfriado común", receta: true },
  { id: 3, fecha: "01 abr 2025", especialidad: "Oftalmología", doctor: "Dra. Sofía Castro", diagnostico: "Astigmatismo moderado", receta: false },
  { id: 4, fecha: "10 feb 2025", especialidad: "Neurología", doctor: "Dr. Andrés Mora", diagnostico: "Migraña tensional", receta: true },
];

const ONBOARDING_PASOS = [
  {
    icon: "🩺",
    titulo: "Bienvenido a MedConnect",
    desc: "Esta es tu aplicación para consultas médicas desde casa. Aquí puedes agendar citas con médicos, hablar con ellos por videollamada y consultar tus atenciones anteriores.",
    lista: null,
    consejo: null,
  },
  {
    icon: "📅",
    titulo: "Agenda tu cita en 3 pasos simples",
    desc: "Es muy fácil. Solo sigue estos pasos:",
    lista: [
      "Paso 1 — Elige el tipo de atención que necesitas (por ejemplo: Medicina General o Cardiología)",
      "Paso 2 — Selecciona el día y la hora que te quede mejor",
      "Paso 3 — Revisa los datos y confirma tu cita con un clic",
    ],
    consejo: null,
  },
  {
    icon: "🎥",
    titulo: "Así funciona la videoconsulta",
    desc: "Cuando llegue el día de tu cita, podrás hablar con tu médico por video. Durante la llamada tienes el control:",
    lista: [
      "🎤 Puedes silenciar o activar tu micrófono cuando quieras",
      "📹 Puedes apagar tu cámara si lo prefieres",
      "📵 Cuando termines, solo presiona «Colgar y salir»",
    ],
    consejo: "No necesitas instalar nada. La videoconsulta funciona directo desde esta aplicación.",
  },
  {
    icon: "📋",
    titulo: "Tus consultas siempre disponibles",
    desc: "En la sección «Mi historial» puedes ver todas tus atenciones anteriores. Desde allí puedes:",
    lista: [
      "Ver el médico que te atendió y el diagnóstico de cada consulta",
      "Descargar tus recetas médicas en cualquier momento",
    ],
    consejo: null,
  },
  {
    icon: "✅",
    titulo: "¡Ya estás listo para comenzar!",
    desc: "Ahora conoces todo lo que MedConnect puede hacer por ti. Si en algún momento tienes dudas, no te preocupes — cada pantalla tiene instrucciones claras para guiarte.",
    lista: null,
    consejo: "Consejo: Los botones azules siempre te llevan al siguiente paso. ¡Empieza agendando tu primera cita!",
  },
];

// ----- ONBOARDING -----
function Onboarding({ onTerminar }) {
  const [paso, setPaso] = useState(0);
  const total = ONBOARDING_PASOS.length;
  const actual = ONBOARDING_PASOS[paso];
  const esUltimo = paso === total - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tutorial de bienvenida a MedConnect"
      style={{
        position: "fixed", inset: 0, background: "rgba(26,43,60,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 2000, padding: "1.5rem",
      }}
    >
      <div style={{
        background: COLORS.white, borderRadius: 24, padding: "2.5rem 2.5rem 2rem",
        maxWidth: 520, width: "100%", boxShadow: "0 8px 48px rgba(0,0,0,0.28)",
        position: "relative",
      }}>
        {/* Botón saltar */}
        <button
          onClick={onTerminar}
          aria-label="Saltar tutorial e ir directo a la aplicación"
          style={{
            position: "absolute", top: 14, right: 16,
            background: "none", border: "none", color: COLORS.textMuted,
            fontSize: 14, cursor: "pointer", padding: "6px 10px", borderRadius: 8,
          }}
          onMouseEnter={e => e.currentTarget.style.color = COLORS.text}
          onMouseLeave={e => e.currentTarget.style.color = COLORS.textMuted}
        >
          Saltar ✕
        </button>

        {/* Barra de progreso */}
        <div
          role="list"
          aria-label={`Tutorial: paso ${paso + 1} de ${total}`}
          style={{ display: "flex", gap: 6, marginBottom: "2rem" }}
        >
          {ONBOARDING_PASOS.map((_, i) => (
            <div
              key={i}
              role="listitem"
              aria-label={`Paso ${i + 1}${i === paso ? " (actual)" : i < paso ? " (completado)" : ""}`}
              style={{
                height: 5, flex: 1, borderRadius: 4,
                background: i <= paso ? COLORS.primary : COLORS.border,
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>

        {/* Ícono y título */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 60, marginBottom: 14 }} aria-hidden="true">
            {actual.icon}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, margin: "0 0 10px", lineHeight: 1.3 }}>
            {actual.titulo}
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: 16, lineHeight: 1.65, margin: 0 }}>
            {actual.desc}
          </p>
        </div>

        {/* Lista de pasos */}
        {actual.lista && (
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: 8 }}>
            {actual.lista.map((item, i) => (
              <li key={i} style={{
                background: COLORS.primaryLight, borderRadius: 10,
                padding: "0.75rem 1rem", color: COLORS.text, fontSize: 15, lineHeight: 1.5,
                borderLeft: `3px solid ${COLORS.primary}`,
              }}>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Consejo */}
        {actual.consejo && (
          <div style={{
            background: "#FFF8E7", border: "1px solid #F9CA5A", borderRadius: 12,
            padding: "0.85rem 1.1rem", marginBottom: "1.25rem",
          }}>
            <p style={{ color: "#7A5800", margin: 0, fontSize: 15, lineHeight: 1.5 }}>
              💡 {actual.consejo}
            </p>
          </div>
        )}

        {/* Navegación */}
        <div style={{ display: "flex", gap: 10, marginTop: "1.25rem" }}>
          {paso > 0 && (
            <button
              onClick={() => setPaso(p => p - 1)}
              aria-label="Ir al paso anterior"
              style={{ ...secondaryBtn, flex: 1 }}
            >
              ← Anterior
            </button>
          )}
          <button
            onClick={() => esUltimo ? onTerminar() : setPaso(p => p + 1)}
            aria-label={esUltimo ? "Cerrar tutorial y comenzar a usar MedConnect" : "Ir al siguiente paso"}
            style={{ ...primaryBtn, flex: 2 }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.primaryDark}
            onMouseLeave={e => e.currentTarget.style.background = COLORS.primary}
          >
            {esUltimo ? "¡Comenzar a usar MedConnect!" : "Siguiente →"}
          </button>
        </div>

        {/* Contador */}
        <p style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 13, marginTop: "1rem", marginBottom: 0 }}>
          {paso + 1} de {total}
        </p>
      </div>
    </div>
  );
}

// ----- LOGIN -----
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!email.includes("@")) e.email = "Por favor, revisa que tu correo incluya el @";
    if (password.length < 4) e.password = "Tu contraseña es demasiado corta. Prueba con al menos 4 caracteres";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 900);
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: COLORS.white, borderRadius: 20, padding: "3rem 2.5rem", width: "100%", maxWidth: 440, boxShadow: COLORS.cardShadow }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🩺</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, margin: 0 }}>MedConnect</h1>
          <p style={{ color: COLORS.textMuted, marginTop: 6, fontSize: 17 }}>Tu salud, siempre cerca</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="email" style={labelStyle}>Correo electrónico</label>
          <input
            id="email" type="email" value={email}
            onChange={e => { setEmail(e.target.value); setErrors(x => ({ ...x, email: "" })); }}
            placeholder="ejemplo@correo.com"
            style={{ ...inputStyle, borderColor: errors.email ? COLORS.danger : COLORS.border }}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p id="email-error" role="alert" style={errorStyle}>⚠️ {errors.email}</p>}
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="password" style={labelStyle}>Contraseña</label>
          <input
            id="password" type="password" value={password}
            onChange={e => { setPassword(e.target.value); setErrors(x => ({ ...x, password: "" })); }}
            placeholder="Tu contraseña"
            style={{ ...inputStyle, borderColor: errors.password ? COLORS.danger : COLORS.border }}
            aria-describedby={errors.password ? "pass-error" : undefined}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p id="pass-error" role="alert" style={errorStyle}>⚠️ {errors.password}</p>}
        </div>

        <button onClick={handleSubmit} style={primaryBtn} disabled={loading}
          onMouseEnter={e => e.currentTarget.style.background = COLORS.primaryDark}
          onMouseLeave={e => e.currentTarget.style.background = COLORS.primary}>
          {loading ? "Verificando..." : "Entrar a mi cuenta"}
        </button>

        <p style={{ textAlign: "center", marginTop: "1.5rem", color: COLORS.textMuted, fontSize: 15 }}>
          ¿Olvidaste tu contraseña?{" "}
          <button
            type="button"
            aria-label="Recuperar contraseña olvidada"
            style={{ background: "none", border: "none", color: COLORS.primary, cursor: "pointer", fontSize: 15, textDecoration: "underline", padding: 0 }}>
            Recupérala aquí
          </button>
        </p>
      </div>
    </div>
  );
}

// ----- SIDEBAR -----
function Sidebar({ active, setActive, onLogout, onVideoCall }) {
  const items = [
    { id: "dashboard", icon: "🏠", label: "Inicio" },
    { id: "agendar", icon: "📅", label: "Agendar cita" },
    { id: "historial", icon: "📋", label: "Mi historial" },
    { id: "videollamada", icon: "🎥", label: "Videoconsulta" },
  ];

  return (
    <nav role="navigation" aria-label="Menú principal" style={{
      width: 240, height: "100vh", background: COLORS.primary,
      display: "flex", flexDirection: "column", padding: "1.5rem 0", flexShrink: 0,
      position: "sticky", top: 0, overflowY: "auto",
    }}>
      <div style={{ padding: "0 1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
        <div style={{ fontSize: 28 }}>🩺</div>
        <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 20, marginTop: 4 }}>MedConnect</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 2 }}>Tu salud, cerca de ti</div>
      </div>

      <ul role="list" style={{ listStyle: "none", padding: "1.5rem 0.75rem", margin: 0, flex: 1 }}>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: 4 }}>
            <button
              onClick={() => item.id === "videollamada" ? onVideoCall() : setActive(item.id)}
              aria-current={active === item.id ? "page" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%",
                background: active === item.id ? "rgba(255,255,255,0.18)" : "transparent",
                border: "none", borderRadius: 10, padding: "0.85rem 1rem",
                color: COLORS.white, fontSize: 17, cursor: "pointer", textAlign: "left",
                fontWeight: active === item.id ? 600 : 400,
                transition: "background 0.15s",
                outline: "none",
                minHeight: 52,
              }}
              onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.background = "transparent"; }}
              onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.5)"}
              onBlur={e => e.currentTarget.style.boxShadow = "none"}
            >
              <span aria-hidden="true" style={{ fontSize: 22 }}>{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontWeight: 700, fontSize: 16 }}>J</div>
          <div>
            <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 15 }}>{MOCK_USER.name} Pérez</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Paciente</div>
          </div>
        </div>
        <button onClick={onLogout} style={{
          width: "100%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 10, padding: "0.65rem", color: COLORS.white, fontSize: 15, cursor: "pointer", minHeight: 48
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
          onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.5)"}
          onBlur={e => e.currentTarget.style.boxShadow = "none"}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

// ----- DASHBOARD -----
function Dashboard({ onAgendar }) {
  const proximas = [
    { fecha: "Lunes 14 jul", hora: "09:00 am", doctor: "Dra. María López", especialidad: "Cardiología" },
    { fecha: "Miércoles 16 jul", hora: "03:00 pm", doctor: "Dr. Andrés Mora", especialidad: "Neurología" },
  ];

  return (
    <main style={{ padding: "2.5rem 3rem", maxWidth: 960, width: "100%", margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
        Hola, {MOCK_USER.name} 👋
      </h1>
      <p style={{ color: COLORS.textMuted, fontSize: 17, marginBottom: "2.5rem" }}>
        ¿Cómo te sientes hoy? Estamos aquí para ayudarte.
      </p>

      {/* Tarjeta CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #1E4360 100%)`,
        borderRadius: 20, padding: "2rem 2.5rem", marginBottom: "2.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(42,92,130,0.3)", flexWrap: "wrap", gap: 16
      }}>
        <div>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📅</div>
          <h2 style={{ color: COLORS.white, fontSize: 22, fontWeight: 700, margin: 0 }}>Agendar nueva cita</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginTop: 6, fontSize: 16, margin: "6px 0 0" }}>
            Elige tu especialidad y encuentra el horario que mejor te quede.
          </p>
        </div>
        <button onClick={onAgendar} style={{
          background: COLORS.white, color: COLORS.primary, border: "none",
          borderRadius: 12, padding: "0.9rem 2rem", fontSize: 17, fontWeight: 700,
          cursor: "pointer", minHeight: 52, whiteSpace: "nowrap",
          transition: "transform 0.1s, box-shadow 0.1s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          onFocus={e => e.currentTarget.style.outline = `3px solid rgba(255,255,255,0.8)`}
          onBlur={e => e.currentTarget.style.outline = "none"}
        >
          Buscar horario →
        </button>
      </div>

      {/* Tarjetas de resumen */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: "2.5rem" }}>
        {[
          { num: "2", label: "Citas próximas", icon: "📆" },
          { num: "4", label: "Consultas realizadas", icon: "✅" },
          { num: "3", label: "Recetas disponibles", icon: "💊" },
        ].map(c => (
          <div key={c.label} style={{ background: COLORS.white, borderRadius: 16, padding: "1.25rem 1.5rem", boxShadow: COLORS.cardShadow, border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 28 }}>{c.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.primary, marginTop: 6 }}>{c.num}</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 2 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Próximas citas */}
      <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, marginBottom: "1rem" }}>Tus próximas citas</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {proximas.map((c, i) => (
          <div key={i} style={{ background: COLORS.white, borderRadius: 14, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: COLORS.cardShadow, border: `1px solid ${COLORS.border}`, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: COLORS.primaryLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👩‍⚕️</div>
              <div>
                <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 16 }}>{c.doctor}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 14 }}>{c.especialidad}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600, color: COLORS.primary, fontSize: 15 }}>{c.fecha}</div>
              <div style={{ color: COLORS.textMuted, fontSize: 14 }}>{c.hora}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// ----- STEP INDICATOR (fuera del componente para evitar remounts) -----
function StepIndicator({ step, steps }) {
  return (
    <div role="list" aria-label="Pasos para agendar cita" style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "2.5rem" }}>
      {steps.map((s, i) => {
        const n = i + 1;
        const done = step > n;
        const current = step === n;
        return (
          <div key={s} role="listitem" style={{ display: "flex", alignItems: "center", flex: n < steps.length ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: done ? COLORS.success : current ? COLORS.primary : COLORS.border,
                color: done || current ? COLORS.white : COLORS.textMuted,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 16, flexShrink: 0
              }} aria-current={current ? "step" : undefined}>
                {done ? "✓" : n}
              </div>
              <span style={{ fontSize: 13, color: current ? COLORS.primary : COLORS.textMuted, fontWeight: current ? 600 : 400, whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {n < steps.length && <div style={{ flex: 1, height: 2, background: done ? COLORS.success : COLORS.border, margin: "0 8px", marginBottom: 20 }} />}
          </div>
        );
      })}
    </div>
  );
}

// ----- AGENDAR CITA (STEPPER) -----
function AgendarCita({ onBack }) {
  const [step, setStep] = useState(1);
  const [especialidad, setEspecialidad] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [confirmado, setConfirmado] = useState(false);

  const steps = ["Especialidad", "Horario", "Confirmar"];

  if (confirmado) {
    return (
      <main style={{ padding: "2.5rem 3rem", maxWidth: 700, width: "100%", margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "3rem 2rem", background: COLORS.white, borderRadius: 20, boxShadow: COLORS.cardShadow }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <h2 style={{ color: COLORS.success, fontSize: 26, fontWeight: 700 }}>¡Tu cita está confirmada!</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 17, margin: "1rem 0 0.5rem" }}>
            Te hemos enviado un recordatorio a tu correo.
          </p>
          <div style={{ background: COLORS.bg, borderRadius: 14, padding: "1.25rem", margin: "1.5rem 0", textAlign: "left" }}>
            <div style={infoRow}><span style={infoLabel}>Especialidad</span><span style={infoVal}>{especialidad?.label}</span></div>
            <div style={infoRow}><span style={infoLabel}>Médico</span><span style={infoVal}>{fecha?.doctor}</span></div>
            <div style={infoRow}><span style={infoLabel}>Fecha</span><span style={infoVal}>{fecha?.dia}</span></div>
            <div style={{ ...infoRow, borderBottom: "none" }}><span style={infoLabel}>Hora</span><span style={infoVal}>{fecha?.hora}</span></div>
          </div>
          <button onClick={onBack} style={primaryBtn}>Volver al inicio</button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: "2.5rem 3rem", maxWidth: 860, width: "100%", margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.primary, cursor: "pointer", fontSize: 16, marginBottom: "1.5rem", padding: "0.5rem 0", display: "flex", alignItems: "center", gap: 6 }}
        onFocus={e => e.currentTarget.style.textDecoration = "underline"}
        onBlur={e => e.currentTarget.style.textDecoration = "none"}
      >← Volver</button>

      <h1 style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, marginBottom: "1.75rem" }}>Agendar nueva cita</h1>
      <StepIndicator step={step} steps={steps} />

      {step === 1 && (
        <div>
          <h2 style={{ fontSize: 20, color: COLORS.text, marginBottom: "1.25rem" }}>¿Qué tipo de atención necesitas?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {ESPECIALIDADES.map(esp => (
              <button key={esp.id} onClick={() => { setEspecialidad(esp); setStep(2); }}
                style={{
                  background: especialidad?.id === esp.id ? COLORS.primaryLight : COLORS.white,
                  border: `2px solid ${especialidad?.id === esp.id ? COLORS.primary : COLORS.border}`,
                  borderRadius: 16, padding: "1.5rem 1rem", cursor: "pointer",
                  textAlign: "left", minHeight: 100, transition: "all 0.15s",
                }}
                aria-pressed={especialidad?.id === esp.id}
                onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.primary; e.currentTarget.style.background = COLORS.primaryLight; }}
                onMouseLeave={e => { if (especialidad?.id !== esp.id) { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.background = COLORS.white; } }}
                onFocus={e => e.currentTarget.style.boxShadow = `0 0 0 3px rgba(42,92,130,0.3)`}
                onBlur={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }} aria-hidden="true">{esp.icon}</div>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 16 }}>{esp.label}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 2 }}>{esp.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ fontSize: 20, color: COLORS.text, marginBottom: "0.5rem" }}>
            Elige cuándo quieres tu cita de <strong style={{ color: COLORS.primary }}>{especialidad?.label}</strong>
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: 15, marginBottom: "1.5rem" }}>Todos los horarios muestran médicos disponibles ahora mismo.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FECHAS.map(f => (
              <button key={f.id} onClick={() => { setFecha(f); setStep(3); }}
                style={{
                  background: fecha?.id === f.id ? COLORS.primaryLight : COLORS.white,
                  border: `2px solid ${fecha?.id === f.id ? COLORS.primary : COLORS.border}`,
                  borderRadius: 14, padding: "1.1rem 1.5rem", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  textAlign: "left", minHeight: 70, transition: "all 0.15s",
                }}
                aria-pressed={fecha?.id === f.id}
                onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.primary; e.currentTarget.style.background = COLORS.primaryLight; }}
                onMouseLeave={e => { if (fecha?.id !== f.id) { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.background = COLORS.white; } }}
                onFocus={e => e.currentTarget.style.boxShadow = `0 0 0 3px rgba(42,92,130,0.3)`}
                onBlur={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div>
                  <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 16 }}>{f.dia} — {f.hora}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 2 }}>
                    <span aria-hidden="true">👩‍⚕️</span> {f.doctor}
                  </div>
                </div>
                <div style={{ color: COLORS.success, fontWeight: 700, fontSize: 13, background: "#E8F8EF", padding: "4px 12px", borderRadius: 20 }}>Disponible</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} style={{ ...secondaryBtn, marginTop: "1.5rem" }}>← Cambiar especialidad</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ fontSize: 20, color: COLORS.text, marginBottom: "1.5rem" }}>Revisa los detalles antes de confirmar</h2>
          <div style={{ background: COLORS.white, borderRadius: 18, padding: "2rem", boxShadow: COLORS.cardShadow, marginBottom: "1.5rem" }}>
            <div style={infoRow}><span style={infoLabel}>Especialidad</span><span style={infoVal}>{especialidad?.label}</span></div>
            <div style={infoRow}><span style={infoLabel}>Médico</span><span style={infoVal}>{fecha?.doctor}</span></div>
            <div style={infoRow}><span style={infoLabel}>Fecha</span><span style={infoVal}>{fecha?.dia}</span></div>
            <div style={{ ...infoRow, borderBottom: "none" }}><span style={infoLabel}>Hora</span><span style={infoVal}>{fecha?.hora}</span></div>
          </div>
          <div style={{ background: "#FFF8E7", border: "1px solid #F9CA5A", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.75rem" }}>
            <p style={{ color: "#7A5800", margin: 0, fontSize: 15 }}>
              📩 Al confirmar, recibirás un mensaje con los detalles de tu cita. Puedes cancelarla hasta 2 horas antes sin costo.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setConfirmado(true)} style={{ ...primaryBtn, flex: 1, minWidth: 180 }}>
              ✅ Confirmar cita
            </button>
            <button onClick={() => setStep(2)} style={{ ...secondaryBtn, flex: 1, minWidth: 140 }}>
              Cambiar horario
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// ----- HISTORIAL MÉDICO -----
function Historial() {
  return (
    <main style={{ padding: "2.5rem 3rem", maxWidth: 960, width: "100%", margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, marginBottom: "0.5rem" }}>Mi historial médico</h1>
      <p style={{ color: COLORS.textMuted, fontSize: 17, marginBottom: "2rem" }}>
        Aquí están todas tus consultas anteriores. Puedes descargar tus recetas cuando quieras.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {HISTORIAL.map(h => (
          <article key={h.id} style={{ background: COLORS.white, borderRadius: 16, padding: "1.5rem", boxShadow: COLORS.cardShadow, border: `1px solid ${COLORS.border}` }}
            aria-label={`Consulta del ${h.fecha} con ${h.doctor}`}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 50, height: 50, background: COLORS.primaryLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }} aria-hidden="true">👩‍⚕️</div>
                <div>
                  <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 17 }}>{h.doctor}</div>
                  <div style={{ color: COLORS.primary, fontSize: 14, fontWeight: 600 }}>{h.especialidad}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 4 }}>
                    <span aria-hidden="true">🗓️</span> {h.fecha}
                  </div>
                  <div style={{ color: COLORS.textMuted, fontSize: 14, marginTop: 2 }}>
                    <span aria-hidden="true">📌</span> {h.diagnostico}
                  </div>
                </div>
              </div>
              {h.receta && (
                <button
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: COLORS.primaryLight, border: `1.5px solid ${COLORS.primary}`,
                    borderRadius: 10, padding: "0.65rem 1.25rem", color: COLORS.primary,
                    fontSize: 15, fontWeight: 600, cursor: "pointer", minHeight: 48, whiteSpace: "nowrap"
                  }}
                  aria-label={`Descargar receta de la consulta del ${h.fecha}`}
                  onMouseEnter={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.color = COLORS.white; }}
                  onMouseLeave={e => { e.currentTarget.style.background = COLORS.primaryLight; e.currentTarget.style.color = COLORS.primary; }}
                  onFocus={e => e.currentTarget.style.boxShadow = `0 0 0 3px rgba(42,92,130,0.3)`}
                  onBlur={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <span aria-hidden="true">⬇️</span> Descargar receta
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

// ----- VIDEOLLAMADA -----
function VideoLlamada({ onColgar }) {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const secs = String(elapsed % 60).padStart(2, "0");

  return (
    <div role="main" aria-label="Videoconsulta activa" style={{
      position: "fixed", inset: 0, background: "#0D1B2A", display: "flex",
      flexDirection: "column", zIndex: 1000, fontFamily: "inherit"
    }}>
      {/* Cabecera */}
      <div style={{ padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 18 }}>
            <span aria-hidden="true">👩‍⚕️</span> Dra. María López — Cardiología
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 2 }}>Consulta en curso</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 16px", color: "#7DFFA0", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}
          aria-label={`Tiempo de consulta: ${mins} minutos y ${secs} segundos`}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#7DFFA0" }} aria-hidden="true" />
          {mins}:{secs}
        </div>
      </div>

      {/* Video principal */}
      <div style={{ flex: 1, position: "relative", margin: "0 1.5rem" }}>
        <div style={{
          width: "100%", height: "100%", background: "#1A2B3C",
          borderRadius: 20, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12
        }} role="img" aria-label="Video de la médica (simulado)">
          <div style={{ fontSize: 80 }} aria-hidden="true">👩‍⚕️</div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }}>Dra. María López</p>
        </div>

        {/* Miniatura usuario */}
        <div style={{
          position: "absolute", bottom: 20, right: 20,
          width: 140, height: 100, background: camOff ? "#2C3E50" : "#0F3854",
          borderRadius: 14, border: "2px solid rgba(255,255,255,0.3)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4
        }} role="img" aria-label={camOff ? "Tu cámara está apagada" : "Tu video (miniatura)"}>
          {camOff ? (
            <>
              <div style={{ fontSize: 28 }} aria-hidden="true">📷</div>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Cámara apagada</span>
            </>
          ) : (
            <>
              <div style={{ fontSize: 32 }} aria-hidden="true">🧑</div>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Tú</span>
            </>
          )}
        </div>
      </div>

      {/* Controles */}
      <div style={{
        padding: "1.75rem 2rem", display: "flex", justifyContent: "center",
        alignItems: "center", gap: 20, flexWrap: "wrap"
      }}>
        <button
          onClick={() => setMuted(m => !m)}
          aria-pressed={muted}
          aria-label={muted ? "Activar micrófono" : "Silenciar micrófono"}
          style={videoBtn(muted)}
          onMouseEnter={e => e.currentTarget.style.background = muted ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = muted ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}
          onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.4)"}
          onBlur={e => e.currentTarget.style.boxShadow = "none"}
        >
          <span style={{ fontSize: 24 }} aria-hidden="true">{muted ? "🔇" : "🎤"}</span>
          <span style={{ fontSize: 13 }}>{muted ? "Activar mic" : "Silenciar"}</span>
        </button>

        <button
          onClick={() => setCamOff(c => !c)}
          aria-pressed={camOff}
          aria-label={camOff ? "Encender cámara" : "Apagar cámara"}
          style={videoBtn(camOff)}
          onMouseEnter={e => e.currentTarget.style.background = camOff ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = camOff ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}
          onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.4)"}
          onBlur={e => e.currentTarget.style.boxShadow = "none"}
        >
          <span style={{ fontSize: 24 }} aria-hidden="true">{camOff ? "📷" : "📹"}</span>
          <span style={{ fontSize: 13 }}>{camOff ? "Encender cám." : "Apagar cámara"}</span>
        </button>

        <button
          onClick={onColgar}
          aria-label="Colgar y salir de la videoconsulta"
          style={{
            background: COLORS.danger, border: "none", borderRadius: 16,
            padding: "1rem 2.5rem", color: COLORS.white, fontSize: 17,
            fontWeight: 700, cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4, minHeight: 80, minWidth: 140,
            transition: "background 0.15s, transform 0.1s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = COLORS.dangerDark; e.currentTarget.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = COLORS.danger; e.currentTarget.style.transform = "scale(1)"; }}
          onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 3px rgba(192,57,43,0.5)"}
          onBlur={e => e.currentTarget.style.boxShadow = "none"}
        >
          <span style={{ fontSize: 26 }} aria-hidden="true">📵</span>
          <span>Colgar y salir</span>
        </button>
      </div>
    </div>
  );
}

// ----- SHARED STYLES -----
const labelStyle = { display: "block", fontSize: 16, fontWeight: 600, color: "#1A2B3C", marginBottom: 8 };
const inputStyle = {
  width: "100%", fontSize: 17, padding: "0.8rem 1rem", borderRadius: 12,
  border: `2px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.text,
  boxSizing: "border-box", outline: "none", transition: "border-color 0.15s",
};
const errorStyle = { color: COLORS.danger, fontSize: 14, marginTop: 6, fontWeight: 500 };
const primaryBtn = {
  display: "block", width: "100%", background: COLORS.primary, color: COLORS.white,
  border: "none", borderRadius: 12, padding: "0.9rem 1.5rem", fontSize: 18,
  fontWeight: 700, cursor: "pointer", minHeight: 52, transition: "background 0.15s",
};
const secondaryBtn = {
  background: "none", border: `2px solid ${COLORS.primary}`, borderRadius: 12,
  padding: "0.75rem 1.5rem", color: COLORS.primary, fontSize: 16,
  fontWeight: 600, cursor: "pointer", minHeight: 48,
};
const infoRow = { display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: `1px solid ${COLORS.border}` };
const infoLabel = { color: COLORS.textMuted, fontSize: 15 };
const infoVal = { color: COLORS.text, fontWeight: 600, fontSize: 15 };
const videoBtn = (active) => ({
  background: active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
  border: `1.5px solid ${active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"}`,
  borderRadius: 16, padding: "0.9rem 1.5rem", color: COLORS.white,
  fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex",
  flexDirection: "column", alignItems: "center", gap: 4, minHeight: 80, minWidth: 120,
  transition: "background 0.15s",
});

// ----- APP ROOT -----
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mostrarOnboarding, setMostrarOnboarding] = useState(false);
  const [section, setSection] = useState("dashboard");
  const [videoActive, setVideoActive] = useState(false);

  function handleLogin() {
    setLoggedIn(true);
    setMostrarOnboarding(true);
  }

  if (!loggedIn) return <Login onLogin={handleLogin} />;
  if (videoActive) return <VideoLlamada onColgar={() => setVideoActive(false)} />;

  return (
    <div style={{ display: "flex", height: "100vh", background: COLORS.bg }}>
      <Sidebar active={section} setActive={setSection} onLogout={() => { setLoggedIn(false); setMostrarOnboarding(false); }} onVideoCall={() => setVideoActive(true)} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {section === "dashboard" && <Dashboard onAgendar={() => setSection("agendar")} />}
        {section === "agendar" && <AgendarCita onBack={() => setSection("dashboard")} />}
        {section === "historial" && <Historial />}
      </div>
      {mostrarOnboarding && <Onboarding onTerminar={() => setMostrarOnboarding(false)} />}
    </div>
  );
}
