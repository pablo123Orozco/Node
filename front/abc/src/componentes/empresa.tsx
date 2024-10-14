import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './lista.css'; // Asegúrate de importar el archivo CSS
import './style.css';

// Interfaz para Empresa
interface Empresa {
  idEmpresa: string;
  nombre: string;
  direccion: string;
  direccionfacturacion: string;
  representantelegal: string;
  telefono: string;
  correoelectronico: string;
  codigopostal: string;
  estado: string;
  principal: string;
  adiciono: string;
}

const EmpresaComponent: React.FC = () => {
  // Estado para agregar/actualizar empresa
  const [empresa, setEmpresa] = useState<Empresa>({
    idEmpresa: '',
    nombre: '',
    direccion: '',
    direccionfacturacion: '',
    representantelegal: '',
    telefono: '',
    correoelectronico: '',
    codigopostal: '',
    estado: '',
    principal: '',
    adiciono: ''
  });

  // Estado para mostrar las empresas
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  // Estado para identificar si estamos actualizando o creando
  const [isUpdating, setIsUpdating] = useState(false);

  // Manejar cambios en el formulario de agregar/actualizar empresa
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa({
      ...empresa,
      [name]: value,
    });
  };

  // Enviar el formulario de agregar o actualizar empresa
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isUpdating && empresa.idEmpresa) {
      // Si estamos en modo actualización
      axios.put(`http://localhost:3000/api/empresas/${empresa.idEmpresa}`, empresa)
        .then((response) => {
          alert('Empresa actualizada exitosamente');
          setEmpresa({
            idEmpresa: '',
            nombre: '',
            direccion: '',
            direccionfacturacion: '',
            representantelegal: '',
            telefono: '',
            correoelectronico: '',
            codigopostal: '',
            estado: '',
            principal: '',
            adiciono: ''
          });
          setIsUpdating(false); // Cambiar el estado para creación después de la actualización
          obtenerEmpresas(); // Actualizar la lista de empresas
        })
        .catch((error) => {
          console.error('Error al actualizar la empresa:', error);
          alert('Hubo un error al actualizar la empresa');
        });
    } else {
      // Si estamos en modo creación
      axios.post('http://localhost:3000/api/empresas', empresa)
        .then((response) => {
          alert('Empresa creada exitosamente');
          setEmpresa({
            idEmpresa: '',
            nombre: '',
            direccion: '',
            direccionfacturacion: '',
            representantelegal: '',
            telefono: '',
            correoelectronico: '',
            codigopostal: '',
            estado: '',
            principal: '',
            adiciono: ''
          });
          obtenerEmpresas(); // Actualizar la lista de empresas
        })
        .catch((error) => {
          console.error('Error al crear la empresa:', error);
          alert('Hubo un error al crear la empresa');
        });
    }
  };

  // Obtener las empresas de la base de datos
  const obtenerEmpresas = () => {
    axios.get('http://localhost:3000/api/empresas')
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las empresas:', error);
      });
  };

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  // Manejar la eliminación de una empresa
  const handleDelete = (idEmpresa: string) => {
    axios.delete(`http://localhost:3000/api/empresas/${idEmpresa}`)
      .then((response) => {
        alert('Empresa eliminada exitosamente');
        obtenerEmpresas(); // Actualizar la lista de empresas
      })
      .catch((error) => {
        console.error('Error al eliminar la empresa:', error);
        alert('Hubo un error al eliminar la empresa');
      });
  };

  // Manejar la preparación de los datos de la empresa para su actualización
  const handleEdit = (empresa: Empresa) => {
    setEmpresa(empresa);
    setIsUpdating(true); // Cambiar a modo actualización
  };

  return (
    <div>
      <h2>{isUpdating ? 'Actualizar Empresa' : 'Agregar Empresa'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Empresa:</label>
          <input type="text" name="idEmpresa" value={empresa.idEmpresa} onChange={handleChange} required />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={empresa.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" name="direccion" value={empresa.direccion} onChange={handleChange} required />
        </div>
        <div>
          <label>Dirección Facturación:</label>
          <input type="text" name="direccionfacturacion" value={empresa.direccionfacturacion} onChange={handleChange} required />
        </div>
        <div>
          <label>Representante Legal:</label>
          <input type="text" name="representantelegal" value={empresa.representantelegal} onChange={handleChange} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={empresa.telefono} onChange={handleChange} required />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input type="email" name="correoelectronico" value={empresa.correoelectronico} onChange={handleChange} required />
        </div>
        <div>
          <label>Código Postal:</label>
          <input type="text" name="codigopostal" value={empresa.codigopostal} onChange={handleChange} required />
        </div>
        <div>
          <label>Estado:</label>
          <input type="text" name="estado" value={empresa.estado} onChange={handleChange} required />
        </div>
        <div>
          <label>Principal:</label>
          <input type="text" name="principal" value={empresa.principal} onChange={handleChange} required />
        </div>
        <button type="submit">{isUpdating ? 'Actualizar Empresa' : 'Agregar Empresa'}</button>
      </form>

      <h2>Lista de Empresas</h2>
      {empresas.length === 0 ? (
        <p>No hay empresas registradas.</p>
      ) : (
        <table className="empresa-table">
          <thead>
            <tr>
              <th>ID Empresa</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Dirección Facturación</th>
              <th>Representante Legal</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
              <th>Código Postal</th>
              <th>Estado</th>
              <th>Principal</th>
              <th>Adicionó</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.idEmpresa}>
                <td>{empresa.idEmpresa}</td>
                <td>{empresa.nombre}</td>
                <td>{empresa.direccion}</td>
                <td>{empresa.direccionfacturacion}</td>
                <td>{empresa.representantelegal}</td>
                <td>{empresa.telefono}</td>
                <td>{empresa.correoelectronico}</td>
                <td>{empresa.codigopostal}</td>
                <td>{empresa.estado}</td>
                <td>{empresa.principal}</td>
                <td>{empresa.adiciono}</td>
                <td>
                <button className="btn-actualizar" onClick={() => handleEdit(empresa)}>Actualizar</button>
                <button className="btn-eliminar" onClick={() => handleDelete(empresa.idEmpresa)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmpresaComponent;
