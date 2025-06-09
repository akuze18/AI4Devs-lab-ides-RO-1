import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialForm = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  educacion: [{ inicio: '', fin: '', institucion: '', titulo: '' }],
  experiencia: [{ inicio: '', fin: '', empresa: '', cargo: '', area: '', descripcion: '' }],
  cv: null as File | null,
};

const RecruiterDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<any>({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, cv: e.target.files[0] });
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.nombre) newErrors.nombre = 'Requerido';
    if (!form.apellido) newErrors.apellido = 'Requerido';
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.telefono) newErrors.telefono = 'Requerido';
    if (!form.direccion) newErrors.direccion = 'Requerido';
    if (!form.cv) newErrors.cv = 'Requerido';
    else if (form.cv.size > 20 * 1024 * 1024) newErrors.cv = 'Máx. 20MB';
    // Validar educación y experiencia
    if (!form.educacion[0].inicio || !form.educacion[0].fin || !form.educacion[0].institucion || !form.educacion[0].titulo) newErrors.educacion = 'Completa todos los campos de educación';
    if (!form.experiencia[0].inicio || !form.experiencia[0].fin || !form.experiencia[0].empresa || !form.experiencia[0].cargo) newErrors.experiencia = 'Completa todos los campos de experiencia';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = validate();
    setErrors(val);
    if (Object.keys(val).length === 0) {
      const formData = new FormData();
      formData.append('nombre', form.nombre);
      formData.append('apellido', form.apellido);
      formData.append('email', form.email);
      formData.append('telefono', form.telefono);
      formData.append('direccion', form.direccion);
      formData.append('educacion', JSON.stringify(form.educacion));
      formData.append('experiencia', JSON.stringify(form.experiencia));
      if (form.cv) formData.append('cv', form.cv);
      try {
        const res = await fetch('/api/candidatos', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setSuccessMsg('¡Candidato añadido exitosamente!');
          setShowModal(false);
          setForm(initialForm);
        } else {
          setErrors({ api: data.error || 'Error al añadir candidato' });
        }
      } catch (err: any) {
        setErrors({ api: err.message || 'Error de red' });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard del Reclutador</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Añadir Candidato
        </button>
      </div>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {/* Aquí irá la tabla/listado de candidatos en el futuro */}
      <div className="alert alert-info">No hay candidatos registrados aún.</div>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Añadir Candidato</h5>
                  <button type="button" className="close" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Nombre</label>
                      <input name="nombre" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} value={form.nombre} onChange={handleChange} />
                      {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Apellido</label>
                      <input name="apellido" className={`form-control ${errors.apellido ? 'is-invalid' : ''}`} value={form.apellido} onChange={handleChange} />
                      {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Correo electrónico</label>
                      <input name="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={handleChange} />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Teléfono</label>
                      <input name="telefono" className={`form-control ${errors.telefono ? 'is-invalid' : ''}`} value={form.telefono} onChange={handleChange} />
                      {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input name="direccion" className={`form-control ${errors.direccion ? 'is-invalid' : ''}`} value={form.direccion} onChange={handleChange} />
                    {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                  </div>
                  <hr />
                  <h5>Educación</h5>
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label>Inicio</label>
                      <input name="inicio" className="form-control" value={form.educacion[0].inicio} onChange={e => setForm({ ...form, educacion: [{ ...form.educacion[0], inicio: e.target.value }] })} />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Fin</label>
                      <input name="fin" className="form-control" value={form.educacion[0].fin} onChange={e => setForm({ ...form, educacion: [{ ...form.educacion[0], fin: e.target.value }] })} />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Institución</label>
                      <input name="institucion" className="form-control" value={form.educacion[0].institucion} onChange={e => setForm({ ...form, educacion: [{ ...form.educacion[0], institucion: e.target.value }] })} />
                    </div>
                    <div className="form-group col-md-3">
                      <label>Título</label>
                      <input name="titulo" className="form-control" value={form.educacion[0].titulo} onChange={e => setForm({ ...form, educacion: [{ ...form.educacion[0], titulo: e.target.value }] })} />
                    </div>
                  </div>
                  {errors.educacion && <div className="text-danger mb-2">{errors.educacion}</div>}
                  <hr />
                  <h5>Experiencia Laboral</h5>
                  <div className="form-row">
                    <div className="form-group col-md-2">
                      <label>Inicio</label>
                      <input name="inicio" className="form-control" value={form.experiencia[0].inicio} onChange={e => setForm({ ...form, experiencia: [{ ...form.experiencia[0], inicio: e.target.value }] })} />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Fin</label>
                      <input name="fin" className="form-control" value={form.experiencia[0].fin} onChange={e => setForm({ ...form, experiencia: [{ ...form.experiencia[0], fin: e.target.value }] })} />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Empresa</label>
                      <input name="empresa" className="form-control" value={form.experiencia[0].empresa} onChange={e => setForm({ ...form, experiencia: [{ ...form.experiencia[0], empresa: e.target.value }] })} />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Cargo</label>
                      <input name="cargo" className="form-control" value={form.experiencia[0].cargo} onChange={e => setForm({ ...form, experiencia: [{ ...form.experiencia[0], cargo: e.target.value }] })} />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Área</label>
                      <input name="area" className="form-control" value={form.experiencia[0].area} onChange={e => setForm({ ...form, experiencia: [{ ...form.experiencia[0], area: e.target.value }] })} />
                    </div>
                    <div className="form-group col-md-2">
                      <label>Descripción</label>
                      <input name="descripcion" className="form-control" value={form.experiencia[0].descripcion} onChange={e => setForm({ ...form, experiencia: [{ ...form.experiencia[0], descripcion: e.target.value }] })} />
                    </div>
                  </div>
                  {errors.experiencia && <div className="text-danger mb-2">{errors.experiencia}</div>}
                  <hr />
                  <div className="form-group">
                    <label>CV (PDF o DOCX, máx. 20MB)</label>
                    <input name="cv" type="file" accept=".pdf,.doc,.docx" className={`form-control-file ${errors.cv ? 'is-invalid' : ''}`} onChange={handleFileChange} />
                    {errors.cv && <div className="invalid-feedback d-block">{errors.cv}</div>}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
              </form>
              {errors.api && <div className="alert alert-danger">{errors.api}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
