/*
📁 app_admin.js
javascript
// app_admin.js
*/
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
