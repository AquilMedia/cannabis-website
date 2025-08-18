import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PendingOrderPage = () => {
  const [showPendingOrderModal, setShowPendingOrderModal] = useState(true);
    const router = useRouter();

  const handleClose = () => {
    setShowPendingOrderModal(false);

       router.push("/shop");
  }
  return (
    <div>
      {/* Other page content if needed */}

      {showPendingOrderModal && (
        <div
          className="cartModalOverlay"
          onClick={() => handleClose()}
        >
          <div
            className="cartModalContent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="cartModalHeader">
              <h2 className="f-size-24 f-w-SB clr-black mb-0">Pending Order</h2>
              <button
                className="closeBtn"
                onClick={() => handleClose()}
              >
                ✖
              </button>
            </div>

            {/* Body */}
            <div
              className="cartItems d-flex flex-column align-items-center justify-content-center text-center"
              style={{ minHeight: "200px" }}
            >
              <div className="noCart py-4">
                <div className="cartIcon mx-auto mb__15">
                  <img
                    src="assets/images/alert-icon.png"
                    className="w-100"
                    alt="Pending Order"
                  />
                </div>
                <div className="f-size-20 f-w-SB clr-black mb__10">
                  Your previous order is still pending.
                </div>
                <div className="f-size-16 clr-black mb__20">
                  Please wait until it is processed before creating a new one.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="cartModalFooter text-center">
              <button
                className="btn cb_cmnBtn text-nowrap w-100"
                onClick={() => handleClose()}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrderPage;
