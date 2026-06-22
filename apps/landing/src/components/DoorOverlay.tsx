'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export function DoorOverlay() {
  const router     = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const busyRef    = useRef(false);

  useEffect(() => {
    gsap.set(overlayRef.current, { opacity: 0 });

    const onClose = (e: Event) => {
      if (busyRef.current) return;
      busyRef.current = true;
      const href = (e as CustomEvent<{ href: string }>).detail.href;

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 2.5,
        delay: 1.5,
        ease: 'power2.in',
        onComplete: () => {
          gsap.delayedCall(0.4, () => {
            sessionStorage.setItem('doorEntry', '1');
            router.push(href);
          });
        },
      });
    };

    const onOpen = () => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => { busyRef.current = false; },
      });
    };

    window.addEventListener('doorClose', onClose);
    window.addEventListener('doorOpen',  onOpen);
    return () => {
      window.removeEventListener('doorClose', onClose);
      window.removeEventListener('doorOpen',  onOpen);
    };
  }, [router]);

  return (
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0,
      background: 'rgba(45, 20, 5, 1)',
      opacity: 0,
      zIndex: 9997,
      pointerEvents: 'none',
    }} />
  );
}
