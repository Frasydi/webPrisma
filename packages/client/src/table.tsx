import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/esm/Button'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'

export default function TableS({
  data,
  isLoading,
  hapus,
  select
}: {
  data: any
  isLoading: boolean
  hapus: any
  select : any
}) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <th>No</th>
          <th>NIM</th>
          <th>Nama</th>
          <th>Kelas</th>
          <th>Nama MK</th>
          <th>Nilai Mutu</th>
          <th>Semester</th>
          <th>SKS</th>
          <th>Tahun Akademik</th>
          <th>Aksi</th>
        </thead>
        <tbody className={`${isLoading ? 'loading' : ''}`}>
          {data.map((el: any, ind: number) => (
            <tr>
              <td>{ind + 1}</td>
              <td>{el.nim}</td>
              <td>{el.nama}</td>
              <td>{el.kelas}</td>
              <td>{el.nama_mk}</td>
              <td>{el.nilai_mutu}</td>
              <td>{el.semester_mahasiswa}</td>
              <td>{el.sks_matkul}</td>
              <td>{el.tahun_akademik}</td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="success" onClick={() => {
                    const form = document.querySelector("form")
                    const forms =  ["nim","nama","kelas","nama_mk","nilai_mutu","semester_mahasiswa","sks_matkul","tahun_akademik"]
                    forms.forEach((el2,ind)=> {
                        //@ts-ignore
                        form.elements[ind].value = el[el2]
                    })
                    select(el.nim)
                  }}>Edit</Button>
                  <Button variant="danger" onClick={() => {
                    hapus(el.nim)
                  }} >Hapus</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
