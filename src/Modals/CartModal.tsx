import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cartItemDelete, cartUpdateQuantity, CreateCartOrder, getCartList, getClearCart } from "@/services/user";
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
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showPharmacy, setShowPharmacy] = useState(false);
  const { fetchCartData } = useCart();
    const fetchCart = async () => {
        try {
            const data = await getCartList(user?.token);
            if (data?.success) {
                setCartItems(data.cartItems || []);
                setTotal(data.summary?.total_cart_price || 0);
                fetchCartData();
            } else {
                toast.error(data?.message || "Failed to load cart items");
            }
        } catch (err) {
            toast.error("Failed to load cart items");
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        if (!user?.token) return;
        fetchCart();
    }, []);
    const handleDeleteItem = async (id: number) => {
        try {
            const res = await cartItemDelete(id, user?.token);
            if (res?.success) {
                toast.success("Item removed from cart");
                fetchCart();
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
                toast.success("Quantity updated");
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
        // try {
        //     const res = await CreateCartOrder(OrderData, user.token);
        //     // console.log(res.success);
 
        //     if (!res.success) {
        //         throw new Error("Failed to create order");
        //     }
 
        //     onClose();
        //       router.push("/consultation");
 
        //     fetchCart();
        //     // toast.success("Order created successfully!")
        // } catch (err) {
        //     console.error(err);
 
        //     toast.error("Error creating order");
        // }
    };
 
    return (
        <div className="cartModalOverlay" onClick={onClose}>
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
                                    <div className="cartIcon mx-auto mb__15"> <img src="assets/images/empty-cart.png"className="w-100" alt="" /></div>
                                    <div className=" f-size-24 f-w-SB clr-black mb__15">No products in the cart.</div>
                                    <Link href="/shop" onClick={onClose} className="btn cb_cmnBtn text-nowrap">Return To Shop</Link>
                                </div>
                            </div>
                        ) : (
                    cartItems.map((item) => (
                        
                        <div key={item.cart_item_id} className="cartItem">
                            {/* <img
                                src={item.product_image?.startsWith("http")
                                    ? item.product_image
                                    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.product_image}`}
                                alt={item.product_name}
                            /> */}
                            <div className="cartImg">
                              
                                 <img src="assets/images/product-img-1.png"className="w-100" alt="" />
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

                           
                            <button className="text-danger btn p-0 border-0 deleteBtn" onClick={() => handleDeleteItem(item.cart_item_id)}><img src="assets/images/delete-icon.svg"className="w-100" alt="" /></button>
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
                        <span className="text-black f-w-SB line_H_1 d-inline-block"><span>Total: €{Number(total || 0).toFixed(2)}</span></span>
                        <button className="btn p-0 text-danger" onClick={handleClearCart}>Clear cart</button>
                    </div>
                    <button className="btn cb_cmnBtn text-nowrap w-100" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};
 
export default CartModal;