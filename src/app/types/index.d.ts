interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Appointment {
  id: string;
  startDate: string;
  endDate: string;
  description: string;
  clientId: string;
  ownerId: string;
  client?: User;
  owner?: User;
}

interface Toast {
  id: string;
  message: string;
}

interface Service {
  id: string;
  description: string;
  basePrice: number;
}
