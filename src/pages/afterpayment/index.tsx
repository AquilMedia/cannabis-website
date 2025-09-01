import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext"; 
import { toast } from "react-toastify";
import { uploadPrescriptionDr } from "@/services/user";
import OrderConfirmationModal from "@/components/Modals/OrderConfirmationModal";
import Loader from "@/components/common/Loader";

export default function PaymentHandler() {
  const router = useRouter();
  const { fetchCartData } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const hasRun = useRef(false); 

  useEffect(() => {
    if (!router.isReady || hasRun.current) return;
    hasRun.current = true; 

    const storedData = localStorage.getItem("paymentData");
    if (!storedData) {
      console.warn("[PaymentHandler] No payment data found in localStorage");
      toast.error("No payment data found");
      return;
    }

    const processPayment = async () => {
      try {
        setLoading(true);

        const { cartItems, formData, questionsans, userToken } = JSON.parse(storedData);
        console.log("[PaymentHandler] Retrieved storedData:", { cartItems, formData, questionsans, userToken });

        const fd = new FormData();
        const items = cartItems.map((item: any) => ({
          product_id: item.product_id,
          product_name: item.product_name,
          price: item.inventory_price,
          weight: item.weight,
          weight_unit: item.weight_unit,
          quantity: item.quantity,
          pharmacist_id: item.pharmacist_id,
        }));

        fd.append("items", JSON.stringify(items));
        fd.append("legalDocImg", formData.legalDocImg ?? "");
        fd.append("questions", JSON.stringify(questionsans));
        fd.append("patientInfo", JSON.stringify(formData.patientInfo));
        fd.append("deliveryMethod", formData.deliveryMethod);

        console.log("[PaymentHandler] Sending FormData:", { items, formData, questionsans });

        const res = await uploadPrescriptionDr(fd, userToken);
        console.log("[PaymentHandler] API response:", res);

        if (!res?.success) {
          throw new Error(res?.message || "Failed to create order");
        }

        toast.success("Your order has been placed!");
        setOrderId(res.orderNumber);
        setShowOrderModal(true);

        localStorage.removeItem("paymentData");
        fetchCartData();
      } catch (error: any) {
        console.error("[PaymentHandler] Error storing order after payment:", error);
        toast.error(error.message || "Failed to store order after payment");
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [router.isReady]);

  const handleModalClose = () => {
    setShowOrderModal(false);
    router.push("/dashboard");
  };

  return (
    <>
      {loading && <Loader />}
      {orderId && showOrderModal && (
        <OrderConfirmationModal
          orderId={orderId}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
