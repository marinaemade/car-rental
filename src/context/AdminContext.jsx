import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext(null);

const MOCK_EXPENSES = [
  { id: "EXP-1001", date: "2024-05-01", description: "Office Rent", category: "Utilities", amount: 1200, loggedBy: "Admin" },
  { id: "EXP-1002", date: "2024-05-03", description: "Oil Change - BMW M3", category: "Maintenance", amount: 150, loggedBy: "Mechanic" },
  { id: "EXP-1003", date: "2024-05-05", description: "Digital Marketing", category: "Marketing", amount: 500, loggedBy: "Admin" },
];

export const AdminProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [units, setUnits] = useState([]);
  const [clients, setClients] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [expenses, setExpenses] = useState(MOCK_EXPENSES);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const cached = localStorage.getItem("adminData");
        if (cached) {
          const data = JSON.parse(cached);
          setBookings(data.bookings || []);
          setUnits(data.units || []);
          setClients(data.clients || []);
          setDrivers(data.drivers || []);
          setExpenses(data.expenses?.length > 0 ? data.expenses : MOCK_EXPENSES);
          setStats(data.stats || null);
          setLoading(false);
          return;
        }

        const [bookRes, dataRes, usersRes, driversRes, statsRes] = await Promise.all([
          fetch("/bookings.json"),
          fetch("/data.json"),
          fetch("/users.json"),
          fetch("/drivers.json"),
          fetch("/stats.json"),
        ]);

        const [bookData, carsData, usersData, driversData, statsData] = await Promise.all([
          bookRes.json(),
          dataRes.json(),
          usersRes.json(),
          driversRes.json(),
          statsRes.json(),
        ]);

        setBookings(bookData);
        setClients(usersData);
        setDrivers(driversData);
        setStats(statsData);

        const mappedUnits = carsData.map((car) => ({
          id: car.id,
          name: `${car.brand} ${car.model}`,
          brand: car.brand,
          model: car.model,
          type: car.category,
          status: car.available ? "Available" : car.status === "Maintenance" ? "Maintenance" : "Rented",
          price: car.price,
          image: car.image,
          specs: {
            transmission: car.transmission,
            seats: car.seats,
            fuel: car.fuelType,
          },
          available: car.available,
        }));
        setUnits(mappedUnits);
      } catch (err) {
        console.error("AdminContext: Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("adminData", JSON.stringify({
        bookings, units, clients, drivers, expenses, stats,
      }));
    }
  }, [bookings, units, clients, drivers, expenses, stats, loading]);

  let derived = null;
  if (stats) {
    const totalRevenue = bookings
      .filter((b) => b.status === "Completed" || b.status === "Active")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    derived = {
      totalRevenue,
      activeBookings: bookings.filter((b) => b.status === "Active" || b.status === "Confirmed").length,
      totalCars: units.length,
      newCustomers: clients.length,
      revenueByMonth: stats.revenueByMonth,
      fleetBreakdown: [
        { name: "Available", value: units.filter((u) => u.status === "Available").length },
        { name: "Rented", value: units.filter((u) => u.status === "Rented").length },
        { name: "Maintenance", value: units.filter((u) => u.status === "Maintenance").length },
      ],
    };
  }

  const addBooking = (booking) => {
    const newId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newBooking = { ...booking, id: newId };
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
  };

  const updateBooking = (id, updates) => {
    const updatedBookings = bookings.map((b) => (b.id == id ? { ...b, ...updates } : b));
    setBookings(updatedBookings);
  };

  const deleteBooking = (id) => {
    const updatedBookings = bookings.filter((b) => b.id != id);
    setBookings(updatedBookings);
  };

  const updateBookingStatus = (id, status) => {
    const updatedBookings = bookings.map((b) => (b.id == id ? { ...b, status } : b));
    setBookings(updatedBookings);
  };

  const addUnit = (unit) => {
    const newUnit = { ...unit, id: Date.now() + Math.random() };
    const updatedUnits = [newUnit, ...units];
    setUnits(updatedUnits);
  };

  const updateUnit = (id, updates) => {
    const updatedUnits = units.map((u) => (u.id == id ? { ...u, ...updates } : u));
    setUnits(updatedUnits);
  };

  const deleteUnit = (id) => {
    const updatedUnits = units.filter((u) => u.id != id);
    setUnits(updatedUnits);
  };

  const addClient = (client) => {
  const newId = `U-${Date.now()}`;

  const newClient = {
    ...client,
    id: newId,
    joinDate: new Date().toISOString().split("T")[0],
    totalBookings: 0
  };
  setClients([newClient, ...clients]);
};

  const updateClient = (id, updates) => {
    const updatedClients = clients.map((c) => (c.id == id ? { ...c, ...updates } : c));
    setClients(updatedClients);
  };

  const deleteClient = (id) => {
    const updatedClients = clients.filter((c) => c.id != id);
    setClients(updatedClients);
  };

  const addDriver = (driver) => {
    const newDriver = {
      ...driver,
      id: `D-${Date.now()}`,
      rating: 5.0,
      totalTrips: 0,
      joinDate: new Date().toISOString().split("T")[0],
    };
    const updatedDrivers = [newDriver, ...drivers];
    setDrivers(updatedDrivers);
  };

  const updateDriver = (id, updates) => {
    const updatedDrivers = drivers.map((d) => (d.id == id ? { ...d, ...updates } : d));
    setDrivers(updatedDrivers);
  };

  const deleteDriver = (id) => {
    const updatedDrivers = drivers.filter((d) => d.id != id);
    setDrivers(updatedDrivers);
  };

  const assignDriver = (driverId, bookingId) => {
    const driver = drivers.find((d) => d.id == driverId);
    if (!driver) return;
    const updatedDrivers = drivers.map((d) => (d.id == driverId ? { ...d, status: "On Trip" } : d));
    const updatedBookings = bookings.map((b) => (b.id == bookingId ? { ...b, driverId, driverName: driver.name, status: "Active" } : b));
    setDrivers(updatedDrivers);
    setBookings(updatedBookings);
  };

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: `EXP-${Date.now()}`, loggedBy: "Admin" };
    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((e) => e.id != id);
    setExpenses(updatedExpenses);
  };

  return (
    <AdminContext.Provider
      value={{
        bookings, units, clients, drivers, expenses,
        stats: derived, loading,
        addBooking, updateBooking, deleteBooking, updateBookingStatus,
        addUnit, updateUnit, deleteUnit,
        addClient, updateClient, deleteClient,
        addDriver, updateDriver, deleteDriver, assignDriver,
        addExpense, deleteExpense,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

export default AdminContext;
