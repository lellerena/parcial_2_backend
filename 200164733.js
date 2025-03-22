const datos = require('./datos.json')
/*{
  _id: 'par02estid002',
  info_personal: {
    gender: 'M',
    nombre: 'Santiago',
    apellido: 'Ramirez',
    correo: 'sramirez@uninorte.edu.co',
    altura: 1.8,
    nacimiento: '2002-06-17'
  },
  info_matricula: [
    { name: 'Fisica I', notas: [Array], semestre: 1 },
    { name: 'Estadistica I', notas: [Array], semestre: 1 },
    { name: 'Historia I', notas: [Array], semestre: 1 },
    { name: 'Economía I', notas: [Array], semestre: 1 },
    { name: 'Fisica II', notas: [Array], semestre: 2 },
    { name: 'Inglés I', notas: [Array], semestre: 2 },
    { name: 'Filosofía I', notas: [Array], semestre: 2 }
  ],
  info_extra_curriculares: [
    { nombre: 'INNOVA', semestre: 2 },
    { nombre: 'Baloncesto', semestre: 2 }
  ]
}
}*/

// console.log(datos.length)

function puntoUno(estudiantes = datos, extracurricular) {
    // CODIGO DE PUNTO 1 AQUI
    //  Implemente una función que reciba los datos de estudiantes y el nombre de una extracurricular y retorne los correos de los estudiantes que han estado involucrados en esa extra curricular, como por ejemplo los correos de los ~140 estudiantes que han estado involucrados en la extra curricular INNOVA.

    return estudiantes
        .filter((estudiante) =>
            estudiante.info_extra_curriculares.some(
                (materia) => materia.nombre === extracurricular
            )
        )
        .map((estudiante) => estudiante.info_personal.correo)
}
console.log(puntoUno(datos, 'INNOVA'))

function promedioEstudiante(estudiante = datos[0]) {
    const matricula = estudiante.info_matricula

    const promedio =
        matricula.reduce((acc, materia) => {
            const promedioNotas = materia.notas.reduce(
                (acc, nota) => acc + nota.nota * nota.peso,
                0
            )
            // console.log(promedioNotas)
            return acc + promedioNotas
        }, 0) / matricula.length
    return promedio
}

function semestreEstudiante(estudiante = datos[0]) {
    const matricula = estudiante.info_matricula
    const semestres = matricula.map((materia) => materia.semestre)
    return Math.max(...semestres)
}

// console.log(semestreEstudiante(datos[ 0 ]))

// CODIGO DE PUNTO 2 AQUI
function puntoDos(estudiantes = datos, semestre = 1) {
    // Implemente una función que reciba los datos de estudiantes y un semestre y retorne el nombre completo del estudiante de mayor promedio, como por ejemplo el estudiante de quinto semestre con ~3.7 de promedio.
    const filtered = estudiantes.filter(
        (estudiante) => semestreEstudiante(estudiante) === semestre
    )
    const promedios = filtered.map((estudiante) => {
        return {
            promedio: promedioEstudiante(estudiante),
            info: estudiante.info_personal
        }
    })
    // console.log(promedios.map((estudiante) => estudiante.promedio))
    const maxPromedio = promedios.reduce((acc, estudiante) => {
        if (estudiante.promedio > acc.promedio) {
            return estudiante
        }
        return acc
    }, promedios[0])
    // console.log({ maxPromedio })
    return `${maxPromedio.info.nombre} ${maxPromedio.info.apellido}`
}
console.log(puntoDos(datos,1))
// CODIGO DE PUNTO 3 AQUI
/**3. Implemente una función que reciba los datos de estudiantes y retorne la información personal de los estudiantes de primer semestre modificados para tener el siguiente formato:

```js
{
  "gender": "M",
  "titulo": "Sr.",
  "nombreCompleto" : "Luis Molina",
  "primerNombre": "Luis",
  "primerApellido": "Molina",
  "altura": 182,
  "edad": 19,
  "nacimiento": "2004-10-14",
  "correo": "lmolina@uninorte.edu.co",
  "usuario": "lmolina"
},
``` */
function puntoTres(estudiantes = datos) {
    const newEstudiantes = estudiantes.map((estudiante) => {
        const newEstudiante = {
            gender: estudiante.info_personal.gender,
            titulo: estudiante.info_personal.gender === 'M' ? 'Sr.' : 'Sra.',
            nombreCompleto: `${estudiante.info_personal.nombre} ${estudiante.info_personal.apellido}`,
            primerNombre: estudiante.info_personal.nombre,
            primerApellido: estudiante.info_personal.apellido,
            altura: estudiante.info_personal.altura,
            edad:
                new Date().getFullYear() -
                new Date(estudiante.info_personal.nacimiento).getFullYear(),
            nacimiento: estudiante.info_personal.nacimiento,
            correo: estudiante.info_personal.correo,
            usuario: estudiante.info_personal.correo.split('@')[0]
        }

        return newEstudiante
    })
    return newEstudiantes
}

// console.log(puntoTres(datos))
// CODIGO DE PUNTO 4 AQUI

function puntoCuatro(estudiantes = datos) {
    // Implemente una función que reciba los datos de estudiantes y retorne el nombre completo del estudiante mas alto inscrito en Baloncesto en el semestre actual, como por ejemplo el estudiante que mide ~1.9m de altura.
    const filtered = estudiantes.filter((estudiante) => {
        const ultimoSemestreBaloncesto =
            estudiante.info_extra_curriculares.reduce((acc, materia) => {
                if (materia.nombre === 'Baloncesto' && materia.semestre > acc) {
                    return materia.semestre
                }
                return acc
            }, 0)

       
        return (
            estudiante.info_extra_curriculares.some(
                (materia) => materia.nombre === 'Baloncesto'
            ) && semestreEstudiante(estudiante) === ultimoSemestreBaloncesto
        )
	})

	// console.log(filtered.sort((a, b) => a.info_personal.altura - b.info_personal.altura).map((estudiante) => estudiante.info_personal.altura))
	
	const masAlto = filtered.reduce((acc, estudiante) => {
		if (estudiante.info_personal.altura > acc.info_personal.altura ) {
			return estudiante
		}
		return acc
	}
		, filtered[ 0 ])
	
	return `${masAlto.info_personal.nombre} ${masAlto.info_personal.apellido}`
}

console.log(puntoCuatro(datos))
