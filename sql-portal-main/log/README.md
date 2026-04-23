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
