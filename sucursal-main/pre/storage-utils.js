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
