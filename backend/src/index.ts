import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import multer, { FileFilterCallback } from 'multer';
import nodemailer from 'nodemailer';
import type { Request as MulterRequest } from 'express';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

const port = 3010;

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req: MulterRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/msword'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF o DOCX'));
    }
  },
});

app.post('/api/candidatos', upload.single('cv'), async (req: MulterRequest, res: Response) => {
  try {
    const { nombre, apellido, email, telefono, direccion, educacion, experiencia } = req.body;
    if (!nombre || !apellido || !email || !telefono || !direccion) {
      return res.status(400).json({ error: 'Campos obligatorios faltantes' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'CV requerido' });
    }
    // Validar educación y experiencia
    const educ = JSON.parse(educacion);
    const exp = JSON.parse(experiencia);
    if (!educ[0].inicio || !educ[0].fin || !educ[0].institucion || !educ[0].titulo) {
      return res.status(400).json({ error: 'Datos de educación incompletos' });
    }
    if (!exp[0].inicio || !exp[0].fin || !exp[0].empresa || !exp[0].cargo) {
      return res.status(400).json({ error: 'Datos de experiencia incompletos' });
    }
    // Crear candidato
    const candidato = await prisma.candidato.create({
      data: {
        nombre, apellido, email, telefono, direccion,
        educaciones: { create: educ },
        experiencias: { create: exp },
        documento: {
          create: {
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            data: req.file.buffer,
          },
        },
      },
    });
    // Guardar datos para autocompletado
    await prisma.autocompleteData.createMany({
      data: [
        { tipo: 'educacion', valor: educ[0].institucion },
        { tipo: 'educacion', valor: educ[0].titulo },
        { tipo: 'experiencia', valor: exp[0].empresa },
        { tipo: 'experiencia', valor: exp[0].cargo },
      ],
      skipDuplicates: true,
    });
    // Enviar correo (modo desarrollo)
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // Cambia por tu SMTP real en producción
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: 'no-reply@lti-dev.com',
      to: process.env.NODE_ENV === 'production' ? email : 'correo_pruebas@lti-dev.com',
      subject: 'Postulación recibida',
      text: `Hola ${nombre}, tu postulación ha sido recibida exitosamente.`,
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/candidatos', async (req, res) => {
  try {
    const candidatos = await prisma.candidato.findMany({
      include: {
        educaciones: true,
        experiencias: true,
        documento: { select: { filename: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(candidatos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
