import { useEffect, useMemo, useState } from 'react'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import ReactDOM from 'react-dom'
import Style from './App.module.css'
import Modal from './Modal'
import TableS from './table'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'
export default function App() {
  const [isInput, setIsInput] = useState(false)
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState<string>('')
  const [isError, setError] = useState(null)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selNIM, setSelNim] = useState<null | string>(null)
  const maxPage = useMemo(() => {
    return Math.ceil(count / limit)
  }, [count, limit])
  useEffect(() => {
    getData()
    return () => {
      setIsInput(false)
    }
  }, [search, page, limit])
  async function getData() {
    setLoading(true)
    const fet = await fetch(`/api/search?search=${search}&page=${page}&limit=${limit}`)
    const json = await fet.json()
    setLoading(false)
    console.log(json)

    if (!json.status) {
      setError(json.msg)
      return
    }

    setError(null)
    setData(json.msg.data)
    setCount(json.msg.length)
  }

  async function selectData(nim: string) {
    setSelNim(nim)
    setIsInput(true)
  }

  async function hapusData(nim: string) {
    const result = await fetch('/api/delete-mahasiswa/' + nim, {
      method: 'DELETE',
    })
    const json = await result.json()
    if (!result.ok) {
      Swal.fire('Gagal menghapus', json.msg, 'error')
      return
    }
    Swal.fire('Berhasil menghapus', '', 'success')
    getData()
  }
  return (
    <>
      <nav>
        <div className="navBox">
          <div className="navHeader">Mahasiswa Unismuh Makassar</div>
          <button
            onClick={() => {
              setIsInput(true)
            }}
          >
            Input
          </button>
        </div>
      </nav>
      <Modal
        setSelNim={setSelNim}
        selectNim={selNIM as string}
        getData={getData}
        active={isInput}
        setactive={setIsInput}
      />
      <div style={{ height: '20vh' }}></div>
      <main>
        <div style={{ height: '3rem' }}></div>
        <FloatingLabel controlId="floatingInput" label="Search" className="mb-3">
          <Form.Control
            type="search"
            onChange={(ev) => {
              setPage(0)
              setSearch(ev.target.value)
            }}
            placeholder="Search"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Limit">
          <Form.Select
            aria-label="Limit"
            value={limit}
            onChange={(ev) => {
              setLimit(parseInt(ev.target.value))
              setPage(0)
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </Form.Select>
        </FloatingLabel>

        {isError == null ? (
          <>
            <TableS select={selectData} hapus={hapusData} data={data} isLoading={loading} />
            <div className="pagination">
              <p
                className="pageArrow"
                style={{ marginRight: '2rem' }}
                onClick={() => {
                  if (page > 0) {
                    setPage((prev) => prev - 1)
                  }
                }}
              >
                {'<'}
              </p>
              <FloatingLabel controlId="floatingInput" label="Halaman" className="mb-3">
                <Form.Control type="number" min={1} minLength={1} max={maxPage} onKeyDown={(ev) => {
                  console.log(ev)
                  if(ev.key != "ENTER") {
                    return
                  } 
                  const ind = parseInt(ev.currentTarget.value)-1
                  console.log(ind)
                  if(isNaN(ind)) {
                    ev.currentTarget.value = page+""
                    return
                  }
                  if(ind >= 0 && ind <= maxPage) {
                    setPage(ind)
                    return
                  }
                  ev.currentTarget.value = page+""

                }} value={page+1} placeholder="Halaman" />
              </FloatingLabel>
                <p>/{maxPage}</p>
              <p
                className="pageArrow"
                onClick={() => {
                  if (page < maxPage - 1) {
                    setPage((prev) => prev + 1)
                  }
                }}
                style={{ marginLeft: '2rem' }}
              >
                {'>'}
              </p>
            </div>
          </>
        ) : (
          <h1>{isError}</h1>
        )}
      </main>
    </>
  )
}
