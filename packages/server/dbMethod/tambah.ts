import prisma from "."

export default async function tambahMahasiswa(newMahasiswa : any) {
    const {
        nim,
        
    } = newMahasiswa
    if(nim == null) {
        return {
            status : false,
            code : 400,
            msg : "Nim tidak ada"
        }
    }
    try {
        const result = await prisma.mahasiswa.create({
            data : newMahasiswa
        })
        return {
            status : true,
            code : 200,
            msg : result
        }
    }catch(err:any) {
        console.log(err)
        console.log(err.code)
        return {
            status : false, 
            code : 500,
            msg : "Server Error"
        }
    }
}