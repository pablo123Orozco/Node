import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './lista.css';
import './style.css';

// Interfaz para Sucursal
interface Sucursal {
  idSucursal: string;
  idEmpresa: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  encargado: string;
  estado: string;
}

const SucursalComponent: React.FC = () => {
  
  const [sucursal, setSucursal] = useState<Sucursal>({
    idSucursal: '',
    idEmpresa: '',
    descripcion: '',
    direccion: '',
    telefono: '',
    encargado: '',
    estado: ''
  });

  
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);

  
  const [isUpdating, setIsUpdating] = useState(false);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSucursal({
      ...sucursal,
      [name]: value,
    });
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isUpdating && sucursal.idSucursal) {
      
      axios.put(`http://localhost:3000/api/sucursales/${sucursal.idSucursal}`, sucursal)
        .then((response) => {
          alert('Sucursal actualizada exitosamente');
          setSucursal({
            idSucursal: '',
            idEmpresa: '',
            descripcion: '',
            direccion: '',
            telefono: '',
            encargado: '',
            estado: ''
          });
          setIsUpdating(false); 
          obtenerSucursales(); 
        })
        .catch((error) => {
          console.error('Error al actualizar la sucursal:', error);
          alert('Hubo un error al actualizar la sucursal');
        });
    } else {
      
      axios.post('http://localhost:3000/api/sucursales', sucursal)
        .then((response) => {
          alert('Sucursal creada exitosamente');
          setSucursal({
            idSucursal: '',
            idEmpresa: '',
            descripcion: '',
            direccion: '',
            telefono: '',
            encargado: '',
            estado: ''
          });
          obtenerSucursales(); 
        })
        .catch((error) => {
          console.error('Error al crear la sucursal:', error);
          alert('Hubo un error al crear la sucursal');
        });
    }
  };

  
  const obtenerSucursales = () => {
    axios.get('http://localhost:3000/api/sucursales')
      .then((response) => {
        console.log('Datos de sucursales recibidos:', response.data); 
        setSucursales(response.data); 
      })
      .catch((error) => {
        console.error('Error al obtener las sucursales:', error);
      });
  };

  useEffect(() => {
    obtenerSucursales(); 
  }, []);

  
  const handleDelete = (idSucursal: string) => {
    axios.delete(`http://localhost:3000/api/sucursales/${idSucursal}`)
      .then((response) => {
        alert('Sucursal eliminada exitosamente');
        obtenerSucursales(); 
      })
      .catch((error) => {
        console.error('Error al eliminar la sucursal:', error);
        alert('Hubo un error al eliminar la sucursal');
      });
  };

  
  const handleEdit = (sucursal: Sucursal) => {
    setSucursal(sucursal);
    setIsUpdating(true);
  };

  return (
    <div className="sucursal-container"> 
      <h2>{isUpdating ? 'Actualizar Sucursal' : 'Agregar Sucursal'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Sucursal:</label>
          <input type="text" name="idSucursal" value={sucursal.idSucursal} onChange={handleChange} required />
        </div>
        <div>
          <label>ID Empresa:</label>
          <input type="text" name="idEmpresa" value={sucursal.idEmpresa} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" name="descripcion" value={sucursal.descripcion} onChange={handleChange} required />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" name="direccion" value={sucursal.direccion} onChange={handleChange} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={sucursal.telefono} onChange={handleChange} required />
        </div>
        <div>
          <label>Encargado:</label>
          <input type="text" name="encargado" value={sucursal.encargado} onChange={handleChange} required />
        </div>
        <div>
          <label>Estado:</label>
          <input type="text" name="estado" value={sucursal.estado} onChange={handleChange} required />
        </div>
        <button type="submit">{isUpdating ? 'Actualizar Sucursal' : 'Agregar Sucursal'}</button>
      </form>

      <h2>Lista de Sucursales</h2>
      {sucursales.length === 0 ? (
        <p>No hay sucursales registradas.</p>
      ) : (
        <table className="empresa-table"> 
          <thead>
            <tr>
              <th>ID Sucursal</th>
              <th>ID Empresa</th>
              <th>Descripción</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Encargado</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.map((sucursal) => (
              <tr key={sucursal.idSucursal}>
                <td>{sucursal.idSucursal}</td>
                <td>{sucursal.idEmpresa}</td>
                <td>{sucursal.descripcion}</td>
                <td>{sucursal.direccion}</td>
                <td>{sucursal.telefono}</td>
                <td>{sucursal.encargado}</td>
                <td>{sucursal.estado}</td>
                <td>
                <button className="btn-actualizar" onClick={() => handleEdit(sucursal)}>Actualizar</button>
                <button className="btn-eliminar" onClick={() => handleDelete(sucursal.idSucursal)}>Borrar</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SucursalComponent;
