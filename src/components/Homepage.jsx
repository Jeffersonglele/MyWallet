import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Target, PieChart, ArrowRight, Zap, Shield, Sparkles, ArrowUpRight } from 'lucide-react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import logo from '../assets/logo_wallet.png';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const typedElement = React.useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    const typed = new Typed(typedElement.current, {
      strings: ['MY WALLET'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      backDelay: 2000,
    });

    const balanceInterval = setInterval(() => {
      setBalance(prev => {
        if (prev < 400) {
          return prev + 25;
        }
        return 400;
      });
    }, 100);

    const lineInterval = setInterval(() => {
      setLineProgress(prev => {
        if (prev < 100) return prev + 1;
        return 100;
      });
    }, 50);

    const transactionsList = [
      { id: 1, name: 'Salaire', amount: '+2,500€', type: 'income', icon: '💰', delay: 1500 },
      { id: 2, name: 'Netflix', amount: '-15.99€', type: 'expense', icon: '📺', delay: 2500 },
      { id: 3, name: 'Restaurant', amount: '-42.50€', type: 'expense', icon: '🍽️', delay: 3500 },
    ];

    transactionsList.forEach(transaction => {
      setTimeout(() => {
        setTransactions(prev => [...prev, transaction]);
      }, transaction.delay);
    });

    return () => {
      typed.destroy();
      clearInterval(balanceInterval);
      clearInterval(lineInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Suivi des dépenses",
      description: "Analysez vos transactions en temps réel et identifiez vos habitudes de consommation",
      gradient: "from-orange-500/20 to-red-500/10"
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Gestion du budget",
      description: "Créez des budgets personnalisés et recevez des alertes intelligentes",
      gradient: "from-violet-500/20 to-purple-500/10"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Objectifs financiers",
      description: "Définissez et atteignez vos objectifs d'épargne avec des plans sur mesure",
      gradient: "from-green-500/20 to-teal-500/10"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité maximale",
      description: "Vos données sont protégées par un cryptage de niveau bancaire",
      gradient: "from-orange-500/20 to-violet-500/10"
    }
  ];

  const getCardPosition = (baseY, index) => {
    const scrollProgress = Math.min(scrollY / 400, 1);
    return baseY * scrollProgress;
  };

  const linePoints = [
    { x: 0, y: 70 },
    { x: 15, y: 65 },
    { x: 30, y: 55 },
    { x: 45, y: 45 },
    { x: 60, y: 35 },
    { x: 75, y: 25 },
    { x: 90, y: 15 },
    { x: 100, y: 10 }
  ];

  const createPath = () => {
    const progress = lineProgress / 100;
    const visiblePoints = linePoints.slice(0, Math.ceil(linePoints.length * progress));
    
    if (visiblePoints.length < 2) return '';
    
    let path = `M ${visiblePoints[0].x} ${visiblePoints[0].y}`;
    for (let i = 1; i < visiblePoints.length; i++) {
      const xc = (visiblePoints[i].x + visiblePoints[i - 1].x) / 2;
      const yc = (visiblePoints[i].y + visiblePoints[i - 1].y) / 2;
      path += ` Q ${visiblePoints[i - 1].x} ${visiblePoints[i - 1].y}, ${xc} ${yc}`;
    }
    const lastPoint = visiblePoints[visiblePoints.length - 1];
    path += ` T ${lastPoint.x} ${lastPoint.y}`;
    return path;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold" ref={typedElement}></span>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <button className="px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-sm sm:text-base font-medium rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 orbitron-font shadow-lg">
              Connexion
            </button>
            <button className="learn-more small">
              <span className="circle"></span>
              <span className="icon arrow"></span>
              <span className="button-text">Inscription</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                Prenez le contrôle de vos
                <span className="text-orange-500"> finances</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                Suivez vos dépenses, fixez vos objectifs, construisez votre liberté financière.
              </p>
              <button className="learn-more medium">
                <span className="circle"></span>
                <span className="icon arrow"></span>
                <span className="button-text">Commencer maintenant</span>
              </button>
            </div>

            {/* Right - Wallet Animation */}
            <div className={`flex items-center justify-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'} mt-8 lg:mt-0`}>
              <motion.div 
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Wallet animation content */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Wallet Base */}
                  <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-40 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-3xl shadow-2xl border-4 border-white/50"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-2 bg-gray-400/50 rounded-full"></div>
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="flex items-center justify-between opacity-40">
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                        <div className="text-gray-500 text-xs font-semibold">MY WALLET</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 1 - Blue */}
                  <motion.div
                    className="absolute bottom-10 sm:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 w-40 h-24 sm:w-48 sm:h-28 lg:w-56 lg:h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
                    animate={{
                      y: getCardPosition(-110, 0),
                      rotateZ: scrollY > 200 ? -12 : 0,
                      opacity: scrollY > 150 ? 1 : 0,
                      scale: scrollY > 150 ? 1 : 0.8
                    }}
                    transition={{
                      y: { duration: 0.8, ease: "easeOut" },
                      rotateZ: { duration: 0.8, ease: "easeOut" },
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                    <div className="p-2.5 sm:p-3 lg:p-4 relative z-10">
                      <div className="w-8 h-6 sm:w-10 sm:h-7 lg:w-12 lg:h-9 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-md sm:rounded-lg mb-3 sm:mb-4 lg:mb-6 shadow-md relative">
                        <div className="absolute inset-1 border border-yellow-600/30 rounded"></div>
                      </div>
                      <div className="text-white text-xs sm:text-sm lg:text-base font-mono tracking-wider mb-1 sm:mb-2">**** 4521</div>
                      <div className="flex justify-between items-end">
                        <div className="text-white/80 text-[8px] sm:text-[10px] lg:text-xs">VISA</div>
                        <div className="text-white/80 text-[8px] sm:text-[10px] lg:text-xs">12/26</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2 - Orange */}
                  <motion.div
                    className="absolute bottom-10 sm:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 w-40 h-24 sm:w-48 sm:h-28 lg:w-56 lg:h-32 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
                    animate={{
                      y: getCardPosition(-70, 1),
                      rotateZ: scrollY > 100 ? 0 : 0,
                      opacity: scrollY > 80 ? 1 : 0,
                      scale: scrollY > 80 ? 1 : 0.8
                    }}
                    transition={{
                      y: { duration: 0.8, ease: "easeOut" },
                      rotateZ: { duration: 0.8, ease: "easeOut" },
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                    <div className="p-2.5 sm:p-3 lg:p-4 relative z-10">
                      <div className="w-8 h-6 sm:w-10 sm:h-7 lg:w-12 lg:h-9 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-md sm:rounded-lg mb-3 sm:mb-4 lg:mb-6 shadow-md relative">
                        <div className="absolute inset-1 border border-yellow-600/30 rounded"></div>
                      </div>
                      <div className="text-white text-xs sm:text-sm lg:text-base font-mono tracking-wider mb-1 sm:mb-2">**** 7892</div>
                      <div className="flex justify-between items-end">
                        <div className="text-white/80 text-[8px] sm:text-[10px] lg:text-xs">MASTERCARD</div>
                        <div className="text-white/80 text-[8px] sm:text-[10px] lg:text-xs">12/26</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3 - Green */}
                  <motion.div
                    className="absolute bottom-10 sm:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 w-40 h-24 sm:w-48 sm:h-28 lg:w-56 lg:h-32 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
                    animate={{
                      y: getCardPosition(-30, 2),
                      rotateZ: scrollY > 50 ? 10 : 0,
                      opacity: scrollY > 30 ? 1 : 0,
                      scale: scrollY > 30 ? 1 : 0.8
                    }}
                    transition={{
                      y: { duration: 0.8, ease: "easeOut" },
                      rotateZ: { duration: 0.8, ease: "easeOut" },
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                    <div className="p-2.5 sm:p-3 lg:p-4 relative z-10">
                      <div className="w-8 h-6 sm:w-10 sm:h-7 lg:w-12 lg:h-9 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-md sm:rounded-lg mb-3 sm:mb-4 lg:mb-6 shadow-md relative">
                        <div className="absolute inset-1 border border-yellow-600/30 rounded"></div>
                      </div>
                      <div className="text-white text-xs sm:text-sm lg:text-base font-mono tracking-wider mb-1 sm:mb-2">**** 3345</div>
                      <div className="flex justify-between items-end">
                        <div className="text-white/80 text-[8px] sm:text-[10px] lg:text-xs">AMEX</div>
                        <div className="text-white/80 text-[8px] sm:text-[10px] lg:text-xs">12/26</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 -z-10"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-green-500/30 rounded-full blur-3xl"></div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Fonctionnalités clés
            </h2>
            <p className="text-gray-400 text-base sm:text-lg px-4">
              Tout ce dont vous avez besoin pour gérer vos finances intelligemment
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:-translate-x-2 group transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`bg-gradient-to-br ${feature.gradient} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {React.cloneElement(feature.icon, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden max-w-sm mx-auto lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-violet-500/5 pointer-events-none"></div>
                <div className="relative flex items-center justify-center">
                  <div className="relative w-[280px] h-[500px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] shadow-2xl border-[6px] border-gray-900">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-3xl z-20"></div>
                      <div className="absolute inset-2 bg-black rounded-[2rem] overflow-hidden">
                        <div className="bg-gradient-to-b from-gray-900 to-transparent px-5 py-2 flex justify-between items-center text-xs text-white">
                          <span>9:41</span>
                          <div className="flex gap-1 items-center">
                            <div className="w-3 h-2 border border-white rounded-sm"></div>
                          </div>
                        </div>
                        <div className="px-4 py-3">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-gray-400 text-[10px]">Bonjour,</div>
                              <div className="text-white font-bold text-sm">Alex Martin</div>
                            </div>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center">
                              <img src={logo} alt="Logo" className="w-8 h-8" />
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 mb-3 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20">
                              <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full blur-3xl"></div>
                            </div>
                            <div className="relative z-10">
                              <div className="text-orange-100 text-[10px] mb-1">Solde total</div>
                              <div className="text-white text-2xl font-bold mb-2">
                                €{balance.toLocaleString('fr-FR')}
                              </div>
                              <div className="flex gap-2">
                                <div className="flex items-center gap-1 text-white/90">
                                  <ArrowUpRight className="w-3 h-3" />
                                  <span className="text-[10px]">+12.5%</span>
                                </div>
                                <div className="text-white/70 text-[10px]">ce mois</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-900 rounded-xl p-3 mb-3">
                            <div className="text-white text-[10px] font-semibold mb-2">Aperçu mensuel</div>
                            <div className="relative h-16 w-full">
                              <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                <path d={`${createPath()} L ${lineProgress} 80 L 0 80 Z`} fill="url(#lineGradient2)" />
                                <path d={createPath()} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                {lineProgress > 0 && (
                                  <circle
                                    cx={linePoints[Math.floor((linePoints.length - 1) * lineProgress / 100)]?.x || 0}
                                    cy={linePoints[Math.floor((linePoints.length - 1) * lineProgress / 100)]?.y || 0}
                                    r="2"
                                    fill="#f97316"
                                    className="animate-pulse"
                                  />
                                )}
                              </svg>
                            </div>
                          </div>
                          <div>
                            <div className="text-white text-[10px] font-semibold mb-2">Transactions récentes</div>
                            <div className="space-y-2">
                              {transactions.map((transaction, index) => (
                                <div
                                  key={transaction.id}
                                  className="bg-gray-900 rounded-lg p-2 flex items-center justify-between"
                                  style={{ animation: `slideIn 0.5s ease-out ${index * 0.1}s both` }}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center text-sm">
                                      {transaction.icon}
                                    </div>
                                    <div>
                                      <div className="text-white text-[10px] font-medium">{transaction.name}</div>
                                      <div className="text-gray-500 text-[8px]">Aujourd'hui</div>
                                    </div>
                                  </div>
                                  <div className={`text-[10px] font-semibold ${transaction.type === 'income' ? 'text-green-400' : 'text-gray-400'}`}>
                                    {transaction.amount}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-500 rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
                Commencez à gérer votre argent intelligemment dès aujourd'hui
              </h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 px-2">
                Rejoignez des milliers d'utilisateurs qui ont pris le contrôle de leurs finances
              </p>
              <button className="learn-more large orange-bg">
                <span className="circle"></span>
                <span className="icon arrow"></span>
                <span className="button-text">S'inscrire gratuitement</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm sm:text-base">
          <p>© 2026 MY WALLET. Tous droits réservés.</p>
        </div>
      </footer>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;