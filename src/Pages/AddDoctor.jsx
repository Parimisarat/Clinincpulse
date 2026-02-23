import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddDoctor() {

  const [doctor, setDoctor] = useState({
    name: "",
    specialization: ""
  });

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('doctors')
      .insert([doctor]);

    if (!error) {
      alert("Doctor added successfully ✅");
      setDoctor({ name: "", specialization: "" });
    } else {
      console.error("Error adding doctor:", error);
      alert(`Something went wrong ❌: ${error.message}`);
    }
  };

  return (
    <div className="center-wrapper">

      <div className="form-container">

        <h1>Add Doctor</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={doctor.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={doctor.specialization}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Doctor
          </button>

        </form>

      </div>

    </div>
  );
}