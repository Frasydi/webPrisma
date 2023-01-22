import prisma from "."

export async function update(nims:string, data:any) {
    const {
        nim,
        
    } = data
    if(nim == null) {
        return {
            status : false,
            code : 400,
            msg : "Nim tidak ada"
        }
    }
    try {
        const result = await prisma.mahasiswa.update({where : {nim:nims}, data : data})
        return {
            status : true,
            code : 200,
            msg : result
        }
    }catch(err) {
        console.log(err)
        return {
            status : false, 
            code : 500,
            msg : "Server Error"
        }
    }
}