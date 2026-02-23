import { useEffect, useState } from "react";

export default function GenerateToken() {

  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    patientName: "",
    patientPhone: ""
  });

  useEffect(() => {
    fetch("http://localhost:8082/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8082/api/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      alert("Token generated successfully 🎟️");
      setForm({ doctorId: "", patientName: "", patientPhone: "" });
    } else {
      alert("Error generating token ❌");
    }
  };

  return (
    <div className="center-wrapper">

      <div className="form-container">

        <h1>Generate Token</h1>

        <form onSubmit={handleSubmit}>

          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="patientPhone"
            placeholder="Patient Phone"
            value={form.patientPhone}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Generate Token
          </button>

        </form>

      </div>

    </div>
  );
}