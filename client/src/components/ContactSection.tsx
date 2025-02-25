import { FaWhatsapp, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export function ContactSection() {
  return (
    <section className="section bg-grid relative" id="contact">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">צור קשר</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://wa.me/+1234567890" className="social-icon">
              <FaWhatsapp className="w-8 h-8" />
            </a>
            <a href="https://linkedin.com/company/your-company" className="social-icon">
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a href="https://twitter.com/your-handle" className="social-icon">
              <FaTwitter className="w-8 h-8" />
            </a>
            <a href="mailto:contact@example.com" className="social-icon">
              <FaEnvelope className="w-8 h-8" />
            </a>
          </div>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            דבר איתנו
          </button>
        </div>
      </div>
    </section>
  );
}