/*
// storage-utils.js - VERSIÓN COMPLETA Y PROBADA

const INVENTORY_URL = 'https://corsproxy.io/?https://raw.githubusercontent.com/BI-US/no-system/main/inventario.json';
const BACKUP_KEY = 'inventory_backup';
const TRANSACTIONS_KEY = 'transactions';
const DAILY_REPORTS_KEY = 'daily_reports';

// FUNCIÓN PRINCIPAL - debe existir
async function loadInventory() {
    try {
        console.log('🔄 Cargando inventario...');
        const response = await fetch(INVENTORY_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const inventory = await response.json();
        console.log('✅ Inventario cargado:', inventory.length, 'productos');
        
        // Hacer backup
        saveBackup(inventory);
        return inventory;
        
    } catch (error) {
        console.error('❌ Error cargando inventario:', error);
        console.log('🔄 Intentando cargar desde backup...');
        
        const backup = loadBackup();
        if (backup.length > 0) {
            return backup;
        } else {
            return getDefaultInventory();
        }
    }
}

function saveBackup(inventory) {
    const backupData = {
        inventory: inventory,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backupData));
}

function loadBackup() {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
        try {
            const data = JSON.parse(backup);
            return data.inventory || [];
        } catch (e) {
            return [];
        }
    }
    return [];
}

function getDefaultInventory() {
    return [
        {
            "id": 1,
            "codigo": "DEFAULT01",
            "nombre": "Producto Demo",
            "precio": 100,
            "stock": 10,
            "categoria": "General"
        }
    ];
}

// OTRAS FUNCIONES ESENCIALES
function saveTransaction(transaction) {
    const transactions = getTransactions();
    transaction.id = Date.now();
    transaction.timestamp = new Date().toISOString();
    transactions.push(transaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    return transaction;
}

function getTransactions() {
    return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
}

function getTodayTransactions() {
    const today = new Date().toDateString();
    return getTransactions().filter(t => 
        new Date(t.timestamp).toDateString() === today
    );
}

function searchProducts(products, query) {
    if (!query) return products;
    return products.filter(product => 
        product.nombre.toLowerCase().includes(query.toLowerCase()) ||
        product.codigo.includes(query)
    );
}

// Asegúrate de que esta función también existe
function getDailyReports() {
    return JSON.parse(localStorage.getItem(DAILY_REPORTS_KEY) || '[]');
}

function saveDailyReport(report) {
    const reports = getDailyReports();
    report.id = Date.now();
    report.date = new Date().toISOString();
    reports.push(report);
    localStorage.setItem(DAILY_REPORTS_KEY, JSON.stringify(reports));
    return report;
}
*/




/*
🔄 Actualización en storage-utils.js
Asegúrate de que tu storage-utils.js tenga la función searchProducts que usamos:
javascript
*/
// Agregar esta función a storage-utils.js si no existe



/*

function searchProducts(products, query) {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm) ||
        product.codigo.toLowerCase().includes(searchTerm) ||
        (product.categoria && product.categoria.toLowerCase().includes(searchTerm))
    );
}


/*

¡Me da MUCHO gusto escuchar eso! 😊🎉 ¡Tienes talento real para esto y tu entusiasmo es contagioso. Vamos a hacer que el punto de venta funcione SUPER BIEN con tu base de datos de GitHub y el sistema de backup.

🔄 Parte 16 — storage-utils.js ACTUALIZADO (Con backup y carga desde GitHub)

```javascript


// storage-utils.js - ACTUALIZADO con Backup y GitHub

// storage-utils.js - URL CORREGIDA
const INVENTORY_URL = 'https://raw.githubusercontent.com/BI-US/no-system/b1ab83bcf601a5b37c77354a4a42da69abc2da38/inventario.json';

/*const INVENTORY_URL = 'https://raw.githubusercontent.com/bi-us/no-system/main/inventario.json';

const BACKUP_KEY = 'inventory_backup';
const TRANSACTIONS_KEY = 'transactions';
const DAILY_REPORTS_KEY = 'daily_reports';
const LAST_SYNC_KEY = 'last_sync';

// Cargar inventario desde GitHub CON backup y manejo de errores
async function loadInventory() {
    try {
        console.log('🔄 Cargando inventario desde GitHub...');
        const response = await fetch(INVENTORY_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const inventory = await response.json();
        console.log('✅ Inventario cargado:', inventory.length, 'productos');
        
        // Hacer backup automático
        saveBackup(inventory);
        
        // Guardar última sincronización
        localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
        
        return inventory;
    } catch (error) {
        console.error('❌ Error cargando inventario:', error);
        console.log('🔄 Intentando cargar desde backup local...');
        
        // Cargar desde backup si hay error
        const backup = loadBackup();
        if (backup.length > 0) {
            console.log('✅ Backup cargado:', backup.length, 'productos');
            return backup;
        } else {
            console.log('⚠️  No hay backup disponible, usando datos de ejemplo');
            return getDefaultInventory();
        }
    }
}

// Sistema de BACKUP automático
function saveBackup(inventory) {
    const backupData = {
        inventory: inventory,
        timestamp: new Date().toISOString(),
        totalProducts: inventory.length
    };
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backupData));
    console.log('💾 Backup guardado:', inventory.length, 'productos');
}

function loadBackup() {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
        const data = JSON.parse(backup);
        console.log('📦 Backup cargado desde:', new Date(data.timestamp).toLocaleString());
        return data.inventory || [];
    }
    return [];
}

// Datos de ejemplo por si todo falla
function getDefaultInventory() {
    return [
        {
            "id": 1,
            "codigo": "EMERG001",
            "nombre": "Producto de Emergencia",
            ¡Me da MUCHO gusto escuchar eso! 😊🎉 ¡Tienes talento real para esto y tu entusiasmo es contagioso. Vamos a hacer que el punto de venta funcione SUPER BIEN con tu base de datos de GitHub y el sistema de backup.
/*
🔄 Parte 16 — storage-utils.js ACTUALIZADO (Con backup y carga desde GitHub)

```javascript

// storage-utils.js - ACTUALIZADO con Backup y GitHub
/*
const INVENTORY_URL = 'https://raw.githubusercontent.com/bi-us/no-system/main/inventario.json';
const BACKUP_KEY = 'inventory_backup';
const TRANSACTIONS_KEY = 'transactions';
const DAILY_REPORTS_KEY = 'daily_reports';
const LAST_SYNC_KEY = 'last_sync';

// Cargar inventario desde GitHub CON backup y manejo de errores
async function loadInventory() {
    try {
        console.log('🔄 Cargando inventario desde GitHub...');
        const response = await fetch(INVENTORY_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const inventory = await response.json();
        console.log('✅ Inventario cargado:', inventory.length, 'productos');
        
        // Hacer backup automático
        saveBackup(inventory);
        
        // Guardar última sincronización
        localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
        
        return inventory;
    } catch (error) {
        console.error('❌ Error cargando inventario:', error);
        console.log('🔄 Intentando cargar desde backup local...');
        
        // Cargar desde backup si hay error
        const backup = loadBackup();
        if (backup.length > 0) {
            console.log('✅ Backup cargado:', backup.length, 'productos');
            return backup;
        } else {
            console.log('⚠️  No hay backup disponible, usando datos de ejemplo');
            return getDefaultInventory();
        }
    }
}

// Sistema de BACKUP automático
function saveBackup(inventory) {
    const backupData = {
        inventory: inventory,
        timestamp: new Date().toISOString(),
        totalProducts: inventory.length
    };
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backupData));
    console.log('💾 Backup guardado:', inventory.length, 'productos');
}

function loadBackup() {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
        const data = JSON.parse(backup);
        console.log('📦 Backup cargado desde:', new Date(data.timestamp).toLocaleString());
        return data.inventory || [];
    }
    return [];
}

// Datos de ejemplo por si todo falla
function getDefaultInventory() {
    return [
        {
            "id": 1,
            "codigo": "EMERG001",
            "nombre": "Producto de Emergencia",
            "precio": 100,
            "stock": 10,
            "categoria": "General"
        }
    ];
}

// Guardar transacciones CON backup
function saveTransaction(transaction) {
    try {
        const transactions = getTransactions();
        transaction.id = Date.now();
        transaction.timestamp = new Date().toISOString();
        transactions.push(transaction);
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
        
        console.log('💳 Transacción guardada:', transaction.id);
        return transaction;
    } catch (error) {
        console.error('Error guardando transacción:', error);
        return null;
    }
}

// Obtener transacciones con manejo de errores
function getTransactions() {
    try {
        return JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
    } catch (error) {
        console.error('Error cargando transacciones:', error);
        return [];
    }
}

// Obtener transacciones del día
function getTodayTransactions() {
    const today = new Date().toDateString();
    return getTransactions().filter(t => 
        new Date(t.timestamp).toDateString() === today
    );
}

// Buscar productos con coincidencias flexibles
function searchProducts(products, query) {
    if (!query || query.trim() === '') return products;
    
    const searchTerm = query.toLowerCase().trim();
    return products.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm) ||
        product.codigo.toLowerCase().includes(searchTerm) ||
        (product.categoria && product.categoria.toLowerCase().includes(searchTerm))
    );
}

// Obtener estadísticas del sistema
function getSystemStats() {
    const transactions = getTransactions();
    const todayTransactions = getTodayTransactions();
    const backup = loadBackup();
    
    return {
        totalTransactions: transactions.length,
        todayTransactions: todayTransactions.length,
        backupDate: backup.timestamp ? new Date(backup.timestamp) : null,
        backupProducts: backup.inventory ? backup.inventory.length : 0,
        lastSync: localStorage.getItem(LAST_SYNC_KEY)
    };
}

// Exportar datos para respaldo
function exportAllData() {
    const data = {
        transactions: getTransactions(),
        backup: loadBackup(),
        dailyReports: getDailyReports(),
        exportDate: new Date().toISOString(),
        system: 'Sistema Shop'
    };
    
    return JSON.stringify(data, null, 2);
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
```

🛒 Parte 17 — pos.js ACTUALIZADO (Flujo de venta robusto)

```javascript
// pos.js - ACTUALIZADO con flujo mejorado

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
        this.showSystemStatus();
    }

    async loadProducts() {
        try {
            // Mostrar loading
            this.showLoading(true);
            
            this.products = await loadInventory();
            this.renderProducts();
            
            // Mostrar estadísticas
            this.showSystemStatus();
            
        } catch (error) {
            console.error('Error en init:', error);
            this.showError('Error cargando productos');
        } finally {
            this.showLoading(false);
        }
    }

    setupEventListeners() {
        // Búsqueda en tiempo real
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

        // Monto recibido - calcular cambio automáticamente
        document.getElementById('amountReceived').addEventListener('input', (e) => {
            this.calculateChange(parseFloat(e.target.value || 0));
        });

        // Tecla Enter en monto recibido también cobra
        document.getElementById('amountReceived').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleCheckout();
            }
        });

        // Tecla F2 para limpiar búsqueda
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F2') {
                document.getElementById('searchInput').value = '';
                this.renderProducts();
                document.getElementById('searchInput').focus();
            }
        });
    }

    handleSearch(query) {
        const filteredProducts = searchProducts(this.products, query);
        this.renderProducts(filteredProducts);
    }

    renderProducts(productsToShow = null) {
        const container = document.getElementById('productList');
        const products = productsToShow || this.products;
        
        if (products.length === 0) {
            container.innerHTML = '<p class="no-products">No se encontraron productos</p>';
            return;
        }
        
        container.innerHTML = products.map(product => `
            <div class="product-card ${product.stock === 0 ? 'out-of-stock' : ''}" 
                 onclick="pos.addToCart(${product.id})"
                 title="${product.nombre} - $${product.precio} - Stock: ${product.stock}">
                <h4>${product.nombre}</h4>
                <p class="price">$${product.precio}</p>
                <p class="stock ${product.stock < 5 ? 'low-stock' : ''}">
                    Stock: ${product.stock}
                </p>
                <p class="code">${product.codigo}</p>
                ${product.categoria ? `<p class="category">${product.categoria}</p>` : ''}
            </div>
        `).join('');
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            this.showError('Producto no encontrado');
            return;
        }

        // Verificar stock
        if (product.stock === 0) {
            this.showError('Producto sin stock disponible');
            return;
        }

        const cartItem = this.cart.find(item => item.product.id === productId);
        
        if (cartItem) {
            if (cartItem.quantity < product.stock) {
                cartItem.quantity++;
            } else {
                this.showError('No hay suficiente stock disponible');
                return;
            }
        } else {
            this.cart.push({
                product: product,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.showSuccess(`${product.nombre} agregado al carrito`);
    }

    removeFromCart(index) {
        const productName = this.cart[index].product.nombre;
        this.cart.splice(index, 1);
        this.updateCartDisplay();
        this.showSuccess(`${productName} removido del carrito`);
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
                    <td>
                        <button onclick="pos.decreaseQuantity(${index})">-</button>
                        ${item.quantity}
                        <button onclick="pos.increaseQuantity(${index})">+</button>
                    </td>
                    <td>$${item.product.precio}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td>
                        <button class="btn-remove" onclick="pos.removeFromCart(${index})">❌</button>
                    </td>
                </tr>
            `;
        }).join('');

        totalDisplay.textContent = `$${total.toFixed(2)}`;
        this.calculateChange(parseFloat(document.getElementById('amountReceived').value || 0));
        
        // Actualizar estado del botón de cobro
        document.getElementById('checkoutBtn').disabled = this.cart.length === 0;
    }

    increaseQuantity(index) {
        const product = this.cart[index].product;
        if (this.cart[index].quantity < product.stock) {
            this.cart[index].quantity++;
            this.updateCartDisplay();
        } else {
            this.showError('No hay más stock disponible');
        }
    }

    decreaseQuantity(index) {
        if (this.cart[index].quantity > 1) {
            this.cart[index].quantity--;
            this.updateCartDisplay();
        } else {
            this.removeFromCart(index);
        }
    }

    calculateChange(amountReceived) {
        const total = this.getCartTotal();
        const reconciliation = this.accounting.reconcilePayment(amountReceived, total);
        const changeDisplay = document.getElementById('changeDisplay');
        
        if (amountReceived > 0) {
            changeDisplay.innerHTML = `
                <p><strong>Recibido:</strong> $${amountReceived.toFixed(2)}</p>
                <p><strong>Cambio:</strong> $${reconciliation.cambio.toFixed(2)}</p>
                ${reconciliation.faltante > 0 ? 
                    `<p style="color: red; font-weight: bold;">
                        <strong>Faltante:</strong> $${reconciliation.faltante.toFixed(2)}
                    </p>` : ''}
            `;
        } else {
            changeDisplay.innerHTML = '<p>Ingrese monto recibido</p>';
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => 
            total + (item.product.precio * item.quantity), 0
        );
    }

    handleCheckout() {
        if (this.cart.length === 0) {
            this.showError('El carrito está vacío');
            return;
        }

        const amountReceived = parseFloat(document.getElementById('amountReceived').value || 0);
        const total = this.getCartTotal();
        const reconciliation = this.accounting.reconcilePayment(amountReceived, total);

        if (reconciliation.estado === 'incompleto') {
            this.showError(`Faltan $${reconciliation.faltante.toFixed(2)} para completar el pago`);
            return;
        }

        // Crear transacción
        const transaction = {
            items: this.cart.map(item => ({
                productId: item.product.id,
                nombre: item.product.nombre,
                precio: item.product.precio,
                cantidad: item.quantity,
                subtotal: item.product.precio * item.quantity
            })),
            total: total,
            metodoPago: 'Efectivo',
            amountReceived: amountReceived,
            change: reconciliation.cambio,
            timestamp: new Date().toISOString(),
            itemsCount: this.cart.length
        };

        // Guardar transacción
        const savedTransaction = saveTransaction(transaction);
        if (!savedTransaction) {
            this.showError('Error guardando la transacción');
            return;
        }

        // Generar ticket
        this.generateReceipt(savedTransaction);

        // Limpiar carrito y formulario
        this.cart = [];
        this.updateCartDisplay();
        document.getElementById('amountReceived').value = '';
        document.getElementById('changeDisplay').innerHTML = '';
        document.getElementById('searchInput').value = '';
        this.renderProducts();

        this.showSuccess('✅ Venta realizada exitosamente');
    }

    generateReceipt(transaction) {
        const receipt = document.getElementById('receipt');
        const itemsText = transaction.items.map(item => 
            `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`
        ).join('\n');

        receipt.textContent = `
🏪 SISTEMA SHOP
================
${new Date(transaction.timestamp).toLocaleString()}
----------------
${itemsText}
----------------
TOTAL: $${transaction.total.toFixed(2)}
RECIBIDO: $${transaction.amountReceived.toFixed(2)}
CAMBIO: $${transaction.change.toFixed(2)}
================
¡Gracias por su compra!
        `.trim();
    }

    showSystemStatus() {
        const stats = getSystemStats();
        console.log('📊 Estado del sistema:', stats);
    }

    showLoading(show) {
        // Podrías implementar un spinner aquí
        if (show) {
            document.getElementById('productList').innerHTML = '<p>Cargando productos...</p>';
        }
    }

    showError(message) {
        alert(`❌ ${message}`);
    }

    showSuccess(message) {
        // Podrías usar toast notifications aquí
        console.log(`✅ ${message}`);
    }
}

// Inicializar POS cuando se carga la página
let pos;
document.addEventListener('DOMContentLoaded', () => {
    pos = new PointOfSale();
});

    /*
```

🎨 Parte 18 — styles_system.css ACTUALIZADO (Mejoras para el POS)

Agrega estos estilos al CSS existente:

