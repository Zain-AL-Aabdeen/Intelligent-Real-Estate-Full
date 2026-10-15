import React, { useState } from "react";
import "../pages/form.css";
import { TiAdjustContrast } from "react-icons/ti";
import {
  FaMapMarkerAlt,
  FaHome,
  FaLayerGroup,
  FaBed,
  FaBath,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";
import NavbarArabic from "../components/NavbarArabic";
import FooterArabic from "../components/FooterArabic";
import LangButtona from "../components/LangButtona";
import { MdOutlineChair } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";
import { getPropertyPrice } from "../api";
import { BiSolidHourglass } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa6";

function FormAr() {
  // الحالات الأساسية
  const [location, setLocation] = useState("akrama");
  const [condition, setCondition] = useState("normal");
  const [rooms, setRooms] = useState("1");
  const [furnished, setFurnished] = useState("unfurnished");
  const [area, setArea] = useState("");
  const [buildingAge, setBuildingAge] = useState("");
  const [floorNum, setFloorNum] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [bathrooms, setBathrooms] = useState("1");

  // 1️⃣ الاتجاه الأساسي (Checkboxes)
  const [orients, setOrients] = useState({
    north: false,
    south: false,
    east: false,
    west: false,
  });

  // 2️⃣ الخدمات الأقرب (Checkboxes)
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

  // دالة التعامل مع تغيير خانات الاتجاهات
  const handleOrientChange = (direction) => {
    setOrients((prev) => ({ ...prev, [direction]: !prev[direction] }));
  };

  // دالة التعامل مع تغيير خانات الخدمات
  const handleServiceChange = (serviceName) => {
    setServices((prev) => ({ ...prev, [serviceName]: !prev[serviceName] }));
  };

  // دالة سحرية لدمج الاتجاهات المحددة لتطابق مفاتيح الـ MAP في الديجانغو بالملي
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
    return "north"; // افتراضي في حال لم يتم اختيار شيء
  };

  const handlePredictSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setPredictedPrice("");

    // تجميع الخدمات المختارة في مصفوفة نصوص
    const selectedServicesArray = Object.keys(services).filter((key) => services[key]);
    
    // بناء كائن البيانات النهائي المطابق للباك إيند
    const formData = {
      Location: location,
      Condition: condition,
      Orientation: generateOrientationString(), // دمج الاتجاهات المحددة هنا
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
        setErrorMessage("خطأ من السيرفر: " + JSON.stringify(error.response.data));
      } else {
        setErrorMessage("فشل السيرفر في معالجة البيانات. تأكدي من الاتصال ومطابقة الحقول.");
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
    <div className={lightMode ? "aparent-formlight" : "aparent-form"} style={{ fontFamily: "Cairo, sans-serif" }} dir="rtl">
      <button onClick={changeTheme} id="ali">
                    <TiAdjustContrast className="light"/> 
                  </button>
      <>
        <NavbarArabic />
        <LangButtona />

        <form className="aform-container" onSubmit={handlePredictSubmit}>
          <h2 className="form-title">إدخال مواصفات العقار</h2>

          {errorMessage && (
            <p style={{ color: "#e74c3c", fontWeight: "bold", textAlign: "center", marginBottom: "15px" }}>
              {errorMessage}
            </p>
          )}

          <div className="form-grid">
            {/* --- الطرف الأيسر --- */}
            <div className="left-side">
              {/* الموقع */}
              <div className="box">
                <div className="label">
                  <FaMapMarkerAlt />
                  <span>الموقع</span>
                </div>
                <select
                  style={{ fontFamily: "Cairo, sans-serif" }}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="akrama">عكرمة</option>
                  <option value="muhajreen">المهاجرين</option>
                  <option value="al-nuzha">النزهة</option>
                </select>
              </div>

              {/* الحالة */}
              <div className="box">
                <div className="label">
                  <FaStar />
                  <span>الحالة</span>
                </div>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="cond" checked={condition === "super-delux"} onChange={() => setCondition("super-delux")} /> سوبر ديلوكس
                  </label>
                  <label>
                    <input type="radio" name="cond" checked={condition === "delux"} onChange={() => setCondition("delux")} /> ديلوكس
                  </label>
                  <label>
                    <input type="radio" name="cond" checked={condition === "normal"} onChange={() => setCondition("normal")} /> عادي
                  </label>
                </div>
              </div>

              {/* عدد الغرف */}
              <div className="small-box">
                <div className="label">
                  <FaBed />
                  <span>عدد الغرف</span>
                </div>
                <select className="small-select" value={rooms} onChange={(e) => setRooms(e.target.value)}>
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>{n + 1}</option>
                  ))}
                </select>
              </div>

              {/* مفروش / غير مفروش */}
              <div className="box">
                <div className="furnish-row">
                  <div className="label">
                    <MdOutlineChair />
                    <span>مفروش</span>
                  </div>
                  <input type="radio" name="fur" checked={furnished === "furnished"} onChange={() => setFurnished("furnished")} />
                </div>
                <div className="furnish-row">
                  <div className="label">
                    <MdOutlineChair />
                    <span>غير مفروش</span>
                  </div>
                  <input type="radio" name="fur" checked={furnished === "unfurnished"} onChange={() => setFurnished("unfurnished")} />
                </div>
              </div>
            </div>

            {/* --- الطرف الأيمن --- */}
            <div className="right-side">
              {/* المساحة */}
              <div className="small-box">
                <div className="label">
                  <FaHome />
                  <span>المساحة (م²)</span>
                </div>
                <input type="number" required placeholder="مثال: 120" value={area} onChange={(e) => setArea(e.target.value)} />
              </div>

              {/* عمر البناء */}
              <div className="small-box">
                <div className="label">
                  <FaStar />
                  <span>عمر البناء (سنوات)</span>
                </div>
                <input type="number" required placeholder="مثال: 5" value={buildingAge} onChange={(e) => setBuildingAge(e.target.value)} />
              </div>

              {/* الطوابق */}
              <div className="box">
                <div className="floor-row">
                  <div className="label">
                    <FaLayerGroup />
                    <span>رقم الطابق</span>
                  </div>
                  <input type="number" className="tiny-input" required value={floorNum} onChange={(e) => setFloorNum(e.target.value)} />
                </div>
                <div className="floor-row">
                  <span className="plain-text">إجمالي طوابق البناء</span>
                  <input type="number" className="tiny-input" required value={totalFloors} onChange={(e) => setTotalFloors(e.target.value)} />
                </div>
              </div>

              {/* الاتجاه (تمت إعادته إلى Checkboxes بنجاح ✅) */}
              <div className="box">
                <div className="label">
                  <BsArrowsFullscreen />
                  <span>الاتجاه الأساسي (يمكن اختيار أكثر من اتجاه)</span>
                </div>
                <div className="orientation-grid">
                  <label><input type="checkbox" checked={orients.west} onChange={() => handleOrientChange("west")} /> غرب</label>
                  <label><input type="checkbox" checked={orients.north} onChange={() => handleOrientChange("north")} /> شمال</label>
                  <label><input type="checkbox" checked={orients.east} onChange={() => handleOrientChange("east")} /> شرق</label>
                  <label><input type="checkbox" checked={orients.south} onChange={() => handleOrientChange("south")} /> جنوب</label>
                </div>
              </div>

              {/* عدد الحمامات */}
              <div className="small-box">
                <div className="label">
                  <FaBath />
                  <span>عدد الحمامات</span>
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

          {/* الخدمات (تمت إعادتها إلى Checkboxes بنجاح ✅) */}
          <div className="box services-box">
            <div className="label">
              <FaStar />
              <span>الخدمات القريبة من العقار (يمكن اختيار متعدد)</span>
            </div>
            <div className="services-grid">
              <label><input type="checkbox" checked={services.main_street} onChange={() => handleServiceChange("main_street")} /> شارع رئيسي</label>
              <label><input type="checkbox" checked={services.shopping_center} onChange={() => handleServiceChange("shopping_center")} /> مركز تسوق</label>
              <label><input type="checkbox" checked={services.bus_station} onChange={() => handleServiceChange("bus_station")} /> محطة حافلات</label>
              <label><input type="checkbox" checked={services.hospital} onChange={() => handleServiceChange("hospital")} /> مستشفى</label>
              <label><input type="checkbox" checked={services.school} onChange={() => handleServiceChange("school")} /> مدرسة</label>
            </div>
          </div>

          <button type="submit" className="ok-btn" disabled={loading}>
            {loading ? <BiSolidHourglass /> : "موافق"}
          </button>

          <div className="price-box">
            <div className="label">
              <FaArrowUp/>
              <span> سعر العقار المتوقع هو</span>
            </div>
            <input
              type="text"
              value={predictedPrice}
              readOnly
              placeholder="سيظهر السعر هنا"
              style={{ fontWeight: "bold", color: "#2ecc71", textAlign: "center" }}
            /><p>كل سهم يساوي 1 مليون ل.س</p>
          </div>
        </form>
        <FooterArabic />
      </>
    </div>
  );
}

export default FormAr;