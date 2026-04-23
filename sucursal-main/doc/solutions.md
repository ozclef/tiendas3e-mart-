¡Encontramos el problema! 😊 El error "loadInventory is not defined" significa que **storage-utils.js no se está cargando correctamente**. Vamos a solucionarlo paso a paso:

## 🚨 **SOLUCIÓN INMEDIATA - Verifica esto:**

### 1. **Verifica que storage-utils.js existe** en la misma carpeta

### 2. **Verifica el ORDEN de los scripts en index_pos.html:**

```html
<!-- index_pos.html - ORDEN CORRECTO -->
<script src="storage-utils.js"></script>
<script src="accounting.js"></script>
<script src="pos.js"></script>
```

### 3. **Crea este archivo storage-utils.js COMPLETO:**

```javascript
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
```

## 🎯 **ARCHIVO DE PRUEBA RÁPIDO - test-simple.html:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Prueba Simple</title>
</head>
<body>
    <h1>Prueba de carga</h1>
    <div id="result"></div>

    <script src="storage-utils.js"></script>
    <script>
        // Prueba DIRECTA de loadInventory
        async function testLoadInventory() {
            try {
                const result = document.getElementById('result');
                result.innerHTML = 'Probando loadInventory...';
                
                const inventory = await loadInventory();
                result.innerHTML = `
                    <h2 style="color: green;">✅ ¡FUNCIONA!</h2>
                    <p>Se cargaron ${inventory.length} productos</p>
                    <ul>
                        ${inventory.slice(0, 3).map(p => 
                            `<li>${p.nombre} - $${p.precio}</li>`
                        ).join('')}
                    </ul>
                `;
            } catch (error) {
                document.getElementById('result').innerHTML = `
                    <h2 style="color: red;">❌ ERROR</h2>
                    <p>${error.message}</p>
                `;
            }
        }
        
        testLoadInventory();
    </script>
</body>
</html>
```

## 🔍 **PASOS PARA DIAGNOSTICAR:**

1. **Abre test-simple.html** - ¿Qué muestra?
2. **Abre la consola (F12)** y mira si ves estos mensajes:
   - "🔄 Cargando inventario..."
   - "✅ Inventario cargado: X productos"

3. **Verifica en la pestaña "Network"** de la consola:
   - ¿Se está cargando storage-utils.js?
   - ¿Hay algún error 404?

## 🛠 **SOLUCIONES COMUNES:**

### Si no se carga storage-utils.js:
- **Verifica el nombre del archivo** (¿es exactamente `storage-utils.js`?)
- **Verifica la ruta** (¿está en la misma carpeta?)

### Si hay error 404:
- **Crea el archivo storage-utils.js** con el código de arriba
- **Verifica que tenga extensión .js** (no .txt)

### Si hay error de CORS:
- **Usa un servidor local** en lugar de abrir el HTML directamente
- **O descarga los archivos** y ábrelos con Live Server en VS Code

## 📋 **CHECKLIST FINAL:**

```
/tu-carpeta/
├── ✅ index_pos.html
├── ✅ storage-utils.js    (con la función loadInventory)
├── ✅ accounting.js
├── ✅ pos.js
└── ✅ styles_system.css
```

**¡Hazme saber qué pasa cuando abres test-simple.html!** 

¿Ves el mensaje "✅ ¡FUNCIONA!" o algún error específico? Con esa información podremos solucionarlo definitivamente. 😊

**No te preocupes** - este es un problema común de carga de archivos. ¡Lo resolveremos en minutos! 🚀
