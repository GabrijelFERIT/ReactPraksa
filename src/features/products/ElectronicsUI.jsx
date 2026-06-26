import { useState, useEffect } from "react";
import api from "../../api.js";

function ElectronicsListCRUD() {
    const [devices, setDevices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const [deviceName, setDeviceName] = useState("");
    const [deviceDescription, setDeviceDescription] = useState(""); 
    const [devicePrice, setDevicePrice] = useState(0);

    const [users, setUsers] = useState([]); 
    const [selectedUserId, setSelectedUserId] = useState('');
    
const fetchUsers = async () => {
    try {
        const response = await api.get("/User");
        setUsers(response.data);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get("/Article");
            setDevices(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchUsers();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setEditId(null);
        setDeviceName("");
        setDeviceDescription("");
        setDevicePrice(0);
        setSelectedUserId('');
    };

const startEdit = (device) => {
            
            setEditId(device.id); 
            setDeviceName(device.Name || device.name || "");
            setDeviceDescription(device.description || "");
            setDevicePrice(device.currentPrice || 0);
            setIsModalOpen(true); 
            setSelectedUserId(device.UserId || device.userId || '');
};

    
    const deleteDevice = async (Id) => {
        if (window.confirm("Jeste li sigurni da želite obrisati ovaj uređaj?")) {
            try {
                await api.delete(`/Article/${Id}`);
                await fetchData();
            } catch (error) {
                console.error("Error deleting device:", error);
            }
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!deviceName.trim()) return;

        
        const deviceData = {
            Name: deviceName,
            Description: deviceDescription,
            CurrentPrice: Number(devicePrice),
            UserId: selectedUserId
        };

        try {
            if (editId) {
                
                await api.put(`/Article/${editId}`, deviceData);
            } else {
                
                await api.post("/Article", deviceData);
            }
            
            
            
            await fetchData(); 
            closeModal();
        } catch (error) {
            console.error("Error updating device:", error);
        }
    };

    if (loading) return <p>Učitavam artikle iz baze podataka...</p>;

    return (
        <div className="crud-container">
            <h1>Device List (From Database)</h1>
            
            <button className="btn-add" onClick={() => setIsModalOpen(true)}>
                Add Device
            </button>
            
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                        <h3>{editId ? "Edit Device" : "Add New Device"}</h3>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Device Name:</label>
                              
                                <input 
                                    type="text" 
                                    value={deviceName} 
                                    onChange={(e) => setDeviceName(e.target.value)} 
                                    required 
                                />
                                
                                <label>Description:</label>

                                <input 
                                    type="text" 
                                    value={deviceDescription} 
                                    onChange={(e) => setDeviceDescription(e.target.value)} 
                                />
                                
                                <label>Price (€):</label>
                               
                                <input 
                                    type="number" 
                                    step="0.01"
                                    value={devicePrice} 
                                    onChange={(e) => setDevicePrice(e.target.value)} 
                                    required 
                                />
                                    <div className="form-group">
                                        <label>Vlasnik uređaja:</label>
                                        <select 
                                            value={selectedUserId} 
                                            onChange={(e) => setSelectedUserId(e.target.value)} 
                                            required
                                            disabled={!!editId} // <-- OVO JE KLJUČ! Zaključava izbornik ako uređujemo (editId postoji)
                                            className="form-control" 
                                        >
                                            <option value="">-- Odaberi korisnika --</option>
                                            {users.map(u => (
                                                <option key={u.Id || u.id} value={u.Id || u.id}>
                                                    {u.FirstName || u.firstName} {u.LastName || u.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
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
                        <th>Opis</th>
                        <th>Cijena</th>
                        <th>Akcije</th> 
                    </tr>
                </thead>
                    <tbody>
                        {devices.map((u, index) => (
                            <tr key={u.Id || u.id || index}>
                                <td className="name-cell">{u.Name || u.name}</td>
                                <td>{u.Description || u.description || "Nema opisa"}</td>
                                <td className="price-cell">{u.CurrentPrice || u.currentPrice} €</td>
                                
                                <td className="actions-cell">
                                    <button className="btn-table-edit" onClick={() => startEdit(u)}>Edit</button>
                                    <button className="btn-table-delete" onClick={() => deleteDevice(u.Id || u.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    );
}

export default ElectronicsListCRUD;