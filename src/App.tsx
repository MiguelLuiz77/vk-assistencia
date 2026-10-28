import { useEffect, useState } from 'react'
import { ArrowRight, BatteryCharging, Camera, Check, Menu, MessageCircle, PlugZap, Settings, ShieldCheck, Smartphone, Sparkles, UserRound, Wrench, X, type LucideIcon } from 'lucide-react'

const PHONE_NUMBER = '5512981214894'
const DEFAULT_MESSAGE = 'Olá! Vim pelo site da VK Assistência Técnica e gostaria de solicitar um orçamento para o meu celular.'
const INSTAGRAM_URL = 'https://www.instagram.com/vk_assistencia.tecnica?obrf=aXY4N25vcjVnbmV3'

function whatsappUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`
}

type IconName = 'whatsapp' | 'arrow' | 'screen' | 'battery' | 'plug' | 'camera' | 'software' | 'repair' | 'spark' | 'shield' | 'tool' | 'user' | 'check' | 'menu' | 'close' | 'instagram' | 'phone'

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const icons: Record<IconName, LucideIcon> = {
    whatsapp: MessageCircle,
    arrow: ArrowRight,
    screen: Smartphone,
    battery: BatteryCharging,
    plug: PlugZap,
    camera: Camera,
    software: Settings,
    repair: Wrench,
    spark: Sparkles,
    shield: ShieldCheck,
    tool: Wrench,
    user: UserRound,
    check: Check,
    menu: Menu,
    close: X,
    instagram: Camera,
    phone: Smartphone,
  }
  const Lucide = icons[name]
  return <Lucide width={size} height={size} strokeWidth={1.7} aria-hidden="true" />
}

const services: { title: string; icon: IconName }[] = [
  { title: 'Troca de tela', icon: 'screen' },
  { title: 'Troca de bateria', icon: 'battery' },
  { title: 'Conector de carga', icon: 'plug' },
  { title: 'Reparo de câmera', icon: 'camera' },
  { title: 'Software e sistema', icon: 'software' },
  { title: 'Outros reparos', icon: 'repair' },
]

const navItems = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre nós' },
  { id: 'contato', label: 'Contato' },
]

function Brand({ footer = false }: { footer?: boolean }) {
  return <a className={`brand${footer ? ' brand-footer' : ''}`} href="#inicio" aria-label="VK Assistência Técnica, início">
    <img src="/Logo.jpeg" alt="Logo da VK Assistência Técnica" />
    {!footer && <span className="brand-copy"><strong>VK ASSISTÊNCIA</strong><small>TÉCNICA</small></span>}
  </a>
}

function WhatsAppLink({ children, className = '', message, ariaLabel, onClick }: { children: React.ReactNode; className?: string; message?: string; ariaLabel?: string; onClick?: () => void }) {
  return <a className={className} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} onClick={onClick}>
    {children}
  </a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const sections = navItems.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section))
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5, 0.8] })
    sections.forEach((section) => observer.observe(section))

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
      revealObserver.disconnect()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const serviceMessage = (title: string) => `Olá! Vim pelo site da VK Assistência Técnica e gostaria de um orçamento para ${title.toLocaleLowerCase('pt-BR')}.`

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner container">
        <Brand />
        <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} size={25} />
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Navegação principal">
          {navItems.map((item) => <a key={item.id} className={activeSection === item.id ? 'active' : ''} href={`#${item.id}`} onClick={closeMenu}>{item.label}</a>)}
          <WhatsAppLink className="button button-primary mobile-nav-cta" ariaLabel="Fale conosco pelo WhatsApp" onClick={closeMenu}>
            <Icon name="whatsapp" size={18} />Fale conosco
          </WhatsAppLink>
        </nav>
        <WhatsAppLink className="button button-small header-cta" ariaLabel="Fale conosco pelo WhatsApp">
          <Icon name="whatsapp" size={19} /><span>Fale conosco</span>
        </WhatsAppLink>
      </div>
    </header>

    <main id="conteudo">
      <section className={`hero${videoFailed ? ' video-failed' : ''}`} id="inicio" aria-labelledby="hero-title">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/hero-fallback.jpg" aria-hidden="true" onError={() => setVideoFailed(true)}>
          <source src="/VideoHero.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy reveal is-visible">
            <p className="eyebrow"><span className="eyebrow-line" />Assistência técnica especializada</p>
            <h1 id="hero-title">Seu celular em<br /><span>boas mãos</span></h1>
            <p className="hero-description">Seu celular recebe o cuidado que merece. Somos especialistas em conserto de smartphones, com agilidade, qualidade e garantia.</p>
            <WhatsAppLink className="button button-primary" ariaLabel="Solicite seu orçamento pelo WhatsApp">
              <Icon name="whatsapp" /><span>Solicite seu orçamento</span><Icon name="arrow" size={19} />
            </WhatsAppLink>
            <div className="hero-points" aria-label="Diferenciais">
              <div><Icon name="user" /><span>Atendimento<br />personalizado</span></div>
              <div><Icon name="shield" /><span>Garantia<br />no serviço</span></div>
              <div><Icon name="tool" /><span>Técnicos<br />especializados</span></div>
            </div>
          </div>
        </div>
        <div className="hero-bottom-rule" />
      </section>

      <section className="services-section section-rule" id="servicos" aria-labelledby="services-title">
        <div className="container services-layout">
          <div className="section-copy reveal">
            <p className="eyebrow">Nossos serviços</p>
            <h2 id="services-title">Tudo o que seu celular precisa, <span>em um só lugar</span></h2>
            <p>Realizamos reparos com atenção aos detalhes, peças adequadas e atendimento especializado para diferentes marcas e modelos.</p>
            <WhatsAppLink className="button button-outline" message={DEFAULT_MESSAGE}>Solicitar orçamento <Icon name="arrow" size={18} /></WhatsAppLink>
          </div>
          <div className="service-grid">
            {services.map((service, index) => <WhatsAppLink key={service.title} className="service-card reveal" message={serviceMessage(service.title)} ariaLabel={`Solicitar orçamento para ${service.title} pelo WhatsApp`}>
              <span className="service-icon"><Icon name={service.icon} size={28} /></span>
              <span className="service-title">{service.title}</span>
              <span className="card-arrow"><Icon name="arrow" size={17} /></span>
              <span className="service-index">0{index + 1}</span>
            </WhatsAppLink>)}
          </div>
        </div>
      </section>

      <section className="brands-section section-rule" aria-labelledby="brands-title">
        <div className="container brands-layout">
          <div className="section-copy brands-copy reveal">
            <p className="eyebrow">Atendimento multimarcas</p>
            <h2 id="brands-title">Atendemos os principais <span>modelos</span></h2>
            <p>Do iPhone ao Android, cuidamos do seu celular com atenção, qualidade e profissionalismo.</p>
            <ul className="brand-list" aria-label="Marcas atendidas para consulta">
              {['Apple', 'Samsung', 'Motorola', 'Xiaomi', 'Redmi', 'realme'].map((brand) => <li key={brand}>{brand}</li>)}
            </ul>
            <p className="brand-note">Consulte a disponibilidade para o seu aparelho.</p>
            <WhatsAppLink className="button button-primary button-brand">Fale conosco no WhatsApp <Icon name="arrow" size={18} /></WhatsAppLink>
          </div>
        </div>
        <div className="brand-art">
          <img src="/brands-reference.jpg" alt="Composição de smartphones da imagem de referência" loading="eager" />
        </div>
      </section>

      <section className="about-section section-rule" id="sobre" aria-labelledby="about-title">
        <div className="container about-layout">
          <div className="section-copy about-copy reveal">
            <p className="eyebrow">Por que escolher a VK Assistência?</p>
            <h2 id="about-title">Qualidade, confiança <span>e agilidade</span></h2>
            <p>Nosso compromisso é oferecer um atendimento transparente e cuidadoso, buscando a melhor solução para o seu celular.</p>
            <div className="benefit-grid">
              <div className="benefit"><Icon name="spark" /><span>Atenção aos<br />detalhes</span></div>
              <div className="benefit"><Icon name="shield" /><span>Garantia conforme<br />as condições</span></div>
              <div className="benefit"><Icon name="user" /><span>Atendimento<br />personalizado</span></div>
              <div className="benefit"><Icon name="check" /><span>Transparência<br />e confiança</span></div>
            </div>
          </div>
        </div>
        <div className="about-art">
          <img src="/about-reference.jpg" alt="Celular da VK e ferramentas de manutenção da imagem de referência" loading="eager" />
        </div>
      </section>

      <section className="cta-section" id="contato" aria-labelledby="contact-title">
        <div className="cta-light" aria-hidden="true" />
        <div className="container cta-content reveal">
          <div><p className="eyebrow">A gente cuida disso</p><h2 id="contact-title">Seu celular precisa de reparo?</h2><p>Entre em contato e consulte as opções para o seu aparelho.</p></div>
          <WhatsAppLink className="button button-primary cta-button"><Icon name="whatsapp" />Pedir orçamento pelo WhatsApp<Icon name="arrow" size={19} /></WhatsAppLink>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-column"><Brand footer /><p>Seu celular, nossa especialidade.</p></div>
        <div className="footer-column"><h2>Links rápidos</h2>{navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</div>
        <div className="footer-column footer-social"><h2>Nos siga</h2><div className="social-links"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram da VK Assistência Técnica"><Icon name="instagram" size={24} /></a><WhatsAppLink ariaLabel="WhatsApp da VK Assistência Técnica"><Icon name="whatsapp" size={24} /></WhatsAppLink></div><a className="instagram-handle" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@vk_assistencia.tecnica</a></div>
        <div className="footer-column footer-contact"><h2>Fale conosco</h2><WhatsAppLink className="footer-phone"><Icon name="whatsapp" size={20} />+55 12 98121-4894</WhatsAppLink><p>Atendimento somente<br />com hora marcada.</p></div>
      </div>
      <div className="container footer-bottom"><p>VK Assistência Técnica. Todos os direitos reservados. <span>© {new Date().getFullYear()}</span></p><span className="footer-tagline"><i /> Seu celular, nossa especialidade.</span></div>
    </footer>
  </>
}

export default App
