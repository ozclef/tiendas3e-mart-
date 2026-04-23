// accounting.js - ESENCIAL para los cálculos


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
            if (transaction.metodoPago) {
                totals[`total${transaction.metodoPago}`] += transaction.total;
            }
            totals.productosVendidos += transaction.items.reduce((sum, item) => sum + item.cantidad, 0);
        });

        return totals;
    }

    // Generar corte X (pre-cierre)
    generateXCorte() {
        const todayTransactions = getTransactions().filter(t => {
            const today = new Date().toDateString();
            return new Date(t.timestamp).toDateString() === today;
        });
        return this.calculateDailyTotals(todayTransactions);
    }

    // Generar corte Z (cierre final)
    generateZCorte() {
        const report = this.generateXCorte();
        report.fechaCierre = new Date().toISOString();
        report.tipo = 'Z';
        return report;
    }

    // Conciliación de pagos - ¡ESENCIAL para el POS!
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
