import { history } from "../";
import { createEffect, createEvent, createStore } from "effector";

export const hotels = createStore([]);
export const hotel = createStore<any>({});

export const freeRooms = createStore([]);

export const isAuth = createStore(true);

export const isModalAuthShow = createStore(false);

export const changeModalShown = createEvent();

export const changeIsAuth = createEvent<boolean>();

export const getIsAuth = createEffect(async () => {
  const res = await fetch("/api/auth/signin", {
    method: "GET",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });
  if (res.status == 200) {
    return true;
  } else {
    return false;
  }
});

export const loginAuth = createEffect(
  async (params: { userName: string; password: string }) => {
    console.log(params.userName);
    console.log(params.password);
    const b64 = btoa(params.userName + ":" + params.password);

    const res = await fetch("/api/auth/signin", {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic " + b64,
      },
    });
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  }
);

export const registrationAuth = createEffect(
  async (params: {
    Name: string;
    Address: string;
    HomePhone: string;
    MobilePhone: string;
    Login: string;
    Password: string;
  }) => {
    console.log(params);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(params),
    });
    console.log(res);
    console.log(res.status);
  }
);

isModalAuthShow.on(changeModalShown, (state) => !state);
isAuth
  .on(changeIsAuth, (state, status) => status)
  .on(getIsAuth.doneData, (_, res) => res)
  .on(loginAuth.doneData, (_, res) => res);

export const getAllHotels = createEffect(async () => {
  const res = await fetch("/api/hotels");
  return res.json();
});

export const getFreeRooms = createEffect(
  async (params: { hotelId: number; start: string; finish: string }) => {
    const res = await fetch("/api/reservations/check", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        hotelId: params.hotelId,
        start: new Date(params.start),
        finish: new Date(params.finish),
      }),
    });
    return res.json();
  }
);

export const createOrder = createEffect(
  async (params: {
    roomId: number;
    roomOfferId: number;
    start: string;
    finish: string;
  }) => {
    const res = await fetch("/api/reservations/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        roomId: params.roomId,
        roomOfferId: params.roomOfferId,
        start: new Date(params.start),
        finish: new Date(params.finish),
      }),
    });

    return res.json();
  }
);

export const getCurrentHotel = createEffect(
  async (params: { hotelId: string }) => {
    const res = await fetch("/api/hotels/" + params.hotelId);
    return res.json();
  }
);

hotels.on(getAllHotels.doneData, (_, res) => res);
hotel.on(getCurrentHotel.doneData, (_, res) => res);

freeRooms.on(getFreeRooms.doneData, (_, res) => res);

// Clerk

export const allReservationClerk = createStore([]);
export const allGuestsforClerk = createStore([]);

export const getAllGuests = createEffect(async () => {
  const res = await fetch("/api/clerk/guests/list", {
    method: "GET",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });
  if (res.status == 200) {
    const result = await res.json();

    return result;
  } else {
    history.push("/");
  }
});

export const getAllResirvationsForClerk = createEffect(async () => {
  const res = await fetch("/api/clerk/reservation/list", {
    method: "GET",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });
  if (res.status == 200) {
    const result = await res.json();
    return result;
  } else {
    history.push("/");
  }
});

export const createResClerk = createEffect(
  async (params: { reservationId: number; start: string; finish: string }) => {
    const res = await fetch("/api/clerk/reservation/update", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        reservationId: params.reservationId,
        start: new Date(params.start),
        finish: new Date(params.finish),
      }),
    });
    if (res.status === 200) {
      await getAllResirvationsForClerk();
    } else {
      console.log(res);
    }
  }
);

export const removeClerkItemRes = createEffect(
  async (params: { reservationId: number }) => {
    const res = await fetch("/api/clerk/reservation/cancel", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        reservationId: params.reservationId,
      }),
    });
    if (res.status === 200) {
      await getAllResirvationsForClerk();
    } else {
      console.log(res);
    }
  }
);

export const addGuestToreserve = createEffect(
  async (params: { guestId: number; reservationId: number }) => {
    const res = await fetch("/api/clerk/reservation/guests/add", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        guestId: params.guestId,
        reservationId: params.reservationId,
      }),
    });
    if (res.status === 200) {
      await getAllResirvationsForClerk();
    } else {
      console.log(res);
    }
  }
);

export const removeGuestToreserve = createEffect(
  async (params: { guestId: number; reservationId: number }) => {
    const res = await fetch("/api/clerk/reservation/guests/delete", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        guestId: params.guestId,
        reservationId: params.reservationId,
      }),
    });
    if (res.status === 200) {
      await getAllResirvationsForClerk();
    } else {
      console.log(res);
    }
  }
);

export const createOrderByClerk = createEffect(
  async (params: {
    guestId: number;
    roomId: number;
    roomOfferId: number;
    start: string;
    finish: string;
  }) => {
    const res = await fetch("/api/clerk/reservation/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        guestId: params.guestId,
        roomId: params.roomId,
        roomOfferId: params.roomOfferId,
        start: new Date(params.start),
        finish: new Date(params.finish),
      }),
    });

    console.log(res);
  }
);

export const createGuest = createEffect(
  async (params: {
    Name: string;
    Address: string;
    HomePhone: string;
    MobilePhone: string;
    Login: string;
  }) => {
    const res = await fetch("/api/clerk/guests/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        Name: params.Name,
        Address: params.Address,
        HomePhone: params.HomePhone,
        MobilePhone: new Date(params.MobilePhone),
        Login: new Date(params.Login),
      }),
    });

    console.log(res);
  }
);

export const removeUser = createEffect(async () => {
  const res = await fetch("/api/auth/logout", {
    method: "GET",
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });
});

export const removeReserItem = createEffect(async (params: { id: number }) => {
  const res = await fetch(
    `/api/reservations/delete?reservationId=${params.id}`,
    {
      method: "GET",
      headers: { "X-Requested-With": "XMLHttpRequest" },
    }
  );
});

allReservationClerk.on(getAllResirvationsForClerk.doneData, (_, res) => res);
allGuestsforClerk.on(getAllGuests.doneData, (_, res) => res);
isAuth.on(removeUser.doneData, (_, res) => false);
