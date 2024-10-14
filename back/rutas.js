const express = require('express');
const router = express.Router();
const db = require('./db');

// Crear una nueva empresa
router.post('/empresas', (req, res) => {
    const { idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono } = req.body;
    const query = 'INSERT INTO gen_empresas (idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono, fechaadicion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
    
    db.query(query, [idEmpresa, nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Empresa creada exitosamente');
        }
    });
});

// Obtener todas las empresas
router.get('/empresas', (req, res) => {
    const query = 'SELECT * FROM gen_empresas';
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// Actualizar una empresa
router.put('/empresas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal } = req.body;
    const query = 'UPDATE gen_empresas SET nombre = ?, direccion = ?, direccionfacturacion = ?, representantelegal = ?, telefono = ?, correoelectronico = ?, codigopostal = ?, estado = ?, principal = ? WHERE idEmpresa = ?';
    
    db.query(query, [nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Empresa actualizada exitosamente');
        }
    });
});

// Eliminar una empresa
router.delete('/empresas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM gen_empresas WHERE idEmpresa = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la empresa:', err);
            res.status(500).send('Error al eliminar la empresa');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Empresa no encontrada');
        } else {
            res.status(200).send('Empresa eliminada exitosamente');
        }
    });
});

// CRUD para sucursales

// Crear una nueva sucursal
router.post('/sucursales', (req, res) => {
    const { idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;
    const query = 'INSERT INTO inv_sucursales (idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [idSucursal, idEmpresa, descripcion, direccion, telefono, encargado, estado], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Sucursal creada exitosamente');
        }
    });
});

router.get('/sucursales', (req, res) => {
    const query = 'SELECT * FROM inv_sucursales';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las sucursales:', err);
            res.status(500).send('Error al obtener las sucursales');
        } else {
            if (results.length === 0) {
                res.status(404).send('No se encontraron sucursales');
            } else {
                console.log('Sucursales obtenidas:', results);
                res.status(200).json(results);
            }
        }
    });
});
// Actualizar una sucursal
router.put('/sucursales/:id', (req, res) => {
    const { id } = req.params;
    const { descripcion, direccion, telefono, encargado, estado } = req.body;
    const query = 'UPDATE inv_sucursales SET descripcion = ?, direccion = ?, telefono = ?, encargado = ?, estado = ? WHERE idSucursal = ?';
    
    db.query(query, [descripcion, direccion, telefono, encargado, estado, id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Sucursal actualizada exitosamente');
        }
    });
});

// Eliminar una sucursal
router.delete('/sucursales/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM inv_sucursales WHERE idSucursal = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar la sucursal:', err);
            res.status(500).send('Error al eliminar la sucursal');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Sucursal no encontrada');
        } else {
            res.status(200).send('Sucursal eliminada exitosamente');
        }
    });
});

module.exports = router;
