import prisma from "."

export async function hapus(nim:string) {
    try {
        const result = await prisma.mahasiswa.delete({where : {nim:nim}})
        console.log(result)
        
        return {
            status : true,
            code : 200,
            msg : "Berhasil menghapus"
        }
    }catch(err:any) {
        console.log(err)
        if(err.code == "P2025") {
            return {
                status : false, 
                code : 404,
                msg : "Tidak menemukan nim"
            }
        }
        return {
            status : false, 
            code : 500,
            msg : "Server Error"
        }
    }
}