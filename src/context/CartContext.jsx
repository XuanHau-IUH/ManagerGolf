import { createContext, useContext, useReducer, useCallback } from 'react';
import { ADDONS } from '../data/mockData';

const CartContext = createContext(null);

const HOLD_DURATION_MS = 10 * 60 * 1000; // 10 minutes

const initialState = {
  teeTime:      null,   // Selected tee-time slot object
  players:      1,
  date:         '',
  buggies:      0,
  caddies:      0,
  fnbVouchers:  0,
  proShopItems: [],     // [{ product, qty }]
  holdExpiresAt: null,  // unix ms
  isCartOpen:   false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_TEE_TIME':
      return {
        ...state,
        teeTime:       action.payload,
        holdExpiresAt: Date.now() + HOLD_DURATION_MS,
        isCartOpen:    true,
        buggies:       0,
        caddies:       0,
        fnbVouchers:   0,
      };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_BUGGIES':
      return { ...state, buggies: Math.min(action.payload, state.players) };
    case 'SET_CADDIES':
      return { ...state, caddies: Math.min(action.payload, state.players) };
    case 'SET_FNB':
      return { ...state, fnbVouchers: action.payload };
    case 'ADD_PROSHOP': {
      const existing = state.proShopItems.find(i => i.product.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          proShopItems: state.proShopItems.map(i =>
            i.product.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, proShopItems: [...state.proShopItems, { product: action.payload, qty: 1 }] };
    }
    case 'REMOVE_PROSHOP':
      return {
        ...state,
        proShopItems: state.proShopItems.filter(i => i.product.id !== action.payload),
      };
    case 'UPDATE_PROSHOP_QTY':
      return {
        ...state,
        proShopItems: state.proShopItems.map(i =>
          i.product.id === action.payload.id
            ? { ...i, qty: Math.max(0, action.payload.qty) }
            : i
        ).filter(i => i.qty > 0),
      };
    case 'OPEN_CART':
      return { ...state, isCartOpen: true };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    case 'CLEAR_CART':
      return { ...initialState };
    case 'REFRESH_HOLD':
      return { ...state, holdExpiresAt: Date.now() + HOLD_DURATION_MS };
    default:
      return state;
  }
}

function computeTotal(state) {
  let total = 0;
  if (state.teeTime) {
    total += state.teeTime.price * state.players;
  }
  total += state.buggies   * ADDONS.buggy.price;
  total += state.caddies   * ADDONS.caddy.price;
  total += state.fnbVouchers * ADDONS.fnbVoucher.price;
  state.proShopItems.forEach(({ product, qty }) => {
    total += product.price * qty;
  });
  return total;
}

function computeItemCount(state) {
  let count = state.teeTime ? 1 : 0;
  count += state.buggies > 0 ? 1 : 0;
  count += state.caddies > 0 ? 1 : 0;
  count += state.fnbVouchers > 0 ? 1 : 0;
  count += state.proShopItems.reduce((s, i) => s + i.qty, 0);
  return count;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const setTeeTime      = useCallback(slot      => dispatch({ type: 'SET_TEE_TIME', payload: slot }), []);
  const setPlayers      = useCallback(n         => dispatch({ type: 'SET_PLAYERS',  payload: n    }), []);
  const setDate         = useCallback(d         => dispatch({ type: 'SET_DATE',     payload: d    }), []);
  const setBuggies      = useCallback(n         => dispatch({ type: 'SET_BUGGIES',  payload: n    }), []);
  const setCaddies      = useCallback(n         => dispatch({ type: 'SET_CADDIES',  payload: n    }), []);
  const setFnb          = useCallback(n         => dispatch({ type: 'SET_FNB',      payload: n    }), []);
  const addProShop      = useCallback(product   => dispatch({ type: 'ADD_PROSHOP',  payload: product }), []);
  const removeProShop   = useCallback(id        => dispatch({ type: 'REMOVE_PROSHOP', payload: id  }), []);
  const updateProShopQty= useCallback((id, qty) => dispatch({ type: 'UPDATE_PROSHOP_QTY', payload: { id, qty } }), []);
  const openCart        = useCallback(()        => dispatch({ type: 'OPEN_CART'  }), []);
  const closeCart       = useCallback(()        => dispatch({ type: 'CLOSE_CART' }), []);
  const clearCart       = useCallback(()        => dispatch({ type: 'CLEAR_CART' }), []);
  const refreshHold     = useCallback(()        => dispatch({ type: 'REFRESH_HOLD' }), []);

  const total     = computeTotal(state);
  const itemCount = computeItemCount(state);

  return (
    <CartContext.Provider value={{
      ...state, total, itemCount,
      setTeeTime, setPlayers, setDate,
      setBuggies, setCaddies, setFnb,
      addProShop, removeProShop, updateProShopQty,
      openCart, closeCart, clearCart, refreshHold,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
