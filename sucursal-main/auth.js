
// auth.js

const USERS_KEY = 'system_users';
const CURRENT_USER_KEY = 'current_user';

// Usuarios por defecto (en un sistema real esto vendría de una base de datos)
const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Administrador Principal',
    role: 'admin',
    email: 'admin@sistemashop.com',
    permissions: ['all']
  },
  {
    id: 2,
    username: 'vendedor',
    password: 'vendedor123',
    name: 'Vendedor General',
    role: 'vendedor',
    email: 'vendedor@sistemashop.com',
    permissions: ['pos', 'cortes']
  },
  {
    id: 3,
    username: 'auditor',
    password: 'auditor123',
    name: 'Auditor Interno',
    role: 'auditor',
    email: 'auditor@sistemashop.com',
    permissions: ['auditor', 'reports']
  }
];

// Inicializar usuarios si no existen
function initializeUsers() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

// Verificar credenciales de usuario
function loginUser(username, password) {
  initializeUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Guardar usuario actual (sin la contraseña por seguridad)
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return true;
  }
  return false;
}

// Cerrar sesión
function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Verificar si hay un usuario logueado
function isLoggedIn() {
  return localStorage.getItem(CURRENT_USER_KEY) !== null;
}

// Obtener usuario actual
function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Verificar permisos
function hasPermission(permission) {
  const user = getCurrentUser();
  if (!user) return false;
  
  return user.permissions.includes('all') || user.permissions.includes(permission);
}

// Middleware de autenticación para otras páginas
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Redirigir según rol después del login
function redirectByRole() {
  const user = getCurrentUser();
  if (!user) return 'index.html';
  
  switch (user.role) {
    case 'admin':
      return 'index.html';
    case 'vendedor':
      return 'index_pos.html';
    case 'auditor':
      return 'auditor.html';
    default:
      return 'index.html';
  }
}
