import React, { useEffect, useState } from 'react';
import { ShoppingBag, Download, Users, ChevronDown, ChevronUp, Phone, User, MapPin, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { api, Order, OrderUser } from '../../services/api';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function escapeCSV(val: string | number | null | undefined): string {
  const s = String(val ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getOrders()
      .then(setOrders)
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter(o =>
    o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_mobile.includes(search)
  );

  const handleExportUsers = async () => {
    try {
      const users: OrderUser[] = await api.getOrderUsers();
      const headers = ['Name', 'Mobile'];
      const rows = users.map(u => [escapeCSV(u.name), escapeCSV(u.mobile)].join(','));
      const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `babos_customers_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Exported ${users.length} unique customer${users.length !== 1 ? 's' : ''}`);
    } catch {
      toast.error('Failed to export users');
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Orders</h1>
          <p className="text-stone-500 text-sm mt-1">Customer orders submitted from the cart</p>
        </div>
        <button
          onClick={handleExportUsers}
          className="flex items-center gap-2 bg-white border border-stone-200 hover:border-orange-300 hover:text-orange-600 text-stone-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Users size={16} />
          Export Unique Customers
          <Download size={14} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-stone-500">Total Orders</p>
          <p className="text-2xl font-bold text-stone-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-stone-500">Unique Customers</p>
          <p className="text-2xl font-bold text-stone-900 mt-1">
            {new Set(orders.map(o => o.customer_mobile)).size}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-stone-500">Total Revenue</p>
          <p className="text-2xl font-bold text-stone-900 mt-1">
            ₹{orders.reduce((s, o) => s + (o.subtotal || 0), 0).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or mobile..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-72 px-3 py-2.5 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400 bg-white rounded-xl border border-stone-200">
          <ShoppingBag size={48} className="mx-auto mb-4 opacity-40" />
          <p className="font-medium">{search ? 'No matching orders' : 'No orders yet'}</p>
          <p className="text-sm">Orders will appear here once customers submit from the cart</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <div key={order.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              {/* Row header */}
              <button
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-stone-50 transition-colors"
              >
                <span className="text-xs font-mono text-stone-400 w-10 shrink-0">#{order.id}</span>

                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-stone-900 truncate">
                    <User size={13} className="text-stone-400 shrink-0" />
                    {order.customer_name}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-stone-500">
                    <Phone size={13} className="text-stone-400 shrink-0" />
                    {order.customer_mobile}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-stone-500">
                    <Calendar size={13} className="text-stone-400 shrink-0" />
                    {order.delivery_date} · {order.delivery_time}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.delivery_type === 'delivery'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {order.delivery_type === 'delivery' ? 'Delivery' : 'Takeaway'}
                  </span>
                  <span className="text-sm font-bold text-stone-900">₹{order.subtotal}</span>
                  {expandedId === order.id
                    ? <ChevronUp size={16} className="text-stone-400" />
                    : <ChevronDown size={16} className="text-stone-400" />
                  }
                </div>
              </button>

              {/* Expanded details */}
              {expandedId === order.id && (
                <div className="border-t border-stone-100 px-5 py-4 bg-stone-50 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 text-sm">
                    <h4 className="font-semibold text-stone-700 mb-2">Customer Details</h4>
                    <div className="flex items-start gap-2 text-stone-600">
                      <User size={14} className="mt-0.5 shrink-0 text-stone-400" />
                      <span>{order.customer_name}</span>
                    </div>
                    <div className="flex items-start gap-2 text-stone-600">
                      <Phone size={14} className="mt-0.5 shrink-0 text-stone-400" />
                      <span>{order.customer_mobile}</span>
                    </div>
                    {order.address && (
                      <div className="flex items-start gap-2 text-stone-600">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-stone-400" />
                        <span className="break-all">{order.address}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-stone-600">
                      <Clock size={14} className="mt-0.5 shrink-0 text-stone-400" />
                      <span>Submitted: {formatDate(order.created_at)}</span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <h4 className="font-semibold text-stone-700 mb-2">Order Items</h4>
                    <div className="space-y-1.5">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-stone-600">
                          <span>{item.quantity}× {item.name}</span>
                          <span className="font-medium text-stone-800">
                            ₹{(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-200">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
