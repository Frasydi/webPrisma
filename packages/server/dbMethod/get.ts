import prisma from '.'

export async function getAll() {
  try {
    const result = await prisma.mahasiswa.findMany()
    return {
      status: true,
      msg: result,
      code: 200,
    }
  } catch (err) {
    console.log(err)
    return {
      status: false,
      msg: 'Server Error',
      code: 500,
    }
  }
}

export async function searchMahasiswa(search: string, page: number, limit: number) {
  const obj = [
    'nim',
    'nama',
    'tahun_akademik',
    'semester_mahasiswa',
    'nama_mk',
    'kelas',
    'sks_matkul',
    'nilai_mutu',
    'ips',
    'ipk',
  ]
  const searchConvert: any = obj.map((el) => {
    const temp: any = {}
    temp[el] = {
      contains: search,
    }
    return temp
  })
  try {
    const count = await prisma.mahasiswa.count({
      where: {
        OR: [...searchConvert],
      },
    })
    const result = await prisma.mahasiswa.findMany({
      where: {
        OR: [...searchConvert],
      },
      skip: page * limit,
      take: limit,
    })
    if (result.length == 0) {
      return {
        status: false,
        msg: 'Tidak ditemukan',
        code: 404,
      }
    }
    return {
      status: true,
      msg: {length : count, data : result},
      code: 200,
    }
  } catch (err) {
    console.log(err)
    return {
      status: false,
      msg: 'Server Error',
      code: 500,
    }
  }
}
