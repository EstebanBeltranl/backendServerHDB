import multer, { FileFilterCallback } from 'multer';
import path from 'path'

// Multer, para subir archivos al backend
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { coleccion } = req.params;
        cb(null, path.join(__dirname, `../public/uploads/${coleccion}`))
    },
    filename: (req, file, cb) => {
        const { id } = req.params;
        let nombreAlArchivo = `${id}-${file.originalname}`;
        cb(null, nombreAlArchivo);
    }
})

const middlewareMulterUpload = multer({
    storage,
    dest: path.join(__dirname, '../public/uploads'),
    fileFilter: (req, file: Express.Multer.File , cb: FileFilterCallback) => {
        const tiposDeExtension = /jpeg|jpg|png|gif/;
        let extensionArchivo: string[] = file.originalname.split('.')
        let extensionValida = tiposDeExtension.test( extensionArchivo[extensionArchivo.length -1] )

        if( !extensionValida ) {
            return cb( { name: 'Error en el archivo', message: 'Formato de archivo no valido. Valido solo: jpeg | jpg | png | gif' } as any, false )
        }
        
        cb(null, true)
    }
});

export const upload = middlewareMulterUpload.single('image')