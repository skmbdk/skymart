import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Zap, CheckCircle2, FileText } from 'lucide-react';

export const InvoiceModal = () => {
  const { invoiceOrder, closeInvoice, formatPrice } = useApp();

  if (!invoiceOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center font-body">
      {/* Backdrop */}
      <div 
        onClick={closeInvoice}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      <div className="relative bg-[#131313] border border-[#262626] rounded-3xl max-w-2xl w-full text-white overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header Control Action Bar */}
        <div className="p-6 border-b border-[#262626] flex items-center justify-between bg-[#0A0A0A]">
          <div className="flex items-center gap-2 text-xs font-geist text-[#BCFF4E]">
            <FileText className="w-4 h-4" />
            <span>Official Digital Receipt ({invoiceOrder.id})</span>
          </div>

          <button
            onClick={closeInvoice}
            className="p-2 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white hover:bg-[#262626] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Body Container */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto font-body bg-[#131313] text-white">
          
          <div className="p-6 sm:p-8 space-y-6 bg-[#131313] text-white border-2 border-[#262626] rounded-3xl relative">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#262626] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#BCFF4E] flex items-center justify-center text-[#0A0A0A] font-bold">
                  <Zap className="w-5 h-5 fill-[#0A0A0A]" />
                </div>
                <div>
                  <span className="font-headline text-xl font-bold tracking-tight text-white">SkyMart Cyber Marketplace</span>
                  <p className="text-[11px] text-gray-400 font-geist">SkyMart Cyber Technologies Inc.</p>
                </div>
              </div>

              <div className="text-right font-geist">
                <span className="px-3 py-1 rounded-full bg-[#BCFF4E] text-[#0A0A0A] font-extrabold text-[11px] uppercase tracking-wider">
                  OFFICIAL RECEIPT
                </span>
                <p className="text-[11px] text-gray-400 mt-1">777 Cyber Boulevard, Neo Tokyo</p>
              </div>
            </div>

            {/* Invoice Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#1A1A1A] border border-[#262626] rounded-2xl p-4 text-xs font-geist">
              <div>
                <span className="text-gray-400 uppercase tracking-wider block font-bold">Order ID</span>
                <span className="text-[#BCFF4E] font-extrabold text-sm">{invoiceOrder.id}</span>
              </div>
              <div>
                <span className="text-gray-400 uppercase tracking-wider block font-bold">Order Date</span>
                <span className="text-white font-semibold">{invoiceOrder.date}</span>
              </div>
              <div>
                <span className="text-gray-400 uppercase tracking-wider block font-bold">Payment Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  PAID & VERIFIED
                </span>
              </div>
              <div>
                <span className="text-gray-400 uppercase tracking-wider block font-bold">Shipping Address</span>
                <span className="text-white font-medium truncate block">{invoiceOrder.address}</span>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-geist">
                <thead>
                  <tr className="border-b border-[#262626] text-gray-400 uppercase">
                    <th className="pb-3 font-semibold">Item Description</th>
                    <th className="pb-3 text-center font-semibold">Qty</th>
                    <th className="pb-3 text-right font-semibold">Unit Rate</th>
                    <th className="pb-3 text-right font-semibold">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626] text-gray-300">
                  {invoiceOrder.items.map(({ product, quantity }, idx) => (
                    <tr key={idx}>
                      <td className="py-3 font-medium text-white">{product.name}</td>
                      <td className="py-3 text-center font-semibold">{quantity}</td>
                      <td className="py-3 text-right">{formatPrice(product.price)}</td>
                      <td className="py-3 text-right font-semibold text-[#BCFF4E]">
                        {formatPrice(product.price * quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="border-t border-[#262626] pt-4 space-y-2 font-geist text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-semibold">{formatPrice(invoiceOrder.subtotal)}</span>
              </div>

              {invoiceOrder.discount > 0 && (
                <div className="flex justify-between text-[#BCFF4E]">
                  <span>Discount Coupon</span>
                  <span className="font-bold">-{formatPrice(invoiceOrder.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-400">
                <span>Express Shipping</span>
                <span className="text-gray-300">
                  {invoiceOrder.shipping === 0 ? 'Free Shipping' : formatPrice(invoiceOrder.shipping)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold pt-3 border-t border-[#262626]">
                <span className="text-white">Total Paid</span>
                <span className="text-[#BCFF4E] text-xl">{formatPrice(invoiceOrder.total)}</span>
              </div>
            </div>

            {/* Footer Signature Bar */}
            <div className="flex justify-between items-end pt-4 border-t border-[#262626] text-[11px] font-geist text-gray-500">
              <div>
                <p>Official Digital Receipt • 256-Bit SSL Encrypted</p>
                <p>Support: support@skymart.com</p>
              </div>
              <div className="text-right">
                <span className="block border-b border-gray-600 w-32 mb-1"></span>
                <span>Authorized Dispatch Sign</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
