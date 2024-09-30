// src/CompanyPage.jsx
import "./CompanyPage.scss";

function CompanyPage() {
  return (
    <div className="company-page">
      <header className="company-header">MITIC - Innovating the Future</header>
      <section className="company-description">
        <p>
          MITIC is a forward-thinking company that blends innovation and
          technology to deliver top-notch services. With a focus on sustainable
          growth and cutting-edge solutions, MITIC aims to shape the future of
          digital transformation. Our commitment to excellence drives us to
          exceed customer expectations every day.
        </p>
      </section>
      <section className="company-values">
        <h2 className="text-xl font-bold text-secondary mt-4">
          Our Core Values
        </h2>
        <ul>
          <li>Innovation</li>
          <li>Customer Satisfaction</li>
          <li>Teamwork</li>
          <li>Sustainability</li>
        </ul>
      </section>
    </div>
  );
}

export default CompanyPage;
