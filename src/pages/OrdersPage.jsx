import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShoppingBag, FileText } from 'lucide-react';

export const OrdersPage = () => {
  const { orders, addToCart, openInvoice, formatPrice } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#262626] pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-[#BCFF4E]" />
            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-white">Order History & Tracking</h1>
          </div>
          <p className="text-sm font-body text-gray-400 mt-1">
            Track live dispatch status and view previous purchases
          </p>
        </div>

        <button
          onClick={() => navigate('/shop')}
          className="px-5 py-2.5 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-xs font-geist rounded-xl flex items-center gap-2 hover:brightness-110 shadow-[0_0_15px_rgba(188,255,78,0.2)]"
        >
          <ShoppingBag className="w-4 h-4" />
          Shop More
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-[#262626] rounded-3xl p-16 text-center space-y-4 my-8">
          <div className="w-20 h-20 rounded-full bg-[#262626] flex items-center justify-center text-gray-500 mx-auto">
            <Package className="w-10 h-10 text-[#BCFF4E]" />
          </div>
          <h3 className="font-headline font-bold text-2xl text-white">No orders placed yet</h3>
          <p className="text-sm text-gray-400 max-w-sm mx-auto font-body">
            Once you place an order, live tracking updates and dispatch receipts will appear here.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-[#BCFF4E] text-[#0A0A0A] font-bold text-sm rounded-full"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="bg-[#131313] border border-[#262626] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl hover:border-[#BCFF4E]/40 transition-colors"
            >
              
              {/* Top Order Info Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262626] pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-geist font-bold text-lg text-[#BCFF4E]">{order.id}</span>
                    <span className="px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#262626] text-xs font-geist text-gray-300">
                      {order.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-geist mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#BCFF4E]" />
                    <span>{order.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => openInvoice(order)}
                    className="px-4 py-2 bg-[#1A1A1A] border border-[#262626] text-gray-300 hover:text-white hover:border-[#BCFF4E] rounded-xl text-xs font-geist flex items-center gap-2 transition-all"
                  >
                    <FileText className="w-4 h-4 text-[#BCFF4E]" />
                    View Receipt / Invoice
                  </button>

                  <div className="text-right">
                    <span className="text-xs font-geist text-gray-400 block">Total Amount</span>
                    <span className="font-geist font-extrabold text-2xl text-white">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Live Tracking Progress Bar */}
              <div className="bg-[#1A1A1A] border border-[#262626] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-geist">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Truck className="w-4 h-4 text-[#BCFF4E]" />
                    <span>Status: <span className="text-[#BCFF4E]">{order.status || 'In Transit'}</span></span>
                  </div>
                  <span className="text-gray-400">Estimated Delivery: Tomorrow 5 PM</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#262626] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#BCFF4E] shadow-[0_0_12px_#BCFF4E] transition-all duration-500"
                    style={{ width: `${order.progress || 70}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 text-[11px] font-geist text-center text-gray-400 pt-1">
                  <div className="text-[#BCFF4E] font-bold">1. Order Placed</div>
                  <div className="text-[#BCFF4E] font-bold">2. Dispatched</div>
                  <div className="text-[#BCFF4E] font-bold">3. In Transit</div>
                  <div className="text-gray-500">4. Delivered</div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-geist text-gray-400 uppercase tracking-wider block font-semibold">
                  Items Purchased ({order.items.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map(({ product, quantity }, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] p-3 rounded-xl">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-contain bg-white/5 rounded-lg p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">{product.name}</h4>
                        <span className="text-[11px] font-geist text-gray-400">Qty: {quantity} × {formatPrice(product.price)}</span>
                      </div>
                      <button
                        onClick={() => addToCart(product, quantity)}
                        className="p-1.5 rounded-lg bg-[#262626] text-gray-300 hover:text-[#BCFF4E] text-xs font-geist shrink-0"
                        title="Reorder item"
                      >
                        Reorder
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
