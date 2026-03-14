'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { RoutePoint } from '@/lib/types';

interface JourneyMapProps {
    points: RoutePoint[];
    journeyTitle: string;
}

export default function JourneyMap({ points, journeyTitle }: JourneyMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<unknown>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current || points.length === 0) return;

        // Dynamically import leaflet to avoid SSR issues
        import('leaflet').then((L) => {
            if (!mapRef.current || mapInstanceRef.current) return;

            // Compute centre of all points
            const avgLat = points.reduce((s, p) => s + p.lat, 0) / points.length;
            const avgLng = points.reduce((s, p) => s + p.lng, 0) / points.length;

            const map = L.map(mapRef.current!, {
                center: [avgLat, avgLng],
                zoom: 7,
                zoomControl: true,
                scrollWheelZoom: false,
            });

            mapInstanceRef.current = map;

            // OpenStreetMap tile layer — free, no API key
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 18,
            }).addTo(map);

            // Draw route polyline
            const latlngs = points.map((p) => [p.lat, p.lng] as [number, number]);
            L.polyline(latlngs, {
                color: '#C9A96E',
                weight: 2.5,
                opacity: 0.85,
                dashArray: '6, 6',
            }).addTo(map);

            // Add markers for each stop
            points.forEach((point, i) => {
                const isEndpoint = i === 0 || i === points.length - 1;

                const markerHtml = `
                    <div style="
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    ">
                        <div style="
                            width: ${isEndpoint ? '16px' : '12px'};
                            height: ${isEndpoint ? '16px' : '12px'};
                            border-radius: 50%;
                            background: ${isEndpoint ? '#C9A96E' : '#fff'};
                            border: 2.5px solid #C9A96E;
                            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
                        "></div>
                        <div style="
                            margin-top: 4px;
                            background: rgba(255,255,255,0.95);
                            border: 1px solid #e7e5e1;
                            border-radius: 6px;
                            padding: 2px 7px;
                            font-size: 10px;
                            font-family: sans-serif;
                            font-weight: 500;
                            color: #44403c;
                            white-space: nowrap;
                            box-shadow: 0 1px 4px rgba(0,0,0,0.12);
                        ">${point.name}</div>
                    </div>`;

                const icon = L.divIcon({
                    html: markerHtml,
                    className: '',
                    iconSize: [80, 50],
                    iconAnchor: [40, 8],
                    popupAnchor: [0, -10],
                });

                L.marker([point.lat, point.lng], { icon })
                    .addTo(map)
                    .bindPopup(
                        `<div style="font-family:sans-serif;min-width:140px;">
                            <div style="font-weight:600;color:#44403c;margin-bottom:4px;font-size:13px;">${point.name}</div>
                            ${point.description ? `<div style="color:#78716c;font-size:11px;line-height:1.4;">${point.description}</div>` : ''}
                        </div>`,
                        { maxWidth: 200 }
                    );
            });

            // Fit map bounds with padding
            const bounds = L.latLngBounds(latlngs);
            map.fitBounds(bounds, { padding: [40, 40] });
        });

        return () => {
            if (mapInstanceRef.current) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (mapInstanceRef.current as any).remove();
                mapInstanceRef.current = null;
            }
        };
    }, [points]);

    return (
        <div className="relative rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
            {/* Map header */}
            <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-sm border border-stone-100 rounded-xl px-3 py-2 shadow-sm">
                <p className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Route</p>
                <p className="text-stone-800 text-xs font-medium">{journeyTitle}</p>
            </div>

            {/* Leaflet map container */}
            <div ref={mapRef} style={{ height: '380px', width: '100%' }} />

            {/* Attribution helper */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-[400]" />
        </div>
    );
}
