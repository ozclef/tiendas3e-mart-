
# INTEGRACION DE SQL para el ecosistema de esta empresa

En todos los html usar los scripts completos de cualquier repo


**se puede y ES la forma pro**.



Justo así lo hacen las empresas grandes: un repo público donde viven los *core scripts* y *core styles*, y todos los demás HTML nomás los jalan con `<script src="...">` y `<link href="...">`.

Tú básicamente quieres crear tu propio **CDN casero** para EmilioPOS.
Y sí, carnal: *así se hace chido, limpio y escalable*.

---

#   ¿Cómo lo haces?

Supón que tienes una organización llamada:

**`EmilioPOS`**

Y dentro vas a crear un repo:

**`emiliocore`**
(donde van tus CSS, JS, utils, helpers, componentes, temas, iconos…)

Y ese repo lo pones **público**.

GitHub te da una URL directa a los archivos:

```
https://raw.githubusercontent.com/EmilioPOS/emiliocore/main/styles.css
https://raw.githubusercontent.com/EmilioPOS/emiliocore/main/main.js
```

O si activas GitHub Pages:

```
https://emiliopos.github.io/emiliocore/styles.css
https://emiliopos.github.io/emiliocore/main.js
```

Esto ya funciona como si fuera un CDN real.

---

#  ¿Cómo se ve dentro de tus HTML?

```html
<link rel="stylesheet" href="https://emiliopos.github.io/emiliocore/styles.css">
<script src="https://emiliopos.github.io/emiliocore/main.js"></script>
<script src="https://emiliopos.github.io/emiliocore/utils/date.js"></script>
<script src="https://emiliopos.github.io/emiliocore/utils/inventory.js"></script>
```

O si usas RawGitHub:

```html
<script src="https://raw.githubusercontent.com/EmilioPOS/emiliocore/main/main.js"></script>
```

Y listo:
**Todos tus HTML —sin importar que vivan en repos diferentes— pueden usar los mismos scripts y el mismo CSS.**

---

#  ¿dentro de `emiliocore`?

Aquí te dejo un “starter pack” para que se vea pro:

```
emiliocore/
│
├─ css/
│   ├─ reset.css
│   ├─ theme-dark.css
│   └─ theme-light.css
│
├─ js/
│   ├─ init.js
│   ├─ ui.js
│   ├─ storage.js
│   ├─ inventory.js
│   ├─ date.js
│   └─ pos-utils.js
│
├─ components/
│   ├─ navbar.html
│   ├─ footer.html
│   └─ modal.html
│
└─ config.json
```

Y desde tus “sub-proyectos” solo incluyes lo que necesites.

---

# Beneficios:

### ✔ Todos los HTML comparten el mismo estilo

Cambias un CSS → todos los sistemas actualizan al instante.

### ✔ Todos los proyectos usan los mismos scripts base

Ya no copias/pegas como loco.

### ✔ Puedes versionar

`styles.css?v=2.1` para evitar cachés.

### ✔ Te convierte tu ecosistema en algo **modular, elegante y real de empresa**.

---

* La estructura completa del repo `emiliocore`
* Los scripts base (`storage`, `inventory`, `ui`, `utils`)



-----






# Podemos simular el login **100% en JSON + scripts**

----


sin Supabase, sin servidor, sin nada…
solo navegador, LocalStorage y un archivo `.json`.

Esto es perfecto para:

* trabajar offline
* correr en laptop Celeron
* probar POS sin complicarte
* después migrar fácil a Supabase

Así que aquí va **la base buena**, limpia, modular, ligera y súper escalable.

---

# 🔥 1) `users.json` — usuarios simulados

Guárdalo en tu repo `core` o `pos`.

```json
{
  "users": [
    {
      "username": "admin",
      "password": "1234",
      "role": "admin",
      "name": "Administrador"
    },
    {
      "username": "emilio",
      "password": "pos123",
      "role": "cajero",
      "name": "Emilio S."
    }
  ]
}
```

> *Sí, las contraseñas simples están bien para modo simulación.*

---

# 🔥 2) Script: cargar usuarios (desde JSON o LocalStorage)

```js
async function loadUsers() {
  // 1) Primero intenta cargar desde LocalStorage
  const local = localStorage.getItem("users");
  if (local) return JSON.parse(local);

  // 2) Si no hay nada, carga el archivo JSON del repo
  const res = await fetch("users.json");
  const data = await res.json();

  // Guarda copia local para offline
  localStorage.setItem("users", JSON.stringify(data));

  return data;
}
```

---

# 🔥 3) Simulación de login

```js
async function login(username, password) {
  const data = await loadUsers();
  const users = data.users;

  const found = users.find(
    u => u.username === username && u.password === password
  );

  if (!found) {
    return { success: false, message: "Usuario o contraseña incorrectos." };
  }

  // Guardar sesión simulada
  localStorage.setItem("session", JSON.stringify({
    username: found.username,
    role: found.role,
    name: found.name,
    timestamp: Date.now()
  }));

  return { success: true, user: found };
}
```

---

# 🔥 4) Obtener sesión actual

```js
function getSession() {
  const session = localStorage.getItem("session");
  if (!session) return null;
  return JSON.parse(session);
}
```

---

# 🔥 5) Cerrar sesión

```js
function logout() {
  localStorage.removeItem("session");
}
```

---

# 🔥 6) Uso desde HTML

```html
<input type="text" id="user" placeholder="Usuario">
<input type="password" id="pass" placeholder="Contraseña">
<button onclick="doLogin()">Entrar</button>

<script>
async function doLogin() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  const result = await login(u, p);

  if (!result.success) {
    alert(result.message);
    return;
  }

  alert("Bienvenido " + result.user.name);
  window.location.href = "pos.html";
}
</script>
```

---

# 🔥 7) ¿Quieres control por roles?

Sí se puede. Y sencillo.

```js
function requireRole(role) {
  const session = getSession();
  if (!session || session.role !== role) {
    alert("Acceso denegado");
    window.location.href = "login.html";
  }
}
```

Y en cualquier archivo:

```js
requireRole("admin");
```

---

# 🔥 8) Conecta  a Supabase

Pero por ahora, **esto funciona offline, rápido y seguro para pruebas**.

---
