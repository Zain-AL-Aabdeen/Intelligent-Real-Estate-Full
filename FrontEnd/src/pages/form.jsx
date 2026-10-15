import React, { useState } from "react";
import { TiAdjustContrast } from "react-icons/ti";
import "../pages/form.css"; 
import {
  FaMapMarkerAlt,
  FaHome,
  FaLayerGroup,
  FaBed,
  FaBath,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LangButton from "../components/LangButton";
import { MdOutlineChair } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";
import { getPropertyPrice } from "../api";
import { BiSolidHourglass } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa6";
function Form() {
  // الحالات الأساسية المتوافقة مع الباك إيند
  const [location, setLocation] = useState("akrama");
  const [condition, setCondition] = useState("normal");
  const [rooms, setRooms] = useState("1");
  const [furnished, setFurnished] = useState("unfurnished");
  const [area, setArea] = useState("");
  const [buildingAge, setBuildingAge] = useState("");
  const [floorNum, setFloorNum] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [bathrooms, setBathrooms] = useState("1");

  // 1️⃣ الاتجاهات (Checkboxes)
  const [orients, setOrients] = useState({
    north: false,
    south: false,
    east: false,
    west: false,
  });

  // 2️⃣ الخدمات القريبة (Checkboxes)
  const [services, setServices] = useState({
    main_street: false,
    shopping_center: false,
    bus_station: false,
    hospital: false,
    school: false,
  });

  const [predictedPrice, setPredictedPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOrientChange = (direction) => {
    setOrients((prev) => ({ ...prev, [direction]: !prev[direction] }));
  };

  const handleServiceChange = (serviceName) => {
    setServices((prev) => ({ ...prev, [serviceName]: !prev[serviceName] }));
  };

  // دالة دمج الاتجاهات للباك إيند
  const generateOrientationString = () => {
    const { north, south, east, west } = orients;
    if (north && east) return "north-east";
    if (north && west) return "north-west";
    if (south && east) return "south-east";
    if (south && west) return "south-west";
    if (south && north) return "south-north";
    if (east && west) return "east-west";
    if (east) return "east";
    if (west) return "west";
    if (north) return "north";
    if (south) return "south";
    return "north"; 
  };

  const handlePredictSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setPredictedPrice("");

    const selectedServicesArray = Object.keys(services).filter((key) => services[key]);
    
    const formData = {
      Location: location,
      Condition: condition,
      Orientation: generateOrientationString(),
      Furnished: furnished,
      Rooms: parseInt(rooms),
      Area_m2: parseFloat(area),
      Age_Years: parseInt(buildingAge) || 0,
      Floor: parseInt(floorNum) || 0,
      Building_Floor: parseInt(totalFloors) || 0,
      Bathrooms: parseInt(bathrooms),
      Services: selectedServicesArray.length > 0 ? selectedServicesArray : ["main_street"],
    };

    try {
      const result = await getPropertyPrice(formData);
      if (result && result.price !== undefined) {
        setPredictedPrice(result.price);
      } else {
        setPredictedPrice(JSON.stringify(result));
      }
    } catch (error) {
      console.error("Prediction Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage("Server Error: " + JSON.stringify(error.response.data));
      } else {
        setErrorMessage("Failed to process data. Please check connection and fields.");
      }
    } finally {
      setLoading(false);
    }
  };
  const [lightMode, setLightMode] = useState(false);
    const changeTheme = () => {
      setLightMode(!lightMode);
    }

  return (
    <div className={lightMode ? "parent-formlight" : "parent-form"} style={{ fontFamily: "Segoe UI, sans-serif" }} >
      <button onClick={changeTheme} id="li">
                    <TiAdjustContrast className="light"/> 
                  </button>
      <>
        <Navbar />
        <LangButton />

        <form className="aform-container" onSubmit={handlePredictSubmit}>
          <h2 className="form-title">Enter Property Specifications</h2>

          {errorMessage && (
            <p style={{ color: "#e74c3c", fontWeight: "bold", textAlign: "center", marginBottom: "15px" }}>
              {errorMessage}
            </p>
          )}

          <div className="form-grid">
            {/* --- الطرف الأيسر --- */}
            <div className="left-side">
              {/* Location */}
              <div className="box">
                <div className="label">
                  <FaMapMarkerAlt />
                  <span>Location</span>
                </div>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="akrama">Akrama</option>
                  <option value="muhajreen">Al-Muhajireen</option>
                  <option value="al-nuzha">Al-Nuzha</option>
                </select>
              </div>

              {/* Condition */}
              <div className="box">
                <div className="label">
                  <FaStar />
                  <span>Condition</span>
                </div>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="cond" checked={condition === "super-delux"} onChange={() => setCondition("super-delux")} /> Super Deluxe
                  </label>
                  <label>
                    <input type="radio" name="cond" checked={condition === "delux"} onChange={() => setCondition("delux")} /> Deluxe
                  </label>
                  <label>
                    <input type="radio" name="cond" checked={condition === "normal"} onChange={() => setCondition("normal")} /> Normal
                  </label>
                </div>
              </div>

              {/* Number of Rooms */}
              <div className="small-box">
                <div className="label">
                  <FaBed />
                  <span>Rooms Count</span>
                </div>
                <select className="small-select" value={rooms} onChange={(e) => setRooms(e.target.value)}>
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>{n + 1}</option>
                  ))}
                </select>
              </div>

              {/* Furnished */}
              <div className="box">
                <div className="furnish-row">
                  <div className="label">
                    <MdOutlineChair />
                    <span>Furnished</span>
                  </div>
                  <input type="radio" name="fur" checked={furnished === "furnished"} onChange={() => setFurnished("furnished")} />
                </div>
                <div className="furnish-row">
                  <div className="label">
                    <MdOutlineChair />
                    <span>Unfurnished</span>
                  </div>
                  <input type="radio" name="fur" checked={furnished === "unfurnished"} onChange={() => setFurnished("unfurnished")} />
                </div>
              </div>
            </div>

            {/* --- الطرف الأيمن --- */}
            <div className="right-side">
              {/* Area */}
              <div className="small-box">
                <div className="label">
                  <FaHome />
                  <span>Area (m²)</span>
                </div>
                <input type="number" required placeholder="e.g. 120" value={area} onChange={(e) => setArea(e.target.value)} />
              </div>

              {/* Building Age */}
              <div className="small-box">
                <div className="label">
                  <FaStar />
                  <span>Building Age (Years)</span>
                </div>
                <input type="number" required placeholder="e.g. 5" value={buildingAge} onChange={(e) => setBuildingAge(e.target.value)} />
              </div>

              {/* Floors */}
              <div className="box">
                <div className="floor-row">
                  <div className="label">
                    <FaLayerGroup />
                    <span>Floor Number</span>
                  </div>
                  <input type="number" className="tiny-input" required value={floorNum} onChange={(e) => setFloorNum(e.target.value)} />
                </div>
                <div className="floor-row">
                  <span className="plain-text">Total Building Floors</span>
                  <input type="number" className="tiny-input" required value={totalFloors} onChange={(e) => setTotalFloors(e.target.value)} />
                </div>
              </div>

              {/* Orientation */}
              <div className="box">
                <div className="label">
                  <BsArrowsFullscreen />
                  <span>Main Orientation (Select Multiple)</span>
                </div>
                <div className="orientation-grid">
                  <label><input type="checkbox" checked={orients.west} onChange={() => handleOrientChange("west")} /> West</label>
                  <label><input type="checkbox" checked={orients.north} onChange={() => handleOrientChange("north")} /> North</label>
                  <label><input type="checkbox" checked={orients.east} onChange={() => handleOrientChange("east")} /> East</label>
                  <label><input type="checkbox" checked={orients.south} onChange={() => handleOrientChange("south")} /> South</label>
                </div>
              </div>

              {/* Bathrooms */}
              <div className="small-box">
                <div className="label">
                  <FaBath />
                  <span>Bathrooms</span>
                </div>
                <select className="small-select" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="box services-box">
            <div className="label">
              <FaStar />
              <span>Nearby Services (Select Multiple)</span>
            </div>
            <div className="services-grid">
              <label><input type="checkbox" checked={services.main_street} onChange={() => handleServiceChange("main_street")} /> Main Street</label>
              <label><input type="checkbox" checked={services.shopping_center} onChange={() => handleServiceChange("shopping_center")} /> Shopping Center</label>
              <label><input type="checkbox" checked={services.bus_station} onChange={() => handleServiceChange("bus_station")} /> Bus Station</label>
              <label><input type="checkbox" checked={services.hospital} onChange={() => handleServiceChange("hospital")} /> Hospital</label>
              <label><input type="checkbox" checked={services.school} onChange={() => handleServiceChange("school")} /> School</label>
            </div>
          </div>

          {/* تم تعديل النص هنا ليصبح Predict فقط ومنفصل بشكل نظامي ومريح للعين 🎯 */}
          <button type="submit" className="ok-btn" disabled={loading}>
            {loading ? <BiSolidHourglass /> : "Predict"}
          </button>

          <div className="price-box">
            <div className="label">
              <FaArrowUp />
              <span>Estimated Price</span>
            </div>
            <input
              type="text"
              value={predictedPrice}
              readOnly
              placeholder="Price will appear here"
              style={{ fontWeight: "bold", color: "#2ecc71", textAlign: "center" }}
            /> <p>Each share equal 1 million syrian pounds</p>
          </div>
        </form>
        <Footer />
      </>
    </div>
  );
}

export default Form;