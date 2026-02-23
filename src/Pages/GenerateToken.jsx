import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function GenerateToken() {

  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    patientName: "",
    patientPhone: ""
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*');
      if (!error) setDoctors(data);
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get today's count to generate token number
    const today = new Date().toISOString().split('T')[0];
    const { count, error: countError } = await supabase
      .from('tokens')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today);

    const tokenNumber = (count || 0) + 1;

    const { error } = await supabase
      .from('tokens')
      .insert([{
        doctor_id: form.doctorId,
        patient_name: form.patientName,
        patient_phone: form.patientPhone,
        token_number: tokenNumber,
        status: 'ACTIVE'
      }]);

    if (!error) {
      alert(`Token generated successfully! Your Token Number is: ${tokenNumber} 🎟️`);
      setForm({ doctorId: "", patientName: "", patientPhone: "" });
    } else {
      console.error("Error generating token:", error);
      alert(`Error generating token ❌: ${error.message}`);
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