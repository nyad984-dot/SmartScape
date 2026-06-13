import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, KeyRound, MapPin, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const complexes = [
  { 
    id: 'ZHK-001', 
    name: 'ЖК "Асыл Тас"', 
    address: 'ул. Абая 150', 
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    color: 'from-blue-600 to-cyan-500',
    shadow: 'shadow-blue-500/20'
  },
  { 
    id: 'ZHK-002', 
    name: 'ЖК "Манхэттен"', 
    address: 'пр. Мангилик Ел 50', 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    color: 'from-violet-600 to-purple-500',
    shadow: 'shadow-violet-500/20'
  },
  { 
    id: 'ZHK-003', 
    name: 'ЖК "Алтын Булак"', 
    address: 'ул. Толе Би 200', 
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-600 to-teal-500',
    shadow: 'shadow-emerald-500/20'
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (zhkId, value) => {
    setInputs(prev => ({ ...prev, [zhkId]: value }));
    if (errors[zhkId]) {
      setErrors(prev => ({ ...prev, [zhkId]: null }));
    }
  };

  const handleConnect = (zhk) => {
    const enteredId = inputs[zhk.id]?.trim();
    if (!enteredId) {
      setErrors(prev => ({ ...prev, [zhk.id]: 'Введите ID дашборда' }));
      return;
    }
    
    // Any ID entered will navigate to the assistant for demo purposes
    // Passing the ZHK name and ID to the assistant
    navigate(`/assistant?zhkId=${zhk.id}&name=${encodeURIComponent(zhk.name)}&dashId=${enteredId}`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 space-y-12 overflow-hidden relative flex flex-col items-center">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* HEADER SECTION */}
      <div className="text-center space-y-4 max-w-2xl mx-auto animate-rise z-10" style={{ animationDelay: '0s' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-xs font-bold tracking-wider mb-2 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" /> СИСТЕМА УПРАВЛЕНИЯ
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 tracking-tight drop-shadow-sm">
          Выбор Дашборда
        </h1>
        <p className="text-slate-500 text-base md:text-lg font-medium">
          Выберите ваш жилой комплекс и введите уникальный ID дашборда для подключения к панели управления и ИИ-ассистенту.
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
        {complexes.map((zhk, index) => (
          <div 
            key={zhk.id} 
            className={`glass bg-white/60 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 animate-rise group hover:-translate-y-2 ${zhk.shadow}`}
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            {/* Card Image Header */}
            <div className="h-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={zhk.image} 
                alt={zhk.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
              
              <div className="absolute bottom-4 left-5 z-20">
                <h3 className="text-2xl font-black text-white drop-shadow-md">{zhk.name}</h3>
                <div className="flex items-center gap-1.5 text-white/80 text-sm font-medium mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {zhk.address}
                </div>
              </div>

              <div className="absolute top-4 right-4 z-20">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-xl text-white shadow-lg">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 ml-1">
                  <KeyRound className="w-3.5 h-3.5" /> ID Дашборда
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Введите ID (напр. 12345)"
                    value={inputs[zhk.id] || ''}
                    onChange={(e) => handleInputChange(zhk.id, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleConnect(zhk)}
                    className={`w-full bg-slate-50/50 border ${errors[zhk.id] ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/70 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 shadow-inner`}
                  />
                  {errors[zhk.id] && (
                    <p className="text-rose-500 text-[11px] font-bold mt-1.5 ml-1 absolute -bottom-5">
                      {errors[zhk.id]}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleConnect(zhk)}
                className={`w-full bg-gradient-to-r ${zhk.color} text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Войти в дашборд
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
