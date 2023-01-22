import express from 'express'
const server = express()
const port = 8080
import { getAll, searchMahasiswa } from './dbMethod/get'
import { hapus } from './dbMethod/hapus'
import tambahMahasiswa from './dbMethod/tambah'
import { update } from './dbMethod/update'

server.use(express.json())

//read atau get semua data mahasiswa
server.get('/api/all', async (req, res) => {
  const result = await getAll()
  res.status(result.code).json(result)
})

server.get('/api/search', async (req, res) => {
  const { page, limit, search } = req.query
  if (page == null || limit == null || search == null) {
    return res.status(400).json({
      status: false,
      code: 400,
      msg: 'Page or limit or search is not included',
    })
  }
  const parsPage = parseInt(page as string)
  const parsLimit = parseInt(limit as string)
  if (isNaN(parsPage) || isNaN(parsLimit)) {
    return res.status(400).json({
      status: false,
      code: 400,
      msg: 'Page or Limit is not valid',
    })
  }
  const result = await searchMahasiswa(
    search as string,
    parsPage,
    parsLimit
  )
  res.status(result.code).json(result)
})

// //post atau create data mahasiswa
server.post('/api/tambah-mahasiswa', async (req, res) => {
    const result = await tambahMahasiswa(req.body)
    if(req.body == null) {
      return res.status(400).json({
        status : false,
        code : 400,
        msg : "Form tidak boleh kosong"
      })
    }
    res.status(result.code).json(result)
})

server.put("/api/update-mahasiswa/:nim", async (req,res) => {
  const result = await update(req.params.nim, req.body)
  res.status(result.code).json(result)
})

// //update nama mahasiswa atau put
// server.put('/update-mahasiswa/:nim', async (request, response) => {
//     try {
//         const { nama } = request.body;
//         const { nim } = request.params;
//         const data = await prisma.mahasiswa.update({
//             where: {
//                 nim: nim
//             },
//             data: {
//                 nama: nama
//             }
//         })
//         response.statusCode = 200;
//         response.json(data)
//     } catch (err) {
//         response.statusCode = 500
//         response.json({
//             message: "Internal Server Error",
//             data: err
//         })
//     }
// })

// //delete data mahasiswa atau delete


server.delete('/api/delete-mahasiswa/:nim', async (req, res) => {
   const result = await hapus(req.params.nim)
   return res.status(result.code).json(result)
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
