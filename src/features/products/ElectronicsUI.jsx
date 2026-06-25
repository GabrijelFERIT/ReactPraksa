import { useState, useEffect } from "react";


function ElectronicsListCRUD(){
    const [devices, setDevices] = useState(() => {
        const data = localStorage.getItem("storeDevices");
        return data ? JSON.parse(data) : [];
    }
);

const [isModalOpen, setIsModalOpen] = useState(false);
const [deviceName, setDeviceName] = useState("");
const [deviceQuantity, setDeviceQuantity] = useState(0);
const [devicePrice, setDevicePrice] = useState(0);
const [editId, setEditId] = useState(null);

useEffect(() => {
    localStorage.setItem("storeDevices", JSON.stringify(devices));
    }, [devices]
);

const closeModal = () => {
        setIsModalOpen(false);
        setEditId(null);
        setDeviceName("");
        setDeviceQuantity(0);
        setDevicePrice(0);
    };

    const startEdit = (device) => {
        setEditId(device.id);
        setDeviceName(device.name);
        setDeviceQuantity(device.quantity);
        setDevicePrice(device.price);
        setIsModalOpen(true); 
    };

const deleteDevice = (id) => {
        if (window.confirm("Jeste li sigurni da želite obrisati ovaj uređaj?")) {
            setDevices(devices.filter(d => d.id !== id));
        }
    };

const handleSubmit = (e) => {
        e.preventDefault(); 
        if (!deviceName.trim()) return; 

        if (editId) {
            setDevices(devices.map(d => 
                d.id === editId 
                    ? { ...d, name: deviceName, quantity: Number(deviceQuantity), price: Number(devicePrice) } 
                    : d
            ));
        } else {
            const newDevice = {
                id: Date.now(), 
                name: deviceName,
                quantity: Number(deviceQuantity),
                price: Number(devicePrice)
            };
            setDevices([...devices, newDevice]); 
        }
        
        closeModal(); 
    };

return (
        <div className="crud-container">
            <h1>Device List</h1>
            
            <button className="btn-add" onClick={() => setIsModalOpen(true)}>
                Add Device
            </button>
            
            {/* POP-UP (MODAL) FORM */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h3>Add New Device</h3>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Device Name:</label>
                                <input 
                                    type="text" 
                                    value={deviceName} 
                                    onChange={(e) => setDeviceName(e.target.value)} 
                                    placeholder="Enter device name..."
                                    required 
                                />
                                
                                <label>Price (€):</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    value={devicePrice} 
                                    onChange={(e) => setDevicePrice(e.target.value)} 
                                    placeholder="Enter price..."
                                    required 
                                />
                                
                                <label>Quantity:</label>
                                <input 
                                    type="number" 
                                    value={deviceQuantity} 
                                    onChange={(e) => setDeviceQuantity(e.target.value)} 
                                    placeholder="Enter quantity..."
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn-save">Save Device</button>
                        </form>
                    </div>
                </div>
            )}
            <table className="device-table">
                <thead>
                    <tr>
                        <th>Naziv uređaja</th>
                        <th>Količina</th>
                        <th>Cijena</th>
                        <th>Akcije</th> 
                    </tr>
                </thead>
                <tbody>
                    {devices.map(u => (
                        <tr key={u.id}>
                            <td className="name-cell">{u.name}</td>
                            <td>{u.quantity} kom</td>
                            <td className="price-cell">{u.price} €</td>
                            <td className="actions-cell">
                                <button className="btn-table-edit" onClick={() => startEdit(u)}>Edit</button>
                                <button className="btn-table-delete" onClick={() => deleteDevice(u.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ElectronicsListCRUD;
