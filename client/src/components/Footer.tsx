
import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Agent Flow</h3>
            <p className="text-sm text-gray-600">
              פתרונות AI מתקדמים לעסקים במגוון תחומים
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-gray-600 hover:text-primary">דף הבית</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-sm text-gray-600 hover:text-primary">אודות</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-sm text-gray-600 hover:text-primary">שירותים</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-sm text-gray-600 hover:text-primary">בלוג</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">משאבים</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact">
                  <a className="text-sm text-gray-600 hover:text-primary">צור קשר</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary">
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary">
                  תנאי שימוש
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">צור קשר</h3>
            <p className="text-sm text-gray-600 mb-2">info@agentflow.co.il</p>
            <p className="text-sm text-gray-600">03-0000000</p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Agent Flow. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
