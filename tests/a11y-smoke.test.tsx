import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Erişilebilirlik smoke testi', () => {
  it('skip-link ve temel landmark öğelerini içerir', () => {
    function SampleLayout() {
      return (
        <div>
          <a href="#icerik" className="skip-link">
            İçeriğe geç
          </a>
          <header role="banner">
            <nav aria-label="Ana menü">
              <a href="/">Anasayfa</a>
            </nav>
          </header>
          <main id="icerik">
            <h1>Başlık</h1>
            <p>İçerik.</p>
          </main>
          <footer role="contentinfo">
            <p>Bu site bilgilendirme amaçlıdır; hukuki danışmanlık değildir.</p>
          </footer>
        </div>
      );
    }

    render(<SampleLayout />);

    expect(screen.getByText('İçeriğe geç')).toBeInTheDocument();
    expect(document.querySelector('header')).toBeTruthy();
    expect(document.querySelector('main')).toBeTruthy();
    expect(document.querySelector('footer')).toBeTruthy();
  });
});
