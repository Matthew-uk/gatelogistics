'use client';

import React, { useEffect, useState, useMemo, JSX } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';

// shadcn UI components — adapt the import paths to your project if needed
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// small inline Toast (keeps this file self-contained — replace with your toast if you have one)
function useToast() {
  const [toasts, setToasts] = useState<
    { id: string; type: 'success' | 'error' | 'info'; text: string }[]
  >([]);
  const push = (t: { type: 'success' | 'error' | 'info'; text: string }) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 9);
    setToasts((s) => [...s, { ...t, id }]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 5000);
  };
  const Toasts = () => (
    <div className="fixed top-6 right-6 z-9999 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded shadow ${
            t.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : t.type === 'error'
              ? 'bg-rose-50 border border-rose-200 text-rose-800'
              : 'bg-sky-50 border border-sky-200 text-sky-800'
          }`}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
  return { push, Toasts };
}

// types
type Parcel = {
  deliveryMode?: string;
  packageDescription?: string;
  totalWeight?: string;
  origin?: string;
  destination?: string;
  expectedPickupDate?: string;
};

type Party = {
  name?: string;
  email?: string;
  address?: string;
};

type Tracking = {
  _id?: string;
  numberCode: string;
  trackingCode: string;
  status: string;
  sender: Party;
  receiver: Party;
  parcel: Parcel;
  events?: {
    locationName: string;
    locationStatus: string;
    updatedAt?: string;
  }[];
  additionalInfo?: string;
  createdAt?: string;
};

export default function DashboardPage(): JSX.Element {
  const token = Cookies.get('token') || '';
  const { push, Toasts } = useToast();

  const [list, setList] = useState<Tracking[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<null | Tracking>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page] = useState(1); // placeholder for pagination
  const [pageSize] = useState(25);

  // react-hook-form for create form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<Tracking>({
    defaultValues: {
      numberCode: '',
      trackingCode: '',
      status: 'PENDING',
      sender: { name: '', email: '', address: '' },
      receiver: { name: '', email: '', address: '' },
      parcel: {
        deliveryMode: '',
        packageDescription: '',
        totalWeight: '',
        origin: '',
        destination: '',
        expectedPickupDate: '',
      },
      additionalInfo: '',
      events: [],
    } as any,
  });

  // separate form for edit modal
  const editForm = useForm<Tracking>({
    defaultValues: {} as any,
  });

  // helper axios instance with auth
  const api = useMemo(() => {
    const instance = axios.create();
    instance.interceptors.request.use((cfg) => {
      // Axios in v1+ uses AxiosHeaders object for headers, not plain object
      // Set if not present
      if (!cfg.headers) cfg.headers = new axios.AxiosHeaders();
      // Set Authorization header
      if (token) (cfg.headers as any)['Authorization'] = `Bearer ${token}`;
      return cfg;
    });
    return instance;
  }, [token]);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/list-trackings');
      // expecting { success: true, data: [...] } per earlier implementation
      const payload = res.data;
      if (payload && payload.data) {
        setList(payload.data);
      } else if (payload && payload.trackings) {
        setList(payload.trackings); // fallback
      } else {
        setList([]);
      }
    } catch (err: any) {
      console.error(err);
      push({
        type: 'error',
        text: err?.response?.data?.error || 'Failed to load trackings',
      });
    } finally {
      setLoading(false);
    }
  }

  // Create order
  const onCreate = handleSubmit(async (values) => {
    setCreating(true);
    try {
      const res = await api.post('/api/admin/create-order', values);
      if (res.status === 201 || res.status === 200) {
        push({ type: 'success', text: 'Order created' });
        reset(); // clear form
        fetchList();
      } else {
        push({
          type: 'error',
          text: res.data?.error || 'Failed to create order',
        });
      }
    } catch (err: any) {
      console.error(err);
      push({
        type: 'error',
        text: err?.response?.data?.error || 'Server error',
      });
    } finally {
      setCreating(false);
    }
  });

  // Open edit dialog with pre-filled data
  function openEdit(t: Tracking) {
    setEditing(t);
    editForm.reset(t as any);
    setDialogOpen(true);
  }

  // Update tracking (PATCH)
  async function onEditSubmit(data: Tracking) {
    if (!editing) return;
    try {
      const payload = {
        status: data.status,
        parcel: data.parcel,
        sender: data.sender,
        receiver: data.receiver,
        additionalInfo: data.additionalInfo,
        events: data.events, // replace events array; you may choose to push single event in API
      };
      const res = await api.patch(
        `/api/trackings/${editing.numberCode}`,
        payload,
      );
      if (res.status === 200) {
        push({ type: 'success', text: 'Order updated' });
        setDialogOpen(false);
        setEditing(null);
        fetchList();
      } else {
        push({ type: 'error', text: res.data?.error || 'Failed to update' });
      }
    } catch (err: any) {
      console.error(err);
      push({
        type: 'error',
        text: err?.response?.data?.error || 'Server error',
      });
    }
  }

  // Quick status update action (select in table)
  async function quickUpdateStatus(numberCode: string, newStatus: string) {
    try {
      const res = await api.patch(`/api/trackings/${numberCode}`, {
        status: newStatus,
      });
      if (res.status === 200) {
        push({ type: 'success', text: `Status updated to ${newStatus}` });
        fetchList();
      } else {
        push({
          type: 'error',
          text: res.data?.error || 'Unable to update status',
        });
      }
    } catch (err: any) {
      console.error(err);
      push({
        type: 'error',
        text: err?.response?.data?.error || 'Server error',
      });
    }
  }

  // Add single event to a tracking (via API patch using body.event)
  async function addEvent(
    numberCode: string,
    event: { locationName: string; locationStatus: string; updatedAt?: string },
  ) {
    try {
      const res = await api.patch(`/api/trackings/${numberCode}`, { event });
      if (res.status === 200) {
        push({ type: 'success', text: 'Event added' });
        fetchList();
      } else {
        push({ type: 'error', text: 'Failed to add event' });
      }
    } catch (err: any) {
      console.error(err);
      push({
        type: 'error',
        text: err?.response?.data?.error || 'Server error',
      });
    }
  }

  // Remove tracking (optional) — demonstrates full CRUD
  async function removeTracking(numberCode: string) {
    if (!confirm('Permanently delete this tracking?')) return; // small confirm (browser). Replace with Dialog if needed.
    try {
      const res = await api.delete(`/api/admin/delete-tracking/${numberCode}`); // you'll need to implement this route
      if (res.status === 200) {
        push({ type: 'success', text: 'Deleted' });
        fetchList();
      } else {
        push({ type: 'error', text: 'Failed to delete' });
      }
    } catch (err: any) {
      console.error(err);
      push({
        type: 'error',
        text: err?.response?.data?.error || 'Server error',
      });
    }
  }

  const statusOptions = [
    'PENDING',
    'IN_TRANSIT',
    'WITHHELD',
    'DELIVERED',
    'CANCELLED',
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-8 mt-12 font-poppins">
      <Toasts />

      <div className="max-w-7xl mx-auto space-y-6">
        <section className="bg-white p-6 rounded shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            <div className="text-sm text-gray-500">
              Manage shipments — page {page}
            </div>
          </div>

          <form
            onSubmit={onCreate}
            className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Number code (URL id)</Label>
                  <Input {...register('numberCode')} placeholder="e.g. 1090" />
                </div>
                <div>
                  <Label>Tracking code</Label>
                  <Input
                    {...register('trackingCode')}
                    placeholder="e.g. ATV7FATYCW"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Sender name</Label>
                  <Input
                    {...register('sender.name')}
                    placeholder="Sender name"
                  />
                </div>
                <div>
                  <Label>Sender email</Label>
                  <Input
                    {...register('sender.email')}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label>Sender address</Label>
                <Textarea
                  {...register('sender.address')}
                  placeholder="Full sender address"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Receiver name</Label>
                  <Input
                    {...register('receiver.name')}
                    placeholder="Receiver name"
                  />
                </div>
                <div>
                  <Label>Receiver email</Label>
                  <Input
                    {...register('receiver.email')}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label>Receiver address</Label>
                <Textarea
                  {...register('receiver.address')}
                  placeholder="Full receiver address"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Delivery mode</Label>
                  <Input
                    {...register('parcel.deliveryMode')}
                    placeholder="Air Freight"
                  />
                </div>
                <div>
                  <Label>Total weight</Label>
                  <Input
                    {...register('parcel.totalWeight')}
                    placeholder="250kg"
                  />
                </div>
              </div>

              <div>
                <Label>Package description</Label>
                <Textarea
                  {...register('parcel.packageDescription')}
                  placeholder="e.g. 12 Karat Gold (parcel)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Origin</Label>
                  <Input
                    {...register('parcel.origin')}
                    placeholder="Country / City"
                  />
                </div>
                <div>
                  <Label>Destination</Label>
                  <Input
                    {...register('parcel.destination')}
                    placeholder="Country / City"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <Label>Expected pickup</Label>
                  <Input
                    {...register('parcel.expectedPickupDate')}
                    placeholder="YYYY-MM-DD"
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        onValueChange={(v) => field.onChange(v)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div>
                <Label>Additional info</Label>
                <Textarea
                  {...register('additionalInfo')}
                  placeholder="Optional notes"
                />
              </div>
            </div>

            <div className="lg:col-span-2 flex items-center gap-3 mt-2">
              <Button type="submit" disabled={creating || isSubmitting}>
                {creating ? 'Creating...' : 'Create order'}
              </Button>
              <Button
                variant="ghost"
                type="button"
                onClick={() =>
                  reset({
                    numberCode: '',
                    trackingCode: '',
                    status: 'PENDING',
                    sender: { name: '', email: '', address: '' },
                    receiver: { name: '', email: '', address: '' },
                    parcel: {
                      deliveryMode: '',
                      packageDescription: '',
                      totalWeight: '',
                      origin: '',
                      destination: '',
                      expectedPickupDate: '',
                    },
                    additionalInfo: '',
                    events: [],
                  } as any)
                }
              >
                Reset form
              </Button>
            </div>
          </form>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Recent Trackings</h3>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">
                {loading ? 'Loading…' : `${list.length} results`}
              </div>
              <Button variant="ghost" onClick={() => fetchList()}>
                Refresh
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last event</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.slice((page - 1) * pageSize, page * pageSize).map((t) => (
                  <TableRow key={t._id}>
                    <TableCell className="font-medium">
                      {t.numberCode}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="text-sm">{t.trackingCode}</div>
                        <div className="text-xs text-gray-400">
                          {' '}
                          • created{' '}
                          {new Date(
                            t.createdAt ?? t._id ?? Date.now(),
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{t.receiver?.name || '-'}</div>
                      <div className="text-xs text-gray-400">
                        {t.receiver?.email || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="capitalize">{t.status}</Badge>

                      {/* quick status select */}
                      <div className="mt-2">
                        <Select
                          onValueChange={(v) =>
                            quickUpdateStatus(t.numberCode, v)
                          }
                          defaultValue={t.status}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {t.events && t.events.length
                          ? t.events[0].locationStatus +
                            ' @ ' +
                            (t.events[0].locationName || '')
                          : '–'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => openEdit(t)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            addEvent(t.numberCode, {
                              locationName: 'New location',
                              locationStatus: 'IN_TRANSIT',
                              updatedAt: new Date().toISOString().slice(0, 10),
                            })
                          }
                        >
                          Add event
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeTracking(t.numberCode)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(o) => {
          if (!o) {
            setDialogOpen(false);
            setEditing(null);
          } else setDialogOpen(true);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Tracking</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = editForm.getValues();
              onEditSubmit(data);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Number code (url)</Label>
                <Input {...editForm.register('numberCode')} disabled />
              </div>
              <div>
                <Label>Tracking code</Label>
                <Input {...editForm.register('trackingCode')} />
              </div>

              <div>
                <Label>Sender name</Label>
                <Input {...editForm.register('sender.name')} />
              </div>
              <div>
                <Label>Sender email</Label>
                <Input {...editForm.register('sender.email')} />
              </div>

              <div className="md:col-span-2">
                <Label>Sender address</Label>
                <Textarea {...editForm.register('sender.address')} />
              </div>

              <div>
                <Label>Receiver name</Label>
                <Input {...editForm.register('receiver.name')} />
              </div>
              <div>
                <Label>Receiver email</Label>
                <Input {...editForm.register('receiver.email')} />
              </div>

              <div className="md:col-span-2">
                <Label>Receiver address</Label>
                <Textarea {...editForm.register('receiver.address')} />
              </div>

              <div>
                <Label>Delivery mode</Label>
                <Input {...editForm.register('parcel.deliveryMode')} />
              </div>
              <div>
                <Label>Total weight</Label>
                <Input {...editForm.register('parcel.totalWeight')} />
              </div>

              <div className="md:col-span-2">
                <Label>Package description</Label>
                <Textarea {...editForm.register('parcel.packageDescription')} />
              </div>

              <div>
                <Label>Origin</Label>
                <Input {...editForm.register('parcel.origin')} />
              </div>
              <div>
                <Label>Destination</Label>
                <Input {...editForm.register('parcel.destination')} />
              </div>

              <div>
                <Label>Expected pickup</Label>
                <Input {...editForm.register('parcel.expectedPickupDate')} />
              </div>

              <div>
                <Label>Status</Label>
                <Controller
                  control={editForm.control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      onValueChange={(v) => field.onChange(v)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <Label>Additional info (HTML allowed)</Label>
                <Textarea {...editForm.register('additionalInfo')} />
              </div>

              {/* Events: render editable list */}
              <div className="md:col-span-2">
                <Label>Events</Label>
                <div className="space-y-2 mt-2">
                  {(editForm.watch('events') || []).map(
                    (ev: any, idx: number) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 gap-2 items-center"
                      >
                        <Input
                          className="col-span-4"
                          value={ev.locationName}
                          onChange={(e) => {
                            const arr = editForm.getValues('events') || [];
                            arr[idx] = {
                              ...arr[idx],
                              locationName: e.target.value,
                            };
                            editForm.setValue('events', arr);
                          }}
                        />
                        <Input
                          className="col-span-4"
                          value={ev.locationStatus}
                          onChange={(e) => {
                            const arr = editForm.getValues('events') || [];
                            arr[idx] = {
                              ...arr[idx],
                              locationStatus: e.target.value,
                            };
                            editForm.setValue('events', arr);
                          }}
                        />
                        <Input
                          className="col-span-3"
                          value={ev.updatedAt}
                          onChange={(e) => {
                            const arr = editForm.getValues('events') || [];
                            arr[idx] = {
                              ...arr[idx],
                              updatedAt: e.target.value,
                            };
                            editForm.setValue('events', arr);
                          }}
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="col-span-1"
                          onClick={() => {
                            const arr = editForm.getValues('events') || [];
                            arr.splice(idx, 1);
                            editForm.setValue('events', arr);
                          }}
                        >
                          X
                        </Button>
                      </div>
                    ),
                  )}

                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        const arr = editForm.getValues('events') || [];
                        arr.unshift({
                          locationName: '',
                          locationStatus: 'IN_TRANSIT',
                          updatedAt: new Date().toISOString().slice(0, 10),
                        });
                        editForm.setValue('events', arr);
                      }}
                    >
                      Add event
                    </Button>
                    <div className="text-sm text-gray-500 pt-2">
                      Events are ordered newest-first.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <div className="flex items-center justify-between w-full">
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setDialogOpen(false);
                      setEditing(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Save changes</Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
