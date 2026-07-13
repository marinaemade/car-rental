// Admin context
import { createContext, useContext, useState, useEffect } from "react";


const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = localStorage.getItem("tc");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const AdminContext = createContext(null);

const MOCK_EXPENSES = [
  {
    id: "EXP-1001",
    date: "2024-05-01",
    description: "Office Rent",
    category: "Utilities",
    amount: 1200,
    loggedBy: "Admin",
  },
  {
    id: "EXP-1002",
    date: "2024-05-03",
    description: "Oil Change - BMW M3",
    category: "Maintenance",
    amount: 150,
    loggedBy: "Mechanic",
  },
  {
    id: "EXP-1003",
    date: "2024-05-05",
    description: "Digital Marketing",
    category: "Marketing",
    amount: 500,
    loggedBy: "Admin",
  },
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
        setLoading(true);
        const headers = getHeaders();
        const [bookRes, carsRes, usersRes, driversRes] = await Promise.all([
          fetch(`${BASE_URL}/bookings`, { headers }),
          fetch(`${BASE_URL}/cars`, { headers }),
          fetch(`${BASE_URL}/users`, { headers }),
          fetch(`${BASE_URL}/drivers`, { headers }),
        ]);

        if (!bookRes.ok || !carsRes.ok || !usersRes.ok || !driversRes.ok) {
          throw new Error("Failed to fetch admin data from backend API");
        }

        const [bookData, carsData, usersData, driversData] = await Promise.all([
          bookRes.json(),
          carsRes.json(),
          usersRes.json(),
          driversRes.json(),
        ]);

        setBookings(bookData);
        setClients(usersData);
        setDrivers(driversData);
        setStats({
          revenueByMonth: [
            { month: "Jan", amount: 4000 },
            { month: "Feb", amount: 3000 },
            { month: "Mar", amount: 2000 },
            { month: "Apr", amount: 2780 },
            { month: "May", amount: 1890 },
            { month: "Jun", amount: 2390 },
          ],
        });

        const mappedUnits = carsData.map((car) => ({
          id: car.id,
          name: `${car.brand} ${car.model}`,
          brand: car.brand,
          model: car.model,
          type: car.category,
          status: car.available
            ? "Available"
            : car.status === "Maintenance"
              ? "Maintenance"
              : "Rented",
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
        console.error(
          "AdminContext: Failed to load data from server, utilizing local cache fallback",
          err,
        );
        const cached = localStorage.getItem("adminData");
        if (cached) {
          const data = JSON.parse(cached);
          setBookings(data.bookings || []);
          setUnits(data.units || []);
          setClients(data.clients || []);
          setDrivers(data.drivers || []);
          setExpenses(
            data.expenses?.length > 0 ? data.expenses : MOCK_EXPENSES,
          );
          setStats(data.stats || null);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "adminData",
        JSON.stringify({
          bookings,
          units,
          clients,
          drivers,
          expenses,
          stats,
        }),
      );
    }
  }, [bookings, units, clients, drivers, expenses, stats, loading]);

  let derived = null;
  if (stats) {
    const totalRevenue = bookings
      .filter((b) => b.status === "Completed" || b.status === "Active")
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    derived = {
      totalRevenue,
      activeBookings: bookings.filter(
        (b) => b.status === "Active" || b.status === "Confirmed",
      ).length,
      totalCars: units.length,
      newCustomers: clients.length,
      revenueByMonth: stats.revenueByMonth,
      fleetBreakdown: [
        {
          name: "Available",
          value: units.filter((u) => u.status === "Available").length,
        },
        {
          name: "Rented",
          value: units.filter((u) => u.status === "Rented").length,
        },
        {
          name: "Maintenance",
          value: units.filter((u) => u.status === "Maintenance").length,
        },
      ],
    };
  }

  const addBooking = async (booking) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(booking),
      });
      if (!res.ok) throw new Error("Failed to add booking");
      const savedBooking = await res.json();
      setBookings((prev) => [savedBooking, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBooking = async (id, updates) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update booking");
      const updatedBooking = await res.json();
      setBookings((prev) => prev.map((b) => (b.id == id ? updatedBooking : b)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBooking = (id) => {
    // Booking deletion is unsupported on the server side; perform local cleanup
    setBookings((prev) => prev.filter((b) => b.id != id));
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update booking status");
      const updatedBooking = await res.json();
      setBookings((prev) => prev.map((b) => (b.id == id ? updatedBooking : b)));
    } catch (error) {
      console.error(error);
    }
  };

  const addUnit = async (unit) => {
    try {
      const res = await fetch(`${BASE_URL}/cars`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(unit),
      });
      if (!res.ok) throw new Error("Failed to add unit");
      const savedUnit = await res.json();
      const mapped = {
        id: savedUnit.id,
        name: `${savedUnit.brand} ${savedUnit.model}`,
        brand: savedUnit.brand,
        model: savedUnit.model,
        type: savedUnit.category,
        status: savedUnit.available ? "Available" : "Rented",
        price: savedUnit.price,
        image: savedUnit.image,
        specs: {
          transmission: savedUnit.transmission,
          seats: savedUnit.seats,
          fuel: savedUnit.fuelType,
        },
        available: savedUnit.available,
      };
      setUnits((prev) => [mapped, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUnit = async (id, updates) => {
    try {
      const res = await fetch(`${BASE_URL}/cars/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update unit");
      const updatedUnit = await res.json();
      const mapped = {
        id: updatedUnit.id,
        name: `${updatedUnit.brand} ${updatedUnit.model}`,
        brand: updatedUnit.brand,
        model: updatedUnit.model,
        type: updatedUnit.category,
        status: updatedUnit.available ? "Available" : "Rented",
        price: updatedUnit.price,
        image: updatedUnit.image,
        specs: {
          transmission: updatedUnit.transmission,
          seats: updatedUnit.seats,
          fuel: updatedUnit.fuelType,
        },
        available: updatedUnit.available,
      };
      setUnits((prev) => prev.map((u) => (u.id == id ? mapped : u)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUnit = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/cars/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete unit");
      setUnits((prev) => prev.filter((u) => u.id != id));
    } catch (error) {
      console.error(error);
    }
  };

  const addClient = async (client) => {
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(client),
      });
      if (!res.ok) throw new Error("Failed to add client");
      const savedClient = await res.json();
      setClients((prev) => [savedClient, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = async (id, updates) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update client");
      const updatedClient = await res.json();
      setClients((prev) => prev.map((c) => (c.id == id ? updatedClient : c)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClient = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete client");
      setClients((prev) => prev.filter((c) => c.id != id));
    } catch (error) {
      console.error(error);
    }
  };

  const addDriver = async (driver) => {
    try {
      const res = await fetch(`${BASE_URL}/drivers`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(driver),
      });
      if (!res.ok) throw new Error("Failed to add driver");
      const savedDriver = await res.json();
      setDrivers((prev) => [savedDriver, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDriver = async (id, updates) => {
    try {
      const res = await fetch(`${BASE_URL}/drivers/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update driver");
      const updatedDriver = await res.json();
      setDrivers((prev) => prev.map((d) => (d.id == id ? updatedDriver : d)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDriver = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/drivers/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete driver");
      setDrivers((prev) => prev.filter((d) => d.id != id));
    } catch (error) {
      console.error(error);
    }
  };

  const assignDriver = async (driverId, bookingId) => {
    try {
      const driver = drivers.find((d) => d.id == driverId);
      if (!driver) return;

      const [bookingRes, driverRes] = await Promise.all([
        fetch(`${BASE_URL}/bookings/${bookingId}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({ driverId, status: "Active" }),
        }),
        fetch(`${BASE_URL}/drivers/${driverId}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({ status: "On Trip" }),
        }),
      ]);

      if (!bookingRes.ok || !driverRes.ok) {
        throw new Error("Failed to assign driver on server");
      }

      const updatedBooking = await bookingRes.json();
      const updatedDriver = await driverRes.json();

      setDrivers((prev) =>
        prev.map((d) => (d.id === driverId ? updatedDriver : d)),
      );
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? updatedBooking : b)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: `EXP-${Date.now()}`,
      loggedBy: "Admin",
    };
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
        bookings,
        units,
        clients,
        drivers,
        expenses,
        stats: derived,
        loading,
        addBooking,
        updateBooking,
        deleteBooking,
        updateBookingStatus,
        addUnit,
        updateUnit,
        deleteUnit,
        addClient,
        updateClient,
        deleteClient,
        addDriver,
        updateDriver,
        deleteDriver,
        assignDriver,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

export default AdminContext;
