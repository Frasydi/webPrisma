import { FormEvent, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
export default function Modal({
  active,
  setactive,
  getData,
  selectNim,
  setSelNim,
}: {
  active: boolean
  setactive: any
  getData: any
  selectNim: string
  setSelNim: any
}) {
  const [preExit, setPreExit] = useState(false)
  async function edit(data: any) {
    Swal.fire({
      title: 'Sedang memproses',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: async() => {
        Swal.showLoading(Swal.getDenyButton())
        try {

          const fet = await fetch('/api/update-mahasiswa/' + selectNim, {
            method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        const json = await fet.json()
        if (!fet.ok) {
          Swal.fire('Gagal Mengedit', json.msg, 'error')
          return
        }
        
        Swal.fire('Berhasil mengedit', '', 'success')
        getData()
      }catch(err) {
          Swal.fire('Server Error', "", 'error')

        }
        return
      },
    })
    
  }
  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    const forms = [
      'nim',
      'nama',
      'kelas',
      'nama_mk',
      'nilai_mutu',
      'semester_mahasiswa',
      'sks_matkul',
      'tahun_akademik',
      'ips',
      'ipk'
    ]
    const json: any = {}
    forms.forEach((el, ind) => {
      // @ts-ignore
      json[el] = ev.target[ind].value
      // @ts-ignore
      ev.target[ind].value = ''
    })
    if (selectNim == null) {
      tambah(json)
      setSelNim(null)
      return
    }
    edit(json)
    setSelNim(null)
  }
  function removeEdit(){
    
  }
  async function tambah(data: any) {
    Swal.fire({
      title: 'Sedang memproses',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: async() => {
        Swal.showLoading(Swal.getDenyButton())
        try {

        const fet = await fetch('/api/tambah-mahasiswa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        const Data = await fet.json()
        if (!fet.ok) {
          Swal.fire('Gagal Menambah', Data.msg, 'error')
          return
        }
        Swal.fire('Berhasil menambah', '', 'success')
        getData()
      }catch(err) {
        Swal.fire('Server Error', "", 'error')

      }

        return
      },
    })
  }
  return (
    <>
      <div className={`modal ${active ? 'active' : ''} ${preExit ? 'preexit' : ''}`}>
        <div
          className="modalBox"
          onAnimationEnd={() => {
            if (!preExit) {
              return
            }

            setactive(false)
            setPreExit(false)
          }}
        >
          <div className="modalContent">
            <div className="modalHead">
              <p>Form</p>
              <div
                className={`modalExit`}
                onClick={() => {
                  setPreExit(true)
                }}
              >
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="modalContent">
              <form
                onSubmit={(ev) => {
                  handleSubmit(ev)
                }}
              >
                <FloatingLabel controlId="NIM" label="NIM" className="mb-3">
                  <Form.Control type="text" placeholder="NIM" />
                </FloatingLabel>
                <FloatingLabel controlId="Nama" label="Nama">
                  <Form.Control type="text" placeholder="Nama" />
                </FloatingLabel>
                <FloatingLabel controlId="Kelas" label="Kelas">
                  <Form.Control type="text" placeholder="Kelas" />
                </FloatingLabel>
                <FloatingLabel controlId="NamaMK" label="Nama MK">
                  <Form.Control type="text" placeholder="Nama MK" />
                </FloatingLabel>
                <FloatingLabel controlId="NilaiMutu" label="Nilai Mutu">
                  <Form.Control type="text" placeholder="Nilai Mutu" />
                </FloatingLabel>
                <FloatingLabel controlId="Semester" label="Semester">
                  <Form.Control type="text" placeholder="Semester" />
                </FloatingLabel>
                <FloatingLabel controlId="SKS" label="SKS">
                  <Form.Control type="text" placeholder="SKS" />
                </FloatingLabel>
                <FloatingLabel controlId="TahunAkademik" label="Tahun Akademik">
                  <Form.Control type="text" placeholder="Tahun Akademik" />
                </FloatingLabel>
                <FloatingLabel controlId="ips" label="IPS">
                  <Form.Control type="text" placeholder="IPS" />
                </FloatingLabel>
                <FloatingLabel controlId="ipk" label="IPK">
                  <Form.Control type="text" placeholder="IPK" />
                </FloatingLabel>
                <Button type="submit" variant="primary">
                  {selectNim != null ? 'Edit' : 'Tambah'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
