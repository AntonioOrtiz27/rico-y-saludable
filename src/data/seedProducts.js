// Catálogo inicial (tomado de las listas de precios). Se carga a Supabase desde el panel admin.
const E = 'Especias y condimentos', H = 'Harinas', A = 'Almacén', M = 'Mix y snacks',
  F = 'Frutos secos y semillas', R = 'Repostería', C = 'Cereales y aceites';
const raw = [
  [E, 'Pesto', { '250g': 5000 }], [E, 'Pimentón', { '250g': 3500 }], [E, 'Provenzal', { '250g': 3000 }],
  [E, 'Chimichurri', { '250g': 2500 }], [E, 'Pimienta blanca', { '250g': 4800 }], [E, 'Ají', { '250g': 3500 }],
  [E, 'Orégano', { '250g': 3000 }], [E, 'Ajo en polvo', { '250g': 3000 }], [E, 'Adobo para pizza', { '250g': 2500 }],
  [E, 'Cúrcuma molida', { '250g': 2500 }], [E, 'Nuez moscada', { '250g': 4500 }],
  [H, 'Harina integral', { '1/2kg': 2200, '1kg': 4400 }], [H, 'Harina de avena', { '1/2kg': 2000, '1kg': 4000 }],
  [H, 'Harina de almendras (sin piel)', { '1/2kg': 3800, '1kg': 7600 }], [H, 'Harina de coco', { '1/2kg': 7000, '1kg': 14000 }],
  [H, 'Maicena', { '1/2kg': 2000, '1kg': 4000 }], [H, 'Avena instantánea', { '1/2kg': 2000, '1kg': 4000 }],
  [A, 'Polvo para hornear', { '1/2kg': 5300, '1kg': 10600 }], [A, 'Tutucas', { '1/2kg': 4000, '1kg': 8000 }],
  [A, 'Té en hebras', {}], [A, 'Arroz yamaní', { '1/2kg': 2200, '1kg': 4400 }],
  [A, 'Pimienta negra', { '1/2kg': 10000, '1kg': 16000 }], [A, 'Maca peruana', { '1/2kg': 4000 }],
  [M, 'Mix bajo en sodio (banana chips, maní, semillas de girasol, pasas de uva)', { '1/2kg': 4500, '1kg': 9000 }],
  [M, 'Mix tropical (banana chips, ananá en cubos, pasas de uva, maní, almendras)', { '1/2kg': 7500, '1kg': 15000 }],
  [M, 'Mix sin pasas (arándanos desecados, nueces, maní, almendras)', { '1/2kg': 7500, '1kg': 15000 }],
  [M, 'Mix patagónico (manzana en cubos, almendras, maní, nueces, coco en escamas, arándanos, pasas rubias, semillas de girasol)', { '1/2kg': 8000, '1kg': 16000 }],
  [M, 'Mix cervecero (maní con sal, almendras, semillas, maíz frito)', { '1/2kg': 7000, '1kg': 14000 }],
  [M, 'Maní saborizado', { '1/2kg': 4000, '1kg': 8000 }], [M, 'Quinoa pop', { '1/2kg': 5000, '1kg': 10000 }],
  [M, 'Granola con pasta de maní', { '1/2kg': 4800, '1kg': 9600 }], [M, 'Banana chips', { '1/2kg': 12500, '1kg': 25000 }],
  [M, 'Pasas de uva', { '1/2kg': 4000, '1kg': 8000 }],
  [F, 'Castañas de cajú', { '1/2kg': 15000, '1kg': 30000 }], [F, 'Chía', { '1/2kg': 5000, '1kg': 10000 }],
  [F, 'Maní sin sal', { '1/2kg': 3500, '1kg': 7000 }], [F, 'Nueces', { '1/2kg': 12000, '1kg': 24000 }],
  [F, 'Coco rallado', { '1/2kg': 6800, '1kg': 13600 }], [F, 'Arándanos', { '100g': 3920, '1/2kg': 19600, '1kg': 30000 }],
  [F, 'Semillas de girasol', { '1/2kg': 3000, '1kg': 6000 }], [F, 'Semillas de zapallo', { '100g': 2200, '1/2kg': 11000, '1kg': 22000 }],
  [R, 'Canela molida', { '250g': 4500, '1/2kg': 9000 }], [R, 'Azúcar impalpable', { '1/2kg': 2000, '1kg': 4000 }],
  [R, 'Azúcar mascabo', { '1/2kg': 4000, '1kg': 8000 }], [R, 'Cacao amargo', { '250g': 4500, '1/2kg': 9000 }],
  [R, 'Gelatina sin sabor', { '250g': 8500 }], [R, 'Chips de chocolate negro', { '250g': 5000, '1/2kg': 10000, '1kg': 20000 }],
  [C, 'Copos con/sin azúcar', { '1/2kg': 2500, '1kg': 5000 }], [C, 'Anillos de frutas', { '1/2kg': 7000, '1kg': 14000 }],
  [C, 'Almohadillas de salvado', { '1/2kg': 6500, '1kg': 13000 }], [C, 'Ositos de frutilla', { '1/2kg': 5000, '1kg': 10000 }],
  [C, 'Aceite de coco neutro 200 cc', { unidad: 6500 }], [C, 'Aceite de oliva virgen 500 cc', { unidad: 7000 }]
];
export const SEED = raw.map(([category, name, prices], i) => ({
  id: `seed-${i}`, category, name, prices, image_url: null, active: true, sort: i
}));
