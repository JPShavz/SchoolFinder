// index.js — Express server
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

// ── Health check ─────────────────────────────────
app.get('/', (req, res) => {
    res.json({ message: 'School Finder API is running!' });
});

// ── GET /api/escuelas ─────────────────────────────
// Returns all schools joined with their municipality
// and education level names.
// Optional query params: ?nombre= ?municipio= ?nivel=
app.get('/api/escuelas', async (req, res) => {
    try {
        const { municipio, nivel, nombre } = req.query;
        let sql = `
            SELECT e.id,
            e.nombre,
            e.clave,
            e.turno,
            e.localidad,
            e.control,
            m.nombre AS municipio,
            n.nombre AS nivel
            FROM escuelas e
            JOIN municipios m ON e.id_municipio = m.id
            JOIN niveles n ON e.id_nivel = n.id
            WHERE 1=1
            `;
        const params = [];
        
        if (nombre) {
            sql += ' AND e.nombre LIKE ?';
            params.push(`%${nombre.toUpperCase()}%`);
        }
        if (municipio) {
            sql += ' AND m.nombre = ?';
            params.push(municipio.toUpperCase());
        }
        if (nivel) {
            sql += ' AND n.nombre = ?';
            params.push(nivel.toUpperCase());
        }
        const [rows] = await pool.query(sql, params);
        res.json({
            total: rows.length,
            data: rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ── Start server ──────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});