import React, { useEffect, useState } from "react";
import { getItems } from "../dataSources/api";

const Katalog = () => {

    const [items, setItems] = useState(null);

    const getAllItems = async() => {
        const data = await getItems();
        if (data) {
            setItems(data);
        } else {
            console.log("tidak dapat mengambil data")
        }
    }

    useEffect(() => {
        getAllItems();
    }, []);

    return (
        <div className="container-fluid mt-3">
            <h2 className="mt-4 text-center">Katalog Barang</h2>
            <div className="container">
                <div className="row">
                    { items?.map((item) => (
                        <div key={item._id} className="card col-3 mx-auto mb-4" style={{ width: '300px'}}>
                            <img src="https://picsum.photos/id/48/400/" alt="" className="card-img-top img-fluid" />
                            <div className="card-body">
                                <h5 className="card-title">{item.nama_barang}</h5>
                                <p className="card-text">Harga : Rp. {item.harga}</p>
                                <p className="card-text">Stok : {item.jumlah}</p>
                                <button type="button" className="btn btn-primary" value="Beli">Beli</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

};

export default Katalog;