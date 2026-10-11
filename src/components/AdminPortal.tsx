import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import {
  Package,
  ShoppingBag,
  Star,
  Users,
  Settings,
  Truck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import type { OrderDetails } from '../types';

export const AdminPortal: React.FC = () => {
  const { orders, updateOrderStatus, setCurrentPage } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'analytics'>('orders');

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status !== 'delivered').length;

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7b3e1d] text-white uppercase tracking-wider">
                Store Manager
              </span>
              <span className="text-xs text-stone-500">Dail Cosmetics Operations</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Store Admin & Order Fulfillment
            </h1>
          </div>

          <button
            onClick={() => setCurrentPage('home')}
            className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:text-stone-900 text-xs font-bold flex items-center gap-2 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Storefront</span>
          </button>
        </div>

        {/* 3 Analytics Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span>Total Revenue (COD & Prepaid)</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#7b3e1d]">
              Rs. {totalSales.toLocaleString()}
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              +18% from last week's dispatch
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span>Active Orders in Transit</span>
              <Truck className="w-4 h-4 text-[#c59b27]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
              {pendingOrders} Orders
            </h3>
            <span className="text-[11px] text-stone-500 block">
              Dispatched with Trax & TCS Logistics
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-stone-500 text-xs">
              <span>Total Flagship Products</span>
              <Package className="w-4 h-4 text-stone-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
              {PRODUCTS.length} SKUs
            </h3>
            <span className="text-[11px] text-stone-500 block">
              100% In Stock & Sealed
            </span>
          </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-[#7b3e1d] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Live Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-[#7b3e1d] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Product Catalog Inventory ({PRODUCTS.length})
          </button>
        </div>

        {/* Tab 1: Orders Fulfillment */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Customer Delivery Management
              </h3>
              <span className="text-xs text-stone-500">Click dropdown to update status</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4">Update Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {orders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-stone-50/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-stone-900">{ord.orderId}</td>
                      <td className="p-4">
                        <strong className="block text-stone-900">{ord.customerName}</strong>
                        <span className="text-stone-400 text-[11px]">{ord.phone}</span>
                      </td>
                      <td className="p-4">{ord.city}</td>
                      <td className="p-4">
                        {ord.items.map((i, idx) => (
                          <span key={idx} className="block text-[11px] text-stone-600">
                            {i.quantity}x {i.name}
                          </span>
                        ))}
                      </td>
                      <td className="p-4 font-bold text-[#7b3e1d]">
                        Rs. {ord.total.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'dispatched'
                            ? 'bg-amber-100 text-[#7b3e1d]'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.orderId, e.target.value as any)}
                          className="bg-stone-50 border border-stone-200 rounded-lg p-1.5 text-xs text-stone-800 focus:outline-hidden font-medium cursor-pointer"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing & Packed</option>
                          <option value="dispatched">Dispatched (Courier)</option>
                          <option value="delivered">Delivered (Completed)</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Products Inventory */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Official Catalog Stock
              </h3>
            </div>

            <div className="divide-y divide-stone-100">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="p-4 sm:p-6 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-contain rounded-xl bg-stone-50 border border-stone-200 p-1"
                    />
                    <div>
                      <h4 className="font-serif-luxury text-base font-bold text-stone-900">{p.name}</h4>
                      <span className="text-stone-500 text-[11px] block">{p.volume} • Category: {p.category}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#7b3e1d] font-bold text-xs">Rs. {p.price.toLocaleString()}</span>
                        {p.originalPrice && (
                          <span className="text-stone-400 line-through text-[11px]">
                            Rs. {p.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                      ● Active in Stock (50+ units)
                    </span>
                    <span className="text-stone-400 block text-[10px]">Tamper-Proof Hologram Batch</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
