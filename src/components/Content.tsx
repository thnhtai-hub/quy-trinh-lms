import React, { useEffect, useRef } from 'react';
import type { Step, SubStep, Actor } from '../types';

interface ContentProps {
  steps: Step[];
  onStepInView: (id: number) => void;
}

const ActorBadge: React.FC<{ actor: Actor }> = ({ actor }) => {
    const colorClasses: Record<Actor, string> = {
        'Giáo viên': 'bg-orange-100 text-orange-800',
        'Học sinh': 'bg-green-100 text-green-800',
        'Phụ huynh': 'bg-purple-100 text-purple-800',
    };
    return (
        <span className={`px-3 py-1 text-base font-medium rounded-full ${colorClasses[actor]}`}>
            {actor.toUpperCase()}
        </span>
    );
};


const SubStepCard: React.FC<{ subStep: SubStep }> = ({ subStep }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-700">
                {subStep.title}
            </h2>

            <div className="border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-slate-500 tracking-wider">NGƯỜI THỰC HIỆN</h3>
                    <ActorBadge actor={subStep.actor} />
                </div>

                {subStep.benefits && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-green-800 mb-2">Lợi ích:</h4>
                        <ul className="list-disc list-inside space-y-2 text-green-700 text-lg leading-relaxed">
                            {subStep.benefits.map((benefit, index) => (
                                <li key={index} className="pl-2">{benefit}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {subStep.why && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Tại sao cần:</h4>
                      <ul className="list-disc list-inside space-y-2 text-blue-700 text-lg leading-relaxed">
                          {subStep.why.map((reason, index) => (
                              <li key={index} className="pl-2">{reason}</li>
                          ))}
                      </ul>
                  </div>
                )}

                {subStep.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">Cần lưu ý:</h4>
                        <ul className="list-disc list-inside space-y-2 text-yellow-700 text-lg leading-relaxed">
                            {subStep.notes.map((note, index) => (
                                <li key={index} className="pl-2">{note}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

const DownArrow: React.FC = () => (
    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
    </svg>
);

const ExternalLinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5 0L21 6m0 0h-5.25M21 6v5.25" />
    </svg>
);


const Content: React.FC<ContentProps> = ({ steps, onStepInView }) => {
  const stepRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const headerHeight = 96; // Corresponds to scroll-mt-24 (6rem)

    const findActiveStep = () => {
      let activeId = 1;
      const refs = stepRefs.current;

      // Find the last step that has its top edge scrolled past the header's bottom edge.
      let lastStepIdAboveHeader = 0;
      refs.forEach((ref, id) => {
          if(ref && ref.getBoundingClientRect().top <= headerHeight + 1){
              lastStepIdAboveHeader = id;
          }
      });

      if (lastStepIdAboveHeader > 0) {
        activeId = lastStepIdAboveHeader;
      } else {
        // If no step is above the header (e.g., at the very top of the page), default to step 1.
        activeId = 1;
      }

      onStepInView(activeId);
    };
    
    const handleScroll = () => {
      // Throttle scroll events with requestAnimationFrame for performance.
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(findActiveStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check on mount
    findActiveStep();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [onStepInView]);

  return (
    <section className="flex-1 min-w-0">
      <div>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              id={`step-${step.id}`}
              ref={(el) => { stepRefs.current.set(step.id, el); }}
              className="bg-white rounded-xl shadow-md p-6 md:p-10 scroll-mt-24"
            >
              <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-4xl font-bold text-blue-700">
                  {`Bước ${step.id}: ${step.title} \u2192 ${step.subtitle}`}
                </h1>
                {(() => {
                  const actor = step.title;
                  switch (actor) {
                    case 'Giáo viên':
                      return (
                        <a
                          href="https://truong.hoccungai.vn/portal-module"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow"
                        >
                          <ExternalLinkIcon />
                          <span>Xem thao tác</span>
                        </a>
                      );
                    case 'Học sinh':
                      return (
                        <a
                          href="https://hoccungai.vn/sign-in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow"
                        >
                          <ExternalLinkIcon />
                          <span>Xem thao tác</span>
                        </a>
                      );
                    case 'Phụ huynh':
                      return (
                        <button
                          title="Chức năng dành cho phụ huynh sẽ sớm được ra mắt."
                          className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white text-base font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 shadow"
                        >
                          <ExternalLinkIcon />
                          <span>Xem thao tác</span>
                        </button>
                      );
                    default:
                      return (
                         <button
                            disabled
                            title="Chức năng này không áp dụng cho vai trò này"
                            className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 text-slate-500 text-base font-medium rounded-lg cursor-not-allowed"
                          >
                            <ExternalLinkIcon />
                            <span>Xem thao tác</span>
                          </button>
                      );
                  }
                })()}
              </header>
              <div className="space-y-8">
                {step.subSteps.map((subStep, subIndex) => (
                  <React.Fragment key={subStep.id}>
                    <SubStepCard subStep={subStep} />
                    {subIndex < step.subSteps.length - 1 && (
                      <div className="flex justify-center pt-8">
                        <DownArrow />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center py-12">
                <DownArrow />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Content;