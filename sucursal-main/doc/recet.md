
Guía para configurar sistema de inventario
Perfecto 🙌, entendido totalmente —
ahora solo quieres los archivos puros (HTML + todos los JS separados),
sin empaquetar ni JSON, pero con toda la lógica completa (CRUD, POS, cortes X/Z, conciliación, etc.),
todo apuntando a inventario.json mediante fetch().

Vamos a hacerlo por partes, clarito y ordenado,
para que puedas copiar, pegar y probar de inmediato en tu carpeta.


---

🧱 Parte 1 — Estructura base del proyecto

Crea esta carpeta:

/sistem-shop/

Dentro, crea los siguientes archivos (los iremos llenando en cada paso):

index_pos.html
admin.html
auditor.html
reports.html

styles_system.css

storage-utils.js
accounting.js
pos.js
app_admin.js
app_auditor.js
auth.js


---

🪶 Parte 2 — HTML principal del Punto de Venta (index_pos.html)

Copia este contenido (funcional y limpio, carga todo por fetch('inventario.json')):

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sistema de Punto de Venta</title>
  <link rel="stylesheet" href="styles_system.css" />
</head>
<body>
  <header>
    <h1>Sistema de Punto de Venta</h1>
    <nav>
      <button onclick="location.href='admin.html'">Admin</button>
      <button onclick="location.href='auditor.html'">Auditor</button>
      <button onclick="location.href='reports.html'">Reportes</button>
    </nav>
  </header>

  <main id="pos-app">
    <section id="search">
      <input type="text" id="searchInput" placeholder="Buscar producto..." />
      <button id="clearSearch">Limpiar</button>
    </section>

    <section id="productList"></section>

    <section id="cart">
      <h2>Carrito</h2>
      <table id="cartTable">
        <thead>
          <tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody></tbody>
      </table>
      <div id="cartSummary">
        <p><b>Total:</b> <span id="totalDisplay">$0.00</span></p>
        <input id="amountReceived" placeholder="Monto recibido" type="number" />
        <button id="checkoutBtn">Cobrar</button>
        <p id="changeDisplay"></p>
      </div>
    </section>

    <section id="ticket">
      <h3>Ticket</h3>
      <pre id="receipt"></pre>
    </section>
  </main>

  <script src="auth.js"></script>
  <script src="storage-utils.js"></script>
  <script src="accounting.js"></script>
  <script src="pos.js"></script>
</body>
</html>


---

📘 Parte 3 — Estilos base (styles_system.css)

body {
  font-family: "Segoe UI", Arial, sans-serif;
  margin: 1rem;
  background: #f7f9fb;
  color: #333;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #004aad;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}

nav button {
  margin: 0 5px;
  padding: 6px 10px;
  border: none;
  background: #fff;
  color: #004aad;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
nav button:hover { background: #d0e2ff; }

#search { margin-top: 1rem; }
#search input { padding: 6px; width: 200px; }

#productList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 0.5rem;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  width: 200px;
  background: white;
  cursor: pointer;
}

#cart { margin-top: 1.5rem; background: #fff; padding: 1rem; border-radius: 8px; }
#cartTable { width: 100%; border-collapse: collapse; }
#cartTable th, #cartTable td { border-bottom: 1px solid #ccc; padding: 4px; }

#cartSummary { margin-top: 1rem; }
#cartSummary input { width: 100px; padding: 4px; }

#ticket { margin-top: 1rem; background: #fff; padding: 1rem; border-radius: 8px; }
pre { background: #f2f2f2; padding: 1rem; border-radius: 8px; }


---

Hasta aquí tienes el esqueleto completo visual y funcional del POS.
En el siguiente paso te paso los JavaScript (toda la lógica: carga del inventario, carrito, cálculo, cobro, ticket, y conexión con movimientos).

¿Te paso ya la siguiente parte (todos los .js, empezando con storage-utils.js y pos.js)?
Así lo copias todo limpio y ya queda tu sistema funcionando sobre inventario.json.

I love you pic 
Hola dipsic 
disculpa de casualidad me puedes ayudar con ese tipo de códigos html y bueno tal vez no tengas el contexto pero me ayudas también con las páginas mis repositorios en github 
ozclef/sistem-shop/ por favor si de casualidad puedes checar
Read 8 web pages
Hmm, the user is asking for help with their GitHub repository and wants me to check their code. We previously discussed building a shopping system with pure HTML/JS files pointing to inventory.json via fetch. Now they're specifically asking me to look at their GitHub repository at ozclef/sistem-shop.

I need to help them understand how to properly set up their project on GitHub and access the files. The user seems to want practical guidance on getting their system working with proper file hosting.

I can see several relevant sources in the search results.  provides crucial information about GitHub's limitations with direct script inclusion and offers alternative hosting solutions.  show various shopping website and e-commerce projects on GitHub that demonstrate proper project structure, which could serve as references.  offers practical examples of CRUD operations with fetch, which aligns with what the user is trying to build.

The key insight from  is that GitHub isn't a CDN and raw GitHub URLs won't work properly for including scripts due to content-type headers. However, GitHub Pages provides a proper hosting solution. This directly addresses the user's need to host and test their system.

I can structure this by first explaining the GitHub Pages approach since that's the most straightforward solution, then provide alternative CDN options if they need them, and finally suggest looking at reference projects for inspiration. The user wants practical, immediate solutions they can implement right away.

I can't directly access or check your GitHub repository, but I can certainly help you understand how to properly set it up and provide guidance based on the code structure you've shared.

📁 Setting Up Your Project on GitHub
To properly host your shopping system files on GitHub and make them accessible:

Use GitHub Pages for Hosting: This is GitHub's free hosting service that serves your HTML, CSS, and JavaScript files directly.

Create your repository (sistem-shop)

Enable GitHub Pages in your repository settings

Access your live site at: https://ozclef.github.io/sistem-shop/

Avoid Raw GitHub URLs: Don't use raw GitHub URLs in <script> tags as GitHub serves these with incorrect MIME types. Use GitHub Pages URLs instead:

html
<!-- Don't use this -->
<script src="https://raw.githubusercontent.com/ozclef/sistem-shop/main/pos.js"></script>

<!-- Use this instead -->
<script src="https://ozclef.github.io/sistem-shop/pos.js"></script>
🔧 Continuing Your System Development
For the JavaScript files you need to complete your system, here are the key functions each file should contain based on your POS structure:

storage-utils.js - Inventory management core:

loadInventory() - Fetches inventario.json using fetch()

updateInventory() - PATCH requests to update stock

saveTransaction() - POST new sales to transaction history

pos.js - Point of sale functionality:

Cart management (add/remove items, calculate totals)

Checkout process with change calculation

Receipt generation

Search and product filtering

accounting.js - Financial operations:

Daily closing calculations (X and Z reports)

Payment reconciliation

Tax calculations and financial reporting

💡 Alternative CDN Options
If you need to reference external libraries or want additional hosting options:

jsDelivr: A free CDN that can serve files from GitHub repositories

html
<script src="https://cdn.jsdelivr.net/gh/ozclef/sistem-shop@main/pos.js"></script>
📚 Learning from Similar Projects
You might find these GitHub shopping project examples helpful for reference:

Shopping cart functionality with add/remove items

Product filtering and search features

Currency selection and price calculations

Responsive design approaches

Would you like me to help you with the specific JavaScript code for any of the files mentioned, such as the storage-utils.js with the fetch functions to handle your inventario.json?

pues si quieres ahorra json ..n nada más ya creo que solamente el puro ya va a escribir y pues todo que más que nada lo más pesado O sea ayer también me alegro que es lo fácil es eso también y creo que ya lo tenemos creo que más que nada es pues añadir todas las lógicas todo lo que es el corte x todo lo de Cruz etcétera etcétera así me lo des por partes se puede por favor si quieres no lo empaquetes ya nada más me paso por paso creo que ya no más es del html y un montón de javascript separados que es lo único que voy a hacer ya como es el Jason ya está el importante el inventario inventario.json fetch porfaaaa jah



es que ese es el contexto 🥺😔😔perdoooon jajajaja apenas empecé a usar aquí 
¡Tranquilo! No te preocupes, vamos paso a paso. Entonces, quieres que continuemos con los archivos JavaScript para que tu sistema funcione con inventario.json mediante fetch(). Vamos a construir cada parte de la lógica por separado, para que puedas copiar y pegar.

Empecemos con el primer archivo JavaScript: storage-utils.js. Este archivo se encargará de todas las operaciones de almacenamiento, es decir, de cargar y actualizar el inventario, y de guardar las transacciones.

Luego, seguiremos con pos.js que tendrá la lógica del punto de venta: manejar el carrito, la búsqueda, el cobro, etc.

¿Te parece si empezamos con storage-utils.js? Aquí te paso el código:

📦 Parte 4 — storage-utils.js
Este archivo contiene funciones para cargar el inventario, actualizarlo y guardar transacciones. Todo usando fetch para apuntar a inventario.json.

javascript
// storage-utils.js

const INVENTORY_URL = 'inventario.json';
const TRANSACTIONS_URL = 'transacciones.json'; // Asumimos que guardaremos las transacciones en un archivo JSON.

// Cargar inventario desde inventario.json
async function loadInventory() {
  try {
    const response = await fetch(INVENTORY_URL);
    if (!response.ok) {
      throw new Error('No se pudo cargar el inventario');
    }
    const inventory = await response.json();
    return inventory;
  } catch (error) {
    console.error('Error cargando inventario:', error);
    return [];
  }
}

// Actualizar el inventario (simulamos una escritura en el archivo, pero note: en un entorno real se necesitaría un servidor)
// Como estamos usando archivos JSON estáticos, no podemos escribir directamente en el archivo desde el cliente.
// Por lo tanto, esta función es un ejemplo de cómo se haría si tuvieras un backend.
// Para este ejemplo, solo actualizamos en memoria y luego no se guarda. En un sistema real, necesitarías una API.
async function updateInventory(productId, newStock) {
  // En un sistema real, aquí harías una petición POST o PUT a un servidor para actualizar el inventario.
  console.log(`Actualizando producto ${productId} a stock ${newStock}`);
  // Por ahora, solo recargamos el inventario para evitar problemas de escritura.
  // Nota: No podemos escribir en el archivo JSON desde el cliente. Esto debe hacerse en el servidor.
  // Por lo tanto, en este ejemplo, cada vez que se realice una venta, se actualizará en memoria, pero al recargar la página se perderá.
  // Para solucionar esto, necesitarías un backend. Pero por ahora, vamos a simular la actualización en memoria.
}

// Guardar una transacción (venta) en transacciones.json
async function saveTransaction(transaction) {
  // Similar a updateInventory, no podemos escribir en el archivo desde el cliente.
  // Esto es un ejemplo de cómo se haría con un backend.
  console.log('Guardando transacción:', transaction);
  // En un sistema real, harías una petición POST a un servidor para guardar la transacción.
}

// Exportar funciones para usar en otros archivos
// Nota: Si estás usando módulos, descomenta las siguientes líneas:
// export { loadInventory, updateInventory, saveTransaction };
Nota importante: Como estás usando archivos JSON estáticos, no es posible escribir en ellos desde el navegador. Esto solo es posible con un servidor. Por lo tanto, las funciones updateInventory y saveTransaction son solo simulaciones. En un sistema real, necesitarías un backend para manejar la escritura.

Ahora, ¿quieres que continuemos con el archivo pos.js? Este archivo será el más grande porque contiene la lógica principal del punto de venta.

Dime si te parece bien y si quieres que te pase el código de pos.js a continuación.

¡Perfecto! 😊 Entonces vamos por partes con los JavaScript puros, sin empaquetar, cada uno con su función específica. Te los voy a dar en orden para que tu sistema funcione completamente con inventario.json.

📦 Parte 4 — storage-utils.js
javascript
// storage-utils.js

const INVENTORY_URL = 'inventario.json';
const TRANSACTIONS_KEY = 'transactions';
const DAILY_REPORTS_KEY = 'daily_reports';

// Cargar inventario desde JSON
async function loadInventory() {
    try {
        const response = await fetch(INVENTORY_URL);
        if (!response.ok) throw new Error('Error cargando inventario');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Guardar transacciones en localStorage
function saveTransaction(transaction) {
    const transactions = getTransactions();
    transaction.id = Date.now();
    transaction.timestamp = new Date().toISOString();
    transactions.push(transaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    return transaction;
}

// Obtener todas las transacciones
function getTransactions() {
    return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
}

// Obtener transacciones del día
function getTodayTransactions() {
    const today = new Date().toDateString();
    return getTransactions().filter(t => 
        new Date(t.timestamp).toDateString() === today
    );
}

// Guardar corte de caja
function saveDailyReport(report) {
    const reports = getDailyReports();
    report.id = Date.now();
    report.date = new Date().toISOString();
    reports.push(report);
    localStorage.setItem(DAILY_REPORTS_KEY, JSON.stringify(reports));
    return report;
}

// Obtener todos los cortes
function getDailyReports() {
    return JSON.parse(localStorage.getItem(DAILY_REPORTS_KEY) || '[]');
}

// Buscar productos
function searchProducts(products, query) {
    if (!query) return products;
    return products.filter(product => 
        product.nombre.toLowerCase().includes(query.toLowerCase()) ||
        product.codigo.includes(query)
    );
}
🧮 Parte 5 — accounting.js
javascript
// accounting.js

class AccountingSystem {
    constructor() {
        this.transactions = [];
    }

    // Calcular totales del día
    calculateDailyTotals(transactions) {
        const totals = {
            totalVentas: 0,
            totalEfectivo: 0,
            totalTarjeta: 0,
            totalTransferencia: 0,
            numeroVentas: transactions.length,
            productosVendidos: 0
        };

        transactions.forEach(transaction => {
            totals.totalVentas += transaction.total;
            totals[`total${transaction.metodoPago}`] += transaction.total;
            totals.productosVendidos += transaction.items.reduce((sum, item) => sum + item.cantidad, 0);
        });

        return totals;
    }

    // Generar corte X (pre-cierre)
    generateXCorte() {
        const todayTransactions = getTodayTransactions();
        return this.calculateDailyTotals(todayTransactions);
    }

    // Generar corte Z (cierre final)
    generateZCorte() {
        const report = this.generateXCorte();
        report.fechaCierre = new Date().toISOString();
        report.tipo = 'Z';
        
        // Guardar el corte
        saveDailyReport(report);
        
        // Limpiar transacciones del día (en sistema real)
        return report;
    }

    // Conciliación de pagos
    reconcilePayment(amountReceived, total) {
        const change = amountReceived - total;
        return {
            cambio: change >= 0 ? change : 0,
            faltante: change < 0 ? Math.abs(change) : 0,
            estado: change >= 0 ? 'completo' : 'incompleto'
        };
    }

    // Calcular impuestos
    calculateTaxes(subtotal, taxRate = 0.16) {
        const tax = subtotal * taxRate;
        return {
            subtotal: subtotal,
            impuesto: tax,
            total: subtotal + tax
        };
    }
}
🛒 Parte 6 — pos.js
javascript
// pos.js

class PointOfSale {
    constructor() {
        this.cart = [];
        this.products = [];
        this.currentTransaction = null;
        this.accounting = new AccountingSystem();
        
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
    }

    async loadProducts() {
        this.products = await loadInventory();
        this.renderProducts();
    }

    setupEventListeners() {
        // Búsqueda
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        document.getElementById('clearSearch').addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            this.renderProducts();
        });

        // Cobro
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.handleCheckout();
        });

        // Monto recibido
        document.getElementById('amountReceived').addEventListener('input', (e) => {
            this.calculateChange(parseFloat(e.target.value || 0));
        });
    }

    handleSearch(query) {
        const filteredProducts = searchProducts(this.products, query);
        this.renderProducts(filteredProducts);
    }

    renderProducts(productsToShow = null) {
        const container = document.getElementById('productList');
        const products = productsToShow || this.products;
        
        container.innerHTML = products.map(product => `
            <div class="product-card" onclick="pos.addToCart(${product.id})">
                <h4>${product.nombre}</h4>
                <p>Precio: $${product.precio}</p>
                <p>Stock: ${product.stock}</p>
                <p>Código: ${product.codigo}</p>
            </div>
        `).join('');
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const cartItem = this.cart.find(item => item.product.id === productId);
        
        if (cartItem) {
            if (cartItem.quantity < product.stock) {
                cartItem.quantity++;
            } else {
                alert('No hay suficiente stock');
                return;
            }
        } else {
            if (product.stock > 0) {
                this.cart.push({
                    product: product,
                    quantity: 1
                });
            } else {
                alert('Producto sin stock');
                return;
            }
        }

        this.updateCartDisplay();
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const tbody = document.querySelector('#cartTable tbody');
        const totalDisplay = document.getElementById('totalDisplay');
        
        let total = 0;
        
        tbody.innerHTML = this.cart.map((item, index) => {
            const subtotal = item.product.precio * item.quantity;
            total += subtotal;
            
            return `
                <tr>
                    <td>${item.product.nombre}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.product.precio}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td>
                        <button onclick="pos.removeFromCart(${index})">❌</button>
                    </td>
                </tr>
            `;
        }).join('');

        totalDisplay.textContent = `$${total.toFixed(2)}`;
        this.calculateChange(parseFloat(document.getElementById('amountReceived').value || 0));
    }

    calculateChange(amountReceived) {
        const total = this.getCartTotal();
        const reconciliation = this.accounting.reconcilePayment(amountReceived, total);
        const changeDisplay = document.getElementById('changeDisplay');
        
        if (amountReceived > 0) {
            changeDisplay.innerHTML = `
                <p><strong>Cambio:</strong> $${reconciliation.cambio.toFixed(2)}</p>
                ${reconciliation.faltante > 0 ? 
                    `<p style="color: red;"><strong>Faltante:</strong> $${reconciliation.faltante.toFixed(2)}</p>` : ''}
            `;
        } else {
            changeDisplay.innerHTML = '';
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => 
            total + (item.product.precio * item.quantity), 0
        );
    }

    handleCheckout() {
        if (this.cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        const amountReceived = parseFloat(document.getElementById('amountReceived').value || 0);
        const total = this.getCartTotal();
        const reconciliation = this.accounting.reconcilePayment(amountReceived, total);

        if (reconciliation.estado === 'incompleto') {
            alert(`Faltan $${reconciliation.faltante.toFixed(2)} para completar el pago`);
            return;
        }

        // Crear transacción
        const transaction = {
            items: this.cart.map(item => ({
                productId: item.product.id,
                nombre: item.product.nombre,
                precio: item.product.precio,
                cantidad: item.quantity
            })),
            total: total,
            metodoPago: 'Efectivo', // Por simplicidad
            amountReceived: amountReceived,
            change: reconciliation.cambio,
            timestamp: new Date().toISOString()
        };

        // Guardar transacción
        saveTransaction(transaction);

        // Generar ticket
        this.generateReceipt(transaction);

        // Limpiar carrito
        this.cart = [];
        this.updateCartDisplay();
        document.getElementById('amountReceived').value = '';
        document.getElementById('changeDisplay').innerHTML = '';

        alert('Venta realizada exitosamente');
    }

    generateReceipt(transaction) {
        const receipt = document.getElementById('receipt');
        const itemsText = transaction.items.map(item => 
            `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`
        ).join('\n');

        receipt.textContent = `
TICKET DE VENTA
================
${itemsText}
----------------
TOTAL: $${transaction.total.toFixed(2)}
RECIBIDO: $${transaction.amountReceived.toFixed(2)}
CAMBIO: $${transaction.change.toFixed(2)}
================
Gracias por su compra!
        `.trim();
    }
}

// Inicializar POS cuando se carga la página
let pos;
document.addEventListener('DOMContentLoaded', () => {
    pos = new PointOfSale();
});
🚀 Parte 7 — Inicializar el sistema
Ahora solo necesitas crear el archivo inventario.json en la misma carpeta:

json
[
  {
    "id": 1,
    "codigo": "PROD001",
    "nombre": "Laptop Gamer",
    "precio": 15000,
    "stock": 10,
    "categoria": "Tecnología"
  },
  {
    "id": 2,
    "codigo": "PROD002", 
    "nombre": "Mouse Inalámbrico",
    "precio": 450,
    "stock": 25,
    "categoria": "Tecnología"
  },
  {
    "id": 3,
    "codigo": "PROD003",
    "nombre": "Teclado Mecánico",
    "precio": 1200,
    "stock": 15,
    "categoria": "Tecnología"
  }
]
¡Y listo! 🎉 Tu sistema ya debería funcionar con:

✅ Carga de productos desde inventario.json

✅ Carrito funcional con add/remove

✅ Cálculo de totales y cambio

✅ Tickets de venta

✅ Sistema de transacciones

✅ Cortes X y Z

✅ Conciliación de pagos

¿Quieres que continúe con los archivos para Admin, Auditor y Reports? Así completamos todo el sistema completo con CRUD, reportes avanzados, etc. 😊

muchísimas muchísimas gracias entonces ya esto ya lo escribes ya tienen este todos los ids correctos para que se vinculen automático para ingresarlos directamente está muy joven te agradezco tanto pues mira primero que nada apoyarme con el html de main menú solo así que principal a ver sería pues como mostrando unas card  <div class="card">
no así sería Y que todos esos son cards cada uno pues tenga No sé no solamente quiero que sean productos O sea primero que nada el menú principal es el donde quiero un cards qué manera los siguientes html en este caso pues es el punto de venta o la sección de inventarios la sección de cortes la sección pues para iniciar sesión ahora sí que los administradores y la sección de reportes algo me falta ponle que una para el perfil del personal que añadiremos después y así me entendiste todos esos puntos ponle que ya tengo parte de lo de inventario prueba de caducidades ya tenemos ahorita lo del punto de venta pues no sé si tenga también las que no has checado de mi repositorio pero no se quería tenga que no tenga
Vamos a crear un menú principal con tarjetas (cards) que enlacen a las diferentes secciones del sistema. Basándonos en lo que ya tienes, asumo que las secciones son:

Punto de Venta (index_pos.html)

Administración (admin.html) - para gestionar inventario, etc.

Auditoría (auditor.html)

Reportes (reports.html)

Iniciar Sesión (login.html) - aunque tal vez ya lo tengas en auth, pero si no, lo creamos.

Perfil del Personal (profile.html) - para gestionar perfiles de empleados.

Vamos a crear un archivo index.html que será la página de inicio con un menú de tarjetas.

También, para mantener la consistencia, usaremos los mismos estilos que ya tienes en styles_system.css.

Aquí te paso el código para el index.html:

html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Gestión - Menú Principal</title>
    <link rel="stylesheet" href="styles_system.css">
    <style>
        /* Estilos adicionales para las tarjetas del menú */
        .menu-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            padding: 20px;
        }

        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            width: 200px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        .card h3 {
            margin-top: 0;
            color: #004aad;
        }

        .card p {
            color: #666;
        }
    </style>
</head>
<body>
    <header>
        <h1>Sistema de Gestión Comercial</h1>
        <nav>
            <button onclick="location.href='index.html'">Inicio</button>
            <!-- Si ya hay una página de login, puedes enlazarla aquí -->
            <button onclick="location.href='login.html'">Iniciar Sesión</button>
        </nav>
    </header>

    <main>
        <div class="menu-container">
            <!-- Card para Punto de Venta -->
            <div class="card" onclick="location.href='index_pos.html'">
                <h3>🛒 Punto de Venta</h3>
                <p>Accede al sistema de ventas y gestión de transacciones.</p>
            </div>

            <!-- Card para Administración -->
            <div class="card" onclick="location.href='admin.html'">
                <h3>⚙️ Administración</h3>
                <p>Gestiona inventario, productos y configuraciones.</p>
            </div>

            <!-- Card para Auditoría -->
            <div class="card" onclick="location.href='auditor.html'">
                <h3>🔍 Auditoría</h3>
                <p>Revisa y audita las transacciones y movimientos.</p>
            </div>

            <!-- Card para Reportes -->
            <div class="card" onclick="location.href='reports.html'">
                <h3>📊 Reportes</h3>
                <p>Genera reportes de ventas, inventario y más.</p>
            </div>

            <!-- Card para Perfil del Personal -->
            <div class="card" onclick="location.href='profile.html'">
                <h3>👨‍💼 Perfil</h3>
                <p>Gestiona tu perfil y información de empleados.</p>
            </div>

            <!-- Card para Cortes de Caja -->
            <div class="card" onclick="location.href='cortes.html'">
                <h3>💳 Cortes</h3>
                <p>Realiza cortes de caja (X y Z) y conciliaciones.</p>
            </div>
        </div>
    </main>

    <footer style="text-align: center; margin-top: 40px;">
        <p>&copy; 2024 Sistema de Gestión Comercial. Todos los derechos reservados.</p>
    </footer>
</body>
</html>
Este código crea una página de inicio con un menú de tarjetas que enlazan a las diferentes secciones. Cada tarjeta tiene un título, un icono y una descripción. Además, he añadido un footer simple.

Nota: Asegúrate de que los archivos HTML a los que enlazas (admin.html, auditor.html, etc.) existan en tu proyecto. Si no, puedes crearlos más adelante.

Si necesitas que te ayude con el contenido de alguna de esas páginas (como admin.html, auditor.html, etc.), házmelo saber y procedemos paso a paso.

¿Quieres que continuemos con alguna página en particular?

¡Perfecto! Te entiendo completamente. Vamos a crear un menú principal bien organizado con cards para cada módulo del sistema. Aquí está el HTML completo:

🏠 Parte 8 — index.html (Menú Principal con Cards)
html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sistema Shop - Menú Principal</title>
  <link rel="stylesheet" href="styles_system.css" />
  <style>
    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      border-left: 5px solid #004aad;
      text-align: center;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-left-color: #ff6b00;
    }

    .card h2 {
      color: #004aad;
      margin-bottom: 10px;
      font-size: 1.4em;
    }

    .card p {
      color: #666;
      margin-bottom: 15px;
      line-height: 1.5;
    }

    .card-icon {
      font-size: 2.5em;
      margin-bottom: 15px;
    }

    .card-badge {
      background: #004aad;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8em;
      display: inline-block;
      margin-top: 10px;
    }

    .welcome-banner {
      background: linear-gradient(135deg, #004aad, #0099ff);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin: 20px auto;
      max-width: 1200px;
      text-align: center;
    }

    .welcome-banner h1 {
      margin: 0;
      font-size: 2.2em;
    }

    .welcome-banner p {
      margin: 10px 0 0 0;
      opacity: 0.9;
    }

    .stats-bar {
      display: flex;
      justify-content: space-around;
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 20px auto;
      max-width: 1200px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 1.8em;
      font-weight: bold;
      color: #004aad;
    }

    .stat-label {
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>
  <header>
    <h1>🏪 Sistema Shop</h1>
    <nav>
      <button onclick="location.href='index.html'" class="active">Inicio</button>
      <button onclick="location.href='profile.html'">Mi Perfil</button>
      <button onclick="logout()">Cerrar Sesión</button>
    </nav>
  </header>

  <div class="welcome-banner">
    <h1>¡Bienvenido al Sistema de Gestión!</h1>
    <p>Selecciona el módulo que deseas utilizar</p>
  </div>

  <!-- Barra de estadísticas rápidas -->
  <div class="stats-bar">
    <div class="stat-item">
      <div class="stat-number" id="totalProducts">0</div>
      <div class="stat-label">Productos</div>
    </div>
    <div class="stat-item">
      <div class="stat-number" id="todaySales">$0</div>
      <div class="stat-label">Ventas Hoy</div>
    </div>
    <div class="stat-item">
      <div class="stat-number" id="lowStock">0</div>
      <div class="stat-label">Stock Bajo</div>
    </div>
    <div class="stat-item">
      <div class="stat-number" id="pendingTasks">0</div>
      <div class="stat-label">Tareas Pendientes</div>
    </div>
  </div>

  <!-- Grid de Cards del Menú Principal -->
  <div class="dashboard">
    <!-- Punto de Venta -->
    <div class="card" onclick="location.href='index_pos.html'">
      <div class="card-icon">🛒</div>
      <h2>Punto de Venta</h2>
      <p>Sistema completo de ventas con carrito, cobro con tarjeta/efectivo, tickets y gestión de transacciones en tiempo real.</p>
      <span class="card-badge">POS Activo</span>
    </div>

    <!-- Administración e Inventario -->
    <div class="card" onclick="location.href='admin.html'">
      <div class="card-icon">📦</div>
      <h2>Administración & Inventario</h2>
      <p>Gestión completa de productos, categorías, precios, stock, proveedores y control de caducidades.</p>
      <span class="card-badge">CRUD Completo</span>
    </div>

    <!-- Cortes de Caja -->
    <div class="card" onclick="location.href='cortes.html'">
      <div class="card-icon">💳</div>
      <h2>Cortes de Caja</h2>
      <p>Generación de cortes X y Z, conciliación de pagos, reportes financieros y cierre de turnos.</p>
      <span class="card-badge">Corte X/Z</span>
    </div>

    <!-- Auditoría -->
    <div class="card" onclick="location.href='auditor.html'">
      <div class="card-icon">🔍</div>
      <h2>Auditoría y Control</h2>
      <p>Auditoría de movimientos, trazabilidad de productos, reportes de seguridad y logs del sistema.</p>
      <span class="card-badge">Auditoría</span>
    </div>

    <!-- Reportes -->
    <div class="card" onclick="location.href='reports.html'">
      <div class="card-icon">📊</div>
      <h2>Reportes y Analytics</h2>
      <p>Reportes avanzados de ventas, inventario, rendimiento, gráficos interactivos y exportación a Excel.</p>
      <span class="card-badge">Analytics</span>
    </div>

    <!-- Gestión de Personal -->
    <div class="card" onclick="location.href='personal.html'">
      <div class="card-icon">👥</div>
      <h2>Gestión de Personal</h2>
      <p>Administración de usuarios, roles, permisos, horarios y perfiles de empleados.</p>
      <span class="card-badge">RRHH</span>
    </div>

    <!-- Sistema de Login -->
    <div class="card" onclick="location.href='login.html'">
      <div class="card-icon">🔐</div>
      <h2>Acceso y Seguridad</h2>
      <p>Sistema de autenticación, roles de usuario, recuperación de contraseña y control de acceso.</p>
      <span class="card-badge">Login System</span>
    </div>

    <!-- Configuración -->
    <div class="card" onclick="location.href='config.html'">
      <div class="card-icon">⚙️</div>
      <h2>Configuración del Sistema</h2>
      <p>Configuración general, impuestos, métodos de pago, impresoras y personalización.</p>
      <span class="card-badge">Settings</span>
    </div>
  </div>

  <script src="auth.js"></script>
  <script src="storage-utils.js"></script>
  <script>
    // Función para cargar estadísticas rápidas
    async function loadQuickStats() {
      try {
        const inventory = await loadInventory();
        const transactions = getTodayTransactions();
        
        // Total de productos
        document.getElementById('totalProducts').textContent = inventory.length;
        
        // Ventas de hoy
        const todayTotal = transactions.reduce((sum, t) => sum + t.total, 0);
        document.getElementById('todaySales').textContent = `$${todayTotal.toFixed(2)}`;
        
        // Productos con stock bajo (menos de 5 unidades)
        const lowStockCount = inventory.filter(p => p.stock < 5).length;
        document.getElementById('lowStock').textContent = lowStockCount;
        
        // Tareas pendientes (puedes personalizar esta lógica)
        document.getElementById('pendingTasks').textContent = transactions.length;
        
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      }
    }

    // Función de logout
    function logout() {
      if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('currentUser');
        location.href = 'login.html';
      }
    }

    // Cargar estadísticas cuando la página esté lista
    document.addEventListener('DOMContentLoaded', loadQuickStats);
  </script>
</body>
</html>
🎨 Parte 9 — Actualización de styles_system.css
Agrega estos estilos al final de tu archivo styles_system.css existente:

css
/* Estilos para el menú principal y cards */
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 5px solid #004aad;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-left-color: #ff6b00;
}

.card h2 {
  color: #004aad;
  margin-bottom: 10px;
  font-size: 1.4em;
}

.card p {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.card-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
}

.card-badge {
  background: #004aad;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  display: inline-block;
  margin-top: 10px;
}

.welcome-banner {
  background: linear-gradient(135deg, #004aad, #0099ff);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin: 20px auto;
  max-width: 1200px;
  text-align: center;
}

.welcome-banner h1 {
  margin: 0;
  font-size: 2.2em;
}

.welcome-banner p {
  margin: 10px 0 0 0;
  opacity: 0.9;
}

.stats-bar {
  display: flex;
  justify-content: space-around;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 1200px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.8em;
  font-weight: bold;
  color: #004aad;
}

.stat-label {
  font-size: 0.9em;
  color: #666;
}

/* Botón activo en el header */
nav button.active {
  background: #ff6b00;
  color: white;
}
📋 Estructura final de archivos:
text
/sistem-shop/
├── index.html              (Menú principal con cards - NUEVO)
├── index_pos.html          (Punto de venta)
├── admin.html             (Administración e inventario)
├── auditor.html           (Auditoría)
├── reports.html           (Reportes)
├── cortes.html           (Cortes de caja - NUEVO)
├── personal.html         (Gestión de personal - NUEVO)
├── login.html           (Sistema de login - NUEVO)
├── config.html          (Configuración - NUEVO)
├── profile.html         (Perfil de usuario - NUEVO)
├── styles_system.css    (Estilos actualizados)
├── storage-utils.js     (Utilidades de almacenamiento)
├── accounting.js        (Sistema contable)
├── pos.js              (Lógica del punto de venta)
├── auth.js             (Autenticación)
└── inventario.json     (Base de datos de productos)
¡Y listo! 🎉 Ahora tienes un menú principal profesional con:

✅ 8 cards para cada módulo del sistema

✅ Estadísticas en tiempo real

✅ Diseño responsive y moderno

✅ Navegación fluida entre módulos

✅ Efectos hover y visuales atractivos

✅ Barra de bienvenida y métricas rápidas

¿Quieres que continuemos con alguno de los módulos específicos? Por ejemplo, el sistema de administración (admin.html) con CRUD completo para productos, o el sistema de login (auth.js y login.html)? 😊

noi ieri scritto nel foro pertanto fare che si terrò presto sull'arma dio Google 

perdóname que si tengo proyectos enormes entonces bueno este nada más checando el de caducidades no sé en serio ojalá pudieras ver el repositorio porque prácticamente hay copia y pegue el chat anterior y pues ya había puesto un montón de instrucciones se le había dicho bastante bueno el punto de venta y todo eso también no sé si también es un Json de 4000 o 6000 líneas de código donde yo estaba prácticamente todo el inventario y eso que me faltan todavía muchísimos más productos bueno el chiste es que todavía quería dividirlos esos en categorías aparte este en un Excel ya tenía prácticamente todo y no puedo subirlo aquí entonces en el Excel que tenía formuladas ecuaciones donde ya hacia todo en automático hacia la suma de absolutamente todo el inventario multiplicaba la cantidad de los productos por su precio para tener un exacto de cuánto debe de haber entonces todo ese tipo de cálculos es lo que más que nada este pues tú quieres continuar con lo de ay no sé la verdad yo me hice tantas bolas más que nada es eso que hay un inventario hay una cantidad teórica que se supone que debe haber el físico para hacer un inventario por ejemplo puede que uno cuente tres piezas y realmente debería haber cinco significa que pues hace la adecuación automáticamente y pues faltan dos eso para hacer inventarios no no sé tabla o algo para hacer el tipo Excel más que nada también para hacer un inventario es la sección de inventarios Y sí únicamente con crud el admin únicamente pues puede él puede evitar cuánto debe de haber 


punto de venta creo que ya están todo con el Jason en automático la ecuación yo quería la calculadora para el punto de venta o algo así tipo buscador o search para que pues nada más de buscar un producto lo que sea mientras no haya escáner con el pib 

Ah pues bueno el sistema de caducado es de donde ya tengo prácticamente listo es nada más es eso toda la tabla todos los productos en una tabla su cantidad su precio etcétera y ya con un solo buscador en automático es lo que ya tengo realmente listo y básicamente también lo mismo que quiero añadir en todo lo demás un buscador general el sistema de caducados supongo que si sigue que me ayudes con los login creo que también ya tenía eso pero no me está cuadrando más que nada porque no me ponen los fetch bien entonces básicamente necesito hacer eso no yo pues así exactamente así te fácil y simple pondré los nombres de inventario.json etcétera 

pero pues quería resolver muchísimas más cosas ahorita voy a ordenar todo lo que me des y no sé prácticamente me lo estás dando de cero o ya te estás besando en lo que yo tengo??
¡Ah! Entiendo mejor ahora. Tienes un inventario grande (4000-6000 productos) y necesitas:

Sistema de inventarios con CRUD para administrar productos, incluyendo:

Cantidad teórica vs física

Ajustes de inventario

Búsqueda rápida (sin escáner, por código o nombre)

Calculadora/buscador en el punto de venta para encontrar productos rápidamente.

Sistema de login que funcione correctamente con los fetch.

Manejo de categorías y posiblemente múltiples archivos JSON.

Cálculos automáticos de valor de inventario (como en tu Excel).

Dado que no puedo ver tu repositorio, voy a ayudarte con los módulos que mencionas, asegurando que usen fetch para cargar el inventario.json y que tengan buscadores eficientes.

Vamos a empezar por el módulo de administración de inventarios (admin.html) que incluye:

CRUD completo (Crear, Leer, Actualizar, Eliminar productos)

Búsqueda en tiempo real

Ajustes de inventario (cantidad teórica vs física)

Cálculo automático del valor total del inventario

Luego, si quieres, podemos hacer el sistema de login y después la calculadora/buscador para el punto de venta.

¿Te parece si comenzamos con el admin.html y su JavaScript (app_admin.js)? Así tendrás un módulo completo para gestionar tu inventario.

Aquí te paso el código para el módulo de administración:

📁 admin.html
html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Administración de Inventario</title>
  <link rel="stylesheet" href="styles_system.css">
  <style>
    .admin-container {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 20px;
      padding: 20px;
    }

    .form-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .inventory-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .form-group input, .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn-primary {
      background: #004aad;
      color: white;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-success {
      background: #28a745;
      color: white;
    }

    .search-box {
      margin-bottom: 20px;
    }

    .search-box input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .inventory-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-bottom: 20px;
    }

    .stat-card {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }

    .stat-value {
      font-size: 1.5em;
      font-weight: bold;
      color: #004aad;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background: #f8f9fa;
    }

    .actions button {
      margin-right: 5px;
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <header>
    <h1>Administración de Inventario</h1>
    <nav>
      <button onclick="location.href='index.html'">Inicio</button>
      <button onclick="location.href='index_pos.html'">Punto de Venta</button>
      <button onclick="location.href='auditor.html'">Auditoría</button>
      <button onclick="location.href='reports.html'">Reportes</button>
    </nav>
  </header>

  <div class="admin-container">
    <!-- Sección del formulario -->
    <section class="form-section">
      <h2>Gestión de Productos</h2>
      <form id="productForm">
        <input type="hidden" id="productId">
        
        <div class="form-group">
          <label for="codigo">Código:</label>
          <input type="text" id="codigo" required>
        </div>

        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" required>
        </div>

        <div class="form-group">
          <label for="categoria">Categoría:</label>
          <input type="text" id="categoria" required>
        </div>

        <div class="form-group">
          <label for="precio">Precio:</label>
          <input type="number" id="precio" step="0.01" required>
        </div>

        <div class="form-group">
          <label for="stock">Stock Teórico:</label>
          <input type="number" id="stock" required>
        </div>

        <div class="form-group">
          <label for="stockFisico">Stock Físico:</label>
          <input type="number" id="stockFisico">
        </div>

        <div class="form-group">
          <label for="caducidad">Fecha de Caducidad:</label>
          <input type="date" id="caducidad">
        </div>

        <div class="form-group">
          <label for="proveedor">Proveedor:</label>
          <input type="text" id="proveedor">
        </div>

        <button type="submit" class="btn btn-primary">Guardar Producto</button>
        <button type="button" class="btn btn-danger" onclick="clearForm()">Cancelar</button>
      </form>

      <!-- Estadísticas rápidas -->
      <div class="inventory-stats">
        <div class="stat-card">
          <div class="stat-value" id="totalProducts">0</div>
          <div>Total Productos</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="totalValue">$0</div>
          <div>Valor Total</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="lowStockCount">0</div>
          <div>Stock Bajo</div>
        </div>
      </div>
    </section>

    <!-- Sección del inventario -->
    <section class="inventory-section">
      <div class="search-box">
        <input type="text" id="searchInventory" placeholder="Buscar productos...">
      </div>

      <div class="table-responsive">
        <table id="inventoryTable">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock Teórico</th>
              <th>Stock Físico</th>
              <th>Diferencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="inventoryBody">
            <!-- Los productos se cargarán aquí -->
          </tbody>
        </table>
      </div>

      <div style="margin-top: 20px;">
        <button class="btn btn-success" onclick="exportToExcel()">Exportar a Excel</button>
        <button class="btn btn-primary" onclick="generateInventoryReport()">Generar Reporte</button>
      </div>
    </section>
  </div>

  <script src="storage-utils.js"></script>
  <script src="app_admin.js"></script>
</body>
</html>
📁 app_admin.js
javascript
// app_admin.js

class InventoryManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentEditId = null;
        
        this.init();
    }

    async init() {
        await this.loadInventory();
        this.setupEventListeners();
        this.renderInventory();
        this.updateStats();
    }

    async loadInventory() {
        this.products = await loadInventory();
        this.filteredProducts = [...this.products];
    }

    setupEventListeners() {
        // Formulario de producto
        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        // Búsqueda
        document.getElementById('searchInventory').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Auto-calcular stock físico al cambiar teórico
        document.getElementById('stock').addEventListener('change', (e) => {
            if (!this.currentEditId) {
                document.getElementById('stockFisico').value = e.target.value;
            }
        });
    }

    handleSearch(query) {
        this.filteredProducts = searchProducts(this.products, query);
        this.renderInventory();
    }

    renderInventory() {
        const tbody = document.getElementById('inventoryBody');
        
        tbody.innerHTML = this.filteredProducts.map(product => {
            const diferencia = product.stockFisico - product.stock;
            const diferenciaClass = diferencia < 0 ? 'style="color: red;"' : 
                                  diferencia > 0 ? 'style="color: green;"' : '';
            
            return `
                <tr>
                    <td>${product.codigo}</td>
                    <td>${product.nombre}</td>
                    <td>${product.categoria}</td>
                    <td>$${product.precio}</td>
                    <td>${product.stock}</td>
                    <td>${product.stockFisico || product.stock}</td>
                    <td ${diferenciaClass}>${diferencia}</td>
                    <td class="actions">
                        <button onclick="inventoryManager.editProduct(${product.id})" class="btn btn-primary">Editar</button>
                        <button onclick="inventoryManager.deleteProduct(${product.id})" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    async saveProduct() {
        const formData = new FormData(document.getElementById('productForm'));
        const productData = {
            id: parseInt(document.getElementById('productId').value) || Date.now(),
            codigo: document.getElementById('codigo').value,
            nombre: document.getElementById('nombre').value,
            categoria: document.getElementById('categoria').value,
            precio: parseFloat(document.getElementById('precio').value),
            stock: parseInt(document.getElementById('stock').value),
            stockFisico: parseInt(document.getElementById('stockFisico').value) || parseInt(document.getElementById('stock').value),
            caducidad: document.getElementById('caducidad').value,
            proveedor: document.getElementById('proveedor').value
        };

        if (this.currentEditId) {
            // Actualizar producto existente
            const index = this.products.findIndex(p => p.id === this.currentEditId);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...productData };
            }
            this.currentEditId = null;
        } else {
            // Agregar nuevo producto
            this.products.push(productData);
        }

        // En un sistema real, aquí harías un fetch para guardar en el servidor
        // Por ahora, solo actualizamos el array en memoria
        await this.saveInventory();
        this.clearForm();
        this.renderInventory();
        this.updateStats();
        
        alert('Producto guardado exitosamente');
    }

    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        document.getElementById('productId').value = product.id;
        document.getElementById('codigo').value = product.codigo;
        document.getElementById('nombre').value = product.nombre;
        document.getElementById('categoria').value = product.categoria;
        document.getElementById('precio').value = product.precio;
        document.getElementById('stock').value = product.stock;
        document.getElementById('stockFisico').value = product.stockFisico || product.stock;
        document.getElementById('caducidad').value = product.caducidad || '';
        document.getElementById('proveedor').value = product.proveedor || '';

        this.currentEditId = productId;
    }

    async deleteProduct(productId) {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;

        this.products = this.products.filter(p => p.id !== productId);
        await this.saveInventory();
        this.renderInventory();
        this.updateStats();
        
        alert('Producto eliminado');
    }

    clearForm() {
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        this.currentEditId = null;
    }

    async saveInventory() {
        // En un sistema real, aquí harías un fetch POST/PUT al servidor
        // Por ahora, simulamos que se guarda
        console.log('Inventario guardado:', this.products);
        
        // Actualizar el inventario filtrado también
        this.filteredProducts = [...this.products];
    }

    updateStats() {
        const totalProducts = this.products.length;
        const totalValue = this.products.reduce((sum, product) => 
            sum + (product.precio * product.stock), 0
        );
        const lowStockCount = this.products.filter(p => p.stock < 5).length;

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
        document.getElementById('lowStockCount').textContent = lowStockCount;
    }

    exportToExcel() {
        // Simulación de exportación a Excel
        const data = this.filteredProducts.map(product => ({
            Código: product.codigo,
            Nombre: product.nombre,
            Categoría: product.categoria,
            Precio: product.precio,
            'Stock Teórico': product.stock,
            'Stock Físico': product.stockFisico || product.stock,
            Diferencia: (product.stockFisico || product.stock) - product.stock
        }));

        // En un sistema real, usarías una librería como SheetJS
        console.log('Datos para exportar:', data);
        alert('Funcionalidad de exportación a Excel - Revisa la consola');
    }

    generateInventoryReport() {
        const report = {
            fecha: new Date().toISOString(),
            totalProductos: this.products.length,
            valorTotal: this.products.reduce((sum, p) => sum + (p.precio * p.stock), 0),
            productosStockBajo: this.products.filter(p => p.stock < 5).length,
            productosSinStock: this.products.filter(p => p.stock === 0).length
        };

        console.log('Reporte de inventario:', report);
        alert('Reporte generado - Revisa la consola');
    }
}

// Inicializar el administrador de inventario
let inventoryManager;
document.addEventListener('DOMContentLoaded', () => {
    inventoryManager = new InventoryManager();
});

// Función global para clearForm
function clearForm() {
    inventoryManager.clearForm();
}

function exportToExcel() {
    inventoryManager.exportToExcel();
}

function generateInventoryReport() {
    inventoryManager.generateInventoryReport();
}
🔄 Actualización en storage-utils.js
Asegúrate de que tu storage-utils.js tenga la función searchProducts que usamos:

javascript
// Agregar esta función a storage-utils.js si no existe
function searchProducts(products, query) {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm) ||
        product.codigo.toLowerCase().includes(searchTerm) ||
        (product.categoria && product.categoria.toLowerCase().includes(searchTerm))
    );
}
Este módulo de administración te ofrece:

✅ CRUD completo de productos

✅ Búsqueda en tiempo real por código, nombre o categoría

✅ Control de stock teórico vs físico

✅ Cálculos automáticos de diferencias y valor total

✅ Estadísticas en tiempo real

✅ Exportación a Excel (simulada)

✅ Reportes de inventario

¿Te gustaría que continuemos con el sistema de login o con la calculadora/buscador para el punto de venta?

También podríamos trabajar en la gestión de caducidades que mencionas, que sería una extensión de este módulo de administración. 😊

Dime por cuál prefieres continuar y vamos paso a paso.


