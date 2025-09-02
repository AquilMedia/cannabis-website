import { useRouter } from "next/navigation";

interface OrderOnlineSuccessModalProps {
  orderId: string;

  onClose: () => void;
}

const OrderOnlineSuccessModal: React.FC<OrderOnlineSuccessModalProps> = ({ orderId, onClose }) => {
  const router = useRouter();

  return (
    <div
      className="modal fade cb_cstModalOrder show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center">
            <div className="order-icon mb-3">
              <i className="icon cb-icon cb-check-circle"></i>
            </div>
            <h2 className="order-title">Thank you for your order!</h2>
            <p className="f-size-16 clr-gray text-center mb__15">
              Order number: <span className="clr-black f-w-SB">#{orderId}</span>
            </p>
            <p className="order-subtitle">
              The order confirmation has been sent to you by email.
            </p>

            <div className="order-steps mt-4">
              <h4 className="steps-title">What are the next steps?</h4>
              <div className="steps-grid">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <h5>Our doctor will review your treatment request.</h5>
                  <p>
                    Our doctor will review your information shortly. If any additional
                    questions arise, you will be contacted via email.
                  </p>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <h5>Your prescription will be issued online.</h5>
                  <p>
                    If your treatment is suitable, your prescription will be issued
                    online and forwarded to your pharmacy.
                  </p>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <h5>Your treatment will be delivered as per your instructions.</h5>
                  <p>
                    Our partner pharmacy will deliver your medications using the delivery option you choose.
                  </p>
                </div>

              </div>
            </div>

            <button type="button" onClick={() => router.push("/dashboard")} className="btn cb_cmnBtn mt-4">
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default OrderOnlineSuccessModal;
