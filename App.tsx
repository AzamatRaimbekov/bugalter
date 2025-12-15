import React, { useState, useEffect, useRef } from 'react';
import { Scene } from './components/Scene';
import { SERVICES, CONTACT_EMAIL, CONTACT_PHONE, STATS, ADVANTAGES, PROCESS_STEPS, FAQ } from './constants';
import { ServiceCard } from './components/ServiceCard';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, ChevronDown, Check, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" 
    });

    const hiddenElements = document.querySelectorAll('.reveal, .reveal-left');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-50 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      
      {/* 3D Background - Fixed Position */}
      <Scene />

      {/* Content Overlay */}
      <div className="relative z-10">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-900/70 backdrop-blur-xl transition-all duration-300">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center gap-3 font-serif text-2xl font-bold tracking-tight text-white cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo(0,0)}>
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                  P
                </div>
                <span className="tracking-wide">ProfAccountant</span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
                <button onClick={() => scrollToSection('about')} className="hover:text-white hover:scale-105 transition-all">Преимущества</button>
                <button onClick={() => scrollToSection('services')} className="hover:text-white hover:scale-105 transition-all">Услуги</button>
                <button onClick={() => scrollToSection('process')} className="hover:text-white hover:scale-105 transition-all">Процесс</button>
                <button onClick={() => scrollToSection('relocation')} className="hover:text-white hover:scale-105 transition-all">Релокация</button>
                <button onClick={() => scrollToSection('contact')} className="rounded-full bg-brand-500 px-6 py-2.5 text-white font-bold hover:bg-brand-600 transition-all hover:shadow-lg hover:shadow-brand-500/30 active:scale-95">
                  Связаться
                </button>
              </div>

              {/* Mobile Toggle */}
              <button className="md:hidden text-slate-300 p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl p-4 space-y-4 shadow-2xl animate-in slide-in-from-top-5">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-3 text-lg font-medium text-slate-300 border-b border-slate-800">Преимущества</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-3 text-lg font-medium text-slate-300 border-b border-slate-800">Услуги</button>
              <button onClick={() => scrollToSection('process')} className="block w-full text-left py-3 text-lg font-medium text-slate-300 border-b border-slate-800">Процесс</button>
              <button onClick={() => scrollToSection('relocation')} className="block w-full text-left py-3 text-lg font-medium text-slate-300 border-b border-slate-800">Релокация</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full rounded-xl bg-brand-500 py-4 text-center text-white font-bold shadow-lg mt-4">
                Связаться
              </button>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <header className="relative flex min-h-screen items-center justify-center pt-20">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="reveal">
              <div className="inline-block mb-6 rounded-full border border-brand-500/30 bg-brand-500/10 px-6 py-2 text-xs font-bold uppercase tracking-widest text-brand-400 backdrop-blur-md shadow-lg shadow-brand-500/10 animate-float">
                Профессиональная Бухгалтерия в Бишкеке
              </div>
              <h1 className="mx-auto mb-8 max-w-5xl font-serif text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl drop-shadow-2xl">
                Ваш бизнес — <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-200 to-brand-gold">
                  наша забота
                </span>
              </h1>
              <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-300 md:text-xl leading-relaxed">
                Комплексное бухгалтерское обслуживание, налоговое планирование и регистрация компаний для выхода на международные маркетплейсы. Мы берем рутину на себя.
              </p>
              <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group relative overflow-hidden rounded-full bg-brand-500 px-9 py-4 text-lg font-bold text-white transition-all hover:bg-brand-600 hover:scale-105 hover:shadow-xl hover:shadow-brand-500/40"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Получить консультацию
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="rounded-full border border-slate-600 bg-slate-900/40 backdrop-blur-sm px-9 py-4 text-lg font-bold text-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-500 hover:shadow-lg hover:shadow-white/5"
                >
                  Узнать больше
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="border-y border-white/5 bg-slate-900/60 backdrop-blur-sm py-16 reveal">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center group hover:transform hover:scale-110 transition-transform duration-300">
                  <p className="text-4xl font-bold text-white md:text-6xl font-serif bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="mt-3 text-sm font-bold uppercase tracking-widest text-brand-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section id="about" className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center reveal">
              <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-5xl">Почему выбирают нас</h2>
              <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full shadow-lg shadow-brand-500/50"></div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {ADVANTAGES.map((item, idx) => (
                <div key={idx} className="reveal group rounded-3xl bg-slate-800/30 border border-slate-700/50 p-8 backdrop-blur-md transition-all duration-500 hover:bg-slate-800/60 hover:-translate-y-2 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={32} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white group-hover:text-brand-400 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-24 md:py-32 bg-slate-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-20 md:text-center max-w-3xl mx-auto reveal">
              <span className="text-brand-500 font-bold tracking-widest uppercase text-sm mb-3 block">Наши компетенции</span>
              <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-5xl">Полный спектр услуг</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                От разовых консультаций до полного аутсорсинга бухгалтерии. Мы адаптируемся под потребности вашего бизнеса.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.filter(s => !s.highlight).map((service) => (
                <div key={service.id} className="reveal">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section id="process" className="py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="mb-20 text-center reveal">
              <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-5xl">Как мы работаем</h2>
            </div>
            
            <div className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
              {/* Connecting Line (Desktop) */}
              <div className="absolute top-10 left-0 hidden h-0.5 w-full bg-gradient-to-r from-brand-500/0 via-brand-500/30 to-brand-500/0 lg:block" />
              
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="reveal relative flex flex-col items-center text-center group">
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-slate-900 bg-slate-800 text-2xl font-bold text-white shadow-xl shadow-brand-500/10 transition-all duration-300 group-hover:bg-brand-500 group-hover:scale-110 group-hover:shadow-brand-500/40">
                    {step.number}
                  </div>
                  <h3 className="mt-8 mb-3 text-xl font-bold text-white group-hover:text-brand-400 transition-colors">{step.title}</h3>
                  <p className="text-slate-400 px-4 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Relocation & Marketplaces Feature Section */}
        <section id="relocation" className="relative py-24 md:py-32">
          {/* Background Gradient Spot */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/5 blur-[120px]" />
          
          <div className="container relative mx-auto px-4 md:px-6">
            <div className="reveal rounded-3xl border border-brand-gold/20 bg-gradient-to-b from-slate-800/90 to-slate-900/90 p-8 md:p-16 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              {/* Decorative shine */}
              <div className="absolute -top-24 -right-24 h-64 w-64 bg-brand-gold/10 blur-3xl rounded-full"></div>
              
              <div className="relative z-10 mb-16 md:text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-5 py-2 text-sm font-bold text-brand-gold mb-6 border border-brand-gold/20 animate-pulse-slow">
                  <Globe size={18} />
                  GLOBAL BUSINESS
                </div>
                <h2 className="font-serif text-3xl font-bold text-white md:text-5xl leading-tight">
                  Бизнес-миграция и <br/>Маркетплейсы
                </h2>
                <p className="mt-8 text-xl text-slate-300 md:mx-auto md:max-w-3xl leading-relaxed">
                  Откройте новые горизонты для вашего бизнеса. Мы помогаем предпринимателям из РФ и СНГ легально выйти на международные рынки через юрисдикцию Кыргызстана (Wildberries, Ozon, Amazon).
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 relative z-10">
                {SERVICES.filter(s => s.highlight).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="mb-12 text-center font-serif text-3xl font-bold text-white md:text-4xl reveal">Частые вопросы</h2>
            <div className="space-y-4">
              {FAQ.map((item, idx) => (
                <div key={idx} className="reveal-left overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-md transition-all duration-300 hover:bg-slate-800/50 hover:border-brand-500/30">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-6 text-left text-lg font-bold text-white transition-colors"
                  >
                    {item.question}
                    <ChevronDown className={`h-5 w-5 text-brand-500 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="p-6 pt-0 text-slate-300 leading-relaxed border-t border-slate-700/30 mt-2">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="reveal overflow-hidden rounded-3xl bg-slate-800/80 shadow-2xl border border-slate-700/50 backdrop-blur-lg">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 md:p-16 bg-gradient-to-br from-brand-900/80 to-slate-900/80 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl"></div>
                  
                  <h2 className="relative mb-6 font-serif text-4xl font-bold text-white">
                    Начните работу с нами сегодня
                  </h2>
                  <p className="relative mb-12 text-lg text-slate-300 leading-relaxed">
                    Заполните форму, и мы подготовим для вас персональное предложение в течение 24 часов.
                  </p>
                  
                  <div className="relative space-y-8">
                    <div className="flex items-start gap-5 group">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-brand-500/5">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-500 uppercase tracking-widest">Телефон / WhatsApp</p>
                        <p className="text-xl font-bold text-white mt-1 group-hover:text-brand-200 transition-colors">{CONTACT_PHONE}</p>
                        <p className="text-sm text-slate-400 mt-1">Пн-Пт: 09:00 - 18:00</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-5 group">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-brand-500/5">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-500 uppercase tracking-widest">Email</p>
                        <p className="text-xl font-bold text-white mt-1 group-hover:text-brand-200 transition-colors">{CONTACT_EMAIL}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 group">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-brand-500/5">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-500 uppercase tracking-widest">Офис</p>
                        <p className="text-xl font-bold text-white mt-1 group-hover:text-brand-200 transition-colors">г. Бишкек, Кыргызстан</p>
                        <p className="text-sm text-slate-400 mt-1">Работаем со всеми регионами</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10 md:p-16 bg-slate-900/60 backdrop-blur-md">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 ml-1">Имя</label>
                        <input 
                          type="text" 
                          className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-5 py-4 text-white placeholder-slate-500 focus:border-brand-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
                          placeholder="Иван Иванов"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 ml-1">Телефон</label>
                        <input 
                          type="tel" 
                          className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-5 py-4 text-white placeholder-slate-500 focus:border-brand-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
                          placeholder="+996..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-300 ml-1">Интересующая услуга</label>
                      <div className="relative">
                        <select className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-5 py-4 text-white focus:border-brand-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all cursor-pointer appearance-none">
                          <option>Бухгалтерское обслуживание</option>
                          <option>Регистрация компании / Маркетплейсы</option>
                          <option>Аудит</option>
                          <option>Консультация</option>
                          <option>Другое</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-300 ml-1">Сообщение</label>
                      <textarea 
                        rows={4}
                        className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-5 py-4 text-white placeholder-slate-500 focus:border-brand-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all resize-none"
                        placeholder="Опишите вашу задачу..."
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-5 text-lg font-bold text-white transition-all hover:from-brand-500 hover:to-brand-400 hover:shadow-xl hover:shadow-brand-500/20 active:scale-[0.98] mt-4"
                    >
                      Отправить заявку
                    </button>
                    
                    <p className="text-xs text-center text-slate-500">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-slate-900/90 backdrop-blur-md py-12">
          <div className="container mx-auto px-4 text-center md:flex md:justify-between md:text-left items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                 <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-brand-500/30">P</div>
                 <span className="font-serif text-2xl font-bold text-white">ProfAccountant</span>
              </div>
              <p className="text-sm text-slate-500 ml-1">Ваш надежный партнер в мире финансов.</p>
            </div>
            
            <div className="text-sm text-slate-500 font-medium">
              <p className="mb-2">&copy; {new Date().getFullYear()} Все права защищены.</p>
              <div className="space-x-6">
                <a href="#" className="hover:text-brand-500 transition-colors">Политика конфиденциальности</a>
                <a href="#" className="hover:text-brand-500 transition-colors">Публичная оферта</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;