import prisma from "."

export async function getAll() {
    try {
        const result = await prisma.mahasiswa.findMany()
        return {
            status : true,
            msg : result,
            code : 200
        }
    }catch(err) {
        console.log(err)
        return {
            status : false, 
            msg : "Server Error",
            code : 500
        }
    }
}

export async function search(search : {[key:string] : any}) {
    const searchConvert:any = Object.keys(search).map(el => {
        const temp:any = {}
        temp[el] = {
            contains : search[el]
        }
        return temp        
    })
    try {
        const result = await prisma.mahasiswa.findMany({where : {
            AND : [
                ...searchConvert
            ]
        }})
        if(result == null) {
            return {
                status : false,
                msg : "Tidak ditemukan",
                code : 404
            }
        }
        return {
            status : true,
            msg : result,
            code : 200
        }
    }catch(err) {
        console.log(err)
        return {
            status : false, 
            msg : "Server Error",
            code : 500
        }
    }
}