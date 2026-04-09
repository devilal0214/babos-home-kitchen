import React, { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Download,
  Users,
  ChevronDown,
  ChevronUp,
  Phone,
  User,
  MapPin,
  Calendar,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { api, Order, OrderUser } from '../../services/api';
import AdminOrderInvoice from './AdminOrderInvoice';

function formatDate(iso: string) {
  // SQLite CURRENT_TIMESTAMP is UTC but has no timezone marker.
  // Normalise to ISO-8601 with 'Z' so browsers parse it as UTC correctly.
  const normalized = iso.includes('T') ? iso : iso.replace(' ', 'T') + 'Z';
  return new Date(normalized).toLocaleString('en-IN', {
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

interface Filters {
  year: string;
  month: string;
  category: string; // delivery type
  status: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({ year: 'all', month: 'all', category: 'all', status: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    api
      .getOrders()
      .then(setOrders)
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  // Extract unique years from orders
  const years = Array.from(new Set(orders.map((o) => new Date(o.created_at).getFullYear()))).sort((a, b) => b - a);

  // Apply filters
  const filtered = orders.filter((o) => {
    // Search
    const matchesSearch =
      o.customer_name.toLowerCase().includes(search.toLowerCase()) || o.customer_mobile.includes(search);
    if (!matchesSearch) return false;

    // Year filter
    if (filters.year !== 'all') {
      const orderYear = new Date(o.created_at).getFullYear();
      if (orderYear !== parseInt(filters.year)) return false;
    }

    // Month filter
    if (filters.month !== 'all') {
      const orderMonth = new Date(o.created_at).getMonth();
      if (orderMonth !== parseInt(filters.month)) return false;
    }

    // Category (delivery type) filter
    if (filters.category !== 'all' && o.delivery_type !== filters.category) return false;

    // Status filter
    if (filters.status !== 'all' && o.status !== filters.status) return false;

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedOrders = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, search]);

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

  const handleStatusChange = async (orderId: number, newStatus: 'pending' | 'delivered' | 'rejected') => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      toast.success(`Order #${orderId} marked as ${newStatus}`);
    } catch {
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
            <CheckCircle size={12} />
            Delivered
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-700">
            <XCircle size={12} />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-700">
            <AlertCircle size={12} />
            Pending
          </span>
        );
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-stone-500">Total Orders</p>
          <p className="text-2xl font-bold text-stone-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-stone-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {orders.filter((o) => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-stone-500">Delivered</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {orders.filter((o) => o.status === 'delivered').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-sm text-stone-500">Total Revenue</p>
          <p className="text-2xl font-bold text-stone-900 mt-1">
            ₹{orders.reduce((s, o) => s + (o.subtotal || 0), 0).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-xl border border-stone-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-stone-400" />
          <h3 className="font-semibold text-stone-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Year */}
          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="all">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Month */}
          <select
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
            className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="all">All Months</option>
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ].map((m, i) => (
              <option key={m} value={i}>
                {m}
              </option>
            ))}
          </select>

          {/* Category (Delivery Type) */}
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="all">All Types</option>
            <option value="delivery">Delivery</option>
            <option value="takeaway">Takeaway</option>
          </select>

          {/* Status */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        {(search || filters.year !== 'all' || filters.month !== 'all' || filters.category !== 'all' || filters.status !== 'all') && (
          <button
            onClick={() => {
              setSearch('');
              setFilters({ year: 'all', month: 'all', category: 'all', status: 'all' });
            }}
            className="mt-3 text-xs text-orange-600 hover:text-orange-700 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400 bg-white rounded-xl border border-stone-200">
          <ShoppingBag size={48} className="mx-auto mb-4 opacity-40" />
          <p className="font-medium">{search || filters.year !== 'all' || filters.month !== 'all' || filters.category !== 'all' || filters.status !== 'all' ? 'No matching orders' : 'No orders yet'}</p>
          <p className="text-sm">Orders will appear here once customers submit from the cart</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedOrders.map((order) => (
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
                  {getStatusBadge(order.status)}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      order.delivery_type === 'delivery' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {order.delivery_type === 'delivery' ? 'Delivery' : 'Takeaway'}
                  </span>
                  <span className="text-sm font-bold text-stone-900">₹{order.subtotal}</span>
                  {expandedId === order.id ? (
                    <ChevronUp size={16} className="text-stone-400" />
                  ) : (
                    <ChevronDown size={16} className="text-stone-400" />
                  )}
                </div>
              </button>

              {/* Expanded details */}
              {expandedId === order.id && (
                <div className="border-t border-stone-100 px-5 py-4 bg-stone-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                            <span>
                              {item.quantity}× {item.name}
                            </span>
                            <span className="font-medium text-stone-800">
                              ₹{(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toLocaleString('en-IN')}
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

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-stone-600">Status:</span>
                      <button
                        onClick={() => handleStatusChange(order.id, 'pending')}
                        disabled={order.status === 'pending'}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 cursor-default'
                            : 'bg-white border border-stone-200 text-stone-600 hover:border-yellow-400 hover:text-yellow-700'
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, 'delivered')}
                        disabled={order.status === 'delivered'}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-white border border-stone-200 text-stone-600 hover:border-green-400 hover:text-green-700'
                        }`}
                      >
                        Delivered
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, 'rejected')}
                        disabled={order.status === 'rejected'}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          order.status === 'rejected'
                            ? 'bg-red-100 text-red-700 cursor-default'
                            : 'bg-white border border-stone-200 text-stone-600 hover:border-red-400 hover:text-red-700'
                        }`}
                      >
                        Rejected
                      </button>
                    </div>

                    <button
                      onClick={() => setInvoiceOrder(order)}
                      className="ml-auto flex items-center gap-2 bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                    >
                      <FileText size={14} />
                      Generate Invoice
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between bg-white rounded-xl border border-stone-200 px-5 py-3">
              <div className="text-sm text-stone-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of{' '}
                {filtered.length} orders
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                  {(() => {
                    // Show at most 5 page buttons: always show first, last, current ±1, with ellipsis gaps
                    const pages: (number | '...')[] = [];
                    const delta = 1;
                    const left = currentPage - delta;
                    const right = currentPage + delta;
                    let last = 0;
                    for (let p = 1; p <= totalPages; p++) {
                      if (p === 1 || p === totalPages || (p >= left && p <= right)) {
                        if (last && p - last > 1) pages.push('...');
                        pages.push(p);
                        last = p;
                      }
                    }
                    return pages.map((page, idx) =>
                      page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="w-8 text-center text-stone-400 text-sm select-none">…</span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page as number)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-orange-600 text-white'
                              : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    );
                  })()}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Invoice Modal */}
      {invoiceOrder && <AdminOrderInvoice order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />}
    </div>
  );
}
