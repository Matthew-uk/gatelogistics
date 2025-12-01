// app/trackings/[id]/page.tsx
import Barcode from '@/components/custom/Barcode';
import TrackingActions from '@/components/custom/TrackingActions';
import axios from 'axios';
import React from 'react';

type Props = { params: Promise<{ id: string }> };

interface TrackingEvent {
  locationName: string;
  locationStatus: string;
  updatedAt: string;
}

interface Tracking {
  trackingCode: string;
  status: string;
  sender?: {
    name: string;
    email: string;
    address: string;
  };
  receiver?: {
    name: string;
    email: string;
    address: string;
  };
  parcel?: {
    deliveryMode: string;
    packageDescription: string;
    totalWeight: string;
    origin: string;
    destination: string;
    expectedPickupDate: string;
  };
  events?: TrackingEvent[];
  additionalInfo?: string;
}

async function getTrackingData(id: string): Promise<Tracking | null> {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await axios.get(`${baseUrl}/api/trackings/${id}`, {
      // Axios timeout to prevent hanging requests
      timeout: 10000,
    });

    return res.data.tracking;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Axios error fetching tracking data:', error.message);
    } else {
      console.error('Error fetching tracking data:', error);
    }
    return null;
  }
}

export default async function TrackingPage(props: Props) {
  const params = await props.params;
  const id = params.id;

  const tracking = await getTrackingData(id);

  if (!tracking) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold">Tracking not found</h2>
          <p className="mt-2 text-sm text-gray-600">
            No package matches the tracking id: {id}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen py-10 mt-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 shadow-sm tracking-container no-break">
        <div className="px-6 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-800">
                {tracking.trackingCode}
              </h1>
              <TrackingActions trackingCode={tracking.trackingCode} />
            </div>

            <div className="mt-3">
              <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-3 rounded">
                <span className="text-sm text-gray-500">Status:</span>
                <span className="px-3 py-1 text-sm font-semibold text-amber-600 bg-amber-50 border border-amber-100 rounded">
                  {tracking.status}
                </span>
              </div>
            </div>
          </div>

          <div className="ml-auto">
            <Barcode value={tracking.trackingCode} width={320} height={64} />
          </div>
        </div>

        <section className="px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Sender
              </h3>
              <div className="text-sm text-gray-600 leading-relaxed">
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Name:</span>{' '}
                  {tracking.sender?.name || 'N/A'}
                </div>
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Email:</span>{' '}
                  {tracking.sender?.email || 'N/A'}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {tracking.sender?.address || 'N/A'}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Receiver
              </h3>
              <div className="text-sm text-gray-600 leading-relaxed">
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Name:</span>{' '}
                  {tracking.receiver?.name || 'N/A'}
                </div>
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Email:</span>{' '}
                  {tracking.receiver?.email || 'N/A'}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {tracking.receiver?.address || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            Parcel Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 border border-gray-100">
              <div className="text-sm text-gray-600 space-y-3">
                <div>
                  <span className="font-medium text-gray-700">
                    Delivery Mode:
                  </span>{' '}
                  <span className="ml-2">
                    {tracking.parcel?.deliveryMode || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Package Description:
                  </span>{' '}
                  <span className="ml-2">
                    {tracking.parcel?.packageDescription || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Total Weight:
                  </span>{' '}
                  <span className="ml-2">
                    {tracking.parcel?.totalWeight || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 border border-gray-100">
              <div className="text-sm text-gray-600 space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Origin:</span>{' '}
                  <span className="ml-2">
                    {tracking.parcel?.origin || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Destination:
                  </span>{' '}
                  <span className="ml-2">
                    {tracking.parcel?.destination || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Expected Pickup Date:
                  </span>{' '}
                  <span className="ml-2">
                    {tracking.parcel?.expectedPickupDate || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-100" />

        <section className="px-6 py-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            Parcel Delivery Status
          </h4>
          <div className="bg-white border border-gray-100 overflow-hidden">
            <table className="min-w-full table-fixed text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 w-1/3 text-gray-600">
                    Location Name
                  </th>
                  <th className="px-4 py-3 w-1/3 text-gray-600">
                    Location Status
                  </th>
                  <th className="px-4 py-3 w-1/3 text-gray-600">Updated At</th>
                </tr>
              </thead>

              <tbody>
                {tracking.events?.length ? (
                  tracking.events.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } border-t border-gray-100`}
                    >
                      <td className="px-4 py-3 text-gray-700">
                        {row.locationName}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <span className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium text-amber-700 bg-amber-50 border border-amber-100">
                          {row.locationStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {row.updatedAt}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-gray-400"
                      colSpan={3}
                    >
                      No tracking events yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="border-t border-gray-100" />

        <section className="px-6 py-8">
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            Additional Information
          </h4>
          <div className="bg-white p-6 border border-gray-100 text-sm text-gray-600 leading-relaxed">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  tracking.additionalInfo ||
                  'No additional information available.',
              }}
            />
          </div>
        </section>

        <div className="border-t border-gray-100" />

        <footer className="px-6 py-6 text-xs text-gray-500">
          Thank you for shipping with 24 Top Global Xpress, for more information
          send a mail to{' '}
          <a
            className="text-primary hover:underline"
            href="mailto:support@24topglobalxpress.com"
          >
            support@24topglobalxpress.com
          </a>
        </footer>
      </div>
    </main>
  );
}
