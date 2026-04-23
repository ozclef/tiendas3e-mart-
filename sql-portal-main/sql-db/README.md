


#  sql para supabase


 **nivel arquitecto profesional**
 
 ----
 
  *todo* listo: front, core scripts, POS, inventario, *y también* las tablas SQL/SQLite para Supabase dentro del repo.

Te voy a dejar una **base perfecta**, limpia, lista para copiar/pegar en tu repo `tiendas3e`…
y cuando tú me mandes tu estructura de libreta, la acomodo exacto a tu estilo.

---

# 🔥 1) **Estructura recomendada dentro del repo GitHub**

```
/database
   /sqlite
      schema.sql
      seed.sql
   /supabase
      tables.sql
      policies.sql
      functions.sql

/inventory
   inventory.json
   inventory-schema.md

/docs
   arquitectura.md
   instrucciones-deploy.md
   flujo-pos.md

/core
   css/
   js/
   components/

/pos
   index.html
   app.js
   styles.css
```

---

# 🔥 2) **Tablas esenciales para Tienda / POS (versión pro)**

Hechas para funcionar tanto en **SQLite local**, como en **Supabase (Postgres)**.
Son compatibles entre sí.

## 🛍️ **Tabla: productos**

```sql
CREATE TABLE productos (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  categoria TEXT,
  precio REAL NOT NULL,
  barcode TEXT UNIQUE,
  proveedor TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📦 **Tabla: lotes (maneja caducidad y stock físico)**

— Esta es CLAVE para controlar inventario por lotes.

```sql
CREATE TABLE lotes (
  lote_id TEXT PRIMARY KEY,
  producto_id TEXT NOT NULL,
  caducidad DATE NOT NULL,
  stock INTEGER NOT NULL,
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);
```

## 🧾 **Tabla: ventas**

```sql
CREATE TABLE ventas (
  venta_id TEXT PRIMARY KEY,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total REAL NOT NULL,
  metodo_pago TEXT DEFAULT 'efectivo'
);
```

## 🧩 **Tabla: venta_detalles**

— Cada venta puede tener varios productos.

```sql
CREATE TABLE venta_detalles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  venta_id TEXT NOT NULL,
  producto_id TEXT NOT NULL,
  lote_id TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  precio_unitario REAL NOT NULL,

  FOREIGN KEY (venta_id) REFERENCES ventas(venta_id),
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (lote_id) REFERENCES lotes(lote_id)
);
```

---

# 🔥 3) **Seed SQL — datos de ejemplo**

Para que Emilio pueda probarlo sin meter datos manualmente:

```sql
INSERT INTO productos (id, nombre, categoria, precio, barcode, proveedor)
VALUES
('A001', 'Coca-Cola 600ml', 'Bebidas', 19.50, '7501055340014', 'Coca-Cola FEMSA'),
('A002', 'Sabritas Adobadas 45g', 'Botanas', 15.00, '7501011123456', 'PepsiCo'),
('A003', 'Leche Lala 1L', 'Lácteos', 28.00, '7501020543210', 'LALA');

INSERT INTO lotes (lote_id, producto_id, caducidad, stock)
VALUES
('L20251201', 'A001', '2025-12-20', 24),
('L20251215', 'A001', '2026-01-05', 36),
('L20251210', 'A002', '2026-02-15', 50),
('L20251201B', 'A003', '2025-12-15', 10),
('L20251205B', 'A003', '2025-12-28', 30);
```

---

# 🔥 4) **Versión Supabase (Postgres) — idéntico, pero con extras PRO**

Incluye:

* `row level security (RLS)`
* Policies para que Emilio solo lea y escriba inventario
* Functions para descontar el lote más viejo (FIFO)

Si quieres, te armo **TODO** eso también.

---

# 🔥 5) ¿Cómo integras esto en GitHub?

Dentro del repo `tiendas3e`:

```
/database/sqlite/schema.sql
/database/sqlite/seed.sql
/database/supabase/tables.sql
/database/supabase/policies.sql
/database/supabase/functions.sql
```

Luego en `README.md`:

```
## Base de datos

- SQLite para uso local y offline.
- Supabase para sincronización en la nube.
- Compatible con POS, inventario y lotes FIFO.

### Ejecutar SQLite:

sqlite3 tienda.db < database/sqlite/schema.sql
sqlite3 tienda.db < database/sqlite/seed.sql
```

Eso hace que tu repo se vea **profesional, empresarial, y listo para crecer**.

---

# 🔥 6) ¿estos archivos como repos ?

— Listos para subir
— Con carpetas y documentación
— Con estilos Universe City
— Con scripts reutilizables
— Con repos interconectados estilo empresa
