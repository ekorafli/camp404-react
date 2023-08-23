import React, { useEffect, useState } from "react";
import { addItem, deleteItem, getItemById, getItems, updateItem } from "../dataSources/api";
import { useNavigate } from "react-router-dom";

const ItemManagement = () => {
    const navigate = useNavigate();

    const [createForm, setCreateForm] = useState('');
    const [updateForm, setUpdateForm] = useState('');
    const [items, setItems] = useState([]);
    const [updateBarang, setUpdateBarang] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [itemPayload, setItemPayload] = useState({
        nama_barang: '',
        jumlah: '',
        harga: '',
    });

    function showCreateForm() {
        setCreateForm('show');
        setUpdateForm('');
    }

    function showUpdateForm() {
        setCreateForm('');
        setUpdateForm('show');
    }

    function closeAllForm() {
        setCreateForm('');
        setUpdateForm('');
    }

    const onSimpan = async (ev) => {
        ev.preventDefault();
        setItemPayload({ ...itemPayload, gambar: selectedImage});
        const res = await addItem(itemPayload)
        if (res) {
            navigate("/item-management");
            getAllItems();
            closeAllForm();
        } else {
            console.log("error menambahkan item");
        }
    }

    const onUpdate = async (ev) => {
        setItemPayload({ ...itemPayload, gambar: selectedImage});
        const res = await updateItem(updateBarang._id,itemPayload);
        if (res) {
            navigate("/item-management");
            getAllItems();
            closeAllForm();
        } else {
            console.log("error mengubah item");
        }
    }

    const fetchItem = async(id) => {
        const data = await getItemById(id)
        if (data) {
            setUpdateBarang(data);
            showUpdateForm();
        } else {
            console.log("error get data by id");
        }
    }

    const getAllItems = async() => {
        const data = await getItems();
        if(data) {
            setItems(data);
        } else {
            console.log("error get items")
        }
    }

    const delItem = async (id) => {
        const data = await deleteItem(id)
        if (data) {
            alert("Item berhasil dihapus!")
            getAllItems();
        } else {
            console.log("tidak dapat menghapus...")
        }
    }
    useEffect(() => {
        getAllItems();
    },[])

    useEffect(() => {
        setItemPayload({ 
            nama_barang: updateBarang.nama_barang,
            jumlah: updateBarang.jumlah,
            harga: updateBarang.harga,
            gambar: updateBarang.gambar });
    }, [updateBarang.nama_barang, updateBarang.jumlah, updateBarang.harga, updateBarang.gambar]);

    return (
        <div className="container-fluid mt-3">
            <h2 className="text-center mt-4">Manajemen Barang</h2>
            <button className="btn btn-primary" type="button" onClick={showCreateForm}>Tambah Item</button>

            { createForm === 'show' && (
                <div id="formTambah" className="card py-2 my-3 bg-secondary">
                    <div className="card-body">
                        <h4 className="text-center mb-4 text-white">Tambah Item</h4>
                        <form action="" className="row">
                            <div className="col-3">
                                <input type="text" className="form-control mx-2" placeholder="Masukkan Nama Barang..." name="nama_barang" onChange={(ev) => {setItemPayload({...itemPayload, nama_barang: ev.target.value})}} required/>
                            </div>
                            <div className="col-1">
                                <input type="number" className="form-control mx-2" placeholder="Masukkan Jumlah..." name="jumlah" onChange={(ev) => {setItemPayload({...itemPayload, jumlah: ev.target.value})}} required />
                            </div>
                            <div className="col-2">
                                <input type="number" className="form-control mx-2" placeholder="Masukkan Harga..." name="harga"  onChange={(ev) => {setItemPayload({...itemPayload, harga: ev.target.value})}} required/>
                            </div>
                            <div class="col-4">
                                <input type="file" className="form-control mx-2" placeholder="Pilih Gambar..." name="gambar" onChange={(ev) => setSelectedImage(ev.target.files[0])} accept="image/*" required/>
                            </div>
                            <div className="col-2">
                                <input type="submit" className="btn btn-success" value="Simpan" onClick={onSimpan}/>
                                <input type="button" className="btn btn-danger mx-3" value="Batal" onClick={closeAllForm}/>
                            </div>
                        </form>
                    </div>
                </div>
            )} 
            { updateForm === 'show' && (
                <div id="formTambah" className="card py-2 my-3 bg-secondary">
                    <div className="card-body">
                        <h4 className="text-center mb-4 text-white">Rubah Item</h4>
                        <form action="" className="row">
                            <div className="col-3">
                                <input type="text" className="form-control mx-2" defaultValue={updateBarang.nama_barang} name="update_nama_barang" onChange={(ev) => {setItemPayload({...itemPayload, nama_barang: ev.target.value})}} required />
                            </div>
                            <div className="col-1">
                                <input type="number" className="form-control mx-2" defaultValue={updateBarang.jumlah} name="update_jumlah" onChange={(ev) => {setItemPayload({...itemPayload, jumlah: ev.target.value})}} required/>
                            </div>
                            <div className="col-2">
                                <input type="number" className="form-control mx-2" defaultValue={updateBarang.harga} name="update_harga" onChange={(ev) => {setItemPayload({...itemPayload, harga: ev.target.value})}} required/>
                            </div>
                            <div class="col-4">
                                <input type="file" className="form-control mx-2" defaultValue={updateBarang.gambar} name="gambar" onChange={(ev) => setSelectedImage(ev.target.files[0])} accept="image/*" required/>
                            </div>
                            <div className="col-2">
                                <input type="submit" className="btn btn-success" value="Update" onClick={(ev) => { ev.preventDefault(); onUpdate()}}/>
                                <input type="button" className="btn btn-danger mx-3" value="Batal" onClick={closeAllForm}/>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <table className="table table-striped text-center mt-5">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama Barang</th>
                        <th>Jumlah</th>
                        <th>Satuan</th>
                        <th className="col-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    { items?.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>{item.nama_barang}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga}</td>
                            <td className="col-2">
                                <button className="btn btn-primary" type="submit" onClick={()=> { fetchItem(item._id)} }>Ubah</button>
                                <button className="btn btn-danger mx-3" type="button" onClick={()=> { delItem(item._id)} }>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ItemManagement;