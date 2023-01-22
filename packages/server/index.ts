import express from "express"
const server = express();
const port = 8080;
import { getAll, search } from "./dbMethod/get";

server.use(express.json());

//read atau get semua data mahasiswa
server.get('/api/all', async (req, res) => {
  const result = await getAll()
  res.status(result.code).json(result)
})

server.get("/api/search", async (req,res) => {
  if(req.query == null) {
    return res.status(404).json({
      status : false,
      msg : "query tidak boleh kosong",
      code : 404
    })
  }
  const result = await search(req.query)
  res.status(result.code).json(result)
})

// //post atau create data mahasiswa
// server.post('/create-mahasiswa', async (request, response) => {
//     try {
//         const { nama, nim } = request.body;
//         const data = await prisma.mahasiswa.create({
//             data: {
//                 nama: nama,
//                 nim: nim
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

// server.delete('/delete-mahasiswa/:nim', async (request, response) => {
//     try {
//         const { nim } = request.params;
//         const data = await prisma.mahasiswa.delete({
//             where: {
//                 nim: nim
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

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})



