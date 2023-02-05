import "./App.css";
import { useState } from "react";
import { Popup } from "./components/Popup/Popup";
import { Gallerypopup } from "./components/Gallerypopup/Gallerypopup";

function Home() {
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [ethinicity, setEthinicity] = useState("");
  const [sleep, setSleep] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [systolic, setSystolic] = useState("");
  const [SFHL, setSFHL] = useState("");
  const [HFHL, setHFHL] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [open, setOpen] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gen: parseFloat(gender),
          age: parseFloat(age),
          eth: parseFloat(ethinicity),
          sleep_hrs: parseFloat(sleep),
          dpress: parseFloat(diastolic),
          spress: parseFloat(systolic),
          sfhl: parseFloat(SFHL),
          hfhl: parseFloat(HFHL),
          height: parseFloat(height),
          weight: parseFloat(weight),
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setGender("");
        setAge("");
        setEthinicity("");
        setSleep("");
        setDiastolic("");
        setSystolic("");
        setSFHL("");
        setHFHL("");
        setMessage(resJson["message"]);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <button onClick={() => setOpen(true)}> Graphs</button>
        {open ? <Gallerypopup closePopup={() => setOpen(false)} /> : null}
        <br />
        <br />
        <br />
        <label>
          Biological Sex
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled="true"></option>
            <option value="1">male</option>
            <option value="2">female</option>
          </select>
        </label>
        <label>
          Age
          <input
            type="number"
            value={age}
            placeholder="Age"
            min="18"
            max="120"
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          Ethinicity
          <select
            value={ethinicity}
            onChange={(e) => setEthinicity(e.target.value)}
            required
          >
            <option value="" disabled="true"></option>
            <option value="1">Mexican American</option>
            <option value="2">Other Hispanic</option>
            <option value="3">White</option>
            <option value="4">Black</option>
            <option value="6">Asian</option>
            <option value="7">Mixed</option>
          </select>
        </label>
        <label>
          Height
          <input
            type="number"
            value={height}
            placeholder="Height in cm"
            min="0"
            max="400"
            step="0.1"
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </label>
        <label>
          Weight
          <input
            type="number"
            value={weight}
            placeholder="Weight in kg"
            min="0"
            max="600"
            step="0.1"
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <label>
          Average hours of sleep
          <input
            type="number"
            value={sleep}
            placeholder="Sleep"
            min="0"
            max="24"
            step="0.1"
            onChange={(e) => setSleep(e.target.value)}
            required
          />
        </label>
        <label>
          Diastolic Pressure
          <input
            type="number"
            value={diastolic}
            placeholder="Diastolic Pressure in mmHg"
            min="0"
            max="300"
            step="0.01"
            onChange={(e) => setDiastolic(e.target.value)}
            required
          />
        </label>
        <label>
          Systolic Pressure
          <input
            type="number"
            value={systolic}
            placeholder="Systolic Pressure in mmHg"
            min="0"
            max="300"
            step="0.01"
            onChange={(e) => setSystolic(e.target.value)}
            required
          />
        </label>

        <label>
          Speech-Frequency Hearing Loss
          <input
            type="number"
            value={SFHL}
            placeholder="SFHL in Hz"
            min="-50"
            max="1500"
            step="0.001"
            onChange={(e) => setSFHL(e.target.value)}
            required
          />
        </label>

        <label>
          High-Frequency Hearing Loss
          <input
            type="number"
            value={HFHL}
            placeholder="HFHL in Hz"
            min="-50"
            max="1500"
            step="0.001"
            onChange={(e) => setHFHL(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>

        <div className="message">
          {message ? (
            <Popup text={message} closePopup={() => setMessage(false)} />
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default Home;
