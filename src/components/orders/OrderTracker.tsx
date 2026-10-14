import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Bike,
  Package,
  XCircle,
  RotateCcw,
  Navigation,
  MapPin,
  ShieldCheck,
  Phone,
  UtensilsCrossed,
  Flame,
  KeyRound,
  MessageSquare,
} from 'lucide-react';
import type { Order, OrderStatus } from '../../types';
import { LiveTrackingConsentModal } from '../compliance/LiveTrackingConsentModal';

interface OrderTrackerProps {
  order: Order;
}

const FOOD_STEP_DEFINITIONS: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { key: 'placed', label: 'Order Received', icon: <Clock size={16} /> },
  { key: 'confirmed', label: 'Kitchen Preparing 🍳', icon: <Flame size={16} /> },
  { key: 'packed', label: 'Packed Hot 🛍️', icon: <Package size={16} /> },
  { key: 'out_for_delivery', label: 'Rider on the Way 🛵', icon: <Bike size={16} /> },
  { key: 'delivered', label: 'Delivered Fresh 😋', icon: <CheckCircle2 size={16} /> },
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const isCancelled = order.status === 'cancelled';
  const isReturned = order.status === 'returned';
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [liveLocationActive, setLiveLocationActive] = useState(true);
  const [etaMinutes, setEtaMinutes] = useState(16);

  useEffect(() => {
    // Gentle ETA countdown simulation
    const interval = setInterval(() => {
      setEtaMinutes((prev) => (prev > 5 ? prev - 1 : 5));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 0;
      case 'confirmed':
        return 1;
      case 'packed':
        return 2;
      case 'shipped':
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(order.status);
  const isDelivered = order.status === 'delivered';
  const isOutForDelivery = order.status === 'out_for_delivery' || order.status === 'shipped';

  const driver = order.driver || {
    name: 'Vikram Singh',
    phone: '+91 98765 43210',
    vehicle: 'Ather 450X (KA-03-EV-1928)',
    rating: 4.9,
  };

  const deliveryPin = order.deliveryPin || '5819';

  return (
    <div className="bg-white border border-border rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Live Order Radar
            </span>
          </div>

          <h3 className="text-lg font-black text-primary capitalize flex items-center gap-2">
            {isCancelled ? (
              <span className="text-rose-600 flex items-center gap-1.5">
                <XCircle size={20} /> Order Cancelled
              </span>
            ) : isReturned ? (
              <span className="text-amber-600 flex items-center gap-1.5">
                <RotateCcw size={20} /> Issue Reported / Support Active
              </span>
            ) : isDelivered ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 size={20} /> Meal Delivered Fresh! Enjoy your feast!
              </span>
            ) : isOutForDelivery ? (
              <span className="text-accent flex items-center gap-2">
                <Bike size={22} className="animate-bounce" />
                Arriving in ~{etaMinutes} mins • Hot & Insulated
              </span>
            ) : (
              <span className="text-primary flex items-center gap-2">
                <Flame size={20} className="text-accent animate-pulse" />
                Kitchen is preparing your fresh meal
              </span>
            )}
          </h3>

          <p className="text-xs text-muted mt-0.5">
            Estimated Delivery: <strong className="text-gray-800">{order.estimatedDelivery}</strong>
          </p>
        </div>

        {/* Security Delivery OTP Badge */}
        {!isCancelled && !isDelivered && (
          <div className="flex items-center gap-3 bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center flex-shrink-0">
              <KeyRound size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Delivery PIN
              </span>
              <span className="text-lg font-black font-mono tracking-widest text-amber-950 block leading-tight">
                {deliveryPin}
              </span>
              <span className="text-[10px] text-amber-700 block">Share with rider at door</span>
            </div>
          </div>
        )}
      </div>

      {/* Progress Step Bar */}
      {!isCancelled && !isReturned && (
        <div className="relative pt-2 pb-2">
          <div className="grid grid-cols-5 gap-2 relative z-10 text-center">
            {FOOD_STEP_DEFINITIONS.map((step, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      isPast || isCurrent
                        ? 'bg-accent text-white shadow-md ring-4 ring-rose-50'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    {isPast ? <CheckCircle2 size={18} /> : step.icon}
                  </div>
                  <span
                    className={`mt-2 text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 max-w-[85px] ${
                      isCurrent
                        ? 'text-accent font-black'
                        : isPast
                        ? 'text-gray-800'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar background line */}
          <div className="absolute top-[22px] sm:top-[24px] left-[10%] right-[10%] h-[3px] bg-gray-100 -z-0">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{
                width: `${Math.min(100, (currentStepIdx / (FOOD_STEP_DEFINITIONS.length - 1)) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Simulated Live Route Radar Map Animation */}
      {!isCancelled && !isDelivered && (
        liveLocationActive ? (
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-[#f4f7f6] p-4 sm:p-6 shadow-inner">
          {/* Stylized street background grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="streetGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#streetGrid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-between gap-6">
            {/* Left side: Route Animation Diagram */}
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 w-fit">
                <span className="flex items-center gap-1.5 text-accent">
                  <Navigation size={13} className="animate-spin" />
                  Live GPS Rider Route Simulation
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-emerald-700">1.2 km away</span>
              </div>

              {/* Dynamic Path Graphic */}
              <div className="my-6 relative py-4">
                <div className="flex items-center justify-between relative z-10 px-4">
                  {/* Restaurant Marker */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                      <UtensilsCrossed size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800 mt-1">Kitchen</span>
                    <span className="text-[10px] text-muted">Indiranagar</span>
                  </div>

                  {/* Rider in transit */}
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg ring-4 ring-rose-100">
                      <Bike size={24} className="stroke-[2.5]" />
                    </div>
                    <span className="text-[11px] font-black text-accent mt-1">
                      {driver.name}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                      ~{etaMinutes} min
                    </span>
                  </div>

                  {/* Customer Marker */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <MapPin size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800 mt-1">Your Door</span>
                    <span className="text-[10px] text-muted">Destination</span>
                  </div>
                </div>

                {/* Dashed connecting line */}
                <div className="absolute top-[34px] left-[15%] right-[15%] h-1 border-t-2 border-dashed border-accent -z-0" />
              </div>

              <div className="text-[11px] text-gray-600 flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-200">
                <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0" />
                <span>Insulated thermal bag maintains optimal 65°C serving temperature.</span>
              </div>
            </div>

            {/* Right side: Delivery Partner Profile Card */}
            <div className="w-full md:w-72 bg-white rounded-xl p-4 border border-border shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-accent font-black text-base flex items-center justify-center flex-shrink-0 border border-rose-200">
                  {driver.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                    {driver.name}
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
                      ★ {driver.rating}
                    </span>
                  </h4>
                  <p className="text-[11px] text-muted">{driver.vehicle}</p>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    Verified Express Delivery Partner
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-2 flex items-center gap-2">
                <a
                  href={`tel:${driver.phone}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone size={14} />
                  <span>Call Rider</span>
                </a>
                <button
                  type="button"
                  onClick={() => alert(`Message sent to rider ${driver.name}: "Please ring the bell upon arrival."`)}
                  className="py-2 px-3 rounded-lg border border-border hover:bg-surface text-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <div className="rounded-xl border border-dashed border-gray-300 p-4 bg-gray-50 text-xs flex items-center justify-between">
            <span className="text-gray-600">Live GPS rider tracking is paused for this device.</span>
            <button
              type="button"
              onClick={() => setShowConsentModal(true)}
              className="text-accent font-bold hover:underline"
            >
              Enable Live Radar
            </button>
          </div>
        )
      )}

      {/* Cooking Instructions (if specified) */}
      {order.cookingInstructions && (
        <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs flex items-start gap-2 text-amber-900">
          <MessageSquare size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-[11px] font-bold uppercase tracking-wider">Chef & Delivery Notes:</strong>
            <p className="text-gray-700 text-[11px]">{order.cookingInstructions}</p>
          </div>
        </div>
      )}

      {/* Activity History Timeline */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Kitchen & Rider Timeline</h4>
        <div className="relative border-l-2 border-gray-200 pl-4 space-y-4 text-xs ml-2">
          {order.timeline.map((event, idx) => {
            const isLast = idx === order.timeline.length - 1;
            return (
              <div key={idx} className="relative group">
                <div
                  className={`absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full border-2 bg-white ${
                    isLast ? 'border-accent bg-accent ring-4 ring-rose-50' : 'border-gray-400'
                  }`}
                />
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-primary capitalize">{event.status.replace(/_/g, ' ')}</span>
                    <span className="text-[10px] text-muted">
                      {new Date(event.timestamp).toLocaleTimeString('en-IN', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <LiveTrackingConsentModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onConsentGranted={() => setLiveLocationActive(true)}
        onConsentDenied={() => setLiveLocationActive(false)}
      />
    </div>
  );
};
