import React, { useState, forwardRef, useImperativeHandle } from "react";
import { toast } from "react-toastify";
import { AddCart, getPharmsistList, getClearCart } from "@/services/user";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/Modals/LoginModal";
import { useCart } from "@/context/CartContext";

const PharmacistSelector = forwardRef((_, ref) => {
    const { user,logout } = useAuth();
    const [pharmacists, setPharmacists] = useState<any[]>([]);
    const [updatedquantity, setSelectedQuantity] = useState<any[]>([]);

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);
    const [showLogin, setShowLogin] = useState(false);

    const [showPharmacyModal, setShowPharmacyModal] = useState(false);
    const [showConflictModal, setShowConflictModal] = useState(false);
    const [conflictPharmacyName, setConflictPharmacyName] = useState("");
  const { fetchCartData } = useCart();
const handlePharmacistSelect = async (pharmacist: any) => {
    if (!pharmacist) {
        toast.error("Please select a pharmacy first");
        return;
    }

try {
    const response = await getPharmsistList(selectedProduct.id, user?.token);

    if (response.cartData) {
        const cartPharmacy = response.cartData?.pharmacist || null;
        const pharmacyName = cartPharmacy?.store_name?.trim() || "";

        if (!cartPharmacy || pharmacist.pharmacist_id === response.cartData?.pharmacist_id) {
            await AddCart(
                {
                    product_id: selectedProduct.id,
                    pharmacist_id: pharmacist.pharmacist_id,
                    quantity: updatedquantity,
                    
                },
                user?.token
            );
            toast.success("Added to cart successfully");
            setShowPharmacyModal(false);
            fetchCartData();
            return;  
        }

        setConflictPharmacyName(pharmacyName || "this pharmacy");
        setSelectedPharmacy(pharmacist);
        setShowPharmacyModal(false);
        setShowConflictModal(true);
        fetchCartData();
        return;
    }

    await AddCart(
        {
            product_id: selectedProduct.id,
            pharmacist_id: pharmacist.pharmacist_id,
          quantity: updatedquantity,
        },
        user?.token
    );
    toast.success("Added to cart successfully");
    setShowPharmacyModal(false);
    fetchCartData();
    return;
} catch {
    // toast.error("Failed to add to cart 1");
}

};

const openSelector = async (product: any, updatedquantity: any) => {

    console.log('product',product);
    console.log('updatedquantity',updatedquantity);

    
  if (!user) {
    setShowLogin(true);
    toast.error("Please log in first");
    return;
  }

  setSelectedProduct(product);
  setSelectedQuantity(updatedquantity); 

  try {
    const response = await getPharmsistList(product.id, user.token);
    console.log(response);
    
if (response.status === 401 || response.status === 403) {
  logout(); 

  throw new Error("Invalid or expired token");
}

    if (response.success && Array.isArray(response.data)) {
      setPharmacists(response.data);
      if (response.data.length > 0) {
        setSelectedPharmacy(response.data[0]);
      }

      setShowPharmacyModal(true);
    } else {
      toast.error("Failed to fetch pharmacists");
    }
  } catch {
    toast.error("Error fetching pharmacists");
  }
};

    const handleConfirmNewOrder = async () => {
    try {
        await getClearCart(user?.token);
        await AddCart(
            {
                product_id: selectedProduct.id,
                pharmacist_id: selectedPharmacy.pharmacist_id,
                quantity: updatedquantity,
            },
            user?.token
        );
        toast.success("Added to cart successfully");
        setShowConflictModal(false);
        fetchCartData();
    } catch {
        toast.error("Failed to start a new order");
    }
};


    useImperativeHandle(ref, () => ({
        openSelector,
    }));

    return (
        <>
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

 
            {showConflictModal && (
                <div
                    className="modal fade cb_cstModal show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header  justify-content-between border-bottom-0 pb-1">
                                <h5 className="text-black f-size-20 f-w-M line_H_1_3 mb-0">
                                    Start a new order process?
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close cb_cst_close align-self-start mx-0 mt-1 mb-0"
                                    onClick={() => setShowConflictModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    You can only place an order with one pharmacy. Please confirm if
                                    you want to cancel the order with{" "}
                                    <strong>{conflictPharmacyName}</strong>.
                                </p>
                            </div>
                            <div className="modal-footer justify-content-between border-top-0 pb-4">
                                <button
                                    type="button"
                                    className="btn m-0 cb_cmnBtn"
                                    onClick={handleConfirmNewOrder}
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    className="btn m-0 cb_cmnBtn cb_btnGrey"
                                    onClick={() => setShowConflictModal(false)}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showPharmacyModal && (
                <div
                    className="modal fade cb_cstModal show d-block"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content primary-clr">
                            <div className="modal-header border-bottom-0 pb-1">
                                <div className="flex-grow-1">
                                    <div className="d-flex gap-2 align-items-center">
                                        <h5 className="text-black f-size-20 f-w-M line_H_1_3 mb-0 flex-grow-1">
                                            Select pharmacy
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close cb_cst_close align-self-start mx-0 mt-1 mb-0"
                                            onClick={() => setShowPharmacyModal(false)}
                                        ></button>
                                    </div>
                                    <div className="line_H_1_3">{pharmacists.length} pharmacies</div>
                                </div>
                            </div>

                            <div className="modal-body">
                                <div className="f-size-16 f-w-M clr-green mb-3">
                                    Top Pharmacies ({pharmacists.length})
                                </div>
                                <ul className="list-unstyled m-0 d-flex flex-column row-gap-3">
                                    {pharmacists.map((p, idx) => (
                                        <li key={idx} className="cb_pharmaItem">
                                            <input
                                                className="d-none pharmaInput_item"
                                                type="radio"
                                                name="pharmacy"
                                                id={`pharmacy_${idx}`}
                                                onChange={() => setSelectedPharmacy(p)}
                                                checked={selectedPharmacy?.pharmacist_id === p.pharmacist_id}
                                            />
                                            <label
                                                htmlFor={`pharmacy_${idx}`}
                                                className="cb_pharmacyCard f-size-14 w-100"
                                            >
                                                <div className="d-flex gap-2 mb-1 line_H_1_3">
                                                    <div className="flex-grow-1 f-size-16 f-w-M clr-green">
                                                        {p.pharmacist?.store_name || "Unknown Store"}
                                                    </div>
                                                    <div className="f-size-16 f-w-M clr-green text-nowrap">
                                                        €{p.price} / g
                                                    </div>
                                                </div>
                                                {p.pharmacist?.address && (
                                                    <div className="cb_iconInfo mb-1">
                                                        <div>
                                                            <i className="icon cb-icon cb-location"></i>
                                                        </div>
                                                        {p.pharmacist.address}
                                                    </div>
                                                )}
                                                <div className="d-flex flex-wrap gap-3 row-gap-2">
                                                    <div className="cb_iconInfo">
                                                        <i className="icon cb-icon cb-truck"></i> Same day
                                                        delivery
                                                    </div>
                                                    <div className="cb_iconInfo">
                                                        <i className="icon cb-icon cb-clock"></i>{" "}
                                                        Consultation
                                                    </div>
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-footer justify-content-center border-top-0 pt-2 pb-4">
                                <button
                                    type="button"
                                    className="btn m-0 cb_cmnBtn"
                                    disabled={!selectedPharmacy}
                                    onClick={() => handlePharmacistSelect(selectedPharmacy)}
                                >
                                    Select Pharmacy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

PharmacistSelector.displayName = "PharmacistSelector";
export default PharmacistSelector;
