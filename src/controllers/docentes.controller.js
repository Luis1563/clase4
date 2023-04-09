const docentes = require ('../../datos/docentes.json')

const getAllDocentes = (req, res)=>{
    res.json (docentes).status(200)
} 

const getDocenteByLegajo = (req, res) => {
        const legajo = req.params.legajo
        const resultado = docentes.find (docente => docente.legajo == legajo)
        if(resultado){
            res.status(200).json(resultado).status(200)
        }else{
            res.status(404).json({mensaje: `El docente con legajo numero ${legajo} no fue encontrado`})
        }
    }

    const deleteDocenteByLegajo = (req, res) => {
        const legajo = req.params.legajo
        const indice = docentes.findIndex(docente => docente.legajo == legajo)
        if (indice == -1){
            res.status(404).json({
                resultado: "La operacion de borrado no pudo ser realizada",
                mensaje: `El docente con legajo numero ${legajo} no pudo ser encontrado`
                         })
        }else{
            const docente = docentes[indice];
            const resultado = docentes.splice(indice,1)
            res.status(200).json({resultado: `La operacion de borrado del docente con legajo ${legajo} pudo realizarce con exito`,
            docente: docente})
        }
    }
 
    const createDocente = (req, res) => {
        const docentesData = req.body
        const existe = docentes.find(docente => docente.legajo == docentesData.legajo)
        if(!existe){
            if(!docentesData.legajo ){
                res.status(400).json({mensaje: `El docente no puede ser generado sin numero de legajo`})
            }
        docentes.push(docentesData)
        res.status(201).json({mensaje: `El docente con numero de legajo ${docentesData.legajo} fue creado con exito`})
        }
            res.status(400).json({mensaje: `El docente con numero de legajo ${docentesData.legajo} ya existe en la base de datos`})
        
    }

    const updateDocente =(req, res) => {
        const legajo = req.params.legajo
        const docentesData = req.body
        const indice = docentes.findIndex(docente => docente.legajo == legajo)
        if(indice >= 0){
            docentes [indice].nombre = docentesData.nombre
            res.status(200).json({"Docente": docentes[indice]})
        }

        res.status(404).json({
            resultado: "La operacion de modificación no pudo ser realizada",
            mensaje: `El docente con legajo numero ${legajo} no fue encontrado`
        })
        
    }


module.exports = {
    getAllDocentes, 
    getDocenteByLegajo,
    deleteDocenteByLegajo,
    createDocente,
    updateDocente
}