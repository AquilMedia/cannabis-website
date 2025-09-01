import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cartItemDelete, cartUpdateQuantity, getCartList, getClearCart } from "@/services/user";
import { getImageUrl } from "@/utils/ImageUrls";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface CartModalProps {
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
    const router = useRouter();
    const { user } = useAuth();
    const [showMinOrderModal, setShowMinOrderModal] = useState(false);
    const [minOrderError, setMinOrderError] = useState<any>(null);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [totalGrams, setTotalGrams] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showPharmacy, setShowPharmacy] = useState(false);
    const [pharmacyData, setPharmacyData] = useState<any[]>([]);
    const { fetchCartData } = useCart();
    useEffect(() => {
        if (!user?.token) return;
        fetchCart();
    }, []);
    const fetchCart = async () => {
        try {
            const data = await getCartList(user?.token);

            if (data?.success) {
                setCartItems(data.cartItems || []);
                setPharmacyData(Array.isArray(data.pharmacist) ? data.pharmacist : [data.pharmacist]);
                setTotal(data.summary?.total_cart_price || 0);
                setTotalGrams(data.summary?.total_cart_grams || 0);
                fetchCartData();
            } else {
                // toast.error(data?.message || "Failed to load cart items");
            }
        } catch (err) {
            toast.error("Failed to load cart items");
        } finally {
            setLoading(false);
        }
    };
    const fetchCartDelete = async () => {
        try {
            const data = await getCartList(user?.token);

            if (data?.success) {
                setCartItems(data.cartItems || []);
                setPharmacyData(Array.isArray(data.pharmacist) ? data.pharmacist : [data.pharmacist]);
                setTotal(data.summary?.total_cart_price || 0);



            } else {

                if (data?.error === "Please add product to the cart" && typeof onClose === "function") {
                    onClose();
                }
                // toast.error(data?.message || "Failed to load cart items");
            }
        } catch (err) {
            toast.error("Failed to load cart items");
        } finally {
            setLoading(false);
        }
    };
    const handleCheckoutClick = () => {
        const totalWeight = cartItems.reduce(
            (total, item) => total + Number(item.weight) * item.quantity,
            0
        );

        if (totalWeight > 100) {
            toast.error("Maximum 100g/ml allowed in checkout!");
            return;
        }

        handleCheckout();
    };

    const handleDeleteItem = async (id: number) => {
        try {
            const res = await cartItemDelete(id, user?.token);
            if (res?.success) {
                toast.success("Item removed from cart");

                fetchCartDelete();
                fetchCartData();

            } else {
                toast.error(res?.message || "Failed to delete item");
            }
        } catch {
            toast.error("Failed to delete item");
        }
    };
    const handleUpdateQuantity = async (id: string, quantity: number) => {
        const data = {
            id,
            quantity
        };

        try {
            const res = await cartUpdateQuantity(data, user?.token);
            if (res?.success) {
                // toast.success("Quantity updated");
                fetchCart();
            } else {
                toast.error(res?.message || "Failed to update item");
            }
        } catch {
            toast.error("Failed to update item");
        }
    };


    const handleClearCart = async () => {
        try {
            const res = await getClearCart(user?.token);
            if (res?.success) {
                toast.success("Cart cleared");
                setCartItems([]);
                setTotal(0);
                onClose();
                fetchCartData();
            } else {
                toast.error(res?.message || "Failed to clear cart");
            }
        } catch {
            toast.error("Failed to clear cart");
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.warn("Your cart is empty");
            return;
        }


        for (const pharmacy of pharmacyData) {
            const minQty = pharmacy.shipping_settings?.min_order_qty || 0;

            if (totalGrams < minQty) {
                setMinOrderError({
                    minQty,
                    current: totalGrams,
                });
                setShowMinOrderModal(true);
                return;
            }
        }


        const OrderData = {
            items: cartItems.map(item => ({
                product_id: item.product_id,
                product_name: item.product_name,
                price: item.inventory_price,
                weight: item.weight,
                weight_unit: item.weight_unit,
                quantity: item.quantity,
                pharmacist_id: item.pharmacist_id
            }))
        };
        router.push("/consultation");
        onClose();
    };

    return (

        <div className="cartModalOverlay" onClick={onClose}>
            {showMinOrderModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Minimum Order Quantity</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowMinOrderModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    The minimum order for{" "}
                                    <strong>{minOrderError?.name}</strong> is{" "}
                                    <strong>{minOrderError?.minQty}</strong>. <br />

                                </p>
                                <p>Please add more items to continue.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowMinOrderModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="cartModalContent" onClick={(e) => e.stopPropagation()}>
                <div className="cartModalHeader">
                    <div className="d-flex gap-2 align-items-center">
                        <h2 className=" f-size-24 f-w-SB clr-black mb-0">Your Cart</h2>
                        <div className="f-size-16 secondary-clr">
                            {cartItems.reduce(
                                (total, item) => total + Number(item.weight) * item.quantity,
                                0
                            )} out of 100g/ml
                        </div>
                    </div>


                    <button className="closeBtn" onClick={onClose}>✖</button>
                </div>



                <div className="cartItems">
                    {!cartItems || cartItems.length === 0 ? (
                        <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                            <div className="noCart py-4 text-center">
                                <div className="cartIcon mx-auto mb__15"> <img src="assets/images/empty-cart.png" className="w-100" alt="" /></div>
                                <div className=" f-size-24 f-w-SB clr-black mb__15">No products in the cart.</div>
                                <Link href="/shop" onClick={onClose} className="btn cb_cmnBtn text-nowrap">Return To Shop</Link>
                            </div>
                        </div>
                    ) : (
                        cartItems.map((item) => (

                            <div key={item.cart_item_id} className="cartItem">
                                <div className="cartImg">
                                    <img
                                        className="w-100"
                                        src={getImageUrl(item.product_image) || "../assets/images/dummy-product.jpg"}
                                        alt={item.product_name}
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = "../assets/images/dummy-product.jpg";
                                        }}
                                    />

                                </div>
                                <div className="itemDetails flex-grow-1">
                                    <p className="f-size-18 f-w-SB clr-black mb__5">{item.product_name}</p>
                                    <p className="f-size-14 f-w-SB mb__5 clr-green">€{item.inventory_price}</p>
                                    <div className="cb_qty_selector field-w">
                                        <button
                                            className="btn decreaseQty"
                                            onClick={() => handleUpdateQuantity(item.cart_item_id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <i className="cb-icon cb-minus"></i>
                                        </button>
                                        <span className="form-control qtyValue">{item.quantity * item.weight}/{item.weight_unit}</span>
                                        <button
                                            className='btn increaseQty'
                                            onClick={() => handleUpdateQuantity(item.cart_item_id, item.quantity + 1)}
                                        >
                                            <i className="cb-icon cb-plus"></i>
                                        </button>
                                    </div>
                                </div>


                                <button className="text-danger btn p-0 border-0 deleteBtn" onClick={() => handleDeleteItem(item.cart_item_id)}><img src="assets/images/delete-icon.svg" className="w-100" alt="" /></button>
                            </div>
                        ))
                    )}
                </div>


                <div className="mb__15">
                    <div className="text-center py-1">
                        <button className="btn p-0 texe-center clr-green border-0" onClick={() => setShowPharmacy(!showPharmacy)}>{showPharmacy ? "Hide Pharmacy Info" : "Show Pharmacy Info"}</button>
                    </div>
                    <div>
                        {showPharmacy && (
                            <div className="pharmacyInfo">
                                <h4 className=" f-size-20 f-w-SB clr-black mb__10">Ordering from</h4>
                                <div className="mb__5">name: {cartItems[0]?.pharmacist_name || "N/A"}</div>
                                <div className="pharmacyDetails">
                                    <div className="mb__5">Address: {cartItems[0]?.pharmacist_address || "N/A"}</div>
                                    <div className="mb__5">Phone: {cartItems[0]?.pharmacist_phone || "N/A"}</div>
                                    <div className="mb__5">Email: {cartItems[0]?.pharmacist_email || "N/A"}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cartModalFooter">
                    <div className="d-flex justify-content-between align-items-center mb__10">
                        <span className="text-black f-w-SB line_H_1 d-inline-block"><span>Total: €{Number(total || 0).toFixed(2)} - {cartItems.reduce(
                            (total, item) => total + Number(item.weight) * item.quantity,
                            0
                        )} g/ml</span></span>
                        <button className="btn p-0 text-danger" onClick={handleClearCart}>Clear cart</button>
                    </div>
                    <button className="btn cb_cmnBtn text-nowrap w-100" onClick={handleCheckoutClick}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;