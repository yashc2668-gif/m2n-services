import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  Plus,
  Trash2,
  Edit2,
  DollarSign,
  TrendingUp,
  FileText,
  Users,
} from "lucide-react";

function M2NServicesApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [clients, setClients] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [labour, setLabour] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // "admin" | "staff"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


useEffect(() => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("userRole");

  if (loggedIn === "true" && role) {
    setIsLoggedIn(true);
    setUserRole(role);
  }
  const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
  const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  const storedClients = JSON.parse(localStorage.getItem("clients") || "[]");
  const storedVendors = JSON.parse(localStorage.getItem("vendors") || "[]");
  const storedMaterials = JSON.parse(localStorage.getItem("Materials") || "[]");
  const storedLabour = JSON.parse(localStorage.getItem("Labour") || "[]");


  if (storedProjects.length) setProjects(storedProjects);
  if (storedExpenses.length) setExpenses(storedExpenses);
  if (storedClients.length) setClients(storedClients);
  if (storedVendors.length) setVendors(storedVendors);
  if (storedMaterials.length) setMaterials(storedMaterials);
  if (storedLabour.length) setLabour(storedLabour);
}, []);
  
const handleLogin = (username, password) => {
  // Demo credentials
  if (username === "admin" && password === "admin123") {
    setIsLoggedIn(true);
    setUserRole("admin");
    setUsername("Admin");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "admin");
    localStorage.setItem("username", "Admin");
    return;
  }

if (username === "staff" && password === "staff123") {
  setIsLoggedIn(true);
  setUserRole("staff");
  setUsername("Staff");

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userRole", "staff");
  localStorage.setItem("username", "Staff");
  return;
} 
  

  alert("Invalid username or password");
};
useEffect(() => {
const storedUsername = localStorage.getItem("username");
if (storedUsername) setUsername(storedUsername);
}, []);

useEffect(() => {
  localStorage.setItem("projects", JSON.stringify(projects));
}, [projects]);

useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);

useEffect(() => {
  localStorage.setItem("clients", JSON.stringify(clients));
}, [clients]);

useEffect(() => {
  localStorage.setItem("vendors", JSON.stringify(vendors));
}, [vendors]);

useEffect(() => {
  localStorage.setItem("materials", JSON.stringify(materials));
}, [materials]);

useEffect(() => {
  localStorage.setItem("labour", JSON.stringify(labour));
}, [labour]);
 

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setEditingItem(null);
    setFormData({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: editingItem ? editingItem.id : Date.now(),
    };

    const handlers = {
      project: [projects, setProjects],
      expense: [expenses, setExpenses],
      client: [clients, setClients],
      vendor: [vendors, setVendors],
      material: [materials, setMaterials],
      labour: [labour, setLabour],
    };
if (!handlers[modalType]) return;
    const [data, setter] = handlers[modalType];
    setter(
      editingItem
        ? data.map((i) => (i.id === editingItem.id ? newItem : i))
        : [...data, newItem]
    );

    closeModal();
  };

  const deleteItem = (type, id) => {
    if (!window.confirm("Delete this item?")) return;

    const handlers = {
      project: [projects, setProjects],
      expense: [expenses, setExpenses],
      client: [clients, setClients],
      vendor: [vendors, setVendors],
      material: [materials, setMaterials],
      labour: [labour, setLabour],
    };

    const [data, setter] = handlers[type];
    setter(data.filter((i) => i.id !== id));
  };

  const totals = {
    budget: projects.reduce((s, p) => s + (p.budget || 0), 0),
    spent: projects.reduce((s, p) => s + (p.spent || 0), 0),
    receivable: clients.reduce((s, c) => s + (c.pending || 0), 0),
    payable: vendors.reduce((s, v) => s + (v.pending || 0), 0),
  };
  const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">M2N Services Login</h2>

        <input
          className="w-full border p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => handleLogin(username, password)}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-xs text-gray-500 text-center">
          Admin: admin / admin123 <br />
          Staff: staff / staff123
        </p>
      </div>
    </div>
  );
};
  if (!isLoggedIn) {
    return <LoginScreen />;
  } 
  const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (!confirmLogout) return;

  setIsLoggedIn(false);
  setUserRole("");
  setUsername("");

  localStorage.clear();
};

  return (
    <div className="min-h-screen flex flex-col">
      <Analytics />
      {/* Header */}
     <header className="bg-blue-600 text-white p-4 shadow-lg flex justify-between items-center">
  <div className="flex items-center gap-3">
    <img
      src="/logo.png"
      alt="M2N Services"
      className="w-8 h-8"
    />

    <h1 className="text-2xl font-bold">M2N Services</h1>

    <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded">
      {userRole === "admin" ? "ADMIN" : "STAFF"}
    </span>
  </div>

  <div className="flex items-center gap-4">
    <span className="text-sm">
      Welcome, <b>{username}</b>
    </span>

    <button
      onClick={handleLogout}
      className="bg-red-500 px-3 py-1 rounded text-white text-sm"
    >
      Logout
    </button>
  </div>
</header>


      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow h-screen p-4">
          {[
            "dashboard",
            "projects",
            "expenses",
            "clients",
            "vendors",
            "materials",
            "labour",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left p-3 rounded mb-2 ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
    {activeTab === "dashboard" && (
      <div className="space-y-6">

    {/* TOP SUMMARY */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <DashboardCard title="Total Projects" value={projects.length} icon={<Users />} color="blue" />
      <DashboardCard title="Program Budget" value={totals.budget} icon={<DollarSign />} color="indigo" />
      <DashboardCard title="Committed / Spent" value={totals.spent} icon={<TrendingUp />} color="green" />
      <DashboardCard title="Variance" value={totals.budget - totals.spent} icon={<FileText />} color="orange" />
      <DashboardCard title="Payable" value={totals.payable} icon={<Users />} color="red" />
    </div>

    {/* PROJECT SUMMARY TABLE */}
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Project</th>
            <th className="p-3 text-left">Budget</th>
            <th className="p-3 text-left">Spent</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td className="p-3">₹{p.budget}</td>
              <td className="p-3">₹{p.spent}</td>
              <td className="p-3">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
)}

{activeTab === "labour" && (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Labour</h2>
      <button
        onClick={() => openModal("labour")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Labour
      </button>
    </div>

    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Daily Wage</th>
            <th className="p-3 text-left">Days</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Advance</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {labour.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-3">{l.name}</td>
              <td className="p-3">{l.type}</td>
              <td className="p-3">₹{l.dailyWage}</td>
              <td className="p-3">{l.daysWorked}</td>
              <td className="p-3">₹{l.total}</td>
              <td className="p-3">₹{l.advance}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => openModal("labour", l)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem("labour", l.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

{activeTab === "materials" && (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Materials</h2>
      <button
        onClick={() => openModal("material")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Material
      </button>
    </div>

    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Unit</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Project</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-3">{m.name}</td>
              <td className="p-3">{m.quantity}</td>
              <td className="p-3">{m.unit}</td>
              <td className="p-3">₹{m.price}</td>
              <td className="p-3">₹{m.total}</td>
              <td className="p-3">{m.project}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => openModal("material", m)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem("material", m.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

{activeTab === "vendors" && (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Vendors</h2>
      <button
        onClick={() => openModal("vendor")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Vendor
      </button>
    </div>

    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Pending</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-3">{v.name}</td>
              <td className="p-3">{v.type}</td>
              <td className="p-3">{v.phone}</td>
              <td className="p-3 text-red-600">₹{v.pending}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => openModal("vendor", v)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem("vendor", v.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
 ``

{activeTab === "clients" && (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Clients</h2>
      <button
        onClick={() => openModal("client")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Client
      </button>
    </div>

    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Project</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Paid</th>
            <th className="p-3 text-left">Pending</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.project}</td>
              <td className="p-3">₹{c.totalAmount}</td>
              <td className="p-3">₹{c.paid}</td>
              <td className="p-3 text-red-600">₹{c.pending}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => openModal("client", c)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem("client", c.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


{activeTab === "projects" && (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Projects</h2>
      <button
        onClick={() => openModal("project")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Project
      </button>
    </div>

    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Budget</th>
            <th className="p-3 text-left">Spent</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td className="p-3">₹{p.budget}</td>
              <td className="p-3">₹{p.spent}</td>
              <td className="p-3">{p.status}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => openModal("project", p)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem("project", p.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

{activeTab === "expenses" && (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Expenses</h2>
      <button
        onClick={() => openModal("expense")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Expense
      </button>
    </div>

    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((ex) => (
            <tr key={ex.id} className="border-t">
              <td className="p-3">{ex.date}</td>
              <td className="p-3">{ex.category}</td>
              <td className="p-3">{ex.item}</td>
              <td className="p-3">₹{ex.amount}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => openModal("expense", ex)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem("expense", ex.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
{showModal && modalType === "material" && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-96 space-y-3">
      <h3 className="text-xl font-bold">
        {editingItem ? "Edit Material" : "Add Material"}
      </h3>

      <input
        className="w-full border p-2"
        placeholder="Material Name"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Quantity"
        value={formData.quantity || ""}
        onChange={(e) =>
          setFormData({ ...formData, quantity: e.target.value })
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Unit (Bag / Kg / Ton)"
        value={formData.unit || ""}
        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Price per Unit"
        value={formData.price || ""}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Total"
        value={formData.total || ""}
        onChange={(e) =>
          setFormData({ ...formData, total: e.target.value })
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Project Name"
        value={formData.project || ""}
        onChange={(e) =>
          setFormData({ ...formData, project: e.target.value })
        }
      />

      <div className="flex justify-end gap-2">
        <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
{showModal && modalType === "labour" && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-96 space-y-3">
      <h3 className="text-xl font-bold">
        {editingItem ? "Edit Labour" : "Add Labour"}
      </h3>

      <input
        className="w-full border p-2"
        placeholder="Worker Name"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="w-full border p-2"
        placeholder="Type (Mason / Helper)"
        value={formData.type || ""}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Daily Wage"
        value={formData.dailyWage || ""}
        onChange={(e) =>
          setFormData({ ...formData, dailyWage: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Days Worked"
        value={formData.daysWorked || ""}
        onChange={(e) =>
          setFormData({ ...formData, daysWorked: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Total"
        value={formData.total || ""}
        onChange={(e) =>
          setFormData({ ...formData, total: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Advance"
        value={formData.advance || ""}
        onChange={(e) =>
          setFormData({ ...formData, advance: e.target.value })
        }
      />

      <div className="flex justify-end gap-2">
        <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}


{showModal && modalType === "vendor" && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-96 space-y-3">
      <h3 className="text-xl font-bold">
        {editingItem ? "Edit Vendor" : "Add Vendor"}
      </h3>

      <input
        className="w-full border p-2"
        placeholder="Vendor Name"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="w-full border p-2"
        placeholder="Type (Material/Labour)"
        value={formData.type || ""}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />

      <input
        className="w-full border p-2"
        placeholder="Phone"
        value={formData.phone || ""}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Pending Amount"
        value={formData.pending || ""}
        onChange={(e) => setFormData({ ...formData, pending: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </div>
  </div>
)}

{showModal && modalType === "client" && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-96 space-y-3">
      <h3 className="text-xl font-bold">
        {editingItem ? "Edit Client" : "Add Client"}
      </h3>

      <input
        className="w-full border p-2"
        placeholder="Client Name"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="w-full border p-2"
        placeholder="Phone"
        value={formData.phone || ""}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      <input
        className="w-full border p-2"
        placeholder="Project"
        value={formData.project || ""}
        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Total Amount"
        value={formData.totalAmount || ""}
        onChange={(e) =>
          setFormData({ ...formData, totalAmount: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Paid"
        value={formData.paid || ""}
        onChange={(e) => setFormData({ ...formData, paid: e.target.value })}
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Pending"
        value={formData.pending || ""}
        onChange={(e) => setFormData({ ...formData, pending: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </div>
  </div>
)}

{showModal && modalType === "expense" && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-96 space-y-3">
      <h3 className="text-xl font-bold">
        {editingItem ? "Edit Expense" : "Add Expense"}
      </h3>

      <input
        type="date"
        className="w-full border p-2"
        value={formData.date || ""}
        onChange={(e) =>
          setFormData({ ...formData, date: e.target.value })
        }
      />

      <select
        className="w-full border p-2"
        value={formData.category || ""}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
      >
        <option value="">Select Category</option>
        <option>Material</option>
        <option>Labour</option>
        <option>Transport</option>
        <option>Equipment</option>
        <option>Other</option>
      </select>

      <input
        className="w-full border p-2"
        placeholder="Item Description"
        value={formData.item || ""}
        onChange={(e) =>
          setFormData({ ...formData, item: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Amount"
        value={formData.amount || ""}
        onChange={(e) =>
          setFormData({ ...formData, amount: e.target.value })
        }
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

{showModal && modalType === "project" && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-96 space-y-3">
      <h3 className="text-xl font-bold">
        {editingItem ? "Edit Project" : "Add Project"}
      </h3>

      <input
        className="w-full border p-2"
        placeholder="Project Name"
        value={formData.name || ""}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Budget"
        value={formData.budget || ""}
        onChange={(e) =>
          setFormData({ ...formData, budget: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2"
        placeholder="Spent"
        value={formData.spent || ""}
        onChange={(e) =>
          setFormData({ ...formData, spent: e.target.value })
        }
      />

      <input
        className="w-full border p-2"
        placeholder="Status"
        value={formData.status || ""}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

        </main>
      </div>
    </div>
  );


}
function DashboardCard({ title, value, icon, color }) {
  return (
    <div className={`bg-${color}-600 text-white rounded p-5 shadow`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <p className="text-2xl font-bold">
            ₹{Number(value || 0).toLocaleString()}
          </p>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}

export default M2NServicesApp;
