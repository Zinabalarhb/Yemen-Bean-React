import { Coffee, Filter, Droplet } from "lucide-react";
import "../styles/Brew.css";

const brewMethods = [
  {
    id: 1,
    title: "V60",
    disc: "طريقة ترشيح يابانية شهيرة تعطي كوب قهوة نقي ومتوازن. تناسب الحبوب ذات التحميص الفاتح والمتوسط وتبرز النكهات الفاكهية والحمضية.",
    grind: "درجة الطحن: متوسطة",
    icon: <Filter size={30} />
  },
  {
    id: 2,
    title: "إسبريسو",
    disc: "قهوة مركزة يتم تحضيرها بضغط عالٍ خلال وقت قصير. تعتبر الأساس للعديد من المشروبات مثل اللاتيه والكابتشينو.",
    grind: "درجة الطحن: ناعمة جدًا",
    icon: <Coffee size={30} />
  },
  {
    id: 3,
    title: "القهوة العربية",
    disc: "قهوة تقليدية خفيفة التحميص تُحضّر غالبًا مع الهيل وتُقدَّم في الدلة. تتميز برائحة عطرية ونكهة لطيفة.",
    grind: "درجة الطحن: خشنة",
    icon: <Droplet size={30} />
  },
];

export default function Brew() {
  return (
    <section id="brew" className="brew-section">

      <div className="container">

        <h2 className="text-center mb-3">طرق تحضير القهوة</h2>

        <p className="brew-description text-center mb-5">
          اكتشف أشهر طرق تحضير القهوة واستمتع بتجربة نكهات مختلفة لكل طريقة.
          اختيار طريقة التحضير المناسبة يساعدك على إبراز أفضل خصائص حبوب القهوة.
        </p>

        <div className="brew-cards-container">

          {brewMethods.map((brew) => (
            <div key={brew.id} className="brew-card">

              <div className="brew-icon">
                {brew.icon}
              </div>

              <h5 className="brew-title">
                {brew.title}
              </h5>

              <p className="brew-disc">
                {brew.disc}
              </p>

              <span className="brew-grind">
                {brew.grind}
              </span>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}