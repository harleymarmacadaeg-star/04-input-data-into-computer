import React from 'react';

const Slide = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fadeIn w-full">
      
      {/* Section Header Slides (Part 1, Part 2...) */}
      {data.type === 'section' ? (
         <div className="flex flex-col items-center justify-center h-full bg-surface w-full rounded-3xl border-4 border-primary shadow-glow p-12">
            <h1 className="text-6xl md:text-7xl font-black text-primary mb-6 uppercase tracking-widest text-shadow">
              {data.title}
            </h1>
            <p className="text-2xl text-white font-medium max-w-3xl">{data.content}</p>
         </div>
      ) : (
        <>
          {/* Standard Title */}
          <h1 className="text-3xl md:text-5xl font-black text-primary mb-2 uppercase tracking-wide drop-shadow-md">
            {data.title}
          </h1>
          
          {/* Subtitle */}
          {data.subtitle && (
            <h2 className="text-2xl md:text-3xl font-bold text-white border-b-4 border-primary pb-2 inline-block">
              {data.subtitle}
            </h2>
          )}
          
          {/* Body Text */}
          {data.content && (
            <p className="text-xl md:text-2xl text-gray-100 font-medium max-w-4xl leading-relaxed">
              {data.content}
            </p>
          )}

          {/* Detailed Hardware Slide (New Type) */}
          {data.type === 'detail' && (
             <div className="bg-surface p-8 rounded-2xl border-l-8 border-primary shadow-card w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 mt-4">
                {data.icon && <data.icon size={120} className="text-primary shrink-0" strokeWidth={1.5} />}
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">Key Features:</h3>
                  <ul className="space-y-3">
                    {data.bullets.map((b, i) => (
                      <li key={i} className="text-xl text-gray-200 flex items-start gap-3">
                        <span className="text-primary mt-1">➤</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          )}

          {/* List Slide */}
          {data.type === 'list' && (
            <ul className="text-left space-y-4 bg-surface p-8 rounded-xl border-2 border-gray-600 shadow-card w-full max-w-3xl">
              {data.items.map((item, idx) => (
                <li key={idx} className="text-xl md:text-2xl flex items-start gap-4 text-white font-semibold">
                  <span className="w-4 h-4 bg-primary rounded-full mt-2 shrink-0 shadow-[0_0_10px_#FACC15]"></span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* Grid Slide */}
          {data.type === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 w-full">
              {data.items.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-6 bg-surface rounded-xl border-2 border-gray-600 shadow-card">
                  <item.icon size={64} className="text-primary mb-4" strokeWidth={2} />
                  <span className="font-bold text-xl text-white">{item.name}</span>
                  <span className="text-base text-gray-300 mt-2">{item.desc}</span>
                </div>
              ))}
            </div>
          )}

          {/* Info/Software Slide */}
          {data.type === 'info' && data.examples && (
            <div className="flex flex-wrap justify-center gap-8 mt-8 w-full">
              {data.examples.map((ex, idx) => (
                <div key={idx} className="flex flex-col items-center bg-surface p-6 rounded-2xl border-2 border-primary shadow-glow min-w-[250px]">
                  <ex.icon size={56} className="text-white mb-3" />
                  <h3 className="font-bold text-xl text-primary mb-1">{ex.name}</h3>
                  <p className="text-sm text-gray-300">{ex.desc}</p>
                </div>
              ))}
            </div>
          )}

          {data.footer && (
            <div className="mt-8 p-4 bg-surface text-primary border border-primary rounded-lg font-bold text-lg shadow-glow">
              ℹ️ {data.footer}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Slide;