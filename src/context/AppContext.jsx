import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const AppContext = createContext();

export const currencies = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  INR: { symbol: '₹', rate: 83.5, label: 'INR (₹)' },
  JPY: { symbol: '¥', rate: 155.0, label: 'JPY (¥)' }
};

export const AppProvider = ({ children }) => {
  // Authentication State (Default to null if unauthenticated)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skymart_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('skymart_users_db');
    return saved ? JSON.parse(saved) : [
      { name: 'Demo User', email: 'user@skymart.com', password: 'password123' },
      { name: 'Admin User', email: 'admin@skymart.com', password: 'password123' }
    ];
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('skymart_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('skymart_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Order History State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('skymart_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'SKY-948210',
        date: '2026-07-20',
        items: [{ product: products[0], quantity: 1 }],
        subtotal: 59.99,
        discount: 0,
        shipping: 0,
        total: 59.99,
        status: 'In Transit',
        progress: 75,
        address: '777 Cyber Boulevard, Neo Tokyo'
      }
    ];
  });

  // Product Comparison List State (up to 3 items)
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('skymart_compare');
    return saved ? JSON.parse(saved) : [];
  });

  // Customer Reviews State
  const [productReviews, setProductReviews] = useState(() => {
    const saved = localStorage.getItem('skymart_reviews');
    return saved ? JSON.parse(saved) : {};
  });

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Accent Theme State
  const [accentTheme, setAccentThemeState] = useState(() => {
    return localStorage.getItem('skymart_accent_theme') || 'lime';
  });

  // Currency State
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem('skymart_currency') || 'USD';
  });

  // UI Overlays & Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Product Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null); // Quick View Modal
  const [isCyberBotOpen, setIsCyberBotOpen] = useState(false); // AI Bot Modal
  const [invoiceOrder, setInvoiceOrder] = useState(null); // Receipt Modal
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('skymart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('skymart_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('skymart_users_db', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('skymart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('skymart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('skymart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('skymart_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('skymart_reviews', JSON.stringify(productReviews));
  }, [productReviews]);

  useEffect(() => {
    localStorage.setItem('skymart_accent_theme', accentTheme);
    document.documentElement.setAttribute('data-theme', accentTheme);
  }, [accentTheme]);

  useEffect(() => {
    localStorage.setItem('skymart_currency', currency);
  }, [currency]);

  const setAccentTheme = (themeKey) => {
    setAccentThemeState(themeKey);
    showToast(`Accent theme updated to ${themeKey.toUpperCase()}!`);
  };

  const setCurrency = (currCode) => {
    setCurrencyState(currCode);
    showToast(`Currency converted to ${currCode}!`);
  };

  const formatPrice = (amountUSD) => {
    const curr = currencies[currency] || currencies.USD;
    const converted = (amountUSD || 0) * curr.rate;
    if (currency === 'JPY') {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toFixed(2)}`;
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Auth Operations
  const verifyAndLogin = (email, password) => {
    const foundUser = usersList.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setUser({ name: foundUser.name, email: foundUser.email });
      showToast(`Welcome back, ${foundUser.name}!`);
      return { success: true };
    } else {
      const emailExists = usersList.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        return { success: false, reason: 'invalid_password', message: 'Incorrect password! Please try again.' };
      } else {
        return { success: false, reason: 'not_found', message: 'User account not found. Please sign up!' };
      }
    }
  };

  const registerUser = (name, email, password) => {
    const emailExists = usersList.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { success: false, message: 'An account with this email already exists!' };
    }

    const newUser = { name, email, password };
    const updatedUsers = [...usersList, newUser];
    setUsersList(updatedUsers);
    setUser({ name, email });
    showToast(`Account created successfully! Welcome, ${name}.`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skymart_user');
    showToast('Signed out of SkyMart account.');
  };

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from Wishlist.`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.some((p) => p.id === productId);

  // Compare Operations
  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from Comparison.`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 3) {
          showToast('Comparison limit reached (max 3 items).', 'info');
          return prev;
        }
        showToast(`Added ${product.name} to Comparison!`);
        return [...prev, product];
      }
    });
  };

  const isInCompare = (productId) => compareList.some((p) => p.id === productId);
  const clearCompare = () => setCompareList([]);

  // Coupon Operations
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CYBER20') {
      setAppliedCoupon({ code: 'CYBER20', type: 'percent', value: 0.20, label: '20% Cyber Discount' });
      showToast('Promo code CYBER20 applied! (20% OFF)');
    } else if (cleanCode === 'NEON10') {
      setAppliedCoupon({ code: 'NEON10', type: 'fixed', value: 10, label: '$10 Off Order' });
      showToast('Promo code NEON10 applied! ($10 OFF)');
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', type: 'freeship', value: 0, label: 'Free Express Shipping' });
      showToast('Promo code FREESHIP applied!');
    } else {
      showToast('Invalid promo code. Try CYBER20, NEON10, or FREESHIP', 'info');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed.');
  };

  // Customer Reviews
  const addProductReview = (productId, reviewData) => {
    setProductReviews((prev) => {
      const existing = prev[productId] || [];
      return {
        ...prev,
        [productId]: [
          { ...reviewData, id: Date.now(), date: new Date().toLocaleDateString() },
          ...existing
        ]
      };
    });
    showToast('Thank you! Your review has been posted.');
  };

  // Orders Operations
  const addOrder = (orderRecord) => {
    setOrders((prev) => [orderRecord, ...prev]);
    clearCart();
    setAppliedCoupon(null);
  };

  // Price Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = cartSubtotal * appliedCoupon.value;
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    }
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        user,
        verifyAndLogin,
        registerUser,
        logout,

        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartItemCount,

        wishlist,
        toggleWishlist,
        isInWishlist,

        orders,
        addOrder,

        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,

        productReviews,
        addProductReview,

        accentTheme,
        setAccentTheme,

        currency,
        setCurrency,
        formatPrice,

        isCartOpen,
        toggleCart: () => setIsCartOpen(!isCartOpen),
        
        isCheckoutOpen,
        openCheckout: () => setIsCheckoutOpen(true),
        closeCheckout: () => setIsCheckoutOpen(false),
        
        selectedProduct,
        openProductModal: (prod) => setSelectedProduct(prod),
        closeProductModal: () => setSelectedProduct(null),

        quickViewProduct,
        openQuickView: (prod) => setQuickViewProduct(prod),
        closeQuickView: () => setQuickViewProduct(null),

        isCyberBotOpen,
        toggleCyberBot: () => setIsCyberBotOpen(!isCyberBotOpen),

        invoiceOrder,
        openInvoice: (order) => setInvoiceOrder(order),
        closeInvoice: () => setInvoiceOrder(null),

        toastMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
