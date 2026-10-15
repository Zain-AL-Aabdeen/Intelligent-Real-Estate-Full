import { FaChartLine, FaHome, FaMoneyBillWave, FaBriefcase } from "react-icons/fa";

function Services() {
  return (
    <section className="services">
      <h2>How Can We Help You?</h2>

      <div className="grid">

        <div className="card">
          <FaChartLine className="icon" />
          <h3>Market Analysis</h3>
          <p>Accurate data and insights to understand the market and make smart decisions</p>
        </div>

        <div className="card">
          <FaHome className="icon" />
          <h3>Smart Property Recommendations</h3>
          <p>Best properties based on your needs and budget</p>
        </div>

        <div className="card">
          <FaMoneyBillWave className="icon" />
          <h3>Property Valuation</h3>
          <p>Get an accurate property valuation within seconds</p>
        </div>

        <div className="card">
          <FaBriefcase className="icon" />
          <h3>Investment Consulting</h3>
          <p>Maximize your returns with expert investment advice</p>
        </div>

      </div>
    </section>
  );
}

export default Services;