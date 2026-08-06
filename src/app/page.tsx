"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Menu, Plus, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const QUESTION = "Se pesquisar sua empresa no Google, o que aparece?";

const SERVICES = [
  { number: "01", title: "Sites profissionais", text: "Sites modernos, rápidos e estrategicamente construídos para apresentar sua empresa e gerar novas oportunidades.", tag: "AUTORIDADE" },
  { number: "02", title: "Landing pages", text: "Páginas focadas em campanhas, produtos, serviços e conversão de visitantes em contatos.", tag: "CONVERSÃO" },
  { number: "03", title: "Presença digital", text: "Estrutura visual e estratégica para tornar sua empresa mais profissional, confiável e fácil de encontrar.", tag: "POSICIONAMENTO" },
  { number: "04", title: "Design e experiência", text: "Interfaces marcantes, responsivas e pensadas para criar uma navegação clara e memorável.", tag: "EXPERIÊNCIA" },
  { number: "05", title: "Otimização", text: "Performance, responsividade, estrutura técnica e boas práticas para uma experiência rápida em qualquer dispositivo.", tag: "PERFORMANCE" },
];

const PROCESS = [
  { number: "01", title: "Entendimento", text: "Conhecemos o negócio, o público e os objetivos do projeto." },
  { number: "02", title: "Estratégia", text: "Definimos a estrutura, a comunicação e o caminho que o visitante deverá percorrer." },
  { number: "03", title: "Criação", text: "Transformamos a estratégia em uma experiência visual moderna, responsiva e marcante." },
  { number: "04", title: "Desenvolvimento", text: "Construímos o site com atenção à performance, à usabilidade e aos detalhes." },
  { number: "05", title: "Publicação", text: "Colocamos a nova presença digital da empresa no ar." },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [comparison, setComparison] = useState(58);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setLoaded(true), reduceMotion ? 100 : 1250);

    const context = gsap.context(() => {
      if (reduceMotion) return;

      gsap.from(".hero-word", {
        yPercent: 115,
        opacity: 0,
        rotate: 3,
        duration: 1.05,
        stagger: 0.08,
        delay: 1.5,
        ease: "power4.out",
      });

      gsap.from(".hero-kicker, .scroll-hint", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.18,
        delay: 2,
        ease: "power2.out",
      });

      const phoneTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".search-story",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      phoneTimeline
        .fromTo(
          ".phone-stage",
          { yPercent: 90, rotateX: 30, rotateY: -28, rotateZ: -8, scale: 0.72 },
          { yPercent: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, ease: "none", duration: 0.28 },
        )
        .to(".story-intro", { opacity: 0, y: -60, duration: 0.08 }, 0.18)
        .to(".phone-screen", { backgroundColor: "#f7f6f2", duration: 0.08 }, 0.27)
        .to(".search-ui", { opacity: 1, duration: 0.06 }, 0.3)
        .fromTo(".typed-copy", { maxWidth: "0ch" }, { maxWidth: `${QUESTION.length}ch`, duration: 0.31, ease: "none" }, 0.34)
        .to(".result-1", { opacity: 1, y: 0, duration: 0.05 }, 0.68)
        .to(".result-2", { opacity: 1, y: 0, duration: 0.05 }, 0.75)
        .to(".result-3", { opacity: 1, y: 0, duration: 0.05 }, 0.82)
        .to(".result-4", { opacity: 1, y: 0, scale: 1, duration: 0.07 }, 0.89)
        .to(".phone-glow", { opacity: 0.9, scale: 1.35, duration: 0.12 }, 0.84)
        .to(".phone-stage", { scale: 3.8, yPercent: -2, duration: 0.11, ease: "power2.in" }, 0.96);

      gsap.to(".depth-grid", {
        yPercent: 18,
        scrollTrigger: { trigger: ".search-story", start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%" },
        });
      });

      gsap.from(".awareness-line > span", {
        yPercent: 115,
        rotate: 2,
        duration: 1,
        stagger: 0.14,
        ease: "power4.out",
        scrollTrigger: { trigger: ".awareness", start: "top 58%" },
      });

      gsap.to(".manifesto-track", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: 1 },
      });

      gsap.from(".process-step", {
        opacity: 0,
        x: 60,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-list", start: "top 75%" },
      });

      gsap.to(".process-progress span", {
        height: "100%",
        ease: "none",
        scrollTrigger: { trigger: ".process-list", start: "top 70%", end: "bottom 70%", scrub: true },
      });
    }, root);

    return () => {
      window.clearTimeout(timer);
      context.revert();
    };
  }, []);

  useEffect(() => {
    const pointer = document.querySelector<HTMLElement>(".custom-cursor");
    if (!pointer || window.matchMedia("(pointer: coarse)").matches) return;

    const move = (event: MouseEvent) => {
      gsap.to(pointer, { x: event.clientX, y: event.clientY, duration: 0.22, ease: "power2.out" });
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      pointer.classList.toggle("is-active", Boolean(target.closest("a, button, [data-cursor]")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <main ref={root}>
      <div className={`loader ${loaded ? "is-hidden" : ""}`} aria-hidden="true">
        <div className="loader-mark"><span>EFEITO</span><span>WEB</span></div>
        <div className="loader-line"><span /></div>
        <p>CONSTRUINDO PRESENÇA DIGITAL</p>
      </div>

      <div className="custom-cursor" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Efeito Web — início">
          <span className="brand-orbit" />EFEITO<span>WEB</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#solucao">Solução</a>
          <a href="#servicos">Serviços</a>
          <a href="#processo">Processo</a>
        </nav>
        <a className="header-cta magnetic" href="#contato">Iniciar projeto <span>↗</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <a href="#solucao" onClick={() => setMenuOpen(false)}>Solução</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#processo" onClick={() => setMenuOpen(false)}>Processo</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Iniciar projeto</a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="hero-data" aria-hidden="true"><span>17°01&apos;S</span><span>50°04&apos;W</span><span>ONLINE</span></div>
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span /> Presença digital com estratégia</p>
          <h1 aria-label="Sua empresa existe. Mas ela aparece?">
            <span className="line"><span className="hero-word">Sua empresa</span></span>
            <span className="line"><span className="hero-word outline">existe.</span></span>
            <span className="line question"><span className="hero-word">Mas ela <em>aparece?</em></span></span>
          </h1>
        </div>
        <div className="scroll-hint"><span>Role para descobrir</span><ArrowDown size={16} /></div>
        <div className="hero-index">01 <span>/</span> 06</div>
      </section>

      <section className="search-story" aria-label="Descubra como sua empresa aparece no Google">
        <div className="sticky-scene">
          <div className="depth-grid" aria-hidden="true" />
          <div className="story-intro">
            <span>O PRIMEIRO CONTATO</span>
            <p>acontece antes<br />de você perceber.</p>
          </div>
          <div className="phone-glow" aria-hidden="true" />
          <div className="phone-stage">
            <div className="phone-side phone-side-left"><i /><i /></div>
            <div className="phone">
              <div className="phone-speaker" />
              <div className="phone-screen">
                <div className="search-ui">
                  <div className="mini-status"><span>9:41</span><span>● ◔ ▰</span></div>
                  <div className="search-brand"><span>E</span><span>f</span><span>e</span><span>i</span><span>t</span><span>o</span></div>
                  <div className="search-bar">
                    <span className="search-icon" />
                    <span className="typed-wrap"><span className="typed-copy">{QUESTION}</span></span>
                    <span className="typed-cursor" />
                  </div>
                  <div className="search-results">
                    <p className="result-1">Nada?</p>
                    <p className="result-2">Um perfil desatualizado?</p>
                    <p className="result-3">Informações incompletas?</p>
                    <p className="result-4">Ou o seu concorrente?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="scene-label">PRESENÇA DIGITAL / 2026</p>
        </div>
      </section>

      <section className="first-transition" id="solucao">
        <p>A ausência também comunica.</p>
        <h2>Ser encontrado<br />é o começo.</h2>
      </section>

      <section className="awareness section-pad">
        <div className="section-marker"><span>02</span><i /> O que muda</div>
        <div className="awareness-copy">
          <div className="awareness-line"><span>Não basta ter</span></div>
          <div className="awareness-line"><span>uma empresa.</span></div>
          <div className="awareness-line accent-line"><span>Ela precisa ser <em>encontrada.</em></span></div>
          <div className="awareness-line small-line"><span>Precisa transmitir confiança.</span></div>
          <div className="awareness-line small-line offset-line"><span>Precisa transformar visitas em oportunidades.</span></div>
        </div>
        <aside className="awareness-note reveal-up">
          <span>VISIBILIDADE É O PRIMEIRO PASSO</span>
          <p>Se o seu negócio não ocupa o próprio espaço no digital, outra marca ocupa.</p>
        </aside>
      </section>

      <section className="solution-intro section-pad">
        <div className="solution-orbit" aria-hidden="true"><span /><i /><b>EW</b></div>
        <div className="solution-copy">
          <p className="eyebrow reveal-up"><span /> É aqui que a Efeito Web entra</p>
          <h2 className="reveal-up">Construímos presença<br />para quem quer <em>avançar.</em></h2>
          <div className="solution-columns reveal-up">
            <p>Nós construímos sites que posicionam empresas, fortalecem marcas e transformam presença digital em oportunidades reais.</p>
            <p>Criamos experiências profissionais, rápidas, responsivas e estratégicas para negócios que querem aparecer, transmitir autoridade e conquistar clientes.</p>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-track" aria-hidden="true">
          <span>EFEITO VISUAL</span><i>COM</i><span>ESTRATÉGIA</span><b>•</b><span>EFEITO VISUAL</span><i>COM</i><span>ESTRATÉGIA</span>
        </div>
        <div className="manifesto-body section-pad">
          <p className="manifesto-index">MANIFESTO / 03</p>
          <div className="manifesto-lines">
            <p className="reveal-up">Seu site não deve ser <span>apenas bonito.</span></p>
            <p className="reveal-up align-right">Ele precisa <em>comunicar.</em></p>
            <p className="reveal-up">Convencer.</p>
            <p className="reveal-up align-center">Ser lembrado.</p>
          </div>
          <div className="manifesto-signoff reveal-up">
            <span>Tecnologia com propósito.</span>
            <span>Presença que gera resultado.</span>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="servicos">
        <div className="services-heading">
          <div>
            <div className="section-marker"><span>03</span><i /> O que construímos</div>
            <h2 className="reveal-up">Soluções que<br /><em>movem negócios.</em></h2>
          </div>
          <p className="reveal-up">Do primeiro contato à publicação, cada decisão visual e técnica existe para reforçar sua marca e facilitar a próxima ação do cliente.</p>
        </div>

        <div className={`service-visual service-visual--${activeService + 1}`} aria-hidden="true">
          <span className="visual-ring" /><span className="visual-grid" />
          <strong>{SERVICES[activeService].tag}</strong>
        </div>

        <div className="service-list">
          {SERVICES.map((service, index) => (
            <article
              className={`service-row ${activeService === index ? "is-active" : ""}`}
              key={service.number}
              onMouseEnter={() => setActiveService(index)}
              onFocus={() => setActiveService(index)}
              tabIndex={0}
            >
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-arrow"><ArrowUpRight size={24} /></span>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison section-pad" aria-labelledby="comparison-title">
        <div className="comparison-head">
          <div className="section-marker"><span>04</span><i /> A transformação</div>
          <h2 id="comparison-title" className="reveal-up">O mesmo negócio.<br /><em>Outra percepção.</em></h2>
          <p>Arraste para comparar</p>
        </div>

        <div className="comparison-stage">
          <div className="comparison-pane comparison-before">
            <div className="mock-browser mock-before">
              <div className="mock-bar"><i /><i /><i /><span /></div>
              <div className="bad-site"><b>EMPRESA</b><nav>Início | Empresa | Serviços | Contato</nav><h3>Bem-vindo ao nosso site</h3><p>Qualidade e compromisso há muitos anos.</p><button>Saiba mais</button><div className="bad-boxes"><i /><i /><i /></div></div>
            </div>
            <div className="state-label"><span>ANTES</span><p>Genérico. Confuso. Esquecível.</p></div>
          </div>

          <div className="comparison-pane comparison-after" style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}>
            <div className="mock-browser mock-after">
              <div className="mock-bar"><i /><i /><i /><span /></div>
              <div className="good-site"><header><b>MARCA<span>+</span></b><small>ESTRATÉGIA / DIGITAL</small></header><p>PRESENÇA QUE POSICIONA</p><h3>Seu negócio,<br /><em>impossível de ignorar.</em></h3><button>CONHEÇA A EXPERIÊNCIA ↗</button><div className="good-glow" /></div>
            </div>
            <div className="state-label after-label"><span>DEPOIS</span><p>Profissional. Claro. Memorável.</p></div>
          </div>

          <div className="comparison-handle" style={{ left: `${comparison}%` }}><span>↔</span></div>
          <input
            aria-label="Comparar presença digital antes e depois"
            type="range"
            min="12"
            max="88"
            value={comparison}
            onChange={(event) => setComparison(Number(event.target.value))}
          />
        </div>
        <div className="comparison-benefits reveal-up">
          {["Identidade profissional", "Comunicação clara", "Site responsivo", "Carregamento rápido", "Mais autoridade"].map((item) => <span key={item}><Check size={13} />{item}</span>)}
        </div>
      </section>

      <section className="process section-pad" id="processo">
        <div className="process-heading">
          <div className="section-marker"><span>05</span><i /> Como fazemos</div>
          <h2 className="reveal-up">Da ideia ao<br /><em>efeito.</em></h2>
          <p className="reveal-up">Um processo claro, próximo e estratégico. Você acompanha cada escolha que transforma sua presença digital.</p>
        </div>
        <div className="process-wrap">
          <div className="process-progress" aria-hidden="true"><span /></div>
          <div className="process-list">
            {PROCESS.map((step) => (
              <article className="process-step" key={step.number}>
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                <i />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work section-pad" id="projetos">
        <div className="work-heading">
          <div className="section-marker"><span>06</span><i /> Projetos selecionados</div>
          <h2 className="reveal-up">O trabalho fala<br /><em>quando ganha forma.</em></h2>
        </div>
        <div className="work-grid">
          <article className="project-panel project-a" data-cursor="VER">
            <div className="project-art"><span>01</span><div className="project-ui"><i /><i /><i /></div><b>IDENTIDADE<br />EM MOVIMENTO</b></div>
            <div className="project-info"><div><span>ESTUDO AUTORAL / 2026</span><h3>Presença institucional</h3></div><Plus size={22} /></div>
          </article>
          <article className="project-panel project-b" data-cursor="VER">
            <div className="project-art"><span>02</span><div className="project-orbit"><i /><i /></div><b>CONVERSÃO<br />COM CLAREZA</b></div>
            <div className="project-info"><div><span>ESTUDO AUTORAL / 2026</span><h3>Landing page estratégica</h3></div><Plus size={22} /></div>
          </article>
        </div>
        <p className="project-note">Painéis conceituais preparados para receber os projetos reais da Efeito Web — sem métricas ou empresas fictícias.</p>
      </section>

      <section className="final-cta" id="contato">
        <div className="cta-orbit" aria-hidden="true"><span /><i /><b /></div>
        <p className="eyebrow reveal-up"><span /> Sua próxima presença começa aqui</p>
        <h2 className="reveal-up">Quando pesquisarem<br />sua empresa, <em>o que<br />vão encontrar?</em></h2>
        <p className="cta-sub reveal-up">Vamos construir uma presença digital à altura do seu negócio.</p>
        <div className="cta-actions reveal-up">
          <a className="primary-cta" href="https://wa.me/5517991757562" target="_blank" rel="noreferrer" data-cursor="FALAR">Quero transformar minha presença <ArrowUpRight size={22} /></a>
          <a className="secondary-cta" href="https://wa.me/5517991757562" target="_blank" rel="noreferrer">Falar com a Efeito Web <span>↗</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <a className="footer-brand" href="#inicio"><span>EFEITO</span>WEB<i /></a>
          <p>Construindo presença.<br />Criando efeito.</p>
        </div>
        <div className="footer-grid">
          <div><span>CONTATO</span><a href="tel:+5517991757562">+55 17 99175-7562</a><a href="https://wa.me/5517991757562" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
          <div><span>NAVEGAÇÃO</span><a href="#solucao">Solução</a><a href="#servicos">Serviços</a><a href="#processo">Processo</a><a href="#projetos">Projetos</a></div>
          <div><span>ATENDIMENTO</span><p>Nhandeara — SP</p><p>Projetos em todo o Brasil</p></div>
          <div><span>SOCIAL</span><a href="#contato">Instagram ↗</a><a href="#contato">LinkedIn ↗</a><a href="#contato">Behance ↗</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Efeito Web</span><a href="#contato">Política de privacidade</a><span>DESIGN • ESTRATÉGIA • TECNOLOGIA</span></div>
      </footer>
    </main>
  );
}
