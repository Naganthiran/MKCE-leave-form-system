/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReviewStep {
  action: 'approved' | 'rejected';
  date: string;
  comment?: string;
  approverName: string;
}

export interface LeaveRequest {
  id: string;
  studentName: string;
  studentId: string;
  studentType: string;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  evidenceName?: string;
  status: 'Pending CA' | 'Pending Mentor' | 'Pending HOD' | 'Approved' | 'Rejected';
  createdAt: string;
  processedBy?: {
    ca?: ReviewStep;
    mentor?: ReviewStep;
    hod?: ReviewStep;
  };
}

const STORAGE_KEY = 'mkce_leave_requests';

const defaultRequests: LeaveRequest[] = [
  {
    id: 'req-1',
    studentName: 'Mahendraprasad R',
    studentId: '21CS001',
    studentType: 'Day Scholar',
    type: 'Leave',
    fromDate: '2026-05-12',
    toDate: '2026-05-14',
    reason: 'Personal work at hometown',
    evidenceName: 'family_letter.pdf',
    status: 'Pending CA',
    createdAt: '2026-05-10T10:00:00.000Z'
  },
  {
    id: 'req-2',
    studentName: 'Siva Kumar S',
    studentId: '21CS042',
    studentType: 'Day Scholar',
    type: 'On Duty',
    fromDate: '2026-05-15',
    toDate: '2026-05-15',
    reason: 'Paper presentation at PSG Tech',
    evidenceName: 'symposium_invitation.pdf',
    status: 'Pending Mentor',
    createdAt: '2026-05-11T14:30:00.000Z'
  },
  {
    id: 'req-3',
    studentName: 'Dinesh B',
    studentId: '21CS015',
    studentType: 'Hosteler',
    type: 'Leave',
    fromDate: '2026-05-18',
    toDate: '2026-05-20',
    reason: 'Medical emergency in family',
    evidenceName: 'medical_cert.pdf',
    status: 'Pending HOD',
    createdAt: '2026-05-12T09:15:00.000Z'
  },
  {
    id: 'req-4',
    studentName: 'Mahendraprasad R',
    studentId: '21CS001',
    studentType: 'Day Scholar',
    type: 'Leave',
    fromDate: '2026-05-10',
    toDate: '2026-05-10',
    reason: 'Personal work',
    evidenceName: '',
    status: 'Approved',
    createdAt: '2026-05-09T08:00:00.000Z',
    processedBy: {
      ca: { action: 'approved', date: '2026-05-09T09:00:00.000Z', approverName: 'Dr. ARUN KUMAR S' },
      mentor: { action: 'approved', date: '2026-05-09T10:15:00.000Z', approverName: 'Prof. PRIYA R' },
      hod: { action: 'approved', date: '2026-05-09T11:30:00.000Z', approverName: 'Dr. BALAMURUGAN K' }
    }
  }
];

export function getRequests(): LeaveRequest[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRequests));
    return defaultRequests;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse leave requests from localStorage', e);
    return defaultRequests;
  }
}

export function saveRequests(requests: LeaveRequest[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function addRequest(request: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>): LeaveRequest {
  const requests = getRequests();
  const newRequest: LeaveRequest = {
    ...request,
    id: `req-${Date.now()}`,
    status: 'Pending CA',
    createdAt: new Date().toISOString()
  };
  requests.unshift(newRequest); // Add new requests to the beginning
  saveRequests(requests);
  return newRequest;
}

export function updateRequestStatus(
  id: string, 
  newStatus: LeaveRequest['status'],
  role: 'ca' | 'mentor' | 'hod',
  action: 'approved' | 'rejected',
  approverName: string,
  comment?: string
): void {
  const requests = getRequests();
  const updated = requests.map(req => {
    if (req.id === id) {
      const processedBy = req.processedBy || {};
      processedBy[role] = {
        action,
        date: new Date().toISOString(),
        approverName,
        comment
      };
      return { 
        ...req, 
        status: newStatus,
        processedBy
      };
    }
    return req;
  });
  saveRequests(updated);
}
