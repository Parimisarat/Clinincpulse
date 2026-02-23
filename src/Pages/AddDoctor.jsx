import { useState } from "react";

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

    const response = await fetch("http://localhost:8082/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doctor)
    });

    if (response.ok) {
      alert("Doctor added successfully ✅");
      setDoctor({ name: "", specialization: "" });
    } else {
      alert("Something went wrong ❌");
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