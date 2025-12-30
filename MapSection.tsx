
import React, { useEffect, useRef } from 'react';
import { MapPin, Clock, Train } from 'lucide-react';
import L from 'leaflet';

const MapSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const position: [number, number] = [-34.912, -57.954];
      const map = L.map(mapRef.current, {
        center: position,
        zoom: 16,
        scrollWheelZoom: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
      }).addTo(map);

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: white; width: 12px; height: 12px; border: 2px solid black; border-radius: 50%;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      L.marker(position, { icon: customIcon }).addTo(map);

      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <section id="map" className="py-24 bg-[#121212] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="h-[450px] rounded-[2.5rem] overflow-hidden grayscale-map border border-white/10 shadow-2xl relative z-0" ref={mapRef}>
              <div className="absolute bottom-4 left-4 z-[500] bg-black/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white" />
                  <div>
                    <p className="text-white font-bold text-sm">Plaza Italia</p>
                    <p className="text-gray-500 text-xs">La Plata, Buenos Aires</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-pistilli text-white uppercase italic leading-none">UBICACIÓN</h2>
              <p className="text-gray-400 font-serif italic text-xl">En el corazón de la ciudad, donde convergen todos los caminos.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5">
                <Clock className="w-8 h-8 text-gray-500 mb-4" />
                <h3 className="text-white font-industrial uppercase tracking-widest mb-4">Salidas Diarias</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Mar - Jue</span>
                    <span className="text-white font-bold">19:30 - 23:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vie - Sáb</span>
                    <span className="text-white font-bold">19:30 - 01:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dom</span>
                    <span className="text-white font-bold">19:30 - 23:30</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5 flex flex-col justify-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Train className="w-8 h-8 text-white" />
                </div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Terminal</p>
                <p className="text-2xl font-industrial text-white">9 3/4 LA PLATA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
