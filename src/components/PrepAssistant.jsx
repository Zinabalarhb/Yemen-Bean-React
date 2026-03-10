import { useState } from "react";
import { Container, Button, Card, Form } from "react-bootstrap";
import { Coffee } from "lucide-react";
import "../styles/PrepAssistant.css";

// قائمة أنواع البن من الموقع
const coffeeTypes = [
  {
    name: "موكا يمنية",
    flavor: "حلوة",
    strength: "خفيفة",
    milk: "مع الحليب",
    image: "/images/moka.jpg",
    link: "/products/moka",
    description: "قهوة مع الشوكولاتة ونكهة حلوة خفيفة."
  },
  {
    name: "لاتيه كلاسيكي",
    flavor: "متوازنة",
    strength: "متوسطة",
    milk: "مع الحليب",
    image: "/images/latte.jpg",
    link: "/products/latte",
    description: "قهوة متوازنة سلسة مع الحليب."
  },
  {
    name: "اسبريسو يمني",
    flavor: "مرّة",
    strength: "قوية",
    milk: "بدون حليب",
    image: "/images/espresso.jpg",
    link: "/products/espresso",
    description: "اسبريسو مركز وقوي للذوق المره."
  },
  {
    name: "أمريكانو معتدل",
    flavor: "متوازنة",
    strength: "متوسطة",
    milk: "بدون حليب",
    image: "/images/americano.jpg",
    link: "/products/americano",
    description: "قهوة أمريكانو متوسطة القوة بدون حليب."
  }
];

export default function PrepAssistant() {
  const questions = [
    {
      question: "ما نوع النكهة التي تفضلها؟",
      options: ["حلوة", "مرّة", "متوازنة"]
    },
    {
      question: "هل تحب القهوة قوية أم خفيفة؟",
      options: ["قوية", "متوسطة", "خفيفة"]
    },
    {
      question: "هل تفضلها مع الحليب أم بدون؟",
      options: ["مع الحليب", "بدون حليب", "أي شيء"]
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [recommendedCoffee, setRecommendedCoffee] = useState(null);

  const handleOptionSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // حساب النتيجة الحقيقية
      const [flavor, strength, milk] = answers;
      const match = coffeeTypes.find(
        (coffee) =>
          (coffee.flavor === flavor || flavor === "أي شيء") &&
          (coffee.strength === strength || strength === "أي شيء") &&
          (coffee.milk === milk || milk === "أي شيء")
      );
      setRecommendedCoffee(match || {
        name: "جرب أي نوع حسب مزاجك ☕",
        image: "/images/default.jpg",
        link: "/products",
        description: "اكتشف أنواع القهوة الأخرى على موقعنا."
      });
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
    setRecommendedCoffee(null);
  };

  return (
    <section id="PrepAssistant" className="prep-section">
      <Container className="text-center">
        <h2 className="prep-title">مساعد التحضير</h2>
        <p className="prep-description">
          لا تعرف ماذا تختار؟ أجب على 3 أسئلة وسنرشح لك نوع البن المثالي لذوقك.
        </p>

        {!showResult ? (
          <Card className="prep-card">
            <Card.Body>
              <Card.Title className="question-title">
                {questions[currentStep].question}
              </Card.Title>

              <Form>
                {questions[currentStep].options.map((opt, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    name={`question-${currentStep}`}
                    label={opt}
                    id={`option-${currentStep}-${index}`}
                    onChange={() => handleOptionSelect(opt)}
                    checked={answers[currentStep] === opt}
                    className="prep-option"
                  />
                ))}
              </Form>

              <Button
                onClick={nextStep}
                disabled={answers[currentStep] == null}
                className="prep-btn"
              >
                {currentStep < questions.length - 1 ? "التالي" : "اعرض النتيجة"}
                <Coffee size={18} />
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Card className="prep-card result-card">
            <Card.Body>
              <Card.Title className="result-title">
                نوع القهوة المثالي لك:
              </Card.Title>

              <img
                src={recommendedCoffee.image}
                alt={recommendedCoffee.name}
                className="result-image"
              />

              <Card.Text className="result-text">
                <strong>{recommendedCoffee.name}</strong> <br />
                {recommendedCoffee.description}
              </Card.Text>

              <Button
                as="a"
                href={recommendedCoffee.link}
                target="_blank"
                className="prep-btn"
              >
                اكتشف المزيد
                <Coffee size={18} />
              </Button>

              <Button
                onClick={resetQuiz}
                className="prep-btn"
                style={{ marginLeft: "10px" }}
              >
                أعد المحاولة
                <Coffee size={18} />
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </section>
  );
}