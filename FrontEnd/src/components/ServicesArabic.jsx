import { FaChartLine, FaHome, FaMoneyBillWave, FaBriefcase } from "react-icons/fa";

function ServicesArabic() {
  return (
    <section className="servicesa">
      <h2>كيف يمكننا مساعدتك ؟</h2>

      <div className="grida">

        <div className="carda">
          <FaChartLine className="icon" />
          <h3>تحليل السوق</h3>
          <p>بيانات و رؤى دقيقة لفهم السوق و اتخاذ قرارات ذكية</p>
        </div>

        <div className="carda">
          <FaHome className="icona" />
          <h3>توصيات عقارية ذكية</h3>
          <p>أفضل أسعار العقارات بناءً على احتياجات و ميزانيتك</p>
        </div>

        <div className="carda">
          <FaMoneyBillWave className="icona" />
          <h3>تقدير قيمة العقار</h3>
          <p>احصل على تقدير دقيق لقيمة العقار خلال ثوانٍ</p>
        </div>

        <div className="carda">
          <FaBriefcase className="icona" />
          <h3>استشارات استثمارية</h3>
          <p>عزز ربحك بناءً على المستشار العقاري الذكي</p>
        </div>

      </div>
    </section>
  );
}

export default ServicesArabic;